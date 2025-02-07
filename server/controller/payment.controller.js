import { stripe } from "../lib/stripe.js"
import Coupon from "../model/coupons.model.js"
import Order from "../model/order.model.js"
export const createCheckoutSession = async (req, res) => {
    try {
        const {products, couponCode} = req.body

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Invalid or empty array" })
        }

        let totalAmount = 0

        const lineItem = products.map((product) => {
            const amount = Math.round(product.price)
            totalAmount += amount * product.quantity
            return {
                price_data: {
                    currency: "vnd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount,
                },
                quantity: product.quantity || 1
            }
        })

        let coupon = null

        if (couponCode) {
            coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true })
            if (coupon) {
                totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100)
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItem,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancelled`,
            discounts: coupon ? [{ coupon: await createStripeCoupon(coupon.discountPercentage) }] : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                
                product: JSON.stringify(
                    products.map((product) => ({
                        id: product._id,
                        quantity: product.quantity,
                        price: product.price
                    }))
                )
            }
        })
        if (totalAmount >= 2000000) {
            await createNewCoupon(req.user._id)
        }
        res.status(200).json({ id: session.id, totalAmount: totalAmount })

    } catch (error) {
        console.error("Error processing checkout:", error);
        res.status(500).json({ message: "Lỗi ở createCheckoutSession controller: ", error: error.message })
    }
    async function createStripeCoupon(discountPercentage) {
        const coupon = await stripe.coupons.create({
            percent_off: discountPercentage,
            duration: "once",
        })

        return coupon.id
    }
    async function createNewCoupon(userId) {
        await Coupon.findOneAndDelete({ userId });
        const newCoupon = new Coupon({
            code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
            discountPercentage: 10,
            expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            userId: userId,
            isActive: true
        })

        await newCoupon.save()

        return newCoupon
    }
}

export const checkoutSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate({ code: session.metadata.couponCode, userId: session.metadata.userId}, { isActive: false })
            }
            const product = JSON.parse(session.metadata.product)
            const existingOrder = await Order.findOne({ stripeSessionId: sessionId });
            if (existingOrder) {
                return res.status(400).json({ message: "Đơn hàng đã tồn tại với stripeSessionId này." });
            }
            const order = await Order({
                user: session.metadata.userId,
                products: product.map((product) => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total,
                stripeSessionId: sessionId
            })

            await order.save()
            res.status(200).json({ message: "Success", orderId: order._id })
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở checkOutSuccess controller: ", error: error.message })
    }
}