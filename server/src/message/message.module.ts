import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {ChatModule} from "../chat/chat.module";
import {MessageGateway} from "./message.gateway";

@Module({
  providers: [MessageService, MessageGateway],
  imports: [PrismaModule, ChatModule],
  controllers: [MessageController]
})
export class MessageModule {}
