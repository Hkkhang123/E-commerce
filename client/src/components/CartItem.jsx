import React from 'react'
import { useCartStore } from '../stores/useCartStore'
import { Minus, Plus, Trash } from 'lucide-react'

const CartItem = ({product}) => {
    const {removeItem, updateQuantity} = useCartStore()
  return (
    <div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
            <div className="shirnk-0 md:order-1">
                <img className='h-20 md:h-32 rounded object-cover' src={product.image} />
            </div>
            <label className='sr-only'>Vui lòng chọn số lượng</label>

            <div className="flex items-center justify-center md:order-3 md:justify-end">
                <div className="flex items-center gap-2">
                    <button
                        className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                             border-gray-600 bg-gray-700 font-medium text-gray-400 hover:bg-gray-600
                             focus:outline-none focus:ring-2 focus:ring-emerald-500'
                        onClick={() => updateQuantity(product._id, product.quantity - 1)}
                    >
                        <Minus className='text-gray-300' />
                    </button>
                    <p>{product.quantity}</p>
                    <button
                        className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                                 border-gray-600 bg-gray-700 font-medium text-gray-400 hover:bg-gray-600
                                    focus:outline-none focus:ring-2 focus:ring-emerald-500'
                    >
                        <Plus className='text-gray-300' onClick={() => updateQuantity(product._id, product.quantity + 1) } />
                    </button>
                </div>

                <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-emerald-400">{new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ</p>
                </div>
            </div>

            <div className="w-full mix-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <p className="text-base font-medium text-white hover:text-emerald-400 hover:underline">
                    {product.name}
                </p>
                <p className='text-sm text-gray-400'>{product.description}</p>

                <div className="flex items-center gap-4">
                    <button
                        className='inline-flex items-center text-sm font-medium text-red-400 hover:text-red-300 hover:underline'
                        onClick={() => removeItem(product._id)}
                    >
                        <Trash />
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem