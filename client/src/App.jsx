import { Navigate, Route, Routes } from "react-router-dom"
import TrangChu from "./pages/TrangChu"
import DangKy from "./pages/DangKy"
import DangNhap from "./pages/DangNhap"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"
import LoadingSpinner from "./components/LoadingSpinner"
import Admin from "./pages/Admin"
import Category from "./pages/Category"
import GioHang from "./pages/GioHang"
import { useCartStore } from "./stores/useCartStore"
import PurchaseSuccess from "./pages/PurchaseSuccess"
import PurchaseCancelled from "./pages/PurchaseCancelled"

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore()
  const {getCartItem} = useCartStore()
  useEffect(() => {
    checkAuth()
  },[checkAuth])

  useEffect(() => {
    if(!user) return 
    
    getCartItem()
  },[getCartItem, user])

  if(checkingAuth) return <LoadingSpinner />
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
                          bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]'/>
        </div>
      </div>

      <div className="relative z-50 pt-20">
        <Navbar />

        <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/dangky" element={ !user ? <DangKy /> : <Navigate to='/' />} />
        <Route path="/dangnhap" element={!user ? <DangNhap /> : <Navigate to='/' />} />
        <Route path="/admin-dashboard" element={user?.role === "admin" ? <Admin /> : <Navigate to='/' />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/giohang" element={user ? <GioHang /> : <Navigate to='/dangnhap' />} />
        <Route path="/purchase-success" element={user ? <PurchaseSuccess /> : <Navigate to='/dangnhap' />} />
        <Route path="/purchase-cancelled" element={user ? <PurchaseCancelled /> : <Navigate to='/dangnhap' />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App
