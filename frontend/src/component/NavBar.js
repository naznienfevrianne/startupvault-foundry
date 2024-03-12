import * as React from "react";
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useState } from "react";
function NavBar(props) {
    const myCookies = new Cookies()
    const nameFounder = myCookies.get('name')
    const profilePicture = myCookies.get('image')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return  (
    <>
    <header className="flex gap-5 justify-between items-center px-0 py-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <div className="flex gap-1 justify-between items-center self-start text-white max-md:flex-wrap max-md:max-w-full">
            <h1 className="flex-auto text-xl italic font-semibold tracking-wider leading-10">
           <Link to ="/">STARTUPVAULT.ID</Link>
          </h1>
          <nav className="flex gap-5 justify-between items-center px-8 my-auto text-l font-light max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="grow"><Link to="/">Showcase</Link></div>
            <div>Events</div>
            <div className="flex-auto">Our Investors</div>
            <div className="grow whitespace-nowrap text-stone-100">
              Our Startups
            </div>
          </nav>
        </div>
        <div className="flex gap-2 rounded-[30px]">
          <div className="grow justify-center px-3 py-2 text-l font-light text-green-400 whitespace-nowrap rounded-2xl bg-green-400 bg-opacity-20">
            My Dashboard
          </div>
          <div className = "relative">
          <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px] cursor-pointer" onClick={toggleDropdown}>
            <div className="flex justify-center items-center self-stretch aspect-square">
              <img
                loading="lazy"
                srcSet={profilePicture}
                className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[30px] w-[30px]"
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
            <div className="absolute right-0 mt-2">
                <div className="flex gap-2 items-right px-20 py-2 bg-neutral-900 rounded-[10px] cursor-pointer">
                    <div className="bg-neutral-800 rounded-[10px]"> {/* Container with neutral background */}
                        <div className="bg-green-400 rounded-[10px] p-2" style={{ width: '100%', cursor: 'pointer' }}> {/* Green logout button */}
                            <Link to="/logout">LOG OUT</Link>
                        </div>
                    </div>
                </div>
            </div>
        )}

        </div>
        </div>
      </header>
    </>
    )
}
export default NavBar