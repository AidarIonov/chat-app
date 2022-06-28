import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: number) {
		return this.prisma.chat.findUnique({
			where: { id },
			include: { messages: true },
		});
	}

	async create(currentUserId: number, withUserId: number) {
		console.log('currentUserId>>', currentUserId, 'withUserId>>', withUserId)
		let message = await this.prisma.message.findFirst({
			where: {
				fromUserId: currentUserId,
				toUserId: withUserId,
			},
		});
		if (!message) {
			message = await this.prisma.message.findFirst({
				where: {
					toUserId: currentUserId,
					fromUserId: withUserId,
				},
			});
		}
		if (message) {
			return this.prisma.chat.findFirst({
				where: {
					messages: {
						some: {
							id: message.id,
						},
					},
				},
				include: {
					messages: true,
				},
			});
		}
		return this.prisma.chat.create({
			data: {
				messages: {
					create: [],
				},
			},
			include: {
				messages: true,
			},
		});
	}

	async delete(chatId: number) {
		return this.prisma.chat.deleteMany({ where: { id: chatId } });
	}
}
