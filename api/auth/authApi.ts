import axios from 'axios'
import {
  ForgotPasswordDto,
  RefreshTokenDto,
  RegisterDto,
  ResetPasswordDto,
  TokenSetDto,
} from './authDto'

const registerUser = async (user: RegisterDto): Promise<TokenSetDto> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    user
  )

  return response.data
}

const reinitializePassword = async (data: ForgotPasswordDto) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
      data
    )
    return response
  } catch (error) {
    return error.response.data
  }
}

const verifyResetPasswordToken = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-token-password?token=${token}`
    )

    return response.data
  } catch (error) {
    return error.response.data
  }
}

const resetPassword = async ({ password, token }: ResetPasswordDto) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
      { token, password }
    )

    return response.data
  } catch (error) {
    return error.response.data
  }
}

const refreshToken = async ({
  refreshToken,
}: RefreshTokenDto): Promise<TokenSetDto> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
      {
        refreshToken,
      }
    )
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export {
  registerUser,
  reinitializePassword,
  verifyResetPasswordToken,
  resetPassword,
  refreshToken,
}
