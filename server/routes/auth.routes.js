import express from "express"
import { dangKy, dangNhap, dangXuat, refreshToken } from "../controller/auth.controller.js"

const router = express.Router()

router.post("/dangky", dangKy)
router.post("/dangnhap", dangNhap)
router.post("/dangxuat", dangXuat)
router.post("/refresh-token", refreshToken)
//router.post("/profile",protectRoute, getProfile)

export default router