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
import StartupEditForm from './pages/StartupEditForm';
import LoginBox from './pages/LoginBox';
import Logout from './pages/Logout';
import CookieDisplay from './pages/CookieDisplay';
import Showcase from './pages/ShowcasePage';
//import GlobalStyle from './GlobalStyle';
import FounderDashboard from './pages/FounderDashboard';
import FounderDiary from './pages/FoundersDiary';
import PrivateRoute from './PrivateRoute';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
function App() {

    const myCookies = new Cookies()
    const isAuthenticated = myCookies.get('login')
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Showcase />} />
                <Route path="/register" element={<RegisterBoxFix />} /> {/* Correct usage of Route */}
                <Route path="/pickRole" element={<PickRole />} />
                <Route path="/founderForm" element={<FounderForm />} />
                <Route path="/startupType" element={<StartupType />} />
                <Route path="/startupForm" element={<StartupForm />} />
                <Route path="/logout" element={<Logout />}/>
                <Route path="/login" element={<LoginBox/>}/>
                {isAuthenticated ? (
                    <React.Fragment>
                    <Route path="/founderReadForm" element={<FounderReadForm />} />
                    <Route path="/founderEditForm" element={<FounderEditForm />} />
                    <Route path="/startupReadForm" element={<StartupReadForm />} />
                    <Route path="/dashboard" element={<FounderDashboard />} />
                    <Route path="/diary" element={<FounderDiary />}/>
                    <Route path="/cookies" element={<CookieDisplay />} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    <Route path="/dashboard" element={<Navigate to="/login" replace />} />
                    <Route path="/founderEditForm" element={<Navigate to="/login" replace />} />
                    <Route path="/startupReadForm" element={<Navigate to="/login" replace />} />
                    <Route path="/founderReadForm" element={<Navigate to="/login" replace />} />
                    <Route path="/diary" element={<Navigate to="/login" replace />} />
                    </React.Fragment>
                )}

                
            </Routes>
        </BrowserRouter>

        </>
    );
}

export default App;
