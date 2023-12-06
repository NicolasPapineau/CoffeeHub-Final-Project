import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from './UserContext';

const Recipe = () => {
    const { user } = useContext(UserContext);
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
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
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://coffee-hub-final-server.vercel.app/api/recipes/${recipeId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch recipe with ID ${recipeId}`);
                }
                const data = await response.json();
                setRecipe(data.data);
                setLoading(false);

                // Check and set favorite status
                if (user) {
                    const isFavoriteResponse = await fetch(`https://coffee-hub-final-server.vercel.app/api/checkFavorite/${user._id}/${recipeId}`);
                    if (isFavoriteResponse.ok) {
                        const isFavoriteData = await isFavoriteResponse.json();
                        setIsFavorite(isFavoriteData.isFavorite);
                    }
                }
            } catch (error) {
                console.error(`Error fetching recipe with ID ${recipeId}`, error);
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeId, user]);

    if (loading) {
        return (
            <Card>
                <CircularProgress />
            </Card>
        );
    }

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <Card>

            <RecipeLayout>
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
                <h3>Ingredients:</h3>
                <p>{recipe.ingredients}</p>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
                <p>Recipe submitted by <strong>{recipe.username}</strong>.</p>
                <Icon>

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
                        <p>
                            Please <Link to="/login">login</Link> to add favorites
                        </p>
                    )}
                </Icon>
            </RecipeLayout>
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
  margin-bottom: 50px;
`;

const RecipeLayout = styled.div`
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

export default Recipe;
