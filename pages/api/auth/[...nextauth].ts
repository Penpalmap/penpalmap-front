import axios from 'axios'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getUserByEmail, getUserByGoogleId } from '../../../api/userApi'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const user = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login/credentials`,
                    {
                        email: credentials?.email,
                        password: credentials?.password,
                    }
                )
                if (user) {
                    return user.data.user
                } else {
                    return null
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_ID,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            const userInfos = await getUserByEmail(token.email)
            session.user = userInfos

            return session
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },

        async signIn({ user, account }) {
            try {
                if (account?.provider === 'google') {
                    try {
                        const userGoogleExists = await getUserByGoogleId(
                            user.id
                        )

                        // User already exists, connect directly
                        if (userGoogleExists) {
                            return true
                        } else {
                            const createUser = await axios.post(
                                `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
                                {
                                    email: user.email,
                                    name: user.name,
                                    googleId: user.id,
                                }
                            )

                            // User created
                            if (createUser) {
                                return true
                            }
                        }
                    } catch (error) {
                        console.error('Error while creating user', error)
                        return false
                    }
                }
                return true
            } catch (error) {
                console.error('Error while creating user', error)
                return false
            }
        },
    },
    pages: {
        signIn: '/auth/signin',
        // newUser: '/create-profile',
    },
})
