import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import { createClient } from "@supabase/supabase-js";

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
  const storedProfilePicture = localStorage.getItem("image") || '';
  const [founderDetails, setFounderDetails] = useState({
    email: "",
    name: "",
    linkedin: "",
    phoneNumber: "",
    image: ""
  });
  const myCookies = new Cookies();
    const idFounder = myCookies.get('id');
    const token = myCookies.get('token');

    const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
    const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
    const supabase = createClient(supabaseUrl, supabaseKey);

    if(idFounder){
      console.log(myCookies.get('id'))
    }else{
      console.log("cookies does not exist.")
    }

  const [profilePicture, setProfilePicture] = useState(storedProfilePicture);
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const storedValue = founderDetails.name;
  const valueWithoutSpaces = storedValue.replace(/\s/g, '');
  const fileName = valueWithoutSpaces + "/" + generateRandomString(25);

  

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`https://startupvault-foundry.vercel.app/auth/founder/${idFounder}/`,{
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
            console.log(profilePicture);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    fetchData();
  }, []);

  const handleProfilePictureChange = async (e) => {
    
    let file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setProfilePicture(imageUrl);
    console.log(imageUrl);
    console.log(founderDetails.image);


    localStorage.setItem("image", imageUrl);

    const photoUrl = await uploadUserImg(fileName);
    console.log(photoUrl)
    // const fileUrl = await uploadUserImg(file);

  
    setFounderDetails({
      ...founderDetails,
      image: photoUrl, // Update the image property with the new value
    });
    
  }

  const uploadUserImg = async (fileName) => {
    return fetch(localStorage.getItem("image"))
      .then(response => response.blob())
      .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = await supabase.storage
          .from('userimg')
          .upload(fileName, blob);
  
        if (error) {
          console.error('Error uploading profilePicture:', error.message);
          throw error; // Throw the error to propagate it
        } else {
          console.log('Image uploaded successfully:', fileName);
          return supabaseUrl + "/storage/v1/object/public/userimg/" + fileName;
        }
      })
      .catch(error => {
        console.error('profilePicture fetching image from localhost:', error);
        throw error; // Throw the error to propagate it
      });
  };
  
  const handleUpdate = async () => {
 
    console.log("before: ", founderDetails)
    
    try {
        const response = await fetch(`https://startupvault-foundry.vercel.app/auth/founder/${idFounder}/`, {
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
      <section className="flex flex-col w-[60%] max-md:w-full">
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
                        className="bg-green-700 rounded-full aspect-square w-[160px]"
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
                      // value={founderDetails.image}
                      // onChange={(e) => setFounderDetails({ ...founderDetails, image: e.target.files[0] })}
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
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={founderDetails.email}
                    onChange={(e) => setFounderDetails({ ...founderDetails, email: e.target.value })}
                    required
                  />
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Name</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={founderDetails.name}
                    onChange={(e) => setFounderDetails({ ...founderDetails, name: e.target.value })}
                    required
                  />
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">LinkedIn</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={founderDetails.linkedin}
                    onChange={(e) => setFounderDetails({ ...founderDetails, linkedin: e.target.value })}
                    required
                  />
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Phone Number</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
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
    <NavBar />
    <main className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
      <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
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
                <div className="flex gap-2 mt-5 whitespace-nowrap max-md:mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <div className="grow my-auto">
                    <Link to="/startupReadForm">Startup Details</Link>
                    </div>
                </div>
                <div className="flex gap-5 justify-between self-stretch pr-10 mt-5 font-medium text-green-400 whitespace-nowrap max-md:pr-5">
                  <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                  <div className="flex gap-2 pr-12 pl- py-2 rounded-lg bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ac874774d74b16428095b5fd34e492283a512f4a7323a8d6634fc264f32384?apiKey=9ff2a73e8144478896bce8206c80f3e2&"                      className="shrink-0 w-8 aspect-square"
                    />
                    <div className="flex-auto my-auto">
                    <Link to="/founderReadForm">Founder Details</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <FounderDetails/>
        </aside>
      </main>
    </div>
  );
}

export default EditDetailsPage;