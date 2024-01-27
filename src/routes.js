import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Container from './container';

export default function AppRoute() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Container tag="page1" />}
                />
                <Route
                    path="/contact"
                    element={<Container tag="page2" />}
                />
            </Routes>
        </Router>
    );
}
