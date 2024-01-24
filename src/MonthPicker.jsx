import { endOfMonth } from 'date-fns';
import React from 'react';

import ReactDatePicker from 'react-datepicker';

function MonthPicker({ startDate, setStartDate, endDate, setEndDate }) {
    function onChange(startDate) {
        setStartDate(startDate);
        if (new Date().getMonth() === startDate.getMonth()) {
            setEndDate(new Date());
        } else {
            setEndDate(endOfMonth(startDate));
        }
    }

    return (
        <div>
            <ReactDatePicker
                selected={startDate}
                onChange={onChange}
                dateFormat="MM/yyyy"
                inline
                showMonthYearPicker
            />
        </div>
    );
}

export default MonthPicker;
