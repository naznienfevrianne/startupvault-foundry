import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import NavBar from '../component/NavBar';
import { Link } from 'react-router-dom'

const StartupDetails = () => {
    const [startupDetails, setStartupDetails] = useState("");
    const profilePicture = localStorage.getItem("profilePicture") || '';
    const myCookies = new Cookies();
    const idStartup = myCookies.get('startup');
    const token = myCookies.get('token');

    if(idStartup){
      console.log(myCookies.get('startup'))
    }else{
      console.log("cookies does not exist.")
    }
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`,{
                    method: "GET", 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                    })
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const entry = await response.json();
                setStartupDetails(entry);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col justify-center pb-20 bg-black px-20">
          <NavBar />
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full pl-0">
              <div className="flex flex-col items-center self-stretch pb-2 mt-6 text- tracking-wide text-neutral-400">
                <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="flex-auto">Search in dashboard</div>
                </div>
                <div className="flex gap-2 mt-5 whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <div className="grow my-auto">
                  <Link to="/dashboard">Overview</Link>
                    </div>
                </div>
                <div className="flex gap-2 mt-5 whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="grow my-auto">
                        <Link to="/diary">Weekly Updates</Link>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-between self-stretch pr-10 mt-5 font-medium text-green-400 whitespace-nowrap max-md:pr-5">
                  <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                  <div className="flex gap-2 pr-12 pl- py-2 rounded-lg bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbfe1e3b28c84ff800a8172798e7a2d18a3c86aff8fc82df5ba2d6080962d15a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      />
                    <div className="flex-auto my-auto">
                    <Link to="/startupReadForm">Startup Details</Link>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-5 whitespace-nowrap max-md:mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <div className="grow my-auto">
                  <Link to="/founderReadForm">Founder Details</Link>
                    </div>
                </div>
              </div>
            </div>
              <div className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pt-6 pr-24 pl-5 max-md:max-w-full">
                  <div className="flex flex-wrap gap-5 justify-between content-center pr-52 w-full max-md:pr-5 max-md:max-w-full">
                    <a href="/startupEditForm" className="flex flex-wrap gap-5 justify-between content-center pr-20 max-md:pr-5">
                        <h1 className="text-5xl font-semibold tracking-wider leading-[54px] text-stone-100 max-md:text-4xl">Startup Details</h1>
                        <div className="flex gap-1.5 justify-center px-0.5 my-auto text-xl tracking-wide whitespace-nowrap text-neutral-400" href="/FounderEditForm">
                            <div className="grow">edit details</div>
                            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/04c641284d7871837890bdbbf518752e3d58158fa19f353bc7632662bcd27883?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Edit icon" className="shrink-0 aspect-square w-[23px]" />
                        </div>
                    </a>
                  </div>
                  <div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full bg-green-700 rounded-xl w-[146px] max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/47ca398fa854e64d37677f75ca6a4dfad6cf6c9cad694afcabd944dce2397c1b?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="aspect-[1.01] w-[83px]"
                    />
                  </div>
                  <div className="mt-3.5 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Stage
                  </div>
                  <div className="flex flex-col justify-center py-1.5 pr-12 pl-3.5 mt-1.5 max-w-full text-sm font-light tracking-normal text-green-400 whitespace-nowrap rounded-2xl bg-zinc-700 w-[120px] max-md:px-5">
                    <div className="flex gap-1.5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/840292478f0d7f6090094a8c19cb25c0c63ead503920efdeec04b8e9651363db?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 aspect-[1.04] w-[23px]"
                      />
                      <div className="flex-auto my-auto mr-6">   {startupDetails.typ}</div>
                    </div>
                  </div>
                  <div className="mt-1.5 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Name
                  </div>
                  <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-3 text-sm tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                  {startupDetails.name}
                  </div>
                  <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Operational Location{" "}
                  </div>
                  <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-3 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                  {startupDetails.location}
                  </div>
                  <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Sector
                  </div>
                  <div className="flex gap-2.5 py-3 pr-20 mt-3 text-base font-semibold tracking-normal rounded-md text-stone-100 max-md:flex-wrap max-md:pr-5">
                    <div className="justify-center px-3 py-1.5 rounded-2xl border border-green-400 border-solid">
                      belum
                    </div>
                    <div className="justify-center px-3 py-1.5 whitespace-nowrap rounded-2xl border border-green-400 border-solid">
                      handle
                    </div>
                  </div>
                  <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Describe your startup in less than 50 words
                  </div>
                  <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-3 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                  {startupDetails.desc}
                  </div>
                  <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Startup Pitchdeck
                  </div>
                  <div className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-green-400 border-solid bg-green-400 bg-opacity-20 text-stone-100 max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc2edde9f8ae8f079b56f3bbd090661b2694c068012ac8b9ab8b9a0a34ddb1d8?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="shrink-0 w-6 aspect-square"
                      href={startupDetails.pitchdeck}
                    />
                    <div className="flex-auto my-auto">pitchdeck.pdf</div>
                  </div>
                  <div className="self-start mt-3 text-base font-medium tracking-wide text-stone-100">
                    Revenue over the last 6 months
                  </div>
                  <div className="self-start mt-3 text-base font-semibold tracking-normal text-green-400">
                  USD {startupDetails.revenue}K
                  </div>
                  <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    What kind of support do you need in the StartupVault ecosystem?
                  </div>
                  <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-3 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                  {startupDetails.support}
                  </div>
                  <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Startup Website
                  </div>
                  <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-3 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                  {startupDetails.website}
                  </div>
                  <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                  Startup LinkedIn
                  </div>
                  <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-3 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                  {startupDetails.linkedin}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}


export default StartupDetails;