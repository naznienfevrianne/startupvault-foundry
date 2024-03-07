// App.js
import React from 'react';
import './App.css';
import RegisterBoxFix from './pages/RegisterBoxFix';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PickRole from './pages/PickRole';
import FounderForm from './pages/FounderForm';
import StartupType from './pages/StartupType';
import StartupForm from './pages/StartupForm';
import LoginBox from './pages/LoginBox';
import Logout from './pages/Logout';
import CookieDisplay from './pages/CookieDisplay';
import Showcase from './pages/ShowcasePage';
//import GlobalStyle from './GlobalStyle';
import FounderDiary from './pages/FoundersDiary';
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
                <Route path="/login" element={<LoginBox/>}/>
                <Route path="/logout" element={<Logout />}/>
                <Route path="/showcase" element={<Showcase />}/>
                <Route path="/diary" element={<FounderDiary />}/>
            </Routes>
        </BrowserRouter>

        </>
    );
}

export default App;
