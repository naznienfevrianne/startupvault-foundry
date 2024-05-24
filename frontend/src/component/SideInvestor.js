import * as React from "react";
import { Link } from 'react-router-dom';
import{ Cookies } from 'react-cookie';

const SideBar = ({ status }) => {
    const myCookies = new Cookies();
    const name = myCookies.get('name');
    const profilePicture = myCookies.get('image');

    return (    
        <div className="flex flex-col self-start pb-2 mt-6 gap-0 tracking-wide text-neutral-400">
            <div className="flex-col gap-5 pr-10 mt-5 font-medium whitespace-nowrap self-center max-md:pr-5">
              <div className="flex gap-4 py-2 rounded-lg w-full items-center">
                  <img
                  loading="lazy"
                  src={profilePicture}
                  className="object-cover w-10 h-10 rounded-full border-dashed self-center"
                  />
                  <div className="text-lg mt-2">Hi, {name}!</div>
              </div>
            </div>
            <Link to="/dashboardInvestor">
              <div className="flex gap-5 pr-5 mt-5 font-medium whitespace-nowrap">
              <div className={`shrink-0 w-1 h-12 rounded-none shadow-sm ${status === "overview" ? " bg-green-400" : "text-neutral-400 border-transparent"}`} />
                  <div className={`flex gap-2 pr-12 rounded-lg items-center w-full ${status === "overview" ? "bg-green-400 text-green-400" : "border-transparent"} bg-opacity-20`}>
                      <img
                          loading="lazy"
                          src={`${status === "overview" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/f1487560442a58b51dcbec994221baf3cf665d63416908100ec5efda2c599f05?" : "https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"}`}
                          className="shrink-0 w-8 aspect-square self-center ml-3"
                      />
                      Overview
                  </div>
              </div>
            </Link>
            <Link to="/investorReadForm">
              <div className="flex gap-5 pr-5 mt-2 font-medium whitespace-nowrap">
                <div className={`shrink-0 w-1 h-12 rounded-none shadow-sm ${status === "profile" ? " bg-green-400" : "text-neutral-400 border-transparent"}`} />
                <div className={`flex gap-2 pr-12 rounded-lg items-center w-full ${status === "profile" ? "bg-green-400 text-green-400" : "border-transparent"} bg-opacity-20`}>
                      <img
                          loading="lazy"
                          src={`${status === "profile" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a0ac874774d74b16428095b5fd34e492283a512f4a7323a8d6634fc264f32384?apiKey=c7ebd85b29da4b398aac6462eda13ba9&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?"}`}
                          className="shrink-0 w-8 aspect-square self-center ml-3"
                      />
                      Investor details
                  </div>
              </div>
            </Link>
        </div>
    )
}

export default SideBar;
