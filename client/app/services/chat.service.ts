import {IChat} from "@/types/message.interface";
import axios from "../config/api.config";

export const chatService = {
    // async get(chatId: string) {
    //     return axios.get<IChat>(`/chat/${chatId}`)
    // },

    async create(withUserId: number) {
        return axios.post<IChat>(`/chat`, { withUserId })
    }
}