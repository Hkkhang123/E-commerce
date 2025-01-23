import { Route, Routes } from "react-router-dom"
import TrangChu from "./pages/TrangChu"
import DangKy from "./pages/DangKy"
import DangNhap from "./pages/DangNhap"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/dangky" element={<DangKy />} />
        <Route path="/dangnhap" element={<DangNhap />} />
      </Routes>
    </div>
  )
}

export default App
