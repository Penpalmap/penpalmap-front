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

export type Profile = {
    name: string
    description: string
    birthdate: string
    age: number
    images: Array<any>
}

export type Conversation = {
    room_id: string
    members: Array<User>
    lastMessage: any
    countUnreadMessages: number
}

export type User = {
    userId: string
    img_small: string
    name: string
    latitude: number
    longitude: number
}
