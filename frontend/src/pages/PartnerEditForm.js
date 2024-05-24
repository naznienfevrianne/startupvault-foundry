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

  const [isEmailValid, setIsEmailValid] = useState(true);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e) => {
    const { value } = e.target;
    const isValidEmail = validateEmail(value);
    setIsEmailValid(isValidEmail); // Update the validity state
    setPartnerDetails({ ...partnerDetails, email: value });
  };
  
  const [isLinkedinValid, setIsLinkedinValid] = useState(true);

    const validateLinkedIn = (url) => {
      const pattern = /^https?:\/\/(www\.)?linkedin\.co/;
      return pattern.test(url);
  };

    const handleLinkedinChange = (e) => {
      const { value } = e.target;
      const isValidLinkedIn = validateLinkedIn(value);
      setIsLinkedinValid(isValidLinkedIn); // Update validity state based on the URL check
      setPartnerDetails({ ...partnerDetails, linkedin: value });
    };

    const [isPhoneValid, setIsPhoneValid] = useState(true);

    const validatePhoneNumber = (phone) => {
      const internationalPattern = /^\+[1-9]{1,3} [0-9]{1,11}$/; // Total max length 16 (including + and spaces)
      const localPattern = /^0[0-9]{1,11}$/; // Total max length 12
      return internationalPattern.test(phone) || localPattern.test(phone);
      };

      const handlePhoneChange = (e) => {
          const { value } = e.target;
          const isValidPhone = validatePhoneNumber(value);
          setIsPhoneValid(isValidPhone); // Update validity state based on the phone number check
          setPartnerDetails({ ...partnerDetails, phoneNumber: value });

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

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const UpdateConfirmationModal = ({ onClose, onUpdate }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-gray-800 p-8 rounded-lg">
          <p className="text-white mb-4">Are you sure you want to update these details?</p>
          <div className="flex justify-end">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={onClose}>No</button>
            <button className="bg-green-500 text-white py-2 ml-2 px-4 mr-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={onUpdate}>Yes</button>
            
          </div>
        </div>
      </div>
    );
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmationModal(true); // Show confirmation modal
  };
  
  const handleUpdateConfirmation = async () => {
    setShowConfirmationModal(false); // Close the modal after confirming
    await handleUpdate(); // Proceed with the update
  };

  return (
    <div className="flex flex-col justify-center bg-black min-h-screen px-20">
    <NavBar status="dashboard"/>
    <main className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
      <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
      <section className="flex flex-col w-[60%] max-md:w-full">
        <form onSubmit={handleSubmit}>
          <div className="px-5 pt-9 pb-20">
              <div className="flex flex-wrap gap-5 justify-between content-center self-start pr-14 text-stone-100 max-md:pr-5">
                  <h2 className="text-stone-100 text-2xl font-semibold tracking-tight text-wrap">Partner Details</h2>
                  <button className="flex gap-1.5 justify-center px-3.5 py-1.5 my-auto text-base tracking-wide rounded-xl border border-solid shadow-sm bg-neutral-400 bg-opacity-40 border-neutral-400">
                      <span>editing mode</span>
                      {/* Add your image component here */}
                  </button>
              </div>
              {/* Add profile picture change section */}
              <div className="flex flex-col">
                <div className="flex gap-4 justify-between self-start mt-2">
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
                    type="email" // More semantic input type for email
                    className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 ${isEmailValid ? 'focus:border-green-400' : 'border-red-500 focus:border-red-500'} focus:outline-none focus:ring-0 peer`}
                    placeholder="Enter your email"
                    value={partnerDetails.email}
                    onChange={handleEmailChange}
                    required
                  />
                  {!isEmailValid && (
                    <div className="text-red-500 text-xs mt-1">
                      Please enter a valid email address.
                    </div>
                  )}
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
                    onChange={handleLinkedinChange}
                    required
                  />
                  {!isLinkedinValid && (
                        <div className="text-red-500 text-xs mt-1">
                            Please enter a valid LinkedIn URL.
                        </div>
                    )}
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Phone Number</div>
                  <input
                      type="text"
                      className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer ${isPhoneValid ? '' : 'border-red-500'}`}
                      placeholder="Enter a valid phone number"
                      value={partnerDetails.phoneNumber}
                      onChange={handlePhoneChange}
                      required
                  />
                  {!isPhoneValid && (
                      <div className="text-red-500 text-xs mt-1">
                        Please enter a valid international number with a country code or local phone number. <br></br>
                        International number starts with + and is followed by 1 to 3 digits. Then, add space between the country code and Phone Number Body. Maximum length of international number is 15 digits.<br></br>
                        Local number starts with 0 and ensure the total length does not exceed 12 digits.
                      </div>
                  )}
              </div>
              <div className="flex gap-2 mt-5 pr-20 text-base font-semibold">
                  <a type="button" href="/partnerReadForm" className="px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">Cancel</a>
                  <button className="px-5 py-2 text-black bg-green-400 rounded-2xl" type="submit">Save</button>
              </div>
          </div>
        </form>
      </section>
      </aside>
      {showConfirmationModal && (
              <UpdateConfirmationModal
                onClose={() => setShowConfirmationModal(false)}
                onUpdate={handleUpdateConfirmation}
              />
            )}
      </main>
    </div>
  );
};

export default PartnerDetails;