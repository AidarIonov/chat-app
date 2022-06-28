import {ChangeEvent, FC} from 'react';

import styles from './Search.module.scss'
import MaterialIcon from "@/components/ui/MaterialIcon";
import Input from "@/components/ui/input/Input";
import cn from "classnames";

interface ISearchField {
    keyword: string
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

const SearchField: FC<ISearchField> = ({keyword, handleSearch, className, ...rest}): JSX.Element => {
    return (
        <div className={cn(styles.field, className)} {...rest}>
            <MaterialIcon name='MdSearch'/>
            <input
                type="text"
                placeholder="Search"
                onChange={handleSearch}
                value={keyword}/>
        </div>
    );
}

export default SearchField;