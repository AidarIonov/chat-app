import {FC, useState, KeyboardEvent, MouseEventHandler} from 'react';

import Image from "next/image";
import Button from "@/components/ui/button/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import cn from "classnames";

import styles from './Chat.module.scss';
import {useRouter} from "next/router";
import {useProfileById} from "@/hooks/useProfileById";
import {useChat} from "@/components/chat/useChat";
import {useAuth} from "@/hooks/useAuth";
import MessageList from "@/components/messageList/MessageList";

const Chat: FC = (props) => {
    const [message, setMessage] = useState<string>('')
    const {user} = useAuth()
    const {query} = useRouter()
    const {userTo} = useProfileById(query.with)
    const chatId = query.chatId
    const {chat, sendMessage, removeMessage, isConnected} =
        useChat(chatId)


    const addMessageKeyHandler = async (e: any) => {
        if (e.key === 'Enter') {
            sendMessage({
                chatId: Number(chatId),
                body: message,
                fromUserId: Number(user?.id),
                toUserId: Number(userTo?.id)
            })
            setMessage('')
        }
    }
    const addMessageHandler = async () => {
            sendMessage({
                chatId: Number(chatId),
                body: message,
                fromUserId: Number(user?.id),
                toUserId: Number(userTo?.id)
            })
            setMessage('')
    }
    const removeMessageHandler = async (messageId: string) => {
        removeMessage({
            chatId: Number(chatId),
            messageId
        })
    }


    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <figure className={styles.avatar}>
                        <Image src={"https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"}
                               height={50} width={50} alt={'Avatar'}/>
                    </figure>
                    <div>
                        <h1>{userTo?.name}</h1>
                        <h2 className={cn({
                            [styles.offline]: !isConnected
                        })}>{isConnected ? 'Online' : 'Offline'}</h2>
                    </div>
                </div>
                <div className={styles.messages}>
                    <MessageList messages={chat?.messages}/>
                </div>
                <div className={styles.message_box}>
                    <textarea className={styles.message_input}
                              placeholder="Type message..."
                              onChange={e => setMessage(e.target.value)}
                              value={message}
                              onKeyDown={addMessageKeyHandler}/>
                    <Button onClick={addMessageHandler} className={styles.message_submit}>
                        <MaterialIcon name='MdMessage'/>
                    </Button>
                </div>

            </div>
        </>
    );
}

export default Chat;