import React, { useState } from 'react';
import styled from 'styled-components';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';


const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const generateCalendar = () => {
        const startDate = startOfWeek(startOfMonth(currentMonth));
        const endDate = endOfWeek(endOfMonth(currentMonth));

        const calendar = [];
        let currentDate = startDate;

        while (currentDate <= endDate) {
            const week = Array(7).fill(0).map(() => {
                const day = currentDate;
                currentDate = addDays(currentDate, 1);
                return day;
            });

            calendar.push(week);
        }

        return calendar;
    };

    const handlePrevMonth = () => {
        setCurrentMonth((prevMonth) => addDays(startOfMonth(prevMonth), -1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => addDays(endOfMonth(prevMonth), 1));
    };

    const renderHeader = () => {
        return (
            <CalendarHeader>
                <CalendarButton onClick={handlePrevMonth}>&lt;</CalendarButton>
                <span>{format(currentMonth, 'MMMM yyyy')}</span>
                <CalendarButton onClick={handleNextMonth}>&gt;</CalendarButton>
            </CalendarHeader>
        );
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <DaysOfWeek>
                {daysOfWeek.map(day => (
                    <DayOfWeek key={day}>{day}</DayOfWeek>
                ))}
            </DaysOfWeek>
        );
    };

    const renderCalendarDays = () => {
        const calendar = generateCalendar();

        return (
            <CalendarDays>
                {calendar.map((week, index) => (
                    <Week key={index}>
                        {week.map(day => (
                            <Day
                                key={day}
                                className={`day ${isSameMonth(day, currentMonth) ? 'current-month' : 'other-month'} ${isSameDay(day, new Date()) ? 'today' : ''}`}
                            >
                                {format(day, 'd')}
                            </Day>
                        ))}
                    </Week>
                ))}
            </CalendarDays>
        );
    };

    return (
        <CalendarContainer>
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderCalendarDays()}
        </CalendarContainer>
    );
};

const CalendarContainer = styled.div`
    width: 300px;
    margin: auto;
    font-family: 'Arial', sans-serif;
    background-color: white;
    border: 1px solid black;
    border-radius: 10px;
`;

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    
    
`;

const CalendarButton = styled.button`
    background-color: #ddd;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
`;

const DaysOfWeek = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #eee;
    padding: 10px;
`;

const DayOfWeek = styled.div`
    width: 30px;
    text-align: center;
`;

const CalendarDays = styled.div`
    display: grid;
`;

const Week = styled.div`
    display: flex;    
`;

const Day = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 6.4px;
    cursor: pointer;

    &.current-month {
        background-color: #fff;
    }

    &.other-month {
        color: #999;
    }

    &.today {
        background-color: chocolate;
        color: #fff;
        border-radius: 50%;
    }
`;


export default Calendar;
