import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { UserContext } from './UserContext';
// ... (other imports)

const Recipes = () => {
    const { user } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [renderedRecipes, setRenderedRecipes] = useState([]);

    const isRecipeInFavorites = async (recipeId) => {
        // Add a check for user
        if (!user) {
          return false;
        }
      
        try {
          const response = await fetch(`/api/checkFavorite/${user._id}/${recipeId}`);
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
      
          const toggleUrl = `/api/toggleFavorites/${user._id}/${recipeId}`;
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
      
          // Update the recipes with the correct favorite status
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
            <div key={recipe._id}>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <h3>Ingredients:</h3>
                <p>{recipe.ingredients}</p>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
                <p>Recipe submitted by {recipe.username}</p>
                <Link to={`/recipe/${recipe._id}`}>View Details</Link>
                {user ? (
                    isFavorite ? (
                        <FavoriteIcon
                            style={{ cursor: 'pointer', marginLeft: '8px' }}
                            onClick={() => handleToggleFavorite(recipe._id)}
                        />
                    ) : (
                        <FavoriteBorderIcon
                            style={{ cursor: 'pointer', marginLeft: '8px' }}
                            onClick={() => handleToggleFavorite(recipe._id)}
                        />
                    )
                ) : (
                    <p>Please <Link to="/login">login</Link> to add favorites</p>
                )}
            </div>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/recipes');
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
    }, []); // Run once on component mount

    useEffect(() => {
        const renderRecipes = async () => {
            const recipesToRender = await Promise.all(recipes.map(renderRecipe));
            setRenderedRecipes(recipesToRender);
        };

        renderRecipes();
    }, [recipes]);

    return (
        <div>
            <h1>All Recipes</h1>
            <p>You can also share your own recipe <Link to={`/postrecipe`}>here</Link>.</p>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div>{renderedRecipes}</div>
            )}
        </div>
    );
};

export default Recipes;