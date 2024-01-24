import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import './style.css';

function getRoundDay(date) {
    const mondays = [];
    const sundays = [];

    for (var d = startOfMonth(date); d <= endOfMonth(date); d.setDate(d.getDate() + 1)) {
        if (d.getDay() === 1) {
            mondays.push(d.getDate().toString().padStart(3, '0'));
        } else if (d.getDay() === 0) {
            sundays.push(d.getDate().toString().padStart(3, '0'));
        }
    }

    return { mondays, sundays };
}

export default function DayPicker({ startDate, setStartDate, endDate, setEndDate }) {
    function onChangeDate(dates) {
        console.log('onChangeDates');
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }
    const [mondays, setMondays] = useState([]);
    const [sundays, setSundays] = useState([]);
    useEffect(() => {
        const { mondays, sundays } = getRoundDay(startDate);
        setMondays(mondays);
        setSundays(sundays);
    }, []);

    const changeRounds = (month) => {
        if (month) {
            const { mondays, sundays } = getRoundDay(month);
            setMondays(mondays);
            setSundays(sundays);
        }
        mondays.forEach((n) => {
            const elem = document.getElementsByClassName(`react-datepicker__day--${n}`)[0];
            elem?.classList.add('monday');
        });
        sundays.forEach((n) => {
            const elem = document.getElementsByClassName(`react-datepicker__day--${n}`)[0];
            elem?.classList.add('sunday');
        });
    };

    useEffect(changeRounds, [endDate]);

    return (
        <div>
            <ReactDatePicker
                focusSelectedMonth={false}
                selected={startDate}
                onChange={onChangeDate}
                startDate={startDate}
                endDate={endDate}
                monthsShown={1}
                inline
                onMonthChange={changeRounds}
                showMonthDropdown
                selectsRange
                showDisabledMonthNavigation
                calendarStartDay={1}
            />
        </div>
    );
}
