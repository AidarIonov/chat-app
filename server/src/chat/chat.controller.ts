import {Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post} from '@nestjs/common';
import {ChatService} from "./chat.service";
import {User} from "../user/user.decorator";
import {Auth} from "../auth/auth.decorator";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {
    }

    @HttpCode(200)
    @Post()
    @Auth()
    async createChat(
        @Body('withUserId') withUserId: number,
        @User('id') currentUserId: number
    ) {
        return this.chatService.create(currentUserId, withUserId)
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const doc = await this.chatService.getById(+id)
        if (!doc) throw new NotFoundException('Chat not found!')
        return doc
    }

    @Delete(':id')
    @Auth()
    async deleteById(@Param('id') id: string) {
        return this.chatService.delete(+id)
    }
}
