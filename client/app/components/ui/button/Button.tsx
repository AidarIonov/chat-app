import {FC} from 'react';
import {IButton} from "@/components/ui/button/button.interface";
import cn from "classnames";
import styles from './Button.module.scss';

const Button: FC<IButton> = ({className, children, ...rest}): JSX.Element => {
    return (
        <button className={cn(styles.common, className)} {...rest}>{children}</button>
    );
}

export default Button;