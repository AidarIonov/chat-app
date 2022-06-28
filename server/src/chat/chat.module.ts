import {Module} from '@nestjs/common';
import {PrismaModule} from "../prisma/prisma.module";
import {ChatService} from './chat.service';
import { ChatController } from './chat.controller';

@Module({
    providers: [ChatService],
    imports: [PrismaModule],
    controllers: [ChatController]
})
export class ChatModule {
}
