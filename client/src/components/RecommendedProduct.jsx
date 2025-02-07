import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from '../lib/axios'
import toast from 'react-hot-toast'
import LoadingSpinner from './LoadingSpinner'
const RecommendedProduct = () => {
  const [recommendation, setRecommendation] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await axios.get('/products/recommendation');
        setRecommendation(response.data);
      } catch (error) {
        toast.error(error.response.data.error || 'Lỗi xuất sản phẩm');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendation();
  }, []);

    if (isLoading) {
      return <LoadingSpinner />
    }

  return (
    <div className='mt-8'>
        <h3 className="text-2xl font-semibold text-emerald-400">
          Có lẽ bạn sẽ thích
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendation.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
    </div>
  )
}

export default RecommendedProduct