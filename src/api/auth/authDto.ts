export type RegisterDto = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}

export type TokenSetDto = {
  accessToken: string
  refreshToken: string
}

export type ForgotPasswordDto = {
  email: string
}

export type ResetPasswordDto = {
  token: string
  password: string
}

export type RefreshTokenDto = {
  refreshToken: string
}
