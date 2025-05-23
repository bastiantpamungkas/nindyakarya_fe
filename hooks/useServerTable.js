import {useState} from "react";

export default function useServerTable({
                                           pageSize = 10,
                                           sort,
                                       } = {}) {
    const [globalFilter, setGlobalFilter] = useState('');

    const [sorting, setSorting] = useState(
        sort
            ? [
                {
                    id: sort.key,
                    desc: sort.type === 'desc',
                },
            ]
            : [],
    );

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize,
    });

    return {
        tableState: {
            globalFilter,
            pagination,
            sorting,
        },
        setTableState: {
            setGlobalFilter,
            setPagination,
            setSorting,
        },
    };
}
