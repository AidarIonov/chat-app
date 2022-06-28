import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [MessageService],
  imports: [PrismaModule],
  controllers: [MessageController]
})
export class MessageModule {}
