import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CoffeeIcon from "@mui/icons-material/Coffee";
import Config from './Config';


const RandomCoffee = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchRandomCoffeeImage = async () => {
      try {
        const response = await fetch('${config.Url}/api/randomCoffee');

        if (!response.ok) {
          throw new Error(`Failed to fetch random coffee image: ${response.statusText}`);
        }

        const data = await response.json();
        setImageUrl(data.imageUrl);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching random coffee image', error);
        setError('An error occurred while fetching the random coffee image. Please try again later.');
        setLoading(false);
      }
    };

    fetchRandomCoffeeImage();
  }, []);

  return (
    <Container>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : imageUrl ? (
        <CoffeeImage src={imageUrl} alt="Random Coffee" />
      ) : (
        <p>No image available.</p>
      )}
      <Intro>
        <div>
        <h1>Welcome to</h1>
        <Title> CoffeHub</Title>
        </div>
        <h2>
          CoffeeHub is a website for coffee lovers. Here, you can view,
          share and favorite great coffee recipes. You can even track your
          coffee consumption using our calendar feature!
            </h2>
      </Intro>
    </Container>
  );
};

const Title = styled.h1`
  font-family: monospace,Arial, Helvetica, sans-serif;
  font-size: 2.8em;
  
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  max-width:1000px;
  background-color: rgba(255, 255, 240, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  h2 {
    padding-left: 40px;
    padding-right: 40px;
  }
  h1{
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin:0;
  width:100vw;
  /* flex-wrap: wrap; */
`;

const CoffeeImage = styled.img`
  max-height: 400px;
  margin-top: 20px;
  padding-left: 40px;
  margin: 0;
  
`;

export default RandomCoffee;
