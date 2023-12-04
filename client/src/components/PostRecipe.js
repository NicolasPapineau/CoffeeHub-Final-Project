import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import styled from "styled-components";


const PostRecipe = () => {
    const { user } = useContext(UserContext);
    const [error, setError] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
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
            const response = await fetch('/api/postRecipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipeWithUsername),
            });

            if (response.ok) {
                const result = await response.json();
                setSuccessMessage("Recipe added");
                setTimeout(() => {
                    // Redirect to the homepage
                    window.location.href = "/myrecipes";
                }, 1000);
            } else {
                setSuccessMessage('Failed to add recipe');
            }
        } catch (error) {
            console.error('Error adding recipe:', error);
        }
    };

    if (!user) {
        return (
            <CardCenter>
                <p>Please log in to add recipes.</p>
            </CardCenter>
        );
    }

    return (
        <CardCenter>
            <Card>
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

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={recipeData.description}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Ingredients:
                    <textarea
                        name="ingredients"
                        value={recipeData.ingredients}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Instructions:
                    <textarea
                        name="instructions"
                        value={recipeData.instructions}
                        onChange={handleChange}
                        required
                    />
                </label>

                <Button type="submit">Submit Recipe</Button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </Card>
        </CardCenter>
    );
};

const CardCenter = styled.div`
display: flex;
justify-content: center;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 240, 0.9);
    width: 60vw;
    margin-right: 30px;
    margin-top: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    h2 {
        font-size: 2em;
    }
    p {
        font-size: 1.25em;
    }
    label {
        font-size: 1.25em;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: end;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        width: 80%;
        
    }
    input {
        margin: 10px;
        font-size: 1.25em;
        width:60%;
        
    }
    textarea {
        margin: 10px;
        width:60%;
        min-height: 60px;
        font-size:1em;
        
        
    }
`;

const Button = styled.button`
    background-color: burlywood;
    color: white;
    padding: 5px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
        opacity: 0.5;
    }
    &:enabled {
        opacity: 1.0;
    }
    &:hover {
        background-color: brown
    }
    &:active {
    /* background-color: #3e8e41; */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
    
    }
`

export default PostRecipe;
