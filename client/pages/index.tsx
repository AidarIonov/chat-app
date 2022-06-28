import type {NextPage} from 'next'
import {useAuth} from "@/hooks/useAuth";
import Auth from "./auth";
import Home from "@/components/screens/home/Home";
import {withLayout} from "@/components/layout/WithLayout";

const HomePage: NextPage = () => {
    const {user} = useAuth()
    console.log(user)

    return (

        user ?
            <div>
                <Home/>

            </div>
            : <Auth/>

    )
}

export default withLayout(HomePage)
