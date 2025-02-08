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
	},

	checkAuth: async () => {
		set({ checkingAuth: true });
		try {
			const res = await axios.get("/auth/profile");
			set ({user: res.data, checkingAuth: false});
		} catch (error) {
			set({ checkingAuth: false, user: null });
			throw error
		}
	},

	refreshToken: async () => {
		if(get().checkingAuth) return

		set({ checkingAuth: true });

		try {
			const res = await axios.post("/auth/refresh-token");
			set ({checkingAuth: false});
			console.log("thanh cong")
			return res.data
		} catch (error) {
			set ({ user: null, checkingAuth: false });
			throw error
		}
	}

}))

let refreshPromise = null

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		if(error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				if(refreshPromise) {
					await refreshPromise
					return axios(originalRequest)
				}

				refreshPromise = useUserStore.getState().refreshToken()
				await refreshPromise
				refreshPromise = null

				return axios(originalRequest)
			} catch (refreshError) {
				useUserStore.getState().logout()
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)
	}	
)
