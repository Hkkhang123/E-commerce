import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { checkOutSuccess, createCheckoutSession } from "../controller/payment.controller.js"

const router = express.Router()

router.post("/create-checkout-session",protectRoute, createCheckoutSession)
router.post("/checkout-success", protectRoute, checkOutSuccess)

export default router