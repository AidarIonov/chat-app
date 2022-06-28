import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useEffect,
    useState
} from 'react'

import { TypeUser } from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'

export interface IUserContext {
    user: TypeUser
    setUser: Dispatch<SetStateAction<TypeUser>> | null
}

export const AuthContext = createContext<IUserContext>({} as IUserContext)

const AuthProvider: FC<PropsWithChildren<IUserContext>> = ({ children }) => {
    const [user, setUser] = useState<TypeUser>(null)

    const { pathname } = useRouter()

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        if (accessToken) {
            const user = JSON.parse(localStorage.getItem('user') || '')

            setUser(user)
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const accessToken = Cookies.get('accessToken')
        if (!accessToken && !user) {
            authService.logout()
            setUser(null)
        }
    }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
