import { Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

const GoogleLoginButton = () => {
    return (
        <Button
            onClick={() => {
                signIn('google', { callbackUrl: '/' })
            }}
        >
            Se connecter avec Google
        </Button>
    )
}

export default GoogleLoginButton
