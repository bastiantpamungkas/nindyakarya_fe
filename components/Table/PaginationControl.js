import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import React from 'react';

import clsxm from '@/utils/Libs/clsxm';
import { buildPaginationControl } from '@/utils/Libs/pagination';

import TableOption from "@/components/Table/TableOption";
import Dropdown from 'react-bootstrap/Dropdown';

export default function PaginationControl({
                                              className,
                                              data,
                                              table,
                                              meta,
                                              ...rest
                                          }) {
    const currentPage = table.getState().pagination.pageIndex + 1;
    const pageCount = table.getPageCount();
    const paginationControl = buildPaginationControl(currentPage, pageCount);

    const handlePageControlClick = (page) => {
        if (page !== '...') {
            table.setPageIndex(page - 1);
        }
    };

    return (
        <div
            className={clsxm(
                'd-flex flex-column flex-md-row justify-content-between gap-3 align-items-center',
                className,
            )}
            {...rest}
        >
            <div className="d-flex align-items-center mb-2 mb-md-0">
                <TableOption
                    value={table.getState().pagination.pageSize + " Entries"}
                    meta={meta}
                >
                    {[5, 10, 25, 100, 500, 1000, 10000, 100000, 500000].map((page) => (
                        <Dropdown.Item
                            key={page}
                            onClick={() => table.setPageSize(Number(page))}
                            className="text-p-grey-17 font-size-14 font-weight-500 py-2"
                        >
                            {page} Entries
                        </Dropdown.Item>
                    ))}
                </TableOption>
            </div>
            <div className="pagination-wrap d-flex flex-wrap align-items-center gap-2">
                <div
                    role="button"
                    {...!table.getCanPreviousPage() ? {} : { onClick: () => table.previousPage() }}
                    className={`page-item pagination-prev ${!table.getCanPreviousPage() ? 'disabled' : ''}`}>
                    <ChevronLeft size={16} /> {/* Icon untuk tombol Previous */}
                    <span className="d-none d-md-inline">Previous</span>
                </div>
                <ul className="pagination listjs-pagination mb-0 justify-content-center gap-2">
                    {paginationControl.map((page, index) => (
                        <li key={index} className={page === currentPage ? "active" : ""}>
                            <div
                                key={index}
                                type="button"
                                className='page'
                                onClick={() => handlePageControlClick(page)}>
                                {page}
                            </div>
                        </li>
                    ))}
                </ul>
                <div
                    role="button"
                    className={`page-item pagination-next ${!table.getCanNextPage() || data.length < table.getState().pagination.pageSize ? 'disabled' : ''}`}
                    {...!table.getCanNextPage() || data.length < table.getState().pagination.pageSize ? {} : { onClick: () => table.nextPage() }}>
                    <span className="d-none d-md-inline">Next</span>
                    <ChevronRight size={16} /> {/* Icon untuk tombol Next */}
                </div>
            </div>
        </div>
    );
}
