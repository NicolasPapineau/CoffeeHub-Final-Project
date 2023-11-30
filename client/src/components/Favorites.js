import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { UserContext } from './UserContext';

const Favorites = () => {
    const { user } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user || !user.favorites || user.favorites.length === 0) {
            // No favorites to display
            setLoading(false);
            return;
        }

        // Fetch the details of favorite recipes
        fetch(`/api/recipes/favorites/${user._id}`)
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

    return (
        <div>
            <h1>Your Favorite Recipes</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : favorites.length === 0 ? (
                <p>No favorite recipes available.</p>
            ) : (
                <div>
                    {favorites.map((recipe) => (
                        <div key={recipe._id}>
                            <h2>{recipe.title}</h2>
                            <p>{recipe.description}</p>
                            <h3>Ingredients:</h3>
                            <p>{recipe.ingredients}</p>
                            <h3>Instructions:</h3>
                            <p>{recipe.instructions}</p>
                            <Link to={`/recipe/${recipe._id}`}>View Details</Link>
                            {/* Display the full FavoriteIcon since it's in favorites */}
                            <FavoriteIcon style={{ marginLeft: '8px' }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
