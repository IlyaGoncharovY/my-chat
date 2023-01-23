let subscribers = [] as subscribersType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers.forEach(el => el(newMessage))
}

function createChannel() {

    ws?.removeEventListener("close", closeHandler)
    ws?.close()

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
}

export const ChatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.close()
    },
    subscribe(callback: subscribersType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(el => el !== callback)
        }
    },
    unsubscribe(callback: subscribersType) {
        subscribers = subscribers.filter(el => el !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}


type subscribersType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    userId: number,
    userName: string,
    message: string,
    photo: string
}