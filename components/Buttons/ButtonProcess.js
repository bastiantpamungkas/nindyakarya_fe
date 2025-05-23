import React from "react";
import { Spinner } from "react-bootstrap";

export default function ButtonProcess({
                                          children,
                                          isLoading,
                                          icon,
                                          errors,
                                          className,
                                          ...props
                                      }) {
    return (
        <button
            disabled={
                isLoading || Object.keys(errors ?? []).length > 0 ? true : false
            }
            {...props}
            className={`btn ${className}`}
        >
            {icon ||
                (isLoading && (
                    <span className="me-2">
            {isLoading ? (
                <Spinner animation="border" role="status" size="sm"></Spinner>
            ) : (
                icon ?? ""
            )}
          </span>
                ))}
            {isLoading ? "Memuat..." : children}
        </button>
    );
}
