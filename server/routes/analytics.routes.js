import express from "express"
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js"
import { AnalyticsData } from "../controller/analytics.controller.js"

const router = express.Router()

router.get("/", protectRoute, adminRoute, AnalyticsData)

export default router