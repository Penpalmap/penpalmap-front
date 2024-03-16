export type UpdateUserDto = {
  bio?: string
  blockedUserIds?: string[]
  birthday?: string
  gender?: string
  languageUsed?: string
  latitude?: number
  longitude?: number
  name?: string
  isNewUser?: boolean
  userLanguages?: {
    language: string
    level: string
  }[]
}

export type OrderImagesDto = {
  order: number[]
}

export type UpdatePasswordDto = {
  oldPassword: string
  newPassword: string
}

export type UploadImageDto = {
  position: number
  image: File
}

export type UserImageDto = {
  id: string
  src: string
  position: number
}
