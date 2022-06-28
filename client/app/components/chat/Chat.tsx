import {FC} from 'react';

import Image from "next/image";
import Button from "@/components/ui/button/Button";
import MaterialIcon from "@/components/ui/MaterialIcon";
import cn from "classnames";

import styles from './Chat.module.scss';

const Chat: FC = (props) => {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <figure className={styles.avatar}>
                        <Image src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"
                               height={50} width={50} alt={'Avatar'}/>
                    </figure>
                    <div>
                        <h1>Aidar Ionov</h1>
                        <h2>Online</h2>
                    </div>
                </div>
                <div className={styles.messages}>
                    <div className={cn(styles.message, styles.message_external)}>
                        hello
                    </div>
                    <div className={cn(styles.message, styles.message_personal)}>
                        why are u writin to me, asshole?
                        why are u writin to me, asshole?
                        why are u writin to me, asshole?
                    </div>
                    <div className={cn(styles.message, styles.message_external)}>
                        fuck you
                    </div>
                </div>
                <div className={styles.message_box}>
                    <textarea className={styles.message_input} placeholder="Type message..."></textarea>
                    <Button className={styles.message_submit}>
                        <MaterialIcon name='MdMessage'/>
                    </Button>
                </div>

            </div>
        </>
    );
}

export default Chat;