import express from "express"
import { addToCart, getCart, removeAllFromCart, updateQuantity } from "../controller/cart.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", protectRoute, getCart)
router.post("/",protectRoute, addToCart)
router.delete("/", protectRoute, removeAllFromCart)
router.put("/:id", protectRoute, updateQuantity)


export default router