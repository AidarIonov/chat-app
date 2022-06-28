import {FC} from 'react';

import styles from './UserList.module.scss';
import UserItem from "@/components/userList/UserItem";

const UserList: FC = (props) => {
    return (
        <ul className={styles.list}>
        <UserItem/>
        <UserItem/>
        <UserItem/>
        <UserItem/>
        <UserItem/>
        </ul>
    );
}

export default UserList;