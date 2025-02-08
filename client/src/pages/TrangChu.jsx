import React, { useEffect } from 'react'
import CategoryItem from '../components/CategoryItem';
import { useProductStore } from '../stores/useProductStore';
import FeaturedProduct from '../components/FeaturedProduct';

const categories = [
	{ href: "/Jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/Tshirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/Giày", name: "Giày", imageUrl: "/shoes.jpg" },
	{ href: "/Kính-mát", name: "Kính mát", imageUrl: "/glasses.png" },
	{ href: "/Jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/Suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/Bags", name: "Balo", imageUrl: "/bags.jpg" },
];
const TrangChu = () => {
  const { fetchFeaturedProducts, products, loading} = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts])
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Khám phá sản phẩm của chúng tôi 
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Khám phá những xu hướng mới nhất 
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!loading && products.length > 0 && (
          <FeaturedProduct featuredProduct={products} />
        )}
      </div>
    </div>
  )
}

export default TrangChu