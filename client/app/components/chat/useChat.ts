import {DefaultEventsMap} from '@socket.io/component-emitter'
import {useEffect, useState} from 'react'
import io, {Socket} from 'socket.io-client'

import {
    IChat,
    IDeleteMessageFields,
    IMessageFields
} from '@/types/message.interface'

const SERVER_URL = 'http://localhost:80'

export const useChat = (chatId?: string | string[]) => {
    const [chat, setChat] = useState<IChat>(
        {} as IChat
    )
    const [isConnected, setIsConnected] = useState(false)

    const [socket, setSocket] = useState<Socket<DefaultEventsMap,
        DefaultEventsMap> | null>(null)

    useEffect(() => {
        if (!chatId) return

        const newSocket = io(SERVER_URL, {
            query: {chatId}
        })

        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, [chatId, setSocket])

    useEffect(() => {
        if (!socket) return

        socket.emit('message:get', {chatId})

        socket.on('chat', chat => {
            setChat(chat)
        })


        socket.on('connect', () => {
            socket.emit('joinRoom', {chatId})
        })

        socket.on('joinedRoom', room => {
            setIsConnected(true)
        })
        socket.on('leftRoom', room => {
            setIsConnected(false)
        })

        return () => {
            socket.on('connect', () => {
                socket.emit('leaveRoom', {chatId})
            })
            socket.disconnect()
        }
    }, [chatId, socket])

    const sendMessage = (body: IMessageFields) => {
        socket?.emit('message:add', body)
    }

    const removeMessage = (body: IDeleteMessageFields) => {
        socket?.emit('message:delete', body)
    }

    return {chat, sendMessage, removeMessage, isConnected}
}
