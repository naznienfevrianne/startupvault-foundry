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
import PartnerReadForm from './pages/PartnerReadForm';
import PartnerEditForm from './pages/PartnerEditForm';
import InvestorDashboard from './pages/InvestorDashboard';
import InvestorDetails from './pages/InvestorDetails';
import UpdateInvestorDetails from './pages/UpdateInvestorDetails';
import Follow from './pages/Follow';
import StartupList from './pages/StartupList';
import { Cookies } from 'react-cookie';
import StartupDetails from './pages/ReadStartupDetails';
import CreatedShowcase from './pages/CreatedShowcase';
import PartnerDashboard from './pages/PartnerDashboard';
import OrgPartnerReadForm from './pages/OrgPartnerReadForm';
import OrgPartnerEditForm from './pages/OrgPartnerEditForm';
import EventDetails from './pages/EventDetails';
import ListEvent from './pages/ListEvent';
import EventEditForm from './pages/EventEditForm';
import CreateEvent from './pages/CreateEvent';
import CreatedEvents from './pages/CreatedEvents';
import NoAccess from './pages/NoAccess';

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
                <Route path="/investorType" element={<InvestorType/>} />
                <Route path="/no-access" element={<NoAccess />} />
                {isAuthenticated && isVerified === 1 && role === "founder" ? (
                    <React.Fragment>
                    <Route path="/dashboard" element={<FounderDashboard />} /> 
                    <Route path="/founderEditForm" element={<FounderEditForm />} />
                    <Route path="/startupReadForm" element={<StartupReadForm />} />
                    <Route path="/founderReadForm" element={<FounderReadForm />} />
                    <Route path="/diary" element={<FounderDiary />}/>
                    <Route path="/startupEditForm" element={<StartupEditForm />} />
                    <Route path="/startupDetails/:idStartup" element={<StartupDetails />} />
                    <Route path="/diary" element={<FounderDiary />}/>
                    <Route path="/cookies" element={<CookieDisplay />} />
                    <Route path="/startupEditForm" element={<StartupEditDetails />} />
                    <Route path="/event-details/:idEvent" element={<EventDetails />} />
                    <Route path="/event" element={<ListEvent />} />
                    </React.Fragment>
                ) : isAuthenticated && isVerified === 1 && role === "investor" ? (
                    <React.Fragment>
                    <Route path="/investorDetails" element={<InvestorDetails />} />
                    <Route path="/updateInvestorDetails" element={<UpdateInvestorDetails />} />
                    <Route path="/follow" element={<Follow />} />
                    <Route path="/startupList" element={<StartupList />} />
                    <Route path="/orgInvestorReadForm" element={<OrgInvestorReadForm />} />
                    <Route path="/orgInvestorEditForm" element={<OrgInvestorEditForm />} />
                    <Route path="/dashboardInvestor" element={<InvestorDashboard/>} />
                    <Route path="/event-details/:idEvent" element={<EventDetails />} />
                    <Route path="/event" element={<ListEvent />} />
                    <Route path="/cookies" element={<CookieDisplay />} />
                    </React.Fragment>
                ) : isAuthenticated && isVerified === 1 && role === "partner" ? (
                    <React.Fragment>
                    <Route path="/orgPartnerReadForm" element={<OrgPartnerReadForm />} />
                    <Route path="/orgPartnerEditForm" element={<OrgPartnerEditForm />} />
                    <Route path="/partnerReadForm" element={<PartnerReadForm />} />
                    <Route path="/partnerEditForm" element={<PartnerEditForm />} />
                    <Route path="/dashboardPartner" element={<PartnerDashboard />} />
                    <Route path="/created-showcase" element={<CreatedShowcase />} />
                    <Route path="/event-details/:idEvent" element={<EventDetails />} />
                    <Route path="/event" element={<ListEvent />} />
                    <Route path="/eventEdit/:eventId" element={<EventEditForm />} />
                    <Route path="/createEvent" element={<CreateEvent />} />
                    <Route path="/createdEvents" element={<CreatedEvents />} />
                    <Route path="/cookies" element={<CookieDisplay />} />
                    </React.Fragment>
                ) : !isAuthenticated ? (
                    <React.Fragment>
                    <Route path="/dashboard" element={<Navigate to="/login" replace />} />
                    <Route path="/founderEditForm" element={<Navigate to="/login" replace />} />
                    <Route path="/startupReadForm" element={<Navigate to="/login" replace />} />
                    <Route path="/founderReadForm" element={<Navigate to="/login" replace />} />
                    <Route path="/diary" element={<Navigate to="/login" replace />} />
                    <Route path="/startupEditForm" element={<Navigate to="/login" replace />} />
                    <Route path="/startupDetails/:idStartup" element={<Navigate to="/login" replace />} />
                    <Route path="/diary" element={<Navigate to="/login" replace />}/>
                    <Route path="/cookies" element={<Navigate to="/login" replace />} />
                    <Route path="/startupEditForm" element={<Navigate to="/login" replace />} />
                    <Route path="/investorDetails" element={<Navigate to="/login" replace />} />
                    <Route path="/updateInvestorDetails" element={<Navigate to="/login" replace />} />
                    <Route path="/follow" element={<Navigate to="/login" replace />} />
                    <Route path="/startupList" element={<Navigate to="/login" replace />} />
                    <Route path="/orgInvestorReadForm" element={<Navigate to="/login" replace />} />
                    <Route path="/orgInvestorEditForm" element={<Navigate to="/login" replace />} />
                    <Route path="/orgPartnerReadForm" element={<Navigate to="/login" replace />} />
                    <Route path="/orgPartnerEditForm" element={<Navigate to="/login" replace />} />
                    <Route path="/partnerReadForm" element={<Navigate to="/login" replace />} />
                    <Route path="/partnerEditForm" element={<Navigate to="/login" replace />} />
                    <Route path="/dashboardPartner" element={<Navigate to="/login" replace />} />
                    <Route path="/dashboardInvestor" element={<Navigate to="/login" replace />} />
                    <Route path="/created-showcase" element={<Navigate to="/login" replace />} />
                    <Route path="/event-details/:idEvent" element={<Navigate to="/login" replace />} />
                    <Route path="/event" element={<Navigate to="/login" replace />} />
                    <Route path="/eventEdit/:eventId" element={<Navigate to="/login" replace />} />
                    <Route path="/createEvent" element={<Navigate to="/login" replace />} />
                    <Route path="/createdEvents" element={<Navigate to="/login" replace />} />
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                    <Route path="/dashboard" element={<Navigate to="/no-access" replace />} />
                    <Route path="/founderEditForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/startupReadForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/founderReadForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/diary" element={<Navigate to="/no-access" replace />} />
                    <Route path="/startupEditForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/startupDetails/:idStartup" element={<Navigate to="/no-access" replace />} />
                    <Route path="/diary" element={<Navigate to="/no-access" replace />}/>
                    <Route path="/cookies" element={<Navigate to="/no-access" replace />} />
                    <Route path="/startupEditForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/investorDetails" element={<Navigate to="/no-access" replace />} />
                    <Route path="/updateInvestorDetails" element={<Navigate to="/no-access" replace />} />
                    <Route path="/follow" element={<Navigate to="/no-access" replace />} />
                    <Route path="/startupList" element={<Navigate to="/no-access" replace />} />
                    <Route path="/orgInvestorReadForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/orgInvestorEditForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/orgPartnerReadForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/orgPartnerEditForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/partnerReadForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/partnerEditForm" element={<Navigate to="/no-access" replace />} />
                    <Route path="/dashboardPartner" element={<Navigate to="/no-access" replace />} />
                    <Route path="/dashboardInvestor" element={<Navigate to="/no-access" replace />} />
                    <Route path="/created-showcase" element={<Navigate to="/no-access" replace />} />
                    <Route path="/event-details/:idEvent" element={<Navigate to="/lono-accessgin" replace />} />
                    <Route path="/event" element={<Navigate to="/no-access" replace />} />
                    <Route path="/eventEdit/:eventId" element={<Navigate to="/no-access" replace />} />
                    <Route path="/createEvent" element={<Navigate to="/no-access" replace />} />
                    <Route path="/createdEvents" element={<Navigate to="/no-access" replace />} />
                    </React.Fragment>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
