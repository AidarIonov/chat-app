import {FC} from 'react';
import Image from "next/image";

import avatar from '../../assets/img/avatar.png'
import styles from './UserList.module.scss';
const UserItem: FC = (props) => {
    return (
        <li>
            <Image src={avatar} width={50} height={50}/>
            <div className={styles.info}>
            <span>
            Aidar Ionov
            </span>
                hello! u good?
            </div>
        </li>
    );
}

export default UserItem;