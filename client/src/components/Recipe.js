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
            <ul>
                <li>
                    <strong>Ingredients:</strong> {recipe.ingredients}
                </li>
                <li>
                    <strong>Instructions:</strong> {recipe.instructions}
                </li>
            </ul>
        </div>
    );
};

export default Recipe;
