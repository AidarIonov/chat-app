import {FC, useEffect} from 'react';
import {authService} from "@/services/auth/auth.service";
import {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";

const Auth: FC = (props) => {
    const {user} = useAuth()
    const {push} = useRouter()
    useEffect(() => {
        if (user) push('/').then((r) => r)
    }, [])
    return (
        <>
            <button
                onClick={() => push(`https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgoogle-auth&scope=email%20profile&client_id=${process.env.GOOGLE_CLIENT_ID}&flowName=GeneralOAuthFlow`)}>Log
                in
            </button>
            <button onClick={() => authService.logout()}>
                logout
            </button>
        </>
    );
}

export default Auth;