import React, { useEffect, useRef, useState } from "react";
import InputGroup from "./InputGroup";
import { DateRange } from "react-date-range";
import moment from "moment";

function InputDateRange({
                            register,
                            error,
                            rules,
                            name,
                            type = "text",
                            required = false,
                            rangesDatePicker,
                            setValue,
                            className,
                            disabled,
                            minDate,
                            value,
                            maxDate = new Date(), // Prevent selecting beyond today
                            defaultDays = null, // Default range in days
                            selectionDays = null, // Fixed range selection in days
                        }) {
    const [rangesDate, setRangesDate] = useState(
        rangesDatePicker || {
            startDate: defaultDays ? moment().subtract(defaultDays, "days").toDate() : new Date(),
            endDate: new Date(),
            key: "selection",
        }
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isStartDateSelected, setIsStartDateSelected] = useState(false); // Track start date selection
    const datePickerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target)
            ) {
                setShowDatePicker(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick, true);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick, true);
        };
    }, [
        datePickerRef,
    ]);

    const handleDateChange = (item) => {
        const startDate = item.selection.startDate;
        const endDate = item.selection.endDate;

        if (!isStartDateSelected) {
            // First click: Start date selected
            setIsStartDateSelected(true);
            setRangesDate([{ ...rangesDate[0], startDate, endDate: startDate }]);
        } else {
            // Second click: End date selected
            const dayDifference = moment(endDate).diff(moment(startDate), "days") + 1;

            if (dayDifference > selectionDays) {
                // Adjust range to fit exactly `selectionDays` starting from endDate
                const adjustedStartDate = moment(endDate)
                    .subtract(selectionDays - 1, "days")
                    .toDate();
                setRangesDate([
                    { startDate: adjustedStartDate, endDate, key: "selection" },
                ]);
                setValue(
                    name,
                    `${moment(adjustedStartDate).format(
                        "DD MMM YYYY"
                    )} - ${moment(endDate).format("DD MMM YYYY")}`
                );
            } else {
                // Valid range or less than `selectionDays`
                setRangesDate([{ startDate, endDate, key: "selection" }]);
                setValue(
                    name,
                    `${moment(startDate).format("DD MMM YYYY")} - ${moment(endDate).format(
                        "DD MMM YYYY"
                    )}`
                );
            }
            // Reset for next selection
            setIsStartDateSelected(false);
        }
    };

    return (
        <div ref={datePickerRef} className="position-relative">
            <InputGroup
                type={type}
                name={name}
                required={required}
                register={register}
                rules={rules}
                className={className}
                error={error}
                onFocus={(e) => {
                    e.preventDefault();
                    e.target.blur();
                    if (!disabled) setShowDatePicker(true);
                }}
                value={value}
                onChange={()=>{}}
                disabled={disabled}
            />
            {showDatePicker && (
                <DateRange
                    className="date_range_custom__input"
                    showDateDisplay={false}
                    moveRangeOnFirstSelection={false}
                    showPreview={false}
                    ranges={rangesDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={handleDateChange}
                />
            )}
        </div>
    );
}

export default InputDateRange;
