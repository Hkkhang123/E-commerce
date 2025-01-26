import User from "../model/user.model.js"
import jwt from "jsonwebtoken"
import { client } from "../lib/redis.js"
const generateToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_JWT_SECRET, {
        expiresIn: "15m",
    })
    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: "7d",
    })

    return { accessToken, refreshToken }
}

const storeRefreshToken = async(userId, refreshToken) => {
    await client.set(`refresh_token: ${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60)
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, //prevent XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export const dangKy = async (req, res) => {
    try {
        const { email, password, name } = req.body
        const userExist = await User.findOne({ email })

    if (userExist) {
        return res.status(400).json({ message: "User đã tồn tại" })
    }
    const user = await User.create({ name, email, password })

    const { accessToken, refreshToken } = generateToken(user._id)
    await  storeRefreshToken(user._id, refreshToken)

    setCookies(res, accessToken, refreshToken)

    res.status(201).json({
        message: "Success"
    })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const dangNhap = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateToken(user._id)
            await storeRefreshToken(user._id, refreshToken)
            setCookies(res, accessToken, refreshToken)

            res.json({
                message: "Success"
            })
        } else {
            res.status(401).json ({message: "Invalid email or Password"})
        }
    } catch (error) {
        res.status(500).json({ message: "Lỗi đăng nhập controller", error: error.message })
    }
}
export const dangXuat = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (refreshToken) {
            const decode = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET)
            await client.del(`refresh_token: ${decode.userId}`)
        }
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.json({message: "Đăng xuất thành công" })
    } catch (error) {
        res.status(500).json({message: "Lỗi dang xuat controller", error: error.message})
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({ message: "Không có token" })
        }

        const decode = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET)
        const storeToken = await client.get(`refresh_token: ${decode.userId}`)

        if (storeToken !== refreshToken) {
            res.status(401).json({ message: "Sai refresh token" })
        }
        const accessToken = jwt.sign ({ userId: decode.userId }, process.env.ACCESS_JWT_SECRET, { expiresIn: "15m" })

        res.cookie("accessToken", accessToken, {
            httpOnly: true, //prevent XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        })
        res.json({ message: "refresh thanh cong" })
    } catch (error) {
        res.status(500).json({ message: "Lỗi refreshToken controller:", error: error.message })
    }
}

export const getProfile = async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        res.status(500).json({ message: "Lỗi getProfile controller:", error: error.message })
    }
}