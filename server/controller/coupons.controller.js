import Coupon from "../model/coupons.model.js"
export const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findOne({userId: req.user._id, isActive: true})
        res.json(coupons || null)
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở getCoupons controller: ", error: error.message })
    }
}

export const validateCoupon = async (req, res) => {
    try {
        const {code} = req.body
        const coupon = await Coupon.findOne({code:code, userId: req.user._id, isActive: true})

        if (!coupon) { 
            return res.status(404).json({ message: "Coupon not found" })
        }
        if(coupon.epxirationDate < new Date()) {
            coupon.isActive = false
            await coupon.save()
            return res.status(404).json({ message: "Coupon expired" })
        }
        res.json({
            message: "Valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở validateCoupon controller: ", error: error.message })
    }
}