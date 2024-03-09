// App.js
import React from 'react';
import './App.css';
import RegisterBoxFix from './pages/RegisterBoxFix';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PickRole from './pages/PickRole';
import FounderForm from './pages/FounderForm';
import StartupType from './pages/StartupType';
import StartupForm from './pages/StartupForm';
import FounderReadForm from './pages/FounderReadForm';
import FounderEditForm from './pages/FounderEditForm';
import StartupReadForm from './pages/StartupReadForm';
import LoginBox from './pages/LoginBox';
import Logout from './pages/Logout';
import CookieDisplay from './pages/CookieDisplay';
function App() {
    
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CookieDisplay />} />
                <Route path="/register" element={<RegisterBoxFix />} /> {/* Correct usage of Route */}
                <Route path="/pickRole" element={<PickRole />} />
                <Route path="/founderForm" element={<FounderForm />} />
                <Route path="/startupType" element={<StartupType />} />
                <Route path="/startupForm" element={<StartupForm />} />
                <Route path="/founderReadForm" element={<FounderReadForm />} />
                <Route path="/founderEditForm" element={<FounderEditForm />} />
                <Route path="/startupReadForm" element={<StartupReadForm />} />
                <Route path="/login" element={<LoginBox/>}/>
                <Route path="/logout" element={<Logout />}/>
            </Routes>
        </BrowserRouter>

        </>
    );
}

export default App;
