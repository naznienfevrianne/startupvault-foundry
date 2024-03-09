import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import{ Cookies } from 'react-cookie';

// Reusable Image Component
const ImageWithAlt = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

// Reusable Icon Link Component
const IconLink = ({ src, alt, label, className }) => (
  <div className={`flex gap-2 items-center ${className}`}>
    <ImageWithAlt src={src} alt={alt} className="shrink-0 w-8 aspect-square" />
    <div className="grow my-auto">{label}</div>
  </div>
);

const FounderDetails = () => {
  const storedProfilePicture = localStorage.getItem("profilePicture") || '';
  const [founderDetails, setFounderDetails] = useState({
    email: "",
    name: "",
    linkedin: "",
    phoneNumber: ""
  });
  const myCookies = new Cookies();
    const idFounder = myCookies.get('id');
    const token = myCookies.get('token');

    if(idFounder){
      console.log(myCookies.get('id'))
    }else{
      console.log("cookies does not exist.")
    }

  const [profilePicture, setProfilePicture] = useState(storedProfilePicture);

  const navigate = useNavigate();

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
        } catch (error) {
            console.log("Error:", error);
        }
    };

    fetchData();
  }, []);

  const handleProfilePictureChange = (e) => {
    
    let file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setProfilePicture(imageUrl);
    localStorage.setItem("profilePicture", imageUrl);
  }


  const handleUpdate = async () => {
    try {
        const response = await fetch(`http://localhost:8000/auth/founder/${idFounder}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(founderDetails),
        });
        if (!response.ok) {
            throw new Error("Failed to update data");
        }
        console.log("Data updated successfully");
        console.log("Navigating to /founderReadForm...");
        navigate('/founderReadForm');
    } catch (error) {
        console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
      <section className="flex flex-col w-[77%] max-md:w-full">
        <form onSubmit={handleSubmit}>
          <div className="px-5 pt-9 pb-20">
              <div className="flex flex-wrap gap-5 justify-between content-center self-start pr-14 text-stone-100 max-md:pr-5">
                  <h2 className="text-5xl font-semibold tracking-wider leading-[54px]">Founder Details</h2>
                  <button className="flex gap-1.5 justify-center px-3.5 py-1.5 my-auto text-xl tracking-wide rounded-xl border border-solid shadow-sm bg-neutral-400 bg-opacity-40 border-neutral-400">
                      <span>editing mode</span>
                      {/* Add your image component here */}
                  </button>
              </div>
              {/* Add profile picture change section */}
              <div className="mt-5 flex flex-col">
                  {/* Replace the following divs with input fields for editing */}
                  <div className="flex gap-4 self-start mt-5">
                    {profilePicture ? (
                      <div className="flex flex-1 justify-center items-center">
                      <img
                        src={profilePicture}
                        loading="lazy"
                        className="bg-green-700 rounded-full aspect-square w-[250px]"
                        alt="profile avatar"
                      />
                      </div>
                    ) : (
                      <div className="flex flex-1 justify-center items-center">
                        <img loading="lazy" 
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        alt="Founder's portrait" className="mt-5 bg-green-700 rounded-full aspect-[0.99] h-[160px] w-[160px]" />
                      </div>
                          )}
                        <div className="flex justify-center items-center mt-3 pl-6">
                    <input
                      type="file"
                      accept="image/*"
                      id="profile-picture-upload"
                      onChange={handleProfilePictureChange}
                      style={{ display: "none" }} // Hide the file input
                    />
                    <label htmlFor="profile-picture-upload" className="cursor-pointer text-sm font-light tracking-wide text-blue-400 whitespace-nowrap">
                      Change profile picture
                    </label>
                    </div>
                  </div>
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Email</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={founderDetails.email}
                    onChange={(e) => setFounderDetails({ ...founderDetails, email: e.target.value })}
                    required
                  />
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Name</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={founderDetails.name}
                    onChange={(e) => setFounderDetails({ ...founderDetails, name: e.target.value })}
                    required
                  /><div className="mt-5 text-xl font-medium tracking-wide text-stone-100">LinkedIn</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={founderDetails.linkedin}
                    onChange={(e) => setFounderDetails({ ...founderDetails, linkedin: e.target.value })}
                    required
                  />
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Phone Number</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={founderDetails.phoneNumber}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const numericValue = parseInt(inputValue);

                        // Check if the input is not a number or if its length exceeds 12
                        if (isNaN(numericValue) || inputValue.length > 12) {
                            alert("Please enter a valid phone number with a maximum of 12 numbers.");
                            return;
                        }

                        // Update the state only if it meets the criteria
                        setFounderDetails({ ...founderDetails, phoneNumber: inputValue });
                    }}
                    required
                  />
              </div>
              <div className="flex gap-2 mt-5 pr-20 text-xl font-semibold tracking-widest">
                  <a type="button" href="/founderReadForm" className="px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">cancel</a>
                  <button className="px-5 py-2 text-black bg-green-400 rounded-2xl" type="submit">save</button>
              </div>
          </div>
        </form>
      </section>
  );
};

function EditDetailsPage() {
  // Data for navigation links
  const navLinks = [
    { label: 'Showcase', key: 'showcase' },
    { label: 'Events', key: 'events' },
    { label: 'Our Investors', key: 'our-investors' },
    { label: 'Our Startups', key: 'our-startups' },
  ]
    
  ;

  return (
    <div className="flex flex-col justify-center bg-black">
      <header className="flex gap-5 justify-between py-6 px-20 w-full max-md:flex-wrap max-md:px-5">
        <nav className="flex gap-5 justify-between text-white max-md:flex-wrap">
          <div className="text-4xl italic font-semibold tracking-wider leading-10">startupvault.id</div>
          <div className="flex gap-5 px-5 py-3 text-xl font-light">
            {navLinks.map(link => (
              <div key={link.key} className="grow">{link.label}</div>
            ))}
          </div>
        </nav>
        <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
          <ImageWithAlt src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="User Profile" className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[30px] w-[30px]" />
          <div className="text-xl font-medium tracking-wide text-stone-100">Naznien</div>
          <ImageWithAlt src="https://cdn.builder.io/api/v1/image/assets/TEMP/aca2dff95296ab989f15145ad36a70193b5909ff90be344bcc4f7b745efb7c2c?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Settings Icon" className="shrink-0 aspect-square w-[18px]" />
        </div>
      </header>
      <main className="px-px pb-20 w-full">
        <section className="flex gap-5 max-md:flex-col">
          <aside className="flex flex-col w-[23%] max-md:w-full">
            <div className="mt-6 px-10 text-neutral-400">
              <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                <ImageWithAlt src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cb446593643fc5888a09f9076f1b9a6893981e0397365468e85765b7a309812?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Search Icon" className="shrink-0 w-5 aspect-square" />
                <div>Search in dashboard</div>
              </div>
              {[
                { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8e45b697ba9280e7165307c6c05ef695190fe00175e4c3795f18d129cd84075?apiKey=9ff2a73e8144478896bce8206c80f3e2&", label: "Overview", alt: "Overview Icon" },
                { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?apiKey=9ff2a73e8144478896bce8206c80f3e2&", label: "Weekly Updates", alt: "Updates Icon" },
                { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?apiKey=9ff2a73e8144478896bce8206c80f3e2&", label: "Startup Details", alt: "Details Icon" },
              ].map((item, index) => (
                <IconLink key={index} src={item.src} alt={item.alt} label={item.label} className="mt-10" />
              ))}
              <div className="flex gap-5 justify-between mt-10 text-green-400">
                <div className="w-1 h-12 bg-green-400 rounded-none shadow-sm"></div>
                <IconLink src="https://cdn.builder.io/api/v1/image/assets/TEMP/4353c199aa337d69d582f433be97a45637b37c04f61a6f6b59f69e10302e5fb3?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Founder Details Icon" label="Founder Details" className="px-4 py-2 rounded-lg bg-green-400 bg-opacity-20" />
              </div>
            </div>
          </aside>
          <FounderDetails/>
        </section>
      </main>
    </div>
  );
}

export default EditDetailsPage;