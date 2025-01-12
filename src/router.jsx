import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./app"
import Home from "./pages/home"

const router = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/home" element={<Home />}/>
            </Routes>
        </Router>
    )
}

export default router;