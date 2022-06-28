import {IUser} from '@/types/user.interface'

export interface IMessage {
    id: number
    body: string
    fromUserId: IUser
    toUserId: IUser
    chatId: number
    isRead?: boolean
    createdAt: Date
}

export interface IMessageFields {
    body: string
    toUserId: number
    chatId: number
    fromUserId: number
}

export interface IDeleteMessageFields
    extends Pick<IMessageFields, 'chatId'> {
    messageId: string
}

export interface IChat {
    id: number
    messages: IMessage[]
    createdAt: Date
}
