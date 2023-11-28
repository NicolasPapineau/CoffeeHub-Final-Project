import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/recipes')
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching recipes', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>All Recipes</h1>
            <p>You can also share your own recipe <Link to={`/postrecipe`}>here</Link>.</p>
            {loading ? (
                <p>Loading...</p>
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
                            <Link to={`/recipe/${recipe._id}`}>View Details</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Recipes;
