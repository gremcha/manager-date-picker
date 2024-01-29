import { endOfDay, endOfWeek, format, isEqual, startOfDay, startOfMonth, subDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';

import './style.css';
import DayPicker from './Enteties/DaysPicker';
import { ru } from 'date-fns/locale';
import MonthPicker from './MonthPicker';

function getDateString(startDate, endDate, setEndDate, type) {
    if (type === 'm') {
        return format(startDate, 'MMM', { locale: ru });
    } else {
        if (endDate && !isEqual(startDate, endDate)) {
            return `${format(startDate, 'dd MMM', { locale: ru })} - ${format(endDate, 'dd MMM', {
                locale: ru,
            })}`;
        } else {
            console.log('else');
            // setEndDate(startDate);
            return format(startDate, 'dd MMM', { locale: ru });
        }
    }
}

function Main() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [date, setDate] = useState(format(startDate, 'dd MMM', { locale: ru }));

    const [openButtonSheet, setOpenButtonSheet] = useState(false);
    const [currentPick, setCurrentPick] = useState('d');
    useEffect(() => {
        console.log('start', startDate);
    }, [startDate]);

    useEffect(() => {
        console.log('end', endDate);
    }, [endDate]);

    function openDay() {
        const newDate = new Date();
        setStartDate(newDate);
        setEndDate(newDate);
        setDate(() => getDateString(newDate, newDate, setEndDate));
        setCurrentPick('d');
    }

    function openWeek() {
        let newStartDate = new Date();
        let newEndDate = new Date();
        if (endOfWeek(startDate).getDate() > new Date().getDate()) {
            newStartDate = subDays(new Date(), 6);
            newEndDate = new Date();
        } else {
            newStartDate = startOfWeek(startDate);
            newEndDate = endOfWeek(startDate);
        }

        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setDate(() => getDateString(newStartDate, newEndDate, setEndDate));
        setCurrentPick('w');
    }

    function openMonth() {
        const newStartDate = startOfMonth(startDate);
        const newEndDate =
            startDate.getMonth() === new Date().getMonth() ? new Date() : endOfMonth(startDate);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setDate(() => getDateString(newStartDate, newEndDate, setEndDate, 'm'));
        setCurrentPick('m');
    }

    function openModal() {
        setOpenButtonSheet(true);
    }

    return (
        <div className="main">
            <div onClick={openDay} className={currentPick === 'd' ? 'active' : 'no'}>
                День
            </div>
            <div onClick={openWeek} className={currentPick === 'w' ? 'active' : 'no'}>
                Неделя
            </div>
            <div onClick={openMonth} className={currentPick === 'm' ? 'active' : 'no'}>
                Месяц
            </div>
            <div onClick={openModal}>{date}</div>
            <Sheet
                className="sheet"
                isOpen={openButtonSheet}
                onClose={() => {
                    setOpenButtonSheet(false);
                    setDate(getDateString(startDate, endDate, setEndDate, currentPick));
                }}
                initialSnap={0}
                snapPoints={[-50, 100, 0]}
                detent="content-height"
            >
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        {currentPick !== 'm' ? (
                            <DayPicker
                                startDate={startDate}
                                setStartDate={setStartDate}
                                endDate={endDate}
                                setEndDate={setEndDate}
                            />
                        ) : (
                            <MonthPicker
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
