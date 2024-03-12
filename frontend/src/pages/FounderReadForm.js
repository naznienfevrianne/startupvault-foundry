import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const MenuItem = ({ src, alt, children }) => (
  <div className="flex gap-2 self-start mt-10 whitespace-nowrap max-md:ml-2.5">
    <img loading="lazy" src={src} alt={alt} className="shrink-0 w-8 aspect-square" />
    <div className="grow my-auto">{children}</div>
  </div>
);

const FounderDetails = () => {

    const [founderDetails, setFounderDetails] = useState("");
    const storedProfilePicture = localStorage.getItem("image") || '';
    const [profilePicture, setProfilePicture] = useState(storedProfilePicture);
    const myCookies = new Cookies();
    const idFounder = myCookies.get('id');
    const token = myCookies.get('token');

    if(idFounder){
      console.log(myCookies.get('id'))
    }else{
      console.log("cookies does not exist.")
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/auth/founder/${idFounder}/`,{
                  method: "GET", 
                  headers:{
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                  }
                  }
                  );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const entry = await response.json();
                setFounderDetails(entry);
                setProfilePicture(entry.image);

            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="flex flex-col px-5 pt-9 pb-20 max-md:max-w-full">
            <a href="/founderEditForm" className="flex flex-wrap gap-5 justify-between content-center pr-20 max-md:pr-5">
                <h1 className="text-3xl font-semibold tracking-wider leading-[54px] text-stone-100 max-md:text-3xl">Founder Details</h1>
                <div className="flex gap-1.5 justify-center px-0.5 my-auto text-l tracking-wide whitespace-nowrap text-neutral-400" href="/FounderEditForm">
                    <div className="grow">edit details</div>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/04c641284d7871837890bdbbf518752e3d58158fa19f353bc7632662bcd27883?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Edit icon" className="shrink-0 aspect-square w-[23px]" />
                </div>
            </a>
            <div className="flex gap-5 justify-between self-start mt-2">
            {profilePicture ? (
              <div className="flex flex-1 justify-center items-center">
              <img
                srcSet={profilePicture}
                loading="lazy"
                className="bg-green-700 rounded-full aspect-square w-[180px]"
                alt="profile avatar"
              />
              </div>
            ) : (
              <div className="flex flex-1 justify-center items-center">
                <img loading="lazy" 
                srcSet={profilePicture} 
                alt="Founder's portrait" className="mt-5 bg-green-700 rounded-full aspect-[0.99] h-[160px] w-[160px]" />
              </div>
            )}
            </div>
            <h2 className="mt-5 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">Name</h2>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.name}
            </div>
            <h3 className="mt-5 text-l font-medium tracking-wide text-stone-100 max-md:max-w-full">LinkedIn</h3>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.linkedin}
            </div>
            {/* <div className="flex flex-col justify-center items-start py-1.5 pr-20 mt-2.5 text-sm tracking-normal text-white whitespace-nowrap rounded-md bg-neutral-800 max-md:pr-6 max-md:max-w-full">
                <div className="justify-center p-2 rounded-md bg-neutral-700">linkedin.com/in/</div> {founderDetails.linkedin}
            </div> */}
            <h4 className="mt-5 text-l font-medium tracking-wide text-stone-100 max-md:max-w-full">Email</h4>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.email}
            </div>
            <h5 className="mt-5 text-l font-medium tracking-wide text-stone-100 max-md:max-w-full">Phone Number</h5>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.phoneNumber}
            </div>
        </section>
    );
};

function Dashboard() {
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
          <FounderDetails />
        </aside>
      </main>
    </div>
  );
}

export default Dashboard;
