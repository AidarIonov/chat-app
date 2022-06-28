import {FC, PropsWithChildren} from 'react';

import styles from './Layout.module.scss';
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}

export default Layout;