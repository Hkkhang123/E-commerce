import express from "express"
import { createProducts, deleteProducts, getAllProducts, getFeaturedProducts, getProductByCat, getRecommendProducts, toggleFeatured } from "../controller/products.controller.js"
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js"
const router = express.Router()

router.get("/", protectRoute, adminRoute, getAllProducts)
router.get("/featured", getFeaturedProducts)
router.get("/category/:category", getProductByCat)
router.get("/recommendation", getRecommendProducts)
router.post("/", protectRoute, adminRoute, createProducts)
router.patch("/:id", protectRoute, adminRoute, toggleFeatured)
router.delete("/:id", protectRoute, adminRoute, deleteProducts)
export default router