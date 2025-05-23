import {
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import PaginationControl from '@/components/Table/PaginationControl';
import TableBody from '@/components/Table/TableBody';
import TableHead from '@/components/Table/TableHead';
import Filter from "@/components/Table/Filter";

export default function ServerTable({
                                        className,
                                        columns,
                                        data,
                                        header: Header,
                                        isLoading,
                                        meta,
                                        tableState,
                                        setTableState,
                                        omitSort = false,
                                        withFilter = false,
                                        ...rest
                                    }) {
    const table = useReactTable({
        data,
        columns,
        pageCount: meta?.last_page,
        state: {
            ...tableState,
        },
        defaultColumn: {
            minSize: 0,
            size: 0,
        },
        onGlobalFilterChange: setTableState.setGlobalFilter,
        onPaginationChange: setTableState.setPagination,
        onSortingChange: setTableState.setSorting,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
    });

    return (
        <div className={`d-flex flex-column ${className}`} {...rest}>
            <div className="card">
                <div
                    className={`d-flex ${withFilter ? 'justify-content-between' : 'justify-content-end'} mb-3`}>
                    {withFilter && <Filter table={table}/>}
                    <div className="d-flex align-items-center gap-3">
                        {Header}
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="el-table-main w-100">
                        <TableHead table={table} omitSort={omitSort}/>
                        <TableBody table={table} isLoading={isLoading}/>
                    </table>
                </div>
            </div>
            <PaginationControl meta={meta} table={table} data={data} className="mt-4"/>
        </div>
    );
}
