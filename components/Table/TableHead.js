import { flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import React from 'react';

export default function TableHead({
                                      className,
                                      omitSort,
                                      table,
                                      ...rest
                                  }) {
    return (
        <thead
            className={`border-bottom ${className}`}
            {...rest}
        >
        {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th
                        key={header.id}
                        scope="col"
                        style={{
                            // #979CA8
                            color: '#979CA8',
                            padding: '0.60rem 0.80rem'
                        }}
                        className={`text-start font-weight-500 text-capitalize`}
                    >
                        {header.isPlaceholder ? null : (
                            <div
                                className={`d-flex align-items-center gap-2 py-1 ${!omitSort && header.column.getCanSort() ? 'cursor-pointer' : ''}`}
                                style={{ cursor: (!omitSort && header.column.getCanSort()) ? 'pointer' : "default" }}
                                onClick={
                                    omitSort
                                        ? () => null
                                        : header.column.getToggleSortingHandler()
                                }
                            >
                                <p className="m-0">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </p>
                                {!omitSort &&
                                header.column.getCanSort() &&
                                !header.column.getIsSorted() ? (
                                    <ChevronsUpDown className="text-start"/>
                                ) : (
                                    {
                                        asc: (
                                            <ChevronUp className="text-start"/>
                                        ),
                                        desc: <ChevronDown className="text-start"/>,
                                    }[header.column.getIsSorted()] ?? null
                                )}
                            </div>
                        )}
                    </th>
                ))}
            </tr>
        ))}
        </thead>
    );
}
