import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from './UserContext';

const MyRecipes = () => {
  const { user } = useContext(UserContext);

  if (!user || !user.username) {
    return (
      <Card>
        <p>Please log in to view your recipes.</p>
      </Card>
    );
  }

  const username = user.username;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/myRecipes/${username}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }

        const data = await response.json();
        setRecipes(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes', error);
        setError('An error occurred while fetching recipes. Please try again later.');
        setLoading(false);
      }
    };


    fetchRecipes();
  }, [username]);

  

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`/api/deleteRecipe/${username}/${recipeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete recipe: ${response.statusText}`);
      }

      const { message } = await response.json();
      console.log(message);

      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe', error);
    }
  };

  


  return (
    <RecipesPage>
      <h1>Your Recipes</h1>
      {loading ? (
        <Card>
          <CircularProgress />
        </Card>
      ) : error ? (
        <p>{error}</p>
      ) : recipes.length === 0 ? (
        <p>No recipes available.</p>
      ) : (
        <Card>
          {recipes.map((recipe) => (
            <Recipe key={recipe._id}>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <h3>Ingredients:</h3>
              <p>{recipe.ingredients}</p>
              <h3>Instructions:</h3>
              <p>{recipe.instructions}</p>

              <p>Recipe submitted by <strong>{recipe.username}</strong></p>
              <Icon>
                <Link to={`/recipe/${recipe._id}`}>View Details</Link>
                <DeleteIcon
                  style={{ marginLeft: '8px', cursor: 'pointer', fontSize: '35px' }}
                  onClick={() => handleDeleteRecipe(recipe._id)}
                />
              </Icon>
            </Recipe>
          ))}
        </Card>
      )}
    </RecipesPage>
  );
};

export default MyRecipes;

const Icon = styled.div`
  display: flex;
  margin: 10px;
  justify-content: end;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  margin-bottom: 50px;
  align-items: center;
`;

const RecipesPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
  }
`;

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
  a {
    font-size: 1.25em;
  }
`;
