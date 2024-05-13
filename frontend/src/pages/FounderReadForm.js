import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';
import SideBar from '../component/SideFounder';

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
                const response = await fetch(`https://startupvault-foundry.vercel.app/auth/founder/${idFounder}/`,{
                  method: "GET", 
                  headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
            {profilePicture ? 
            (<div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full rounded-full w-[146px] h-[146px] max-md:px-5 bg-green-700"
            style={{ backgroundImage: `url(${founderDetails.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                </div>
            ) : (
              <div className="flex flex-1 justify-center items-center">
                <img loading="lazy" 
                srcSet={profilePicture} 
                className="mt-5 bg-green-700 rounded-full aspect-[0.99] h-[160px] w-[160px]" />
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
      <NavBar status={"dashboard"}/>
      <main className="px-px pb-20 w-full max-md:max-w-full">
        <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
          <SideBar status={"profile"}/>
          <FounderDetails />
        </aside>
      </main>
    </div>
  );
}

export default Dashboard;
