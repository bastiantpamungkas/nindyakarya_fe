"use client";
import React, { useEffect, useRef } from "react";
import InputError from "./InputError";
import { FormGroup } from "react-bootstrap";

export default function InputGroup({
                                       error = "",
                                       type = "text",
                                       register,
                                       rules,
                                       isFocused = false,
                                       label,
                                       className = "",
                                       ...props
                                   }) {
    const inputRef = useRef();
    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <>
            <FormGroup>
                <div className={
                    // clsx(error && "is-invalid", "form-input")
                    error ? "is-invalid form-input" : "form-input"
                }>
                    <input
                        ref={inputRef}
                        type={type}
                        className={`form-control ${className} ${error && 'is-invalid'} font-size-14 w-100`}
                        {...props}
                        {...(register && register(props.name, rules))}
                    />
                </div>
                {error && <InputError message={error} />}
            </FormGroup>
        </>
    );
}
