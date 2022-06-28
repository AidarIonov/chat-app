import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Param,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { User } from '../user/user.decorator';
import { MessageDto } from './dto/message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createMessage(@User('id') userId: number, @Body() dto: MessageDto) {
		return this.messageService.create(userId, dto);
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteMessage(
		@Param('id') id: string,
		@Query('chatId') chatId: string
	) {
		return this.messageService.delete(+id, +chatId);
	}
}
