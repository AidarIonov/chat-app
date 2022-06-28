import {FC} from 'react';
import cn from "classnames";
import styles from "./MessageList.module.scss";
import {IMessage} from "@/types/message.interface";
import {useAuth} from "@/hooks/useAuth";


const MessageItem: FC<IMessage> = ({fromUserId, toUserId, body}) => {
    const {user} = useAuth()
    return (
        <li className={cn(styles.message, {
            [styles.message_external]: user?.id !== Number(fromUserId),
            [styles.message_personal]: user?.id === Number(fromUserId),
        })}>
            {body}
        </li>
    );
}

export default MessageItem;