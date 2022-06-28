import { useQuery } from 'react-query'

import { userService } from '@/services/user.service'

export const useProfileById = (userId?: string | string[]) => {
    const {data: userTo} = useQuery(
        ['get user by id', userId],
        () => userService.getById(String(userId)),
        {
            select: ({ data }) => data,
            enabled: !!userId
        }
    )

    return {userTo}
}
