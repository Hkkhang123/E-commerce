import { ArrowRight, Loader, Lock, Mail, User, UserPlus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const FormDangKy = ({ formData, setFormData, handleSubmit, loading }) => {
  return (
    <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Họ và tên
                </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input 
                    id='name' 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                    placeholder="Họ và tên" />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input 
                    id='email' 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                    placeholder="Email" />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Mật khẩu
                </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input 
                    id='password' 
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                    placeholder="********" />
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Xác nhận mật khẩu
                </label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className='h-5 w-5 text-gray-400' aria-hidden="true" />
                </div>
                <input 
                    id='confirmPassword' 
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className='block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400
                    focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                    placeholder="********" />
                </div>
            </div>

            <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50'
                disabled={loading}        
            >
                {loading ? (
                    <>
                        <Loader className='mr-2 h-5 w-5 animate-spin text-white' aria-hidden="true" />
                        Đang tải...
                    </>
                ) : (
                    <>
                        <UserPlus className='mr-2 h-5 w-5 text-white' aria-hidden="true" />
                        Đăng ký
                    </>
                )}
            </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
            Đã có tài khoản ? { " " }
            <Link to="/dangnhap" className="font-medium text-emerald-400 hover:text-emerald-500"> 
            Đăng nhập ngay <ArrowRight className='inline h-4 w-4' /></Link>
        </p>
  </div>
  )
}

export default FormDangKy