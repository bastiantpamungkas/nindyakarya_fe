import queryString from 'query-string';

export const buildPaginatedTableURL = ({
                                           baseUrl,
                                           tableState,
                                           additionalParam,
                                           options,
                                       }) =>
    queryString.stringifyUrl(
        {
            url: baseUrl,
            query: {
                page_size: tableState.pagination.pageSize,
                page: tableState.pagination.pageIndex + 1,
                sort: tableState.sorting.length > 0 ? tableState.sorting[0].id : '',
                type:
                    tableState.sorting.length > 0
                        ? tableState.sorting[0].desc
                            ? 'desc'
                            : 'asc'
                        : '',
                keyword: tableState.globalFilter,
                ...additionalParam,
            },
        },
        {
            arrayFormat: 'comma',
            skipEmptyString: true,
            ...options,
        },
    );
