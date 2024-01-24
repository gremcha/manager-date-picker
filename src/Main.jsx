import { format, set, subDays, subMonths } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';

import './style.css';
import DayPicker from './DayPicker';
import { ru } from 'date-fns/locale';

function getDateString(startDate, endDate, setEndDate) {
    if (endDate) {
        return `${format(startDate, 'dd MMM', { locale: ru })} - ${format(endDate, 'dd MMM', {
            locale: ru,
        })}`;
    } else {
        setEndDate(startDate);
        return format(startDate, 'dd MMM', { locale: ru });
    }
}

function Main() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [date, setDate] = useState(format(startDate, 'dd MMM', { locale: ru }));

    const [openButtonSheet, setOpenButtonSheet] = useState(false);
    const [isMonthPick, setIsMonthPick] = useState(false);

    function openDay() {
        setOpenButtonSheet(true);
        setEndDate(startDate);
    }

    function openWeek() {
        setOpenButtonSheet(true);
        setStartDate(subDays(new Date(), 7));
    }

    function openMonth() {
        setOpenButtonSheet(true);
        setIsMonthPick(true);
    }

    return (
        <div className="main">
            <div onClick={openDay}>День</div>
            <div onClick={openWeek}>Неделя</div>
            <div onClick={openMonth}>Месяц</div>
            {date}
            <Sheet
                className="sheet"
                isOpen={openButtonSheet}
                onClose={() => {
                    setOpenButtonSheet(false);
                    setDate(getDateString(startDate, endDate, setEndDate));
                }}
                initialSnap={0}
                snapPoints={[-50, 100, 0]}
                detent="content-height"
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        {!isMonthPick ? (
                            <DayPicker
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                                date={date}
                                setDate={setDate}
                            />
                        ) : (
                            <DayPicker
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                            />
                        )}
                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop />
            </Sheet>
        </div>
    );
}

export default Main;
