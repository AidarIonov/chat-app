import {Module} from '@nestjs/common';
import {PrismaModule} from './prisma/prisma.module';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {PassportModule} from "@nestjs/passport";
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({session: true}),
        PrismaModule,
        AuthModule,
        UserModule,
        ChatModule,
        MessageModule,
    ],
})
export class AppModule {
}
