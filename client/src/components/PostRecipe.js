import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';

const PostRecipe = () => {
    const { user, login, logout } = useContext(UserContext);
    const [recipeData, setRecipeData] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recipeWithUsername = {
            ...recipeData,
            username: user.username,
        };
      

        try {
            // Make a POST request to your server with recipeData
            const response = await fetch('/api/postRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeWithUsername),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                // Optionally, you can redirect the user or perform other actions after successful submission.
            } else {
                console.error('Failed to add recipe');
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    if (!user) {
        return (
            <div>
                <p>Please log in to add recipes.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Submit a Recipe</h2>
            <form onSubmit={handleSubmit}>
                

                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={recipeData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={recipeData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Ingredients:
                    <textarea
                        name="ingredients"
                        value={recipeData.ingredients}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Instructions:
                    <textarea
                        name="instructions"
                        value={recipeData.instructions}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <button type="submit">Submit Recipe</button>
            </form>
        </div>
    );
};

export default PostRecipe;
