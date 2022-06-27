import type {NextPage} from 'next'
import {useRouter} from "next/router";
import {useAuth} from "@/hooks/useAuth";
import {useEffect} from "react";
import {authService} from "@/services/auth/auth.service";

const Home: NextPage = () => {
    const {user} = useAuth()
    console.log(user)
    return (
        <div>
            home

        </div>
    )
}

export default Home
