import * as React from "react";
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useLocation } from "react-router";
import { LogOutButton, SignUpButton } from "../pages/ShowcasePage";
const NavBar = ({ status }) => {
    const myCookies = new Cookies()
    const nameFounder = myCookies.get('name')
    const profilePicture = myCookies.get('image')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const isAuthenticated = myCookies.get('login')
    const toggleDropdown = () => {

        setIsDropdownOpen(!isDropdownOpen);
    };
    const role = myCookies.get('role')

    return (
        <>
            <header className="flex gap-5 justify-between items-center px-0 py-4 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                <div className="flex gap-1 justify-between items-center self-start max-md:flex-wrap max-md:max-w-full">
                    <h1 className="flex-auto text-3xl text-white italic font-semibold font-['Zuume'] tracking-wider leading-10">
                        <Link to="/">STARTUPVAULT.ID</Link>
                    </h1>
                    <nav className="flex gap-3 justify-between items-center px-6 my-auto text-l font-medium">
                      <div className={`justify-center pb-2  border-0 border-b-2 hover:text-green-400 ${status === "showcase" ? "text-green-400 border-b-2 border-green-400" : "text-neutral-400 border-transparent"}`}>
                        <Link to="/">Showcase</Link>
                      </div>
                        
                        {/* <div className={`${status === "showcase" ? "text-green-400 underline font-semibold" : "text-neutral-400"}`} >
                            <Link to="/">Showcase</Link>
                        </div> */}
                        {isAuthenticated && (
                          <>
                            {role === "investor" ? (
                            <>
                                <div className={`justify-center pb-2  border-0 border-b-2 hover:text-green-400 ${status === "events" ? "text-green-400 border-b-2 border-green-400" : "text-neutral-400 border-transparent"}`}>
                                  <Link to="/event">Our Events</Link>
                                </div>
                                <div className={`justify-center pb-2  border-0 border-b-2 hover:text-green-400 ${status === "startups" ? "text-green-400 border-b-2 border-green-400" : "text-neutral-400 border-transparent"}`}>
                                  <Link to="/startupList">Our Startups</Link>
                                </div>
                            </>
                            ) : (
                            <>
                                <div className={`justify-center pb-2 border-0 border-b-2 hover:text-green-400 ${status === "events" ? "text-green-400 border-b-2 border-green-400" : "text-neutral-400 border-transparent"}`}>
                                  <Link to="/event">Our Events</Link>
                                </div>
                            </>
                            )}
                          </>
                        )}    
                    </nav>
                </div>
                <div className="flex gap-2">
                    {isAuthenticated && (
                      <>
                        <Link to={
                          role === 'investor' ? '/dashboardInvestor' :
                          role === 'partner' ? '/dashboardPartner' :
                          role === 'founder' ? '/dashboard' : '/'
                        }>
                            <div className={`grow justify-center px-3 py-3 text-l font-medium whitespace-nowrap rounded-[30.497px] text-green-400 ${status === "dashboard" ? "text-green-400 bg-green-400 bg-opacity-20" : "bg-transparent"}`}>
                                My Dashboard
                            </div>
                        </Link>
                   
                        <div className="relative z-1">
                            <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px] cursor-pointer" onClick={toggleDropdown}>
                                <div className="flex justify-center items-center self-stretch aspect-square">
                                    <img
                                        loading="lazy"
                                        src={profilePicture}
                                        className="rounded-full aspect-square text-green-400 bg-opacity-20 h-[30px] w-[30px]"
                                    />
                                </div>
                                <div className="self-stretch my-auto text-l font-medium tracking-wide text-stone-100">
                                    {nameFounder}
                                </div>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d480841e901ee690cdb968358a4fdd7ed1a2243aef55995816a8978e3a48610?"
                                    className="shrink-0 self-stretch my-auto aspect-square w-[18px]"
                                />
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute z-1 right-0 mt-2">
                                    <div className="flex gap-2 items-right px-14 py-2 bg-neutral-900 rounded-[10px] cursor-pointer">
                                      <Link to="/logout">
                                        <div className="flex gap-1 self-end px-4 py-3 text-md tracking-wide font-semibold text-green-400 whitespace-nowrap bg-neutral-800 rounded-[25px] cursor-pointer">
                                          Log out
                                        </div>
                                      </Link>
                                    </div>
                                </div>
                            )}

                        </div>
                        </>
                    )}

                    {!isAuthenticated && (
                      <SignUpButton />
                    )}
                </div>

            </header>
        </>
    )
}
export default NavBar;
