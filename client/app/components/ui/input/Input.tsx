import {FC} from 'react';
import cn from 'classnames';

import styles from './Input.module.scss'
import {IInput} from "@/components/ui/input/input.interface";

const Input: FC<IInput> = ({className, type = 'text', placeholder, ...rest}): JSX.Element => {
    return (
        <input type={type} className={cn(styles.field, className)} {...rest}/>
    );
}

export default Input;