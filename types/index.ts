export type RegisterUserInput = {
    email: string
    name: string
    password: string
}

export type ProfileFormData = {
    photo: File[]
    birthday: string
    location: Array<number>
    gender: string
}
