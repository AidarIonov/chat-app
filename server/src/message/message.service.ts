import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {MessageDto} from "./dto/message.dto";

@Injectable()
export class MessageService {
    constructor(private readonly prisma: PrismaService) {
    }


    async create(userId: number, dto: MessageDto) {
        const {chatId, toUserId, body} = dto

        const newMessage = await this.prisma.message.create({
            data: {
                chatId,
                fromUserId: userId,
                toUserId,
                body
            }
        })

        let chat = await this.prisma.chat.findUnique({where: {id: chatId}, include: {messages: true}})
        if (!chat) throw new NotFoundException('Chat not found')

        const messageIds = chat.messages.map(msg => ({id: msg.id}))
        const messages = [...messageIds, {id: newMessage.id}].map(m => ({...m}))

        return this.prisma.chat.update({
                where: {id: chatId},
                data: {
                    messages: {
                        set: messages
                    },
                },
                include: {messages: true}
            },
        )
    }

    async delete(messageId: number, chatId: number) {
        await this.prisma.message.deleteMany({where: {id: messageId}})

        let chat = await this.prisma.chat.findUnique({where: {id: chatId}, include: {messages: true}})

        if (!chat) throw new NotFoundException('Диалог не найден!')

        const messages = chat.messages.filter(
            (msgId) => msgId.id !== messageId
        ).map(m => ({id: m.id}))
         .map(m => ({...m}))

        return this.prisma.chat.update({
            where: {id: chatId},
            data: {
                messages: {
                    set: messages
                }
            },
            include: {messages: true}
        })
    }

}
