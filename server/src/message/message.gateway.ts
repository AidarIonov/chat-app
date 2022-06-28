import {Logger} from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit, SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {MessageService} from "./message.service";
import {ChatService} from "../chat/chat.service";
import {MessageDto} from "./dto/message.dto";

@WebSocketGateway(80,{cors: true})
export class MessageGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');

    constructor(private readonly messageService: MessageService,
                private readonly chatService: ChatService) {
    }

    @SubscribeMessage('joinRoom')
    async handleRoomJoin(
        @ConnectedSocket() client: Socket,
        @MessageBody('chatId') chatId: string
    ) {
        client.join(chatId)
        client.emit('joinedRoom', chatId)
        await this.getChat(chatId)
    }

    @SubscribeMessage('message:get')
    async getChat(@MessageBody('chatId') chatId: string) {
        if (!chatId) return

        const chat = await this.chatService.getById(+chatId)

        this.server.to(chatId).emit('chat', chat)
    }

    @SubscribeMessage('message:add')
    async addMessage(@MessageBody() dto: MessageDto) {
        await this.messageService.create(dto.fromUserId, dto)

        await this.getChat(String(dto.chatId))
    }

    @SubscribeMessage('message:delete')
    async deleteMessage(@MessageBody() dto: { messageId: string, chatId: string }) {
        await this.messageService.delete(+dto.messageId, +dto.chatId)

        await this.getChat(dto.chatId)
    }


    @SubscribeMessage('typing')
    async handleTyping(
        @MessageBody('isTyping') isTyping: boolean,
        @ConnectedSocket() client: Socket) {
        const name = await this.messageService.getClientName(client.id);

        client.broadcast.emit('typing', {isTyping, name})
    }

    @SubscribeMessage('leaveRoom')
    handleRoomLeave(
        @ConnectedSocket() client: Socket,
        @MessageBody('chatId') chatId: string
    ) {
        client.leave(chatId)
        client.emit('leftRoom', chatId)
    }


    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
