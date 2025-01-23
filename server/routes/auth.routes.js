import express from "express"
import { dangKy, dangNhap, dangXuat, getProfile, refreshToken } from "../controller/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/dangky", dangKy)
router.post("/dangnhap", dangNhap)
router.post("/dangxuat", dangXuat)
router.post("/refresh-token", refreshToken)
router.get("/profile",protectRoute, getProfile)

export default router