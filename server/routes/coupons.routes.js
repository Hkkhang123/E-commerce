import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getCoupons, validateCoupon } from "../controller/coupons.controller.js"

const router = express.Router()

router.get("/", protectRoute, getCoupons)
router.post("/validate", protectRoute, validateCoupon)

export default router