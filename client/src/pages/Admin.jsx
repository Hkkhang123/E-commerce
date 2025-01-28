import { BarChart, PlusCircle, ShoppingBag, ShoppingBasket } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FormThemSanPham from '../components/FormThemSanPham'
import DSSanPham from '../components/DSSanPham'
import ThongKe from '../components/ThongKe'
const Admin = () => {
    const tabs = [
        {id: "create", label: "Thêm sản phẩm", icon: PlusCircle},
        {id: "products", label: "Sản phẩm", icon: ShoppingBasket},
        {id: "analytics", label: "Thống kê", icon: BarChart},
    ]
    const [activeTab, setActiveTab] = useState("create");
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 py-16">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-bold text-emerald-400 mb-8 text-center"
            >
                Admin Dashboard
            </motion.h1>
            <div className="flex justify-center mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                            activeTab === tab.id
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon size={20} className="mr-2 h-5 w-5" />
                        {tab.label}
                    </button>
                ))}
            </div>
            {activeTab === "create" && <FormThemSanPham />}
            {activeTab === "products" && <DSSanPham />}
            {activeTab === "analytics" && <ThongKe />}
        </div>
    </div>
  )
}

export default Admin