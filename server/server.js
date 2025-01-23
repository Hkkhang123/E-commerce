import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from  "./routes/auth.routes.js"
import cartRoutes from  "./routes/cart.routes.js"
import productRoutes from "./routes/products.routes.js"
import couponRoutes from "./routes/coupons.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import analyticRoutes from "./routes/analytics.routes.js"

import { connectDB } from "./lib/db.js"

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/analytics", analyticRoutes)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)

    connectDB()
})