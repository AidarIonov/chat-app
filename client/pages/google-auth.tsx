import {FC, useEffect} from 'react';
import {useRouter} from "next/router";
import {useMutation} from "react-query";
import {useAuth} from "@/hooks/useAuth";
import {authService} from "@/services/auth/auth.service";

const GoogleAuth: FC = (props) => {
    const {setUser, user} = useAuth()
    const {query, push} = useRouter()
    const code = query?.code

    const {mutate} = useMutation(
        'send code token',
        (code: string) => authService.loginGoogle(code),
        {
            async onSuccess(user) {
                setUser && setUser(user)
                await push('/')
            },
        }
    )
    useEffect(() => {
        if (code) mutate(String(code))
    }, [code, mutate])
    return (
        <div>GoogleAuth</div>
    );
}

export default GoogleAuth;