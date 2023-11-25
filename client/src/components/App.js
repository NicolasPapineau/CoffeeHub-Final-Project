import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "../GlobalStyles";
import Header from "./Header";
import Signup from "./Signup";
import Login from "./Login";
// import { useEffect } from "react";


const App = () => {
    // useEffect(() => {
    //     fetch("/api/testMongo")
    //     .then((r) => r.json())
    //     .then(console.log);
    // }, []);

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Header />
            <Routes>
                <Route path="/" element={<h1>home</h1>}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/machines" element={<h1>machines</h1>}/>
                <Route path="/recepies" element={<h1>recepies</h1>}/>
                <Route path="/roasters" element={<h1>roasters</h1>}/>
                <Route path="/favorites" element={<h1>liked recepies</h1>}/>
                <Route path="/localroasters" element={<h1>List of local roasters</h1>}/>
            </Routes>  
        </BrowserRouter>
    );
};

export default App;
