import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import{ useCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import { createClient } from "@supabase/supabase-js";



const PartnerDetails = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies()


  const [partnerDetails, setPartnerDetails] = React.useState({
    name: '',
    linkedin: '',
    email: '',
    phoneNumber: ''
  });
  const myCookies = new Cookies();
  const emailPartner = myCookies.get('email')
  const idPartner = myCookies.get('id')
  const token = myCookies.get('token')
  // const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPhoneNumberValid, setPhoneNumberValid] = React.useState(true);
  const [isDigit, setIsDigit] = React.useState(true);
  const [isLinkedinValid, setLinkedinValid] = React.useState(true);

  const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
  const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
  const supabase = createClient(supabaseUrl, supabaseKey);

  React.useEffect(() => {
    fetchDataPartner();
  }, []);

  const fetchDataPartner = async () => {
    try {
        const response = await fetch(`https://startupvault-foundry.vercel.app/auth/partner/${idPartner}/`, {
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
        setPartnerDetails(entry);

    } catch (error) {
        console.error("Error:", error);
    }
  };

  const handleUpdateImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const blob = new Blob([file]);
      const fileName = file.name;

      const { data: existingFiles, error: existingFilesError } = await supabase.storage
          .from('userimg')
          .list();

      if (existingFilesError) {
          console.error('Error checking existing files:', existingFilesError.message);
          return;
      }

      const filePath = `${partnerDetails.name.replace(/\s/g, '')}/${fileName.replace(/\s/g, '')}`;
      const fileExists = existingFiles.some(file => file.name === fileName);

      if (fileExists) { // Update existing file
        const { data, error } = await supabase.storage
          .from('userimg')
          .update(filePath, blob);
          if (error) {
            console.error('Error updating image:', error.message);
          } else {
            console.log('Image updated successfully:', data);
          }
      } else { // Upload as a new file
        const { data, error } = await supabase.storage
          .from('userimg')
          .upload(filePath, blob);
          if (error) {
            console.error('Error uploading image:', error.message);
          } else {
            console.log('Image uploaded successfully:', data);
          }
      }

      const imageUrl = `${supabaseUrl}/storage/v1/object/public/userimg/${filePath}`;
      setPartnerDetails((prevState) => ({
          ...prevState,
          image: imageUrl
      }));
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const handleUpdateEmail = async (e) => {
    const { value } = e.target;
    setPartnerDetails(prevState => ({
      ...prevState,
      email: value
    }));
  
    // try {
    //   const response = await fetch('https://startupvault-foundry.vercel.app/auth/checkEmail/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email: value }),
    //   });
  
    //   const data = await response.json();
    //   const isValid = !(data.message === 'Email already used' && value !== emailPartner);
    //   setIsEmailValid(isValid);
    //   console.log('Email validation status:', isValid); // Debug: Log the validation status
      
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };
  
  
  const handleUpdateLinkedin = async (e) => {
    const { value } = e.target;
    setPartnerDetails(prevState => ({
      ...prevState,
      linkedin: value
    }));
  
    setLinkedinValid(value.startsWith("https://www.linkedin.com/in/"));
  };

  const handleUpdatePhoneNumber = (e) => {
    const { name, value } = e.target;
    
    // Allow typing but enforce numeric validation
    if (value === '' || (/^\d+$/.test(value) && value.length <= 12)) { 
      // If the input is empty or it's all digits and does not exceed 12 digits
      setPartnerDetails(prevState => ({
        ...prevState,
        [name]: value
      }));
      setIsDigit(true);
      setPhoneNumberValid(true);
    } else if (!/^\d+$/.test(value)) {
      // If the user types a non-digit character
      setIsDigit(false);
    } else if (value.length > 12) {
      // If the input exceeds 12 digits
      setPhoneNumberValid(false);
    }
    console.log("Value:", value);
    console.log("Is Digit:", /^\d*$/.test(value));
    console.log("Is Phone Number Valid:", value.length <= 12);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://startupvault-foundry.vercel.app/auth/partner/${idPartner}/`, {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(partnerDetails),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      const data = await response.json();
      setCookie("login", { path: '/', expires:new Date(Date.now() + 60 * 60 * 1000)});
      // Set each key-value pair from the response JSON as a separate cookie
        Object.keys(data).forEach(key => {
          setCookie(key, data[key], { path: '/', expires:new Date(Date.now() + 60 * 60 * 1000)}); // Set cookie for each key-value pair
        });

      navigate('/partnerReadForm');

    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <div className="flex flex-col justify-center bg-black min-h-screen px-20">
    <NavBar status=""/>
    <main className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
      <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
      <section className="flex flex-col w-[60%] max-md:w-full">
        <form onSubmit={handleSubmit}>
          <div className="px-5 pt-9 pb-20">
              <div className="flex flex-wrap gap-5 justify-between content-center self-start pr-14 text-stone-100 max-md:pr-5">
                  <h2 className="text-stone-100 text-2xl font-semibold tracking-tight text-wrap">Partner Details</h2>
                  <button className="flex gap-1.5 justify-center px-3.5 py-1.5 my-auto text-xl tracking-wide rounded-xl border border-solid shadow-sm bg-neutral-400 bg-opacity-40 border-neutral-400">
                      <span>editing mode</span>
                      {/* Add your image component here */}
                  </button>
              </div>
              {/* Add profile picture change section */}
              <div className="mt-5 flex flex-col">
                <div className="flex gap-4 justify-between self-start mt-5">
                    { partnerDetails.image? (
                    <div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full rounded-full w-[146px] h-[146px] max-md:px-5 bg-green-700"
                    style={{ backgroundImage: `url(${partnerDetails.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      </div>
                    ) : (
                        <div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full rounded-full w-[146px] h-[146px] max-md:px-5 bg-green-700">
                        <div className="flex flex-1 justify-center items-center">
                        <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/47ca398fa854e64d37677f75ca6a4dfad6cf6c9cad694afcabd944dce2397c1b?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                                className="object-cover object-center w-[83px] h-[83px] rounded-xl"
                                alt="Founder's portrait"
                            />
                        </div>
                        </div>
                          )}
                        <div className="flex justify-center items-center mt-3 pl-6">
                        <input
                        type="file"
                        accept="image/*"
                        id="profile-picture-upload"
                        onChange= {handleUpdateImage}
                        style={{ display: "none" }} 
                        />
                    <label htmlFor="profile-picture-upload" className="cursor-pointer text-sm font-light tracking-wide text-blue-400 whitespace-nowrap">
                    Change Photo
                    </label>
                    </div>
                </div>
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Email</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={partnerDetails.email}
                    onChange={handleUpdateEmail}
                    required
                    />
                    {/* {!isEmailValid && (
                    <div className="text-red-500 text-sm mt-2">This email has been taken.</div>
                    )} */}
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Name</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={partnerDetails.name}
                    onChange={(e) => setPartnerDetails({ ...partnerDetails, name: e.target.value })}
                    required
                  />
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">LinkedIn</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={partnerDetails.linkedin}
                    onChange={handleUpdateLinkedin}
                    required
                    />
                    { !isLinkedinValid && (
                    <div className="text-red-500 text-sm mt-2">The link should start with https://www.linkedin.com/in/</div>
                    )}
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Phone Number</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder="Enter phone number"
                    value={partnerDetails.phoneNumber}
                    onChange={(e) => {
                        const { value } = e.target;
                        // Checks if the value is empty or only digits and <= 12 characters
                        if (value === '' || (/^\d+$/.test(value) && value.length <= 12)) {
                        setPartnerDetails(prevState => ({
                            ...prevState,
                            phoneNumber: value
                        }));
                        setIsDigit(true);
                        setPhoneNumberValid(true);
                        } else if (!/^\d+$/.test(value)) {
                        // If the user types a non-digit character
                        setIsDigit(false);
                        } else if (value.length > 12) {
                        // If the input exceeds 12 digits
                        setPhoneNumberValid(false);
                        }
                    }}
                    required
                    />

                    {!isDigit && (
                    <div className="text-red-500 text-sm mt-2">Only numeric values are allowed.</div>
                    )}
                    {!isPhoneNumberValid && (
                    <div className="text-red-500 text-sm mt-2">Phone number must be up to 12 digits.</div>
                    )}
              </div>
              <div className="flex gap-2 mt-5 pr-20 text-xl font-semibold tracking-widest">
                  <a type="button" href="/partnerReadForm" className="px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">cancel</a>
                  <button className="px-5 py-2 text-black bg-green-400 rounded-2xl" type="submit">save</button>
              </div>
          </div>
        </form>
      </section>
      </aside>
      </main>
    </div>
  );
};

export default PartnerDetails;