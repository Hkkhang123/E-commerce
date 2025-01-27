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
			toast.error(error.response.data.message || "Lỗi dăng ký tài khoản, vui lòng thử lại sau");
		}
	},

	login: async ( email, password ) => {
		set({ loading: true });

		try {
			const res = await axios.post("/auth/dangnhap", { email, password });
			set({ user: res.data, loading: false });
			toast.success("Đăng nhập thành công")
		} catch (error) {
			set({ loading: false });
			toast.error(error.response.data.message || "Lỗi dăng nhập tài khoản, vui lòng thử lại sau");
		}
	},

	logout: async () => {
		try {
			await axios.post("/auth/dangxuat");
			set({ user: null });
			toast.success("Đăng xuất thành công")
		} catch (error) {
			toast.error(error.response.data.message || "Lỗi đăng xuất tài khoản, vui lòng thử lại sau");
		}
	}
}))
