import {FC} from 'react';

import styles from './MessageList.module.scss';
import cn from "classnames";
import {IMessage} from "@/types/message.interface";
import MessageItem from "@/components/messageList/MessageItem";

interface IMessageList {
    messages: IMessage[]
}

const MessageList: FC<IMessageList> = ({messages}) => {
    return (
        <ul className={styles.list}>
            {messages?.map(item => (
                <MessageItem key={item.id} {...item}/>
            ))}
        </ul>
    );
}

export default MessageList;