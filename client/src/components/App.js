import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import GlobalStyle from "../GlobalStyles";
import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
import PostRecipe from "./PostRecipe";
import Recipes from "./Recipes";
import Recipe from "./Recipe";
import Favorites from "./Favorites";
import CoffeeCalendar from "./CoffeeCalendar";
import MyRecipes from "./MyRecipes";
import Home from "./Home";
import Roasters from "./Roasters";


const App = () => {

    

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/postrecipe" element={<PostRecipe />}/>
                <Route path="/recipes" element={<Recipes />}/>
                <Route path="/recipe/:recipeId" element={<Recipe />} />
                <Route path="/roasters" element={<Roasters />}/>
                <Route path="/favorites" element={<Favorites />}/>
                <Route path="/myrecipes" element={<MyRecipes />}/>
                <Route path="/calendar" element={<CoffeeCalendar />} />
                
            </Routes>  
        </BrowserRouter>
    );
};

export default App;
