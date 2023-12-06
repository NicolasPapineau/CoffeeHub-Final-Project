import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { UserContext } from './UserContext';
import styled from 'styled-components'; 
import CircularProgress from "@material-ui/core/CircularProgress";
// ... (other imports)

const Recipes = () => {
    const { user } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [renderedRecipes, setRenderedRecipes] = useState([]);

    const isRecipeInFavorites = async (recipeId) => {
        if (!user) {
          return false;
        }
      
        try {
          const response = await fetch(`https://coffee-hub-final-server.vercel.app/api/checkFavorite/${user._id}/${recipeId}`);
          const data = await response.json();
      
          if (response.ok) {
            return data.isFavorite;
          } else {
            console.error('Error checking favorite:', data.error);
            return false;
          }
        } catch (error) {
          console.error('Error checking favorite:', error);
          return false;
        }
      };

    const handleToggleFavorite = async (recipeId) => {
        try {
          const isInFavorites = await isRecipeInFavorites(recipeId);
      
          const toggleUrl = `https://coffee-hub-final-server.vercel.app/api/toggleFavorites/${user._id}/${recipeId}`;
          const method = isInFavorites ? 'DELETE' : 'POST';
      
          const response = await fetch(toggleUrl, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error(`Failed to toggle favorites: ${response.statusText}`);
          }
      
          const { message } = await response.json();
          console.log(message);
      
          setRecipes((prevRecipes) =>
            prevRecipes.map((recipe) =>
              recipe._id === recipeId ? { ...recipe, isFavorite: !isInFavorites } : recipe
            )
          );
        } catch (error) {
          console.error('Error toggling favorites', error);
        }
      };

    const renderRecipe = async (recipe) => {
        const isFavorite = await isRecipeInFavorites(recipe._id);

        return (
          <Card>
            <Recipe key={recipe._id}>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <h3>Ingredients:</h3>
                <p>{recipe.ingredients}</p>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
                <p>Recipe submitted by <strong>{recipe.username}</strong></p>
                <Icon>
                <p><Link to={`/recipe/${recipe._id}`}>View Recipe Page.</Link></p>
                
                {user ? (
                    isFavorite ? (
                        <FavoriteIcon
                            style={{ cursor: 'pointer', marginLeft: '8px', fontSize: '35px'  }}
                            onClick={() => handleToggleFavorite(recipe._id)}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            style={{ cursor: 'pointer', marginLeft: '8px', fontSize: '35px'  }}
                            onClick={() => handleToggleFavorite(recipe._id)}
                        />
                    )
                ) : (
                    <p>Please <Link to="/login">login</Link> to add favorites</p>
                )}
                </Icon>
            </Recipe>
            </Card>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://coffee-hub-final-server.vercel.app/api/recipes');
                if (!response.ok) {
                    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
                }
                const data = await response.json();
                setRecipes(data.data);
            } catch (error) {
                console.error('Error fetching recipes', error);
                setError('An error occurred while fetching recipes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const renderRecipes = async () => {
            const recipesToRender = await Promise.all(recipes.map(renderRecipe));
            setRenderedRecipes(recipesToRender);
        };

        renderRecipes();
    }, [recipes]);

    return (
        <RecipesPage>
            <h1>All Recipes</h1>
            <Share>You can also share your own recipe <Link to={`/postrecipe`}>here</Link>.</Share>
            {loading ? (
                <Card>
                  <CircularProgress />
                </Card>
            ) : error ? (
                <p>{error}</p>
            ) : recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div>{renderedRecipes}</div>
            )}
        </RecipesPage>
    );
};

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
`
const RecipesPage = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
h1{
  text-align: center;
}
`
const Share = styled.p`
font-size: 1.25em;
    text-align: center;
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


export default Recipes;