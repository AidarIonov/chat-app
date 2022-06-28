import {ChangeEvent, useState} from "react";
import {useDebounce} from "@/hooks/useDebounce";
import {useQuery} from "react-query";
import {userService} from "@/services/user.service";
import {useAuth} from "@/hooks/useAuth";

export const useSearch = () => {
    const [keyword, setKeyword] = useState<string>('')
    const debouncedSearch = useDebounce(keyword, 500)
    const {user} = useAuth()

    const {data: userList} = useQuery(
        ['search user list', debouncedSearch],
        () =>
            userService.findUsers( {
                search: debouncedSearch ? debouncedSearch : null,
            }),
        {
            select: ({data}) => data.filter(item => item.id !== user?.id),
            // refetchOnMount: false
        }
    )

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value)
    }

    return {handleSearch, keyword, userList}
}