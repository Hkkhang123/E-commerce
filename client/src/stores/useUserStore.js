import {create} from "zustand"
import axios from "../lib/axios"
import {toast} from "react-hot-toast"

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
		set({ loading: true });

		if (password !== confirmPassword) {
			set({ loading: false });
			return toast.error("Mật khẩu không khớp");
		}

		try {
			const res = await axios.post("/auth/dangky", { name, email, password });
			set({ user: res.data, loading: false });
            toast.success("Đăng ký tài khoản thành công");
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message);
		}
	},
}))
