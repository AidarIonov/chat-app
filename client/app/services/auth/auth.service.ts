import {IAuthData, removeTokenFromStorage, saveToStorage} from "@/services/auth/auth.helper";
import {axiosClient} from "../../config/api.config";

export const authService = {
    async loginGoogle(code: string) {
        const response = await axiosClient.post<IAuthData>('/auth/login/google', {
            code
        })

        if (response.data.accessToken) saveToStorage(response.data)

        return response.data.user
    },

    logout() {
        removeTokenFromStorage()
        localStorage.removeItem('user')
    }
}