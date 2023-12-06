import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from './UserContext';
import styled from 'styled-components';
import CircularProgress from "@material-ui/core/CircularProgress";


const Favorites = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.favorites || user.favorites.length === 0) {
      setLoading(false);
      return;
    }

    fetch(`https://coffee-hub-final-server.vercel.app/api/recipes/favorites/${user._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch favorite recipes: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setFavorites(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching favorite recipes', error);
        setError('An error occurred while fetching favorite recipes. Please try again later.');
        setLoading(false);
      });
  }, [user]);

  const handleToggleFavorite = async (recipeId) => {
    try {
      const toggleUrl = `https://coffee-hub-final-server.vercel.app/api/toggleFavorites/${user._id}/${recipeId}`;

      const response = await fetch(toggleUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle favorites: ${response.statusText}`);
      }

      const { message } = await response.json();
      console.log(message);

      setFavorites((prevFavorites) => prevFavorites.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error toggling favorites', error);
    }
  };

  return (
    <RecipesPage>
      <h1>Your Favorite Recipes</h1>
      {loading ? (
        <Card>
          <CircularProgress />
        </Card>
      ) : error ? (
        <p>{error}</p>
      ) : favorites.length === 0 ? (
        <Card>No favorite recipes available.</Card>
      ) : (
        <Card>
          {favorites.map((recipe) => (
            <Recipe key={recipe._id}>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <h3>Ingredients:</h3>
              <p>{recipe.ingredients}</p>
              <h3>Instructions:</h3>
              <p>{recipe.instructions}</p>

              <p>Recipe submitted by {recipe.username}</p>
              <Icon>
              <Link to={`/recipe/${recipe._id}`}>View Details</Link>
              <FavoriteIcon
                style={{ marginLeft: '8px', cursor: 'pointer' , fontSize: '35px' }}
                onClick={() => handleToggleFavorite(recipe._id)}
              />
              </Icon>
            </Recipe>
          ))}
        </Card>
      )}
    </RecipesPage>
  );
};

export default Favorites;


const Icon = styled.div`
display: flex;
margin: 10px;
justify-content: end;
align-items: center;
`

const Card = styled.div`
display: flex;
justify-content: center;
margin-bottom: 50px;
flex-direction: column;
align-items: center;


`
const RecipesPage = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
h1{
  text-align: center;
}

`

const Recipe = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 240, 0.9);
  width: 60vw;
  margin-right: 30px;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  h2 {
    font-size: 2em;
  }
  p {
    font-size: 1em;
    margin-right: 10px;
  }
  h3 {
    font-size: 1.25em;
  }
  Link {
    font-size: 1.25em;
  }
`

