import { ShoppingCart } from 'lucide-react'
import React from 'react'
import { useUserStore } from '../stores/useUserStore'
import toast from 'react-hot-toast'
import { useCartStore } from '../stores/useCartStore'

const ProductCard = ({ product }) => {
    const { user } = useUserStore()
    const { addToCart } = useCartStore()
    const HandleAddtoCart = () => {
        if(!user) {
            toast.error("Vui lòng đăng nhập để có thể mua hàng", {id: "login" })
            return
        } else {
            addToCart(product)
        }
    }
  return (
    <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
        <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
            <img className="object-cover w-full" src={product.image} alt="product image" />
            <div className="absolute inset-0 bg-opacity-20" />
        </div>

        <div className="mt-4 px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-400">
                {product.name}
            </h5>

            <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                    <span className="text-3xl font-bold text-emerald-400">{product.price.toFixed(3)} VNĐ</span>
                </p>
            </div>

            <button className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
            text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
            onClick={HandleAddtoCart}>
                <ShoppingCart size={20} className='mr-2' /> Thêm vào giỏ hàng
            </button>
        </div>
    </div>
  )
}

export default ProductCard