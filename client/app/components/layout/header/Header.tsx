import {FC} from 'react';
import styles from './Header.module.scss';
import {IHeader} from "@/components/layout/header/header.interface";
import cn from "classnames";

const Header: FC<IHeader> = ({className, ...rest}) => {
    return (
        <header className={cn(styles.header, className)} {...rest}>
            header
        </header>
    );
}

export default Header;