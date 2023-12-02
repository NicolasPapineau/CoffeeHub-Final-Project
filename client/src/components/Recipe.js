import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Recipe = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/recipes/${recipeId}`)
            .then((response) => response.json())
            .then((data) => {
                setRecipe(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(`Error fetching recipe with ID ${recipeId}`, error);
                setLoading(false);
            });
    }, [recipeId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!recipe) {
        return <p>Recipe not found</p>;
    }

    return (
        <div>
            
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <h3>Ingredients:</h3>
            <p>{recipe.ingredients}</p>
            <h3>Instructions:</h3>
            <p>{recipe.instructions}</p>
            <p>Recipe submitted by {recipe.username}</p>
                
        </div>
    );
};

export default Recipe;
