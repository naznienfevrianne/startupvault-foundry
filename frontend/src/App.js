// App.js
import React from 'react';
import './App.css';
import RegisterBoxFix from '.pages/RegisterBoxFix';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PickRole from './pages/PickRole';
import FounderForm from './pages/FounderForm';
import StartupType from './pages/StartupType';
import StartupForm from '.pages/StartupForm';
function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<RegisterBoxFix />} /> {/* Correct usage of Route */}
                <Route path="/pickRole" element={<PickRole />} />
                <Route path="/founderForm" element={<FounderForm />} />
                <Route path="/startupType" element={<StartupType />} />
                <Route path="/startupForm" element={<StartupForm />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
