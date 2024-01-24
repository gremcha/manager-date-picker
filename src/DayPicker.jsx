import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import './style.css';
import { ru } from 'date-fns/locale';

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

export default function DayPicker({ startDate, setStartDate, endDate, setEndDate, date, setDate }) {
    function onChangeDate(dates) {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    let { mondays, sundays } = { mondays: [], sundays: [] };
    useEffect(() => {
        ({ mondays, sundays } = getRoundDay(startDate));
    }, []);
    const changeRounds = (month) => {
        console.log('month', month);
        console.log('mondays', mondays);
        console.log('sundays', sundays);
        if (month) {
            ({ mondays, sundays } = getRoundDay(month));
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
