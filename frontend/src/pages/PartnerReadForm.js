import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';
import SideBar from '../component/SidePartner';


const PartnerDetails = () => {
    const [partnerDetails, setPartnerDetails] = useState("");
    const storedProfilePicture = localStorage.getItem("image") || '';
    const [profilePicture, setProfilePicture] = useState(storedProfilePicture);
    const myCookies = new Cookies();
    const idPartner = myCookies.get('id');
    const token = myCookies.get('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/auth/partner/${idPartner}/`,{
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
                setPartnerDetails(entry);
                setProfilePicture(entry.image);

            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="flex flex-col px-10 pt-6 pb-20 w-full">
           <a href="/partnerEditForm" className="flex flex-wrap gap-5 items-center pr-20 max-md:pr-5">
              <h1 className="text-2xl font-semibold tracking-wider leading-[54px] text-stone-100 max-md:text-3xl">Partner Details</h1>
              <div className="flex gap-1.5 justify-center px-0.5 my-auto text-l tracking-wide whitespace-nowrap text-neutral-400" href="/partnerEditForm">
                  <div>edit details</div>
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/04c641284d7871837890bdbbf518752e3d58158fa19f353bc7632662bcd27883?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Edit icon" className="shrink-0 aspect-square w-[23px]" />
              </div>
          </a>
          <div className="flex gap-5 justify-between self-start mt-2">
          {profilePicture ? 
          (<div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full rounded-full w-[146px] h-[146px] max-md:px-5 bg-green-700"
          style={{ backgroundImage: `url(${partnerDetails.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
          <div className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]">
              {partnerDetails.name}
          </div>
          <h3 className="mt-5 text-l font-medium tracking-wide text-stone-100 max-md:max-w-full">LinkedIn</h3>
          <div className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]">
              {partnerDetails.linkedin}
          </div>
          <h4 className="mt-5 text-l font-medium tracking-wide text-stone-100 max-md:max-w-full">Email</h4>
          <div className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]">
              {partnerDetails.email}
          </div>
          <h5 className="mt-5 text-l font-medium tracking-wide text-stone-100 max-md:max-w-full">Phone Number</h5>
          <div className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]">
              {partnerDetails.phoneNumber}
          </div>
      </section>
    );
};

function PartnerReadForm() {
  return (
    <div className="flex flex-col justify-center bg-black min-h-screen px-20">
      <NavBar />
      <main className="px-px pb-20 w-full max-md:max-w-full">
        <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
          <SideBar status={"profile"}/>
          <PartnerDetails />
        </aside>
      </main>
    </div>
  );
}

export default PartnerReadForm;
