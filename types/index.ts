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
    isNewRoom: boolean
}

export type MessageInput = {
    content: string
    roomId: string | null | undefined
    senderId: string
    receiverId: string
}

export type ContextStateData = {
    userTarget: User | null
    rooms: Array<Room> | null
    chatOpen: boolean
    userChat: User | null
}

export type UserRoom = {
    createdAt: string
    roomId: string
    updatedAt: string
    userId: string
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
    strokeColor: string
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
    UserRoom: UserRoom | null
    createdAt: string
    updatedAt: string
    countUnreadMessages: string
}
