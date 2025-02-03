import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập họ tên"]
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập email"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu"],
        minlength: [6, "Mật khẩu phải dài ít nhất 6 ký tự"]
    },

    cartItem: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            }
        }
    ],
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error)        
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

export default mongoose.model("User", userSchema)

