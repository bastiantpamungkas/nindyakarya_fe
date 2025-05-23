import { flexRender } from '@tanstack/react-table';
import React from 'react';

import clsxm from '@/utils/Libs/clsxm';

export default function TableBody({
                                  className,
                                  isLoading = false,
                                  table,
                                  ...rest
                              }) {
    const rows = table.getRowModel().rows;

    return (
        <tbody
            className={clsxm('divide-y divide-typo-divider', className)}
            {...rest}
        >
        {isLoading && (
            <tr className='animate-pulse bg-gray-50'>
                <td
                    colSpan={table.getAllColumns().length}
                    className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700'
                >
                    <span>Memuat data...</span>
                </td>
            </tr>
        )}
        {rows.length === 0 && !isLoading ? (
            <tr className='bg-gray-50'>
                <td
                    colSpan={table.getAllColumns().length}
                    className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700'
                >
                    <span>Data tidak ditemukan</span>
                </td>
            </tr>
        ) : (
            rows.map((row, index) => (
                <tr
                    key={row.id}
                >
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            className={clsxm([
                                'whitespace-nowrap',
                                'truncate'
                            ])}
                            title={String(cell.getValue())}
                            style={{
                                width:
                                    cell.column.getSize() !== 0
                                        ? cell.column.getSize()
                                        : undefined,
                                maxWidth:
                                    cell.column.getSize() !== 0
                                        ? cell.column.getSize()
                                        : undefined,
                                color: '#364A61',
                                padding: '0.75rem 1rem',
                            }}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))
        )}
        </tbody>
    );
}
