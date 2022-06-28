import {FC} from 'react';
import {ISidebar} from "@/components/layout/sidebar/sidebar.interface";
import cn from "classnames";
import styles from './Sidebar.module.scss';
import UserList from "@/components/userList/UserList";
import {useQuery} from "react-query";
import {userService} from "@/services/user.service";
import Search from "@/components/layout/sidebar/Search";
import {useSearch} from "@/components/layout/sidebar/useSearch";

const Sidebar: FC<ISidebar> = ({className, ...rest}) => {
    const {userList} = useSearch()
    return (
        <aside className={cn(styles.sidebar, className)} {...rest}>
            <Search/>
            <h2>Chats</h2>
            <UserList users={userList}/>
        </aside>
    );
}

export default Sidebar;