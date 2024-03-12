import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const StartupDetails = () => {
    const [startupDetails, setStartupDetails] = useState("");
    const startupLogo = localStorage.getItem("image") || '';
    const pitchdeckFile = localStorage.getItem("pitchdeckFile") || '';
    const myCookies = new Cookies();
    const idStartup = myCookies.get('startup');
    const token = myCookies.get('token');

    if(idStartup){
      console.log(myCookies.get('startup'))
    }else{
      console.log("cookies does not exist.")
    }

    const sectorsArray = startupDetails.sector ? startupDetails.sector.split(',') : [];
    console.log(startupDetails.sector);
    console.log(sectorsArray)
    console.log(myCookies.get('startup'))
    console.log(pitchdeckFile.name);
    console.log(startupDetails.pitchdeck);
    console.log(startupDetails.image);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const response = await fetch(`http://localhost:8000/auth/startup/${idStartup}/`,{
                    method: "GET", 
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer' + token
                    }
                    })
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const entry = await response.json();
                setStartupDetails(entry);
                console.log(pitchdeckFile.name);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
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
            <div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full rounded-xl w-[146px] h-[146px] max-md:px-5 bg-green-700"
            style={{ backgroundImage: `url(${startupDetails.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                {startupDetails.image ? (
                    <div className="flex flex-1 justify-center items-center">
                        {/* <img
                            src={startupDetails.image}
                            loading="lazy"
                            className="rounded-xl w-[146px] h-[146px] object-cover object-center"
                            alt="logo startup"
                        /> */}
                    </div>
                ) : (
                    <div className="flex flex-1 justify-center items-center">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/47ca398fa854e64d37677f75ca6a4dfad6cf6c9cad694afcabd944dce2397c1b?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                            className="object-cover object-center w-[83px] h-[83px] rounded-xl"
                            alt="Founder's portrait"
                        />
                    </div>
                )}
            </div>
            <div className="mt-3.5 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Stage
            </div>
            <div className={`flex flex-col justify-center py-1.5 pr-12 pl-3.5 mt-1.5 max-w-full text-sm font-light tracking-normal text-green-400 whitespace-nowrap rounded-2xl bg-zinc-700 ${
            startupDetails.typ === 'idea' || startupDetails.typ === 'seed' ? 'w-[90px]' :
            startupDetails.typ === 'growth' ? 'w-[100px]' : ''
            } 'w-[120px]'`}>
            <div className="flex gap-1.5">
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/840292478f0d7f6090094a8c19cb25c0c63ead503920efdeec04b8e9651363db?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 aspect-[1.04] w-[23px]"
                />
                <div className="flex-auto my-auto mr-6">{startupDetails.typ}</div>
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
{sectorsArray.map((sector, index) => (
<div key={index} className="justify-center px-3 py-1.5 rounded-2xl border border-green-400 border-solid">
{sector.trim()} {/* Trim to remove any leading or trailing whitespace */}
</div>
))}
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
            <a href={startupDetails.pitchdeck} className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-green-400 border-solid bg-green-400 bg-opacity-20 text-stone-100 max-md:px-5">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc2edde9f8ae8f079b56f3bbd090661b2694c068012ac8b9ab8b9a0a34ddb1d8?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 w-6 aspect-square"
                href={startupDetails.pitchdeck}
            />
            <div className="flex-auto my-auto">pitch deck (.pdf)</div>
            </a>
            <div className="self-start mt-3 text-base font-medium tracking-wide text-stone-100">
            Revenue over the last 6 months
            </div>
            <div className="self-start mt-3 text-base font-semibold tracking-normal text-green-400">
            {(() => {
                switch (startupDetails.revenue) {
                case 0:
                    return 'USD 0-50K';
                case 1:
                    return 'USD 1-10K';
                case 2:
                    return 'USD 11-50K';
                case 3:
                    return 'USD 51-100K';
                case 4:
                    return 'USD 101-500K';
                case 5:
                    return 'USD 501+K';
                default:
                    return 'N/A'; // Default case if the value is not in the specified range
                }
            })()}
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

      );
}

function StartupReadDetails() {
    const myCookies = new Cookies();
    const idFounder = myCookies.get('id')
    const nameFounder = myCookies.get('name')
    const profilePicture = myCookies.get('image')
    const idStartup = myCookies.get('startup')
    const token = myCookies.get('token')
  
    const menuItems = [
      { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Overview icon", text: "Overview" },
      { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Updates icon", text: "Weekly Updates" },
      { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Details icon", text: "Startup Details" },
    ];
  
    return (
      <div className="flex flex-col justify-center bg-black min-h-screen px-20">
        <header className="flex gap-5 justify-between px-20 py-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-1 justify-between items-center self-start text-white max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto text-l italic font-semibold tracking-wider leading-10">
              startupvault.id
              </div>
            <nav className="flex gap-5 justify-between items-center px-8 my-auto text-l font-light max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="grow">Showcase</div>
              <div>Events</div>
              <div className="flex-auto">Our Investors</div>
              <div className="grow whitespace-nowrap text-stone-100">Our Startups</div>
            </nav>
          </div>
        
          <div className="flex gap-2 rounded-[30px]">
            <div className="grow justify-center px-3 py-2 text-l font-light text-green-400 whitespace-nowrap rounded-2xl bg-green-400 bg-opacity-20">My Dashboard</div>
            <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
              <div className="flex justify-center items-center self-stretch aspect-square">
                <img loading="lazy"
                srcSet={profilePicture} 
                alt="User profile" 
                className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[30px]" />
              </div>
              <div className="self-stretch my-auto text-l font-medium tracking-wide text-stone-100">{nameFounder}</div>
              <img loading="lazy" 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/081086ccfbd0bbab3badfd8655a0ab414aaf7a31d08fbc1f5199388c6bac11c8?apiKey=9ff2a73e8144478896bce8206c80f3e2&" 
              alt="Settings icon" className="shrink-0 self-stretch my-auto aspect-square w-[18px]" />
            </div>
          </div>
        </header>
        <main className="px-px pb-20 w-full max-md:max-w-full">
          <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch mt-6 text-l tracking-wide">
                <div className="flex flex-col pr-7 pl-10 text-neutral-400 max-md:px-5">
                  <div className="flex gap-3 p-4 mr-0 -ml-px text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/92e705fdbc7d9eb92b8784a8c1ceb52df03c8aa7b6b8e5c590f04dd435f3a923?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Search icon" className="shrink-0 w-5 aspect-square" />
                    <div className="flex-auto -mr-0.5">Search in dashboard</div>
                  </div>
                  <div className="flex gap-2 self-start mt-10 ml-4 text-l tracking-wide whitespace-nowrap text-neutral-400 max-md:ml-2.5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?"
                        className="w-8 aspect-square"
                      />
                      <div className="grow my-auto"><Link to="/dashboard">Overview</Link></div>
                    </div>
                </div>
  
                <div className="flex gap-2 self-center mt-10 text-l tracking-wide whitespace-nowrap text-neutral-400">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?"
                      className="w-8 aspect-square"
                    />
  
  
                    <div className="grow my-auto">                        
                    <Link to="/diary">Weekly Updates</Link>
                    </div>
                  </div>
  
                  <div className="flex gap-2 self-center mt-10 text-l tracking-wide whitespace-nowrap text-neutral-400">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
                      className="w-8 aspect-square"
                    />
  
  
                    <div className="grow my-auto">                        
                    <Link to="/startupReadForm">Startup Details</Link>
                    </div>
                  </div>
  
  
                <div className="flex gap-5 justify-between pr-10 mt-10 text-green-400 max-md:pr-5">
                  <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                  <div className="flex gap-2 px-4 py-2 -mr-1 rounded-lg bg-green-400 bg-opacity-20">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ac874774d74b16428095b5fd34e492283a512f4a7323a8d6634fc264f32384?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Founder details icon" className="shrink-0 w-8 aspect-square" />
                    <div className="grow my-auto">                       
                         <Link to="/founderReadForm">Founder Details</Link>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <StartupDetails/>
          </aside>
        </main>
      </div>
    );
  }


export default StartupReadDetails;