import {FC} from 'react';

import styles from './UserList.module.scss';
import UserItem from "@/components/userList/UserItem";
import {IUser} from "@/types/user.interface";

interface IUserList {
    users: IUser[] | undefined
}

const UserList: FC<IUserList> = ({users}) => {
    return (
        <ul className={styles.list}>
            {users?.map(item => (
                <UserItem key={item.id} {...item}/>
            ))}
        </ul>
    );
}

export default UserList;