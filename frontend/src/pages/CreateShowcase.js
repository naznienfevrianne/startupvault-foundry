import React, { useState } from "react";
import PartnerPage from "./PartnershipModal";
import { createClient } from "@supabase/supabase-js";
import { fetchPosts } from './ShowcasePage.js';
import { useCookies, Cookies } from 'react-cookie';

const Icon = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[52px]" />
);


const myCookies = new Cookies();
const isLogin = myCookies.get('login')
const isVerified = myCookies.get('isVerified')
const token = myCookies.get('token')
const idCookies = myCookies.get('id')
const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
const supabase = createClient(supabaseUrl, supabaseKey);
const profilePicture = myCookies.get("image")

const ShowcaseForm = ({ afterPostSuccess, userRequest, contentRequest, imagesRequest }) => {
  const [cookies] = useCookies();
  const cookieRole = cookies['role'] || '';
//  const cookieLogin = cookies['login'] || '';
  const cookieLogin = true //harus ganti hard code
//  const cookieId = cookies['id'] || '';
  const cookieId = 265 //harus ganti hard code
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("guest");
    // Define the cookie key

    // Use the useCookies hook to access cookies
  const handleButtonClick = (e) => {
    // Prevent the form from submitting if the cookie check fails
    if (!cookieLogin) {
      e.preventDefault();
      alert('You must be logged in to post.');
      return;
    }

    // If the cookie check passes, call the handleSubmit function
    handleSubmit(e);
  };

  const handleImageRemove = (index) => {
      setImages(images.filter((_, i) => i !== index));
    };


  const uploadPostImages = async (files) => {
    const urls = [];
    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;
      console.log(`Uploading file: ${fileName}`); // Debugging log
      try {
        const { error, data } = await supabase.storage.from('showcaseimg').upload(fileName, file);
        if (error) {
          throw error;
        }
        if (data) {
          const url = `${supabaseUrl}/storage/v1/object/public/showcaseimg/${fileName}`; // Adjusted to use fileName directly
          console.log(`Uploaded URL: ${url}`); // Debugging log
          urls.push(url);
        }
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadedUrls = await uploadPostImages(images);

    try {
        const response = await fetch("https://startupvault-foundry.vercel.app/showcase/create_post/", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
            // Include other headers here as needed, such as authorization tokens
          },
          body: JSON.stringify({
            "user": idCookies,
            "content": content,
            "image": uploadedUrls, // Make sure this is the correct format expected by your backend
          }),
        });

        // Check for a Bad Request (400) response
        if (response.status === 400) {
          response.json().then(data => {
            console.log(data); // Log the error message body for debugging
            // Here you can also update the UI to notify the user about the error
          });
        } else if (response.ok) {
          // Handle successful submission here
          // Clear the form, reset state, etc.
          setContent("");
          setImages([]);
          afterPostSuccess();
          window.location.reload()
        } else {
          // Handle other statuses or general error
          console.error("Submission failed with status:", response.status);
        }
      } catch (error) {
        console.error("Failed to submit post:", error);
      }
  };

   async function handleImageChange(e) {
     const newFiles = Array.from(e.target.files); // Convert FileList to Array
     setImages(prevImages => [...prevImages, ...newFiles]); // Append new files to existing images
   }

  const handleTextareaInput = (e) => {
          e.target.style.height = 'inherit'; // Reset field height
          e.target.style.height = `${e.target.scrollHeight}px`; // Set new height based on content
        };


  const ActionButton = ({ iconSrc, iconAlt, children, onClick }) => (
      <button type="button" className="flex items-center justify-center px-8 py-3 bg-green-400 rounded-3xl" onClick={onClick}>
        <img src={iconSrc} alt={iconAlt} className="w-5 h-5 mr-2" />
        {children}
      </button>
    );

  const Avatar = React.memo(({ avatarSrc }) => {
    const defaultAvatar = 'https://yitzsihwzshujgebmdrg.supabase.co/storage/v1/object/public/userimg/avatar.png'; // path to the default avatar
    return (
      <div className="flex justify-center items-center self-start aspect-square">
        <img loading="lazy" alt="User avatar" src={avatarSrc || defaultAvatar} className="rounded-full bg-green-400 bg-opacity-20 w-[39px] h-[39px]" />
      </div>
    );
  });

  const closeModal = () => setIsModalOpen(false);

  const getWrapperClass = (imageCount) => {
    switch(imageCount) {
      case 1:
        return "flex justify-center items-center";
      case 2:
      case 3:
        return "flex flex-row flex-wrap justify-center items-center";
      case 4:
      default:
        return "flex flex-row flex-wrap justify-center items-center";
    }
  };

  const ImagePreview = ({ images, onRemove }) => {
    return (
      <div className="flex flex-wrap justify-center items-center gap-2">
        {images.map((file, index) => (
          <div key={index} className="w-[345px] h-[160px] overflow-hidden rounded-lg relative">
            <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="w-full h-full object-cover" />
            <button
              className="bg-black bg-opacity-50 absolute top-2 right-2 text-white p-1 rounded-full"
              onClick={() => onRemove(index)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24= 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        ))}
      </div>
    );
  };


  return (
      <>

      {isLogin && isVerified === 1 && (
        <form onSubmit={handleSubmit} className="flex flex-col p-6 rounded-lg bg-neutral-800" style={{ minHeight: '149px' }}>
        <div className="flex items-center gap-4">
          <Avatar avatarSrc={profilePicture} />
          <textarea
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      handleTextareaInput(e);
                    }}
                    className="textarea bg-transparent mb-4 flex-1 pt-1 text-base focus:outline-none text-[#F3F1ED] overflow-hidden resize-none"
                    placeholder="Any thoughts, jobs, links you want to share?"
                    style={{ minHeight: '43px' }} // Set initial minimum height
          />
        </div>
        {/* Image Preview Section */}
        {images.length > 0 && (
          <div className="mb-4"> {/* Add margin-bottom to create space between the preview and buttons */}
            <ImagePreview images={images} onRemove={handleImageRemove} />
          </div>
        )}
        {/* Row for Image Upload and POST Button */}
        <div className="flex items-center justify-between ml-12">
          {/* Image Upload Button */}
          <label htmlFor="image-upload" className="cursor-pointer flex items-center gap-4">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fb975a2ee80526bf1c672d3b773278da2e66220e974b2a00c324524d3e639ee?" alt="Upload Icon" />
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageChange}
              multiple
              className="hidden"
            />
          </label>
          {/* POST Button */}
          <button type="submit" className="flex items-center font-semibold justify-center px-8 py-3 bg-green-400 rounded-3xl" onClick={handleButtonClick}>
            Post
          </button>
        </div>
      </form>
      )}
        {isModalOpen && (
          <div className="modal">
            <PartnerPage />
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </>
    );
};

export default ShowcaseForm;
