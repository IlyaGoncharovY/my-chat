import {statusType} from "../bll/reducers/chat-reducer";

let subscribers = {
    "message-received": [] as messagesSubscriberType[],
    "status-changed": [] as statusSubscribersType[]
}

let ws: WebSocket | null = null
type eventNamesType = "message-received" | "status-changed"


const closeHandler = () => {
    subscribersAboutStatus("pending")
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers["message-received"].forEach(el => el(newMessage))
}

const openHandler = () => {
    subscribersAboutStatus("ready")
}

const errorHandler = () => {
    subscribersAboutStatus("error")
    console.log("restart page!")
}

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.addEventListener("message", messageHandler)
    ws?.addEventListener("open", openHandler)
    ws?.addEventListener("error", errorHandler)
}

const subscribersAboutStatus = (status: statusType) => {
    subscribers["status-changed"].forEach(el => el(status))
}

function createChannel() {

    cleanUp()
    ws?.close()

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    subscribersAboutStatus("pending")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", openHandler)
    ws.addEventListener("error", errorHandler)
}

export const ChatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["message-received"] = []
        subscribers["status-changed"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: eventNamesType, callback: messagesSubscriberType | statusSubscribersType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
        }
    },
    unsubscribe(eventName: eventNamesType, callback: messagesSubscriberType | statusSubscribersType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(el => el !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}


type messagesSubscriberType = (messages: ChatMessageTypeAPI[]) => void
type statusSubscribersType = (status: statusType) => void

export type ChatMessageTypeAPI = {
    userId: number,
    userName: string,
    message: string,
    photo: string
}