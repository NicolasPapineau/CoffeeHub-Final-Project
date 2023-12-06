import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import { UserContext } from './UserContext';
import styled from 'styled-components'; 

import 'react-calendar/dist/Calendar.css';

const CoffeeCalendar = () => {
  const { user } = useContext(UserContext);

  if (!user || !user._id) {
    return (
      <div>
        <p>Please log in to access coffee calendar.</p>
      </div>
    );
  }

  const [date, setDate] = useState(new Date());
  const [coffeeData, setCoffeeData] = useState({});
  const [coffeeCount, setCoffeeCount] = useState(0);

  const userId = user._id;

  const handleDateChange = (newDate) => {
    const formattedDate = newDate.toISOString().split('T')[0];
    setDate(newDate);

    const selectedCoffeeData = coffeeData.coffeeConsumption.find(
      (entry) => entry.date.split('T')[0] === formattedDate
    );

    setCoffeeCount(selectedCoffeeData ? selectedCoffeeData.coffeeCount : 0);
  };

  const handleCoffeeCountChange = (e) => {
    setCoffeeCount(e.target.value);
  };

  const handleSubmit = async () => {
    const data = { userId, date, coffeeCount };

    try {
      const response = await fetch('https://coffee-hub-final-server.vercel.app/api/updateCoffeeConsumption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update coffee consumption: ${response.statusText}`);
      }

      await fetchCoffeeData();

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error updating coffee consumption', error);
    }
  };

  useEffect(() => {
    fetchCoffeeData();
  }, [date]);

  const fetchCoffeeData = async () => {
    try {
      const response = await fetch(`https://coffee-hub-final-server.vercel.app/api/getCoffeeConsumption/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch coffee consumption data: ${response.statusText}`);
      }

      const data = await response.json();
      setCoffeeData(data);

      const formattedDate = date.toISOString().split('T')[0];

      const selectedCoffeeData = data.coffeeConsumption.find(
        (entry) => entry.date.split('T')[0] === formattedDate
      );

      setCoffeeCount(selectedCoffeeData ? selectedCoffeeData.coffeeCount : 0);
    } catch (error) {
      console.error('Error fetching coffee consumption data', error);
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
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 240, 0.9);
  width: 80vw;
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
