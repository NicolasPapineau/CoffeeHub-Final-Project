import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { UserContext } from './UserContext';

const Recipes = () => {
    const { user } = useContext(UserContext);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/api/recipes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setRecipes(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching recipes', error);
                setError('An error occurred while fetching recipes. Please try again later.');
                setLoading(false);
            });
    }, []);

    const handleToggleFavorite = async (recipeId) => {
        try {
            if (!user || !user._id) {
                // Handle case when user is not logged in
                console.log('User is not logged in.');
                return;
            }
    
            // Check if the recipeId is already in the user's favorites
            if (user.favorites.includes(recipeId)) {
                console.log('Recipe is already in favorites.');
                return;
            }
    
            const url = `/api/toggleFavorites/${user._id}/${recipeId}`;
            console.log('Request URL:', url);
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('Response Status:', response.status);
    
            if (!response.ok) {
                throw new Error(`Failed to toggle favorites: ${response.statusText}`);
            }
    
            const { message } = await response.json();
    
            console.log(message);
    
            // Update the state only if the recipe was successfully added to favorites
            setRecipes((prevRecipes) =>
                prevRecipes.map((recipe) =>
                    recipe._id === recipeId ? { ...recipe, isFavorite: true } : recipe
                )
            );
        } catch (error) {
            console.error('Error toggling favorites', error);
        }
    };
    

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
                <div>
                    {recipes.map((recipe) => (
                        <div key={recipe._id}>
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                            <h3>Ingredients:</h3>
                            <p>{recipe.ingredients}</p>
                            <h3>Instructions:</h3>
                            <p>{recipe.instructions}</p>
                            <p>Recipe submitted by: <strong>{recipe.username}</strong></p>
                            <Link to={`/recipe/${recipe._id}`}>View Details</Link>
                            {user ? (
                                recipe.isFavorite ? (
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
                                null
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recipes;
