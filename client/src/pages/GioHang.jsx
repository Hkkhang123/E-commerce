import React from 'react'
import { useCartStore } from '../stores/useCartStore'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import RecommendedProduct from '../components/RecommendedProduct'
import OrderSummary from '../components/OrderSummary'
import Coupon from '../components/Coupon'

const GioHang = () => {
  const {cart} = useCartStore()
  return (
    <div className='py-8 md:py-16'>
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="space-y-6">
                {cart.map((product) => (
                  <CartItem key={product._id} product={product} />
                ))}
              </div>
            )}
            {cart.length > 0 && (
              <RecommendedProduct />
            )}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary />
              <Coupon />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GioHang

const EmptyCart = () => {
  return(
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className='flex flex-col items-center justify-center py-16 space-y-4'
  >
    <ShoppingCart className='h-24 w-24 text-gray-300' />
    <h3 className="text-2xl font-semibold text-gray-300">Giỏ hàng của bạn đang trống</h3>
    <p className="text-gray-400">Có vẻ như bạn chưa thêm sản phẩm vào giỏ hàng</p>
    <Link className='mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600' to='/'>Mua sắm ngay</Link>
  </motion.div>
  )
  
}