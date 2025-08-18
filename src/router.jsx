import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import App from "./app"
import Home from "./pages/home"
import GroupPage from "./pages/groupPage"
import AddRecipe from "./pages/addRecipe"

const router = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/home" element={<Home />}>
                    <Route index element={<Navigate to="/home/groups" replace />} />
                    <Route path="groups" element={<GroupPage />} />
                    <Route path="recipe/:id?" element={<AddRecipe />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default router;