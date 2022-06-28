import {IsNumber, IsString} from "class-validator";

export class MessageDto {
    @IsString()
    body: string

    @IsNumber()
    chatId: number

    @IsNumber()
    toUserId: number

    @IsNumber()
    fromUserId: number
}