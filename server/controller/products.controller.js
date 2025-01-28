import cloudinary from "../lib/cloudinary.js"
import { client } from "../lib/redis.js"
import Product from "../model/product.model.js"


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ products })
    } catch (error) {
        res.status({ message: "Lỗi ở getAllProducts controller: ", error: error.message })
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await client.get("featured_products")
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts))
        }

        featuredProducts = await Product.find({isFeatured: true}).lean()

        if (!featuredProducts) {
            return res.status(404).json ({ message: "No featured products found" })
        }

        await client.set("featured_products", JSON.stringify(featuredProducts))

        res.json(featuredProducts)
    } catch (error) {
        res.status(500).json({ message: "Lỗi ở getFeaturedProducts controller: ", error: error.message })
    }
}

export const createProducts = async (req, res) => {
    try {
        const {name, description ,price, image, category} = req.body

        let cloudinaryRes = null
        
        if(image) {
            cloudinaryRes = await cloudinary.uploader.upload(image,{folder: "product"})
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryRes?.secure_url ? cloudinaryRes.secure_url : "",
            category
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ message: "Lỗi createProduct controller: ", error: error.message })
    }
}

export const deleteProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json ({ message: "Product not found" })
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("Done!")
            } catch (error) {
                res.status(500).json({ message: "Lỗi xóa ảnh: ", error: error.message })
            }
        }
        await Product.findByIdAndDelete(req.params.id)
    } catch (error) {
        res.status(500).json({ message: "Lỗi deleteProduct controller: ", error: error.message })
    }
}

export const getRecommendProducts = async (req, res) => {
    try {
        const product = await Product.aggregate([
            {
                $sample: {size:3}
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: "Lỗi recommendProduct controller: ", error: error.message })
    }
}

export const getProductByCat = async (req, res) => {
    const {category} = req.params
    try {
        const product = await Product.find({category})
        res.json(product)
    } catch (error) {
        res.status(500).json({ message: "Lỗi getProductbyCat controller: ", error: error.message })
    }
}

export const toggleFeatured = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            product.isFeatured = !product.isFeatured
            const updateProduct = await product.save()
            await updateFeaturedProductCache()
            res.json(updateProduct)
        } else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi toggleFeatured controller: ", error: error.message })
    }
    async function updateFeaturedProductCache() {
        try {
            const featuredProducts = await Product.find({ isFeatured: true }).lean()
            await client.set ("featured_products", JSON.stringify(featuredProducts))
        } catch (error) {
            console.log("lỗi trong update featured cache")
        }
    }
}