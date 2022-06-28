import {FC} from 'react';
import {ISidebar} from "@/components/layout/sidebar/sidebar.interface";
import cn from "classnames";
import styles from './Sidebar.module.scss';
import Search from "@/components/ui/search/Search";
import UserList from "@/components/userList/UserList";

const Sidebar: FC<ISidebar> = ({className, ...rest}) => {
    return (
        <aside className={cn(styles.sidebar, className)} {...rest}>
            <Search className={styles.search} keyword='search' handleSearch={() => {}}/>
            <h2>Chats</h2>
            <UserList/>
        </aside>
    );
}

export default Sidebar;