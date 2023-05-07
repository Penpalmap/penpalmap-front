export type RegisterUserInput = {
    email: string
    name: string
    password: string
}

export type ProfileFormData = {
    birthday: string
    coordinate: Array<number>
    gender: string
}

export type Message = {
    message_id: string
    sender_id: string
    room_id: string
    text: string
    created_at: string
    seen: boolean
}

export type MessageInput = {
    content: string
    roomId: string | null
    senderId: string
    receiverId: string
}
