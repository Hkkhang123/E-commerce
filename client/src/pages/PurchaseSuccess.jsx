import { ArrowRight, CheckCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
import axios from '../lib/axios'
import Confetti from 'react-confetti'
const PurchaseSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(true)
  const {clearCart} = useCartStore()
  const [error, setError] = useState(null)
  useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				await axios.post("/payments/checkout-success", {
					sessionId,
				});
        console.log("Thanh toán thanh cong")
				clearCart();
			} catch (error) {
				console.log(error);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("No session ID found in the URL");
		}
	}, [clearCart]);

	if (isProcessing) return "Processing...";

	if (error) return `Error: ${error}`;
  return (
    <div className='h-screen flex items-center justify-center px-4'>
        <Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10 ">
          <div className="p-6 sm:p-8">
            <div className="flex justify-center">
              <CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
              Thanh toán thành công
            </h1>

            <p className="text-gray-400 text-center mb-2">
              Cảm ơn bạn vì đã mua hàng =3. {"Chúng tôi"} đang xử lý đơn hàng của bạn
            </p>

            <p className="text-emerald-400 text-center text-sm mb-6">
              Vui lòng kiểm tra email để biết thêm chi tiết đơn hàng và cập nhật
            </p>

            <div className="bg-gray-700 rounded-lg p-4 mb-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Mã đơn hàng</span>
                <span className="text-sm font-semibold text-emerald-400">#12345</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Thời gian giao hàng dự kiến</span>
                <span className="text-sm font-semibold text-emerald-400">3-5 ngày</span>
              </div>

              <div className="space-y-4">
                <button className='w-full bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg
                transition duration-300 flex items-center justify-center'
                >
                  Cảm ơn vì đã tin tưởng chúng tôi
                </button>

                <Link className='w-full bg-gray-600 hover:bg-gray-700 text-emerald-400 font-bold py-2 px-4 rounded-lg
                transition duration-300 flex items-center justify-center'
                to={"/"}
                >
                  Tiếp tục mua sắm
                  <ArrowRight className='ml-2' size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PurchaseSuccess