import {ChangeEvent, FC, useState} from 'react';
import styles from "@/components/layout/sidebar/Sidebar.module.scss";
import SearchField from "@/components/ui/searchField/SearchField";
import {useDebounce} from "@/hooks/useDebounce";
import {useQuery} from "react-query";
import {userService} from "@/services/user.service";
import {useSearch} from "@/components/layout/sidebar/useSearch";

const Search: FC = (props) => {
    const {keyword, handleSearch} = useSearch()
    return (
        <SearchField className={styles.search} keyword={keyword} handleSearch={handleSearch}/>
    );
}

export default Search;