import {IMessage, IMessageFields} from "@/types/message.interface";
import axios from "../config/api.config";

export const messageService = {
    async create(body: IMessageFields) {
        return axios.post<IMessage>(`/message`, body)
    },

    async delete(msgId: string, chatId: string) {
        return axios.delete(`/message/${msgId}`, {
            params: {
                chatId
            }
        })
    }
}