import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Deployments from './pages/Deployments';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/systems" element={<Projects />} />
                <Route path="/laboratory" element={<Projects />} />
                <Route path="/observatory" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/deployments" element={<Deployments />} />
            </Routes>
            <Analytics />
        </Router>
    );
}

export default App;