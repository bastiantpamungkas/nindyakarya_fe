import { Search, XCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const DEBOUNCE_MS = 300;

export default function Filter({ className, table, ...rest }) {
    const [filter, setFilter] = useState('');

    const handleClearFilter = () => {
        table.setGlobalFilter('');
        setFilter('');
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            table.setGlobalFilter(filter);
        }, DEBOUNCE_MS);
        return () => clearTimeout(timeout);
    }, [filter, table]);

    return (
        <div className={`position-relative ${className}`} {...rest} style={{ maxWidth: '400px' }}>
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
                <Search className="text-muted" />
            </div>
            <input
                type="text"
                value={filter ?? ''}
                onChange={(e) => {
                    setFilter(String(e.target.value));
                }}
                className="form-control ps-5 pe-4"
                placeholder="Search Data"
                style={{
                    height: '45px', // Set the height for a rounded and compact look
                    paddingLeft: '2.5rem', // Add padding to fit the search icon
                }}
            />
            {table.getState().globalFilter !== '' && (
                <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                    <button type="button" onClick={handleClearFilter} className="btn p-0 border-0 bg-transparent">
                        <XCircle className="text-muted" />
                    </button>
                </div>
            )}
        </div>
    );
}
