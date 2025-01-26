import React, { useState } from 'react'
import { motion } from 'framer-motion'    
import FormDangKy from '../components/FormDangKy'
import { useUserStore } from '../stores/useUserStore'
const DangKy = () => {
  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const { signup, loading } = useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(formData)
  }
  return (
    <div className='flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Tạo tài khoản</h2>
      </motion.div>

      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
      
        <FormDangKy formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} loading={loading} />
      </motion.div>
    </div>
  )
}

export default DangKy