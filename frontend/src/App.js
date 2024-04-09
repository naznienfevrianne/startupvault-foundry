import React from 'react';
import './App.css';
import RegisterBoxFix from './pages/RegisterBoxFix';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PickRole from './pages/PickRole';
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
import FounderDashboard from './pages/FounderDashboard';
import FounderDiary from './pages/FoundersDiary';
import InvestorType from './pages/InvestorType';
import InvestorForm from './pages/InvestorForm';
import MOUSubmission from './pages/MOUSubmission';
import PartnerForm from './pages/PartnerForm';
import StartupEditDetails from './pages/StartupEditForm';
import UserForm from './pages/UserForm';
import OrgInvestorEditForm from './pages/OrgInvestorEditForm';
import OrgInvestorReadForm from './pages/OrgInvestorReadForm';
import { Cookies } from 'react-cookie';

function App() {
    const myCookies = new Cookies();
    const isAuthenticated = myCookies.get('login');
    const isVerified = myCookies.get('isVerified');
    const role = myCookies.get('role');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Showcase />} />
                <Route path="/register" element={<RegisterBoxFix />} />
                <Route path="/pickRole" element={<PickRole />} />
                <Route path="/userForm" element={<UserForm />} />
                <Route path="/startupType" element={<StartupType />} />
                <Route path="/startupForm" element={<StartupForm />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<LoginBox />} />
                <Route path="/investorForm" element={<InvestorForm />} />
                <Route path="/partnerForm" element={<PartnerForm />} />
                <Route path="/MOUSubmission" element={<MOUSubmission />} />
                <Route path="/investorType" element={<InvestorType />} />
                <Route path="/orgInvestorReadForm" element={<OrgInvestorReadForm />} />
                <Route path="/orgInvestorEditForm" element={<OrgInvestorEditForm />} />
                {isAuthenticated && isVerified === '1' && role === 'founder' && (
                    <React.Fragment>
                        <Route path="/founderReadForm" element={<FounderReadForm />} />
                        <Route path="/founderEditForm" element={<FounderEditForm />} />
                        <Route path="/startupReadForm" element={<StartupReadForm />} />
                        <Route path="/startupEditForm" element={<StartupEditForm />} />
                        <Route path="/dashboard" element={<FounderDashboard />} />
                        <Route path="/diary" element={<FounderDiary />} />
                        <Route path="/cookies" element={<CookieDisplay />} />
                        <Route path="/startupEditForm" element={<StartupEditDetails />} />
                    </React.Fragment>
                )}
                {isAuthenticated && isVerified === '1' && role === 'investor' && (
                    <React.Fragment>
                        <Route path="/orgInvestorReadForm" element={<OrgInvestorReadForm />} />
                        <Route path="/orgInvestorEditForm" element={<OrgInvestorEditForm />} />
                        <Route path="/founderReadForm" element={<Navigate to="/" replace />} />
                        <Route path="/founderEditForm" element={<Navigate to="/" replace />} />
                        <Route path="/startupReadForm" element={<Navigate to="/" replace />} />
                        <Route path="/startupEditForm" element={<Navigate to="/" replace />} />
                        <Route path="/dashboard" element={<Navigate to="/" replace />} />
                        <Route path="/diary" element={<Navigate to="/" replace />} />
                        <Route path="/cookies" element={<CookieDisplay />} />
                        <Route path="/startupEditForm" element={<Navigate to="/" replace />} />
                    </React.Fragment>
                )}
                {!isAuthenticated || isVerified !== '1' && (
                    <React.Fragment>
                        <Route path="/dashboard" element={<Navigate to="/" replace />} />
                        <Route path="/founderEditForm" element={<Navigate to="/" replace />} />
                        <Route path="/startupReadForm" element={<Navigate to="/" replace />} />
                        <Route path="/founderReadForm" element={<Navigate to="/" replace />} />
                        <Route path="/diary" element={<Navigate to="/" replace />} />
                        <Route path="/startupEditForm" element={<Navigate to="/" replace />} />
                    </React.Fragment>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
