import React, { useState } from 'react'
import FormDangNhap from '../components/FormDangNhap'
import { motion } from 'framer-motion'
import { useUserStore } from '../stores/useUserStore'
const DangNhap = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading }  = useUserStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
}
  return (
    <div className='flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">Đăng nhập</h2>
      </motion.div>

      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
      
        <FormDangNhap email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit} loading={loading} showPassword={showPassword} setShowPassword={setShowPassword} />
      </motion.div>
    </div>
  )
}

export default DangNhap