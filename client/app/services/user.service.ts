import axios from "../config/api.config";
import {IUser} from "@/types/user.interface";

export const userService = {
    async findUsers(params?: object) {
        return axios.get<IUser[]>('/users', {params})
    },

    async getProfile() {
        return axios.get<IUser>('/users/profile')
    },

    async updateProfile() {
        return axios.patch<IUser>('/users/profile')
    },

    async getById(id: string) {
        return axios.get<IUser>(`/users/${id}`)
    },


}