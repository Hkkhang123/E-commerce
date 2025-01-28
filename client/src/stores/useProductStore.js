import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useProductStore = create((set) => ({
    products: [],
    setProduct: (products) => set({ products }),
    loading: false,
    createProducts: async (productData) => {
        set({ loading: true });
        try {
            const res = await axios.post("/products", productData);
            set((prevState) => ({ 
                products:[...prevState.products, res.data], 
                loading: false, 
            }));
            toast.success("Thêm sản phẩm thành công");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.error || "Lỗi thêm sản phẩm, vui lòng thử lại sau");
        }
    },
}));
