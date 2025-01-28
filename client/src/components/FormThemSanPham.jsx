import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader, PlusCircle, Upload } from 'lucide-react'
import { useProductStore } from '../stores/useProductStore'

const categories = [
    "Jeans", "Tshirts", "Giày", "Kính mát", "Jackets", "Suits", "Balo"
]
const FormThemSanPham = () => {
    const [image, setImage] = useState("")
    const {createProducts, loading} = useProductStore()
    const [newProducts, setNewProducts] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    })
const handleSubmit = async (e) => {
    e.preventDefault()
    await createProducts(newProducts)
}

const handleImage = (e) => {
    const file = e.target.files[0]
    if(file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            setNewProducts({...newProducts, image: reader.result})
        }
        reader.readAsDataURL(file)
        setImage(file.name)
    }
}
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
    >
        <h2 className="text-2xl font-bold mb-6 text-emerald-300">Thêm sản phẩm</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label htmlFor="name" className='block text-sm font-medium text-gray-300'>
                    Tên sản phẩm
                </label>
                <input 
                    id='name' 
                    type="text"
                    name='name'
                    required
                    value={newProducts.name}
                    onChange={(e) => setNewProducts({ ...newProducts, name: e.target.value })}
                    className='mt-1 block w-full px-3 py-2 text-white bg-gray-700 border 
                     border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    placeholder="Tên sản phẩm" />
            </div>

            <div>
                <label htmlFor="description" className='block text-sm font-medium text-gray-300'>
                    Mô tả
                </label>
                <textarea 
                    id='description' 
                    name='description'
                    required
                    value={newProducts.description}
                    onChange={(e) => setNewProducts({ ...newProducts, description: e.target.value })}
                    rows={3}
                    className='mt-1 block w-full px-3 py-2 text-white bg-gray-700 border 
                     border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    placeholder="Mô tả" />
            </div>

            <div>
                <label htmlFor="price" className='block text-sm font-medium text-gray-300'>
                    Giá
                </label>
                <input 
                    id='price' 
                    type="number"
                    name='price'
                    required
                    value={newProducts.price}
                    onChange={(e) => setNewProducts({ ...newProducts, price: e.target.value })}
                    step={100000}
                    className='mt-1 block w-full px-3 py-2 text-white bg-gray-700 border 
                     border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    placeholder="Giá" />
            </div>

            <div>
                <label htmlFor="category" className='block text-sm font-medium text-gray-300'>
                    Loại sản phẩm
                </label>
                <select 
                    id='category'
                    name='category'
                    required
                    value={newProducts.category}
                    onChange={(e) => setNewProducts({ ...newProducts, category: e.target.value })}
                    className='mt-1 block w-full px-3 py-2 text-white bg-gray-700 border 
                     border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                >
                    <option value="">-- Loại sản phẩm --</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className='mt-1 flex items-center'>
                <label 
                    htmlFor="image" 
                    className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300
                                hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-0'
                >
                    <Upload className='h5-w-5 mr-2 inline-block' />
                    Tải ảnh
                </label>
                <input 
                    type="file"
                    id='image' 
                    accept='image/*'
                    required
                    className='sr-only'
                    onChange={handleImage} />
                {newProducts.image && (
                    <span className="ml-3 text-sm font-medium text-gray-400">{image}</span>
                )}
            </div>

            <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium
                         text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                         focus:ring-emerald-500 disabled:opacity-50'
                disabled={loading}         
            >
                {loading ? (
                    <>
                        <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden="true" />
                        Đang tải
                    </>
                ) : (
                    <>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        Thêm sản phẩm
                    </>
                        )}
            </button>
        </form>
    </motion.div>
  )
}

export default FormThemSanPham