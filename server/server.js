import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import path from "path"

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

const __dirname = path.resolve()

app.use(express.json({limit:"10mb"}))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupons", couponRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/analytics", analyticRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"))
    })
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)

    connectDB()
})