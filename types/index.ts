export type RegisterUserInput = {
    email: string
    name: string
    password: string
}

export type ProfileFormData = {
    birthday: string
    latitude: number
    longitude: number
    gender: string
}

export type Message = {
    id: string
    content: string
    isSeen: boolean
    senderId: string
    sender: User
    roomId: string
    room: Room
    createdAt: string
}

export type MessageInput = {
    content: string
    roomId: string | null | undefined
    senderId: string
    receiverId: string
}

export type ContextStateData = {
    userTarget: User | null
}

export type Conversation = {
    room_id: string
    members: Array<User>
    lastMessage: any
    countUnreadMessages: number
}

export type User = {
    id: string
    email: string
    image: string
    name: string
    latitude: number
    longitude: number
    points: number
    gender: string
    birthday: Date
    bio: string
    userImages: Array<UserImage>
    isNewUser: boolean
}

export type UserImage = {
    src: string
    position: number
    userId: string
    user: User
}

export type Room = {
    id: string
    members: Array<User>
    messages: Array<Message>
}
