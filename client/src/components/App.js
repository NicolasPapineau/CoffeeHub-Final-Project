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



const App = () => {

    

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<h1>home</h1>}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/postrecipe" element={<PostRecipe />}/>
                <Route path="/recipes" element={<Recipes />}/>
                <Route path="/recipe/:recipeId" element={<Recipe />} />
                <Route path="/roasters" element={<h1>roasters</h1>}/>
                <Route path="/favorites" element={<Favorites />}/>
                <Route path="/calendar" element={<CoffeeCalendar />} />
                <Route path="/localroasters" element={<h1>List of local roasters</h1>}/>
            </Routes>  
        </BrowserRouter>
    );
};

export default App;
