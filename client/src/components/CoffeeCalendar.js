// CoffeeCalendar.js
import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import { UserContext } from './UserContext';
import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';

const CoffeeCalendar = () => {
  const { user } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [coffeeData, setCoffeeData] = useState({});
  const [coffeeCount, setCoffeeCount] = useState(0);

  const userId = user._id;

  const handleDateChange = (newDate) => {
    // Adjusted toISOString() to create a consistent date string for comparison
    const formattedDate = newDate.toISOString().split('T')[0];
    setDate(newDate);

    // Find the coffeeCount for the selected date
    const selectedCoffeeData = coffeeData.coffeeConsumption.find(
      (entry) => entry.date.split('T')[0] === formattedDate
    );

    // Set the coffeeCount to 0 if the date is not found
    setCoffeeCount(selectedCoffeeData ? selectedCoffeeData.coffeeCount : 0);
  };

  const handleCoffeeCountChange = (e) => {
    setCoffeeCount(e.target.value);
  };

  const handleSubmit = async () => {
    // Assuming you have the userId, date, and coffeeCount available
    const data = { userId, date, coffeeCount };

    try {
      const response = await fetch('/api/updateCoffeeConsumption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update coffee consumption: ${response.statusText}`);
      }

      // Refresh coffee data after update
      await fetchCoffeeData();

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error updating coffee consumption', error);
    }
  };

  useEffect(() => {
    // Fetch coffee consumption data when the component mounts or when the date changes
    fetchCoffeeData();
  }, [date]);

  const fetchCoffeeData = async () => {
    try {
      const response = await fetch(`/api/getCoffeeConsumption/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch coffee consumption data: ${response.statusText}`);
      }

      const data = await response.json();
      setCoffeeData(data);

      // Adjusted toISOString() to create a consistent date string for comparison
      const formattedDate = date.toISOString().split('T')[0];

      // Find the coffeeCount for the current date
      const selectedCoffeeData = data.coffeeConsumption.find(
        (entry) => entry.date.split('T')[0] === formattedDate
      );

      // Set the coffeeCount to 0 if the date is not found
      setCoffeeCount(selectedCoffeeData ? selectedCoffeeData.coffeeCount : 0);
    } catch (error) {
      console.error('Error fetching coffee consumption data', error);
      // Handle error
    }
  };


  return (
    <Card>
    <CalendarCard>
      <h2>Coffee Calendar</h2>

      <Calendar value={date} onChange={handleDateChange} />
      <Input>
        <label>Coffees Drank:</label>
        <input type="number" value={coffeeCount} onChange={handleCoffeeCountChange} />
        <button onClick={handleSubmit}>Submit</button>
      </Input>
      <div>
        <p>
        On {date.toDateString()}, you drank {coffeeCount} ☕(s). 
        </p>
      </div>
    </CalendarCard>
    </Card>
  );
};

const Input = styled.div`
margin-top: 20px;
display: flex;
width: 380px;
justify-content: space-around;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CalendarCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 240, 0.5);
  width: 80vw;
  border-radius: 30px;
  margin-right: 30px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  h2 {
    font-size: 2em;
  }
  p {
    font-size: 1.25em;
  }
  label {
    font-size: 1.25em;
  }
  button {
    font-size: 1em;
  }
`;


export default CoffeeCalendar;
