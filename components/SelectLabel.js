import React, { useState } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { FormGroup } from "react-bootstrap";
function InputLabel({
                        forInput,
                        required,
                        className,
                        value,
                        children,
                        error,
                        ...props
                    }) {
    return (
        <div {...props}>
            <label
                htmlFor={forInput}
                className={`${className} ${
                    error ? "text-p-red" : !className && "text-p-black"
                } mb-2 block font-size-14 font-weight-400`}
            >
                {value ? value : children}
                {required && (
                    <span
                        className="text-p-red font-size-14 font-weight-600"
                        style={{
                            marginLeft: "5px",
                        }}
                    >
            *
          </span>
                )}
            </label>
        </div>
    );
}

export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: "0.5px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "0.3rem 0.3rem",
        fontSize: "14px",
        focus: state.isFocused ? "none" : "none",
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
        color: "#333",
        padding: "10px 16px",
        cursor: "pointer",
        backgroundColor: state.isSelected ? "#F5F5F5" : "#fff",
        borderRadius: "10px",
        "&:hover": {
            backgroundColor: "#F5F5F5",
        },
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "#333",
        border: "none !important",
    }),
    menu: (provided, state) => ({
        ...provided,
        boxShadow: "0px 0px 10px rgba(70, 52, 52, 0.15)",
        borderRadius: "10px",
        zIndex: 100,
    }),
};

function SelectLabel({
                         option,
                         name,
                         placeholder,
                         classNameForm,
                         classInput,
                         label,
                         register,
                         messageError,
                         isLoading,
                         control,
                         rules,
                         getOptionLabel,
                         required,
                         styleControl,
                         classNameLabel,
                         isDisabled,
                     }) {

    return (
        <FormGroup className={`form-group ${classNameForm}`}>
            {/*label*/}
            <InputLabel
                forInput={name}
                className={classNameLabel}
                value={label}
                required={required}
            />
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={option}
                        className={classInput}
                        isDisabled={isDisabled}
                        placeholder={placeholder}
                        isSearchable={true}
                        isLoading={isLoading}
                        isClearable={true}
                        label={label}
                        {...(getOptionLabel && { getOptionLabel })}
                        styles={customStyles}
                    />
                )}
            />
            {messageError && (
                <div
                    className="text-p-red font-size-14 font-weight-500 pt-2 text-sm"
                    style={{ marginLeft: "5px" }}
                >
                    {messageError}
                </div>
            )}
        </FormGroup>
    );
}

export default SelectLabel;
