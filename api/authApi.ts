import axios from '../utils/axios'
import { RegisterUserInput } from '../types'

const registerUser = async (user: RegisterUserInput): Promise<any> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
            user
        )

        return response.data
    } catch (error) {
        return { error: error }
    }
}

const checkAuthStatus = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/success`,
            {
                withCredentials: true,
            }
        )
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const logoutUser = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
            {
                withCredentials: true,
            }
        )
        return response.data
    } catch (error) {
        return error.response.data
    }
}

const reinitializePassword = async (email: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
            { email }
        )
        return response.data
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

const resetPassword = async (token: string, password: string) => {
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

export {
    registerUser,
    checkAuthStatus,
    logoutUser,
    reinitializePassword,
    verifyResetPasswordToken,
    resetPassword,
}
