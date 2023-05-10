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
    text: string
    roomId: string | null | undefined
    senderId: string
    receiverId: string
}

export type ContextStateData = {
    userTarget: any
}
