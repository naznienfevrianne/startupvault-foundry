import * as React from "react";
import { Link } from 'react-router-dom';

const SideBar = ({ status }) => {
    return (    
        <div className="flex flex-col self-start pb-2 mt-6 gap-0 tracking-wide text-neutral-400">
          <div className="flex gap-3 w-fit p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
                className="shrink-0 w-5 aspect-square"
            />
            <div className="mr-2">Search in dashboard</div>
          </div>
          <div className="flex gap-5 pr-10 mt-5 font-medium whitespace-nowrap max-md:pr-5">
            <div className={`shrink-0 w-1 h-12 rounded-none shadow-sm ${status === "overview" ? " bg-green-400" : "text-neutral-400 border-transparent"}`}/>
            <div className={`flex gap-2 pl-2 py-2 pr-12 rounded-lg items-center w-full ${status === "overview" ? "bg-green-400 text-green-400" : "border-transparent"} bg-opacity-20`}>
              <img
                loading="lazy"
                src={`${status === "overview" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/f1487560442a58b51dcbec994221baf3cf665d63416908100ec5efda2c599f05?" : "https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"}`}
                className="shrink-0 w-8 aspect-square"
              />
              <Link to="/dashboardPartner">Overview</Link>
            </div>
          </div>
          <div className="flex gap-5 pr-10 mt-2 font-medium whitespace-nowrap max-md:pr-5">
            <div className={`shrink-0 w-1 h-12 rounded-none shadow-sm ${status === "post" ? " bg-green-400" : "text-neutral-400 border-transparent"}`}/>
            <div className={`flex gap-2 pl-2 py-2 pr-12 rounded-lg items-center w-full ${status === "post" ? "bg-green-400 text-green-400" : "border-transparent"} bg-opacity-20`}>
              <img
                loading="lazy"
                src={`${status === "post" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/89f9a223f436f264182c212b454f58e94b97308174a5a6dff0f2b0c301b3ac68?apiKey=c7ebd85b29da4b398aac6462eda13ba9&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/2415dbb250d9f799a4cd3a1aa223891eb0371a48c9f1434d447ff853a457fb6e?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"}`}
                className="shrink-0 w-8 aspect-square self-center"
              />
              <Link to="/created-showcase">Post</Link>
            </div>
          </div>
          <div className="flex gap-5 pr-10 mt-2 font-medium whitespace-nowrap max-md:pr-5">
            <div className={`shrink-0 w-1 h-12 rounded-none shadow-sm ${status === "profile" ? " bg-green-400" : "text-neutral-400 border-transparent"}`}/>
            <div className={`flex gap-2 pl-2 py-2 pr-12 rounded-lg items-center w-full ${status === "profile" ? "bg-green-400 text-green-400" : "border-transparent"} bg-opacity-20`}>
              <img
                loading="lazy"
                src={`${status === "profile" ? "https://cdn.builder.io/api/v1/image/assets/TEMP/a0ac874774d74b16428095b5fd34e492283a512f4a7323a8d6634fc264f32384?apiKey=c7ebd85b29da4b398aac6462eda13ba9&" : "https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?"}`}
                className="shrink-0 w-8 aspect-square self-center"
              />
              <div className="text-neutral-400 text- font-normal item-center tracking-tight">Partner details</div>
            </div>
          </div>
				</div>
    )
}

export default SideBar;
