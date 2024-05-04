import React, { useState, useEffect } from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import SideBar from "../component/SidePartner";
import FileUpload from "./FileUpload";

function CreateEvent() {
const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
     const [partnerData, setPartnerData] = useState({});
        const myCookies = new Cookies();
        const token = myCookies.get('token')
    	const idPartnerOrg = myCookies.get("partnerOrganization")
    	const idPartner = myCookies.get("id")

    const [textColor, setTextColor] = useState('text-neutral-400');

  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    desc: "",
    location: "",
    date: "",
    price: "",
    link: "",
    image: null,
    isVerified: 0,
    rejectionNote: "",
    status: 0,
    partner: idPartner,
  });

  const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleFileSelected = (file) => {
          setFormData({ ...formData, image: file });
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
          };
          reader.readAsDataURL(file);
        };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const jsonData = {
          ...formData, // All the text and number inputs as part of formData // Assuming you want to send this as well, based on your Django view expecting an authenticated user
      };

      console.log(jsonData)

      try {
          const response = await fetch('http://localhost:8000/event/create/', { // Make sure this URL is correct in your environment setup
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`, // Ensure you are sending a token if authentication is required
              },
              body: JSON.stringify(jsonData)
          });

          const data = await response.json();

          if (response.status === 201) {
              alert('Event submitted successfully! Event ID: ' + data.event_id);
          } else {
              alert('Submission failed: ' + JSON.stringify(data.errors));
          }
      } catch (error) {
          console.error('Submission error:', error);
          alert('An error occurred while submitting the form.');
      }
  };


   useEffect(() => {
     fetchDataPartner();
   }, []); // Empty dependency array to run only once on mount

  // Fetch partner data
  const fetchDataPartner = async () => {
      try {
          const response = await fetch(`https://startupvault-foundry.vercel.app/auth/partnerorg/${idPartnerOrg}`, {
              method: "GET",
              headers:{
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token
              }
          });
          if (!response.ok) {
              throw new Error("Failed to fetch data");
          }
          const entry = await response.json();
          console.log(entry); // Check the structure of returned data
          setPartnerData(entry);
      } catch (error) {
          console.error("Error:", error);
      }
  };

  const IconLink = ({ src, alt, text }) => (
    <div className="flex gap-2 justify-center self-start mt-4 text-lg tracking-wide text-neutral-400">
      <img src={src} alt={alt} className="shrink-0 w-6 aspect-square" />
      <div className="underline">{text}</div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col px-8 py-6 max-w-2xl rounded-lg bg-neutral-800 max-md:px-5">
      <div className="flex gap-5 justify-between text-2xl font-medium tracking-wide text-white max-md:flex-wrap max-md:max-w-full">
        <div>Create event</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9221a0fea1725e9ddbbc7353112ba3e1a039f91473d88e295fe58883e456346b?apiKey=a9f236d74bde4869a09f0278cc07ff16&"
          className="shrink-0 my-auto w-6 aspect-square"
        />
      </div>
      <FileUpload onFileSelected={handleFileSelected} currentImage={imagePreviewUrl} />
      <div className="mt-6 text-xs tracking-wider text-neutral-400 max-md:max-w-full">
          BY {partnerData.name ? partnerData.name.toUpperCase() : 'Loading partner...'}
      </div>

      <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setTextColor('text-white')} // Change text color to white when input is focused
            placeholder="Add event name"
            className={`mt-6 text-2xl font-medium tracking-wide bg-transparent border-none focus:outline-none ${textColor}`}
          />
      <input
        type="text"
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        onFocus={() => setTextColor('text-white')}
        placeholder="Add summary"
        className={`mt-4 text-lg tracking-wide bg-transparent border-none focus:outline-none ${textColor}`}
      />

      <div className="shrink-0 mt-6 h-px border border-solid bg-neutral-700 border-neutral-700 max-md:max-w-full" />

      <div className="flex items-center gap-2 mt-4">
                      <IconLink src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bae9d8276e42861834001a9f55336f7893abda9c8df79090b1dc7e631428491?apiKey=a9f236d74bde4869a09f0278cc07ff16&" alt="Location icon" />
                      <input
                          type="text"
                          name="location"
                          onFocus={() => setTextColor('text-white')}
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Add location"
                          className={`text-lg tracking-wide bg-transparent border-none focus:outline-none ${textColor}`}
                      />
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                      <IconLink src="https://cdn.builder.io/api/v1/image/assets/TEMP/724f6fede0e8f92e8fe9d4a9663cc06b78df71879bdda6e0d91048a08eb93923?apiKey=a9f236d74bde4869a09f0278cc07ff16&" alt="Calendar icon" />
                      <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onFocus={() => setTextColor('text-white')}
                          onChange={handleChange}
                          className={`text-lg tracking-wide bg-transparent border-none focus:outline-none ${textColor}`}
                      />
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                      <span className="text-xl font-semibold text-neutral-400">IDR</span>
                      <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onFocus={() => setTextColor('text-white')}
                          onChange={handleChange}
                          placeholder="Add price"
                          className={`text-lg tracking-wide bg-transparent border-none focus:outline-none ${textColor}`}
                      />
                  </div>

      <div className="shrink-0 mt-6 h-px border border-solid bg-neutral-700 border-neutral-700 max-md:max-w-full" />
      <textarea
        name="desc"
        value={formData.desc}
        onChange={handleChange}
        onFocus={() => setTextColor('text-white')}
        placeholder="Add description"
        className={`mt-6 text-xl font-medium tracking-wide text-neutral-400 bg-transparent border-none focus:outline-none ${textColor}`}
      />
      <input
        type="text"
        name="link"
        value={formData.link}
        onChange={handleChange}
        onFocus={() => setTextColor('text-white')}
        placeholder="Add redirect link"
        className="mt-6 text-base font-medium tracking-wide text-white rounded-lg bg-neutral-700 p-2.5 focus:outline-none max-md:pr-5 max-md:max-w-full"
      />
      <button type="submit" className="self-end px-5 py-3 mt-6 text-xl font-semibold tracking-widest text-black bg-green-400 rounded-lg">
        SUBMIT EVENT REQUEST
      </button>
    </form>
  );
}

export default CreateEvent;
