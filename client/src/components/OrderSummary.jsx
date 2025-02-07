import React from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '../stores/useCartStore'
import { Link } from 'react-router-dom'
import { MoveRight } from 'lucide-react'
import {loadStripe} from '@stripe/stripe-js'
import axios from '../lib/axios'
const stripePromise = loadStripe
("pk_test_51Qk2rQBqtyPLcaCFV7xAfJ9p3zGSBhzTAP47KWlKQ4DM99YFizjNGZsavaks4ud5KpmUkBeWOwU1KnC5Av5SrZYF00LTNY3Vvv")

const OrderSummary = () => {
    const {total, subtotal, coupon, isCouponApplied, cart} = useCartStore()

    const saving = subtotal - total
    const formattedSubtotal = new Intl.NumberFormat('vi-VN').format(subtotal)
    const formattedTotal = new Intl.NumberFormat('vi-VN').format(total)
    const formattedSaving = new Intl.NumberFormat('vi-VN').format(saving)

    const handlePayment = async () => {
        const stripe = await stripePromise
        const res = await axios.post('/payments/create-checkout-session', {
            products: cart, 
            couponCode: coupon ? coupon.code : null
        })
        const session = res.data
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        })
        if (result.error) {
            console.log("Lỗi result:", result.error)
        }
    }

  return (
    <motion.div
        className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} 
    >
        <p className="text-xl font-semibold text-emerald-400">Tổng hóa đơn</p>
        <div className="space-y-4">
            <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-300">Giá gốc</dt>
                    <dd className="text-base font-medium text-white">{formattedSubtotal} VNĐ</dd>
                </dl>

                {saving > 0 && (
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">Bạn đã tiết kiệm</dt>
                        <dd className="text-base font-medium text-emerald-400">-{formattedSaving} VNĐ</dd>
                    </dl>
                )}

                {coupon && isCouponApplied && (
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-300">Mã giảm giá ({coupon.code})</dt>
                        <dd className="text-base font-medium text-emerald-400">-{coupon.discountPercentage}%</dd>
                    </dl>
                )}

                <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
                    <dt className="text-base font-bold text-white">Tổng hóa đơn</dt>
                    <dd className="text-base font-bold text-emerald-400">{formattedTotal} VNĐ</dd>
                </dl>
            </div>

            <motion.button
                className='flex w-full items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 text-white text-sm font-medium
                hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePayment}
            >
                Thanh toán
            </motion.button>

            <div className="flex items-center gap-2 justify-center">
                <span className="text-sm font-normal text-gray-400">Hoặc</span>
                <Link
                    to="/"
                    className='inline-flex items-center gap-2 text-sm font-medium underline
                     text-emerald-400 hover:text-emerald-500 hover:no-underline'
                >
                    Tiếp tục mua sắm
                    <MoveRight size={16} />
                </Link>
            </div>
        </div>
    </motion.div>   
  )
}

export default OrderSummary