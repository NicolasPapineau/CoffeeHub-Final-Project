import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './UserContext';
import { useParams, Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircularProgress from "@material-ui/core/CircularProgress";



const FeaturedRecipe = () => {
    const [randomRecipe, setRandomRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(UserContext);
    const { recipeId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);

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

    const handleToggleFavorite = async () => {
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

            setIsFavorite(!isInFavorites);
        } catch (error) {
            console.error('Error toggling favorites', error);
        }
    };

    useEffect(() => {
        const fetchRandomRecipe = async () => {
            try {
                const response = await fetch('https://coffee-hub-final-server.vercel.app/api/randomRecipe');

                if (!response.ok) {
                    throw new Error(`Failed to fetch random recipe: ${response.statusText}`);
                }

                const data = await response.json();
                setRandomRecipe(data.data);
                setLoading(false);

                if (user) {
                    const isFavoriteResponse = await fetch(`https://coffee-hub-final-server.vercel.app/api/checkFavorite/${user._id}/${recipeId}`);
                    if (isFavoriteResponse.ok) {
                        const isFavoriteData = await isFavoriteResponse.json();
                        setIsFavorite(isFavoriteData.isFavorite);
                    }
                }
            } catch (error) {
                console.error('Error fetching random recipe', error);
                setError('An error occurred while fetching the random recipe. Please try again later.');
                setLoading(false);
            }
        };

        fetchRandomRecipe();
    }, [recipeId, user]);

    return (
        <Card>
            <h1>Featured Recipe</h1>
            {loading ? (
                <Card>
                <CircularProgress />
            </Card>
            ) : error ? (
                <p>{error}</p>
            ) : randomRecipe ? (
                <Card>
                <RecipeLayout>
                    <h2>{randomRecipe.title}</h2>
                    <p>{randomRecipe.description}</p>
                    <h3>Ingredients:</h3>
                    <p>{randomRecipe.ingredients}</p>
                    <h3>Instructions:</h3>
                    <p>{randomRecipe.instructions}</p>
                    <p>Recipe submitted by <strong>{randomRecipe.username}</strong>.</p>
                <Icon>
                <p><Link to={`/recipe/${randomRecipe._id}`}>View Recipe Page.</Link></p>
                    {user ? (
                        isFavorite ? (
                            <FavoriteIcon
                                style={{ cursor: 'pointer', marginLeft: '8px', fontSize: '35px' }}
                                onClick={handleToggleFavorite}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                style={{ cursor: 'pointer', marginLeft: '8px', fontSize: '35px' }}
                                onClick={handleToggleFavorite}
                            />
                        )
                    ) : (
                        <p>Please <Link to="/login">login</Link> to add favorites</p>
                    )}
                </Icon>
                </RecipeLayout>
                </Card>
            ) : (
                <p>No random recipe available.</p>
            )}
        </Card>
    );
};

const Icon = styled.div`
  display: flex;
  margin: 10px;
  justify-content: end;
  align-items: center;
  
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-top:40px;
  }
`;

const RecipeLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 240, 0.9);
  width: 60vw;
  margin-right: 30px;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 20px;
  margin-bottom: 70px;
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

export default FeaturedRecipe;
