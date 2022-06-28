import {FC} from 'react';
import Image from "next/image";

import avatar from '../../assets/img/avatar.png'
import styles from './UserList.module.scss';
import {IUser} from "@/types/user.interface";
import {useRouter} from "next/router";
import cn from "classnames";
import {chatService} from "@/services/chat.service";
import {useMutation} from "react-query";
import {useProfileById} from "@/hooks/useProfileById";

const UserItem: FC<IUser> = ({avatarPath, name, email, id}) => {
    const {push, query} = useRouter()

    const {userTo: profile} = useProfileById(String(id))

    const { mutate: createChat } = useMutation(
        'create chat',
        () => chatService.create(Number(id)),
        {
            onSuccess: async ({ data }) => {
                await push(`/chat/${data.id}?with=${id}`)
            }
        }
    )

    return (
        <li onClick={() => createChat()} className={cn({
            [styles.active]: String(id) === query.with
        })}>
            <Image src={avatarPath} width={50} height={50} alt='User image'/>
            <div className={styles.info}>
            <span>
            {name}
            </span>
                hello! u good?
            </div>
        </li>
    );
}

export default UserItem;