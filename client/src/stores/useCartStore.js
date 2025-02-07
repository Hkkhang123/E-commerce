import {create} from "zustand"
import axios from "../lib/axios"
import {toast} from "react-hot-toast"
export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    getCartItem: async () => {
        try {
            const res = await axios.get("/cart")
            set({cart: res.data})
            get().caculateTotal()
        } catch (error) {
            set({cart: []})
            toast.error(error.response.data.message || "Đã xảy ra lỗi")
        }
    },

    addToCart: async (product) => {
        try {
            await axios.post("/cart", {productId: product._id})
            toast.success("Đã thêm vào giỏ hàng")

            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id)
                const newCart = existingItem ? prevState.cart.map((item) => (item._id === product._id ? {...item, quantity: item.quantity + 1} : item)) : [...prevState.cart, {...product, quantity: 1}]
                return {cart: newCart}
            })
            get().caculateTotal()
        } catch (error) {
            toast.error(error.response.data.error || "Đã xảy ra lỗi")
        }
    },

    caculateTotal: () => {
        const {cart, coupon} = get()
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
        let total = subtotal

        if(coupon) {
            const discount = subtotal * (coupon.discountPercentage / 100)
            total = subtotal - discount
        }

        set({total, subtotal})
    },
    
    removeItem: async (productId) => {
        await axios.delete('/cart', {data: {productId}})
        set((prevState) => ({
            cart: prevState.cart.filter(item => item._id !== productId)
            
        }))
        get().caculateTotal()
    },

    updateQuantity: async (productId, quantity) => {
        if(quantity === 0) {
            get().removeItem(productId)
            return
        }
        
        await axios.put(`/cart/${productId}`, {quantity})
        set((prevState) => ({
            cart: prevState.cart.map(item => item._id === productId ? {...item, quantity} : item)
        }))
        get().caculateTotal()
    },
    clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
        try {
            await axios.delete("/cart");
          } catch (error) {
            console.log(error);
          }
	},
    getMyCoupon: async () => {
        try {
            const res = await axios.get("/coupons")
            set({coupon: res.data})
        } catch (error) {
            console.log("Error fetching coupon:", error)
        }
    },

    applyCoupon: async (code) => {
        try {
            const res = await axios.post("/coupons/validate", {code})
            set({coupon: res.data, isCouponApplied: true})
            get().caculateTotal()
            toast.success("Đã áp dụng mã giảm giá")
        } catch (error) {
            console.log("Error applying coupon:", error)
        }
    },
    removeCoupon: () => {
        set({coupon: null, isCouponApplied: false})
        get().caculateTotal()
        toast.success("Đã gỡ mã giảm giá")
    }
}))