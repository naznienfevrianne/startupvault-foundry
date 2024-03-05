import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FounderForm(props) {
  const storedName = localStorage.getItem("name") || '';
  const storedLinkedin = localStorage.getItem("linkedin") || '';
  const storedFounderEmail = localStorage.getItem("founderEmail") || '';
  const storedPhoneNumber = localStorage.getItem("phoneNumber") || '';
  const storedProfilePicture = localStorage.getItem("profilePicture") || '';
  const [name, setName] = useState(storedName);
  const [linkedin, setLinkedin] = useState(storedLinkedin);
  const [founderEmail, setFounderEmail] = useState(storedFounderEmail);
  const [phoneNumber, setPhoneNumber] = useState(storedPhoneNumber);
  const [profilePicture, setProfilePicture] = useState(storedProfilePicture);
  const navigate = useNavigate();
  const handleProfilePictureChange = (e) => {
    let file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setProfilePicture(imageUrl);
    localStorage.setItem("profilePicture", imageUrl);
  }

  function handleFounderForm () {
    // jika udh divalidasi (duh males bikin casenya LOL)
    localStorage.setItem("name", name);
    localStorage.setItem("linkedin", linkedin);
    localStorage.setItem("founderEmail", founderEmail);
    localStorage.setItem("phoneNumber", phoneNumber);
    navigate("/startupType")
  }
  
  
  return (
    <div className="flex flex-col justify-center bg-black">
      <div className="flex justify-center items-center px-32 py-6 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-0 mb-24 w-full max-w-[1120px] max-md:my-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="text-xs tracking-wide text-neutral-400 max-md:max-w-full">
                To set up your public profile and for us to contact you
              </div>
              <div className="mt-0 text-5xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text-4xl">
                TELL US ABOUT YOU
              </div>
            </div>
            <div className="flex gap-2.5 my-auto">
              <div className="w-3.5 bg-green-400 rounded-full h-[15px] stroke-[1px]" />
              <div className="w-3.5 bg-green-900 rounded-full h-[15px] stroke-[1px]" />
              <div className="w-3.5 bg-green-900 rounded-full h-[15px] stroke-[1px]" />
            </div>
          </div>
          <div className="flex gap-5 justify-between self-start mt-2">
            {profilePicture ? (
              <div className="flex flex-1 justify-center items-center">
              <img
                src={profilePicture}
                loading="lazy"
                className="bg-green-700 rounded-full aspect-square w-[60px]"
              />
              </div>
            ) : (
              <div className="flex flex-1 justify-center items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1283e8092193c0c722a092b3dfa4a94b676b1b578a29876daeb13d2bb7348f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                  loading="lazy"
                  className="bg-green-700 rounded-full aspect-square w-[60px]"
                />
              </div>
            )}
            <div className="flex justify-center items-center mt-3">
        <label htmlFor="profile-picture-upload" className="cursor-pointer text-sm font-light tracking-wide text-blue-400 whitespace-nowrap">
          Change profile picture
        </label>
        <input
          type="file"
          accept="image/*"
          id="profile-picture-upload"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }} // Hide the file input
        />
      </div>
          </div>
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Name
          </div>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          <div className="flex items-center mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            LinkedIn
          </div>
          <div className="flex items-center mt-1 shrink-0 h-10 rounded-lg bg-neutral-800 text-white px-0 py-4 max-md:max-w-full">
            <div className="p-1.5 ml-2.5 text-sm rounded-lg bg-neutral-700 text-white">
              linkedin.com/
            </div>
            <input 
            type="text" 
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="flex-grow h-10 rounded-lg bg-neutral-800 text-white px-4 py-3" />
            </div>
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Email
          </div>
          <input 
            type="email" 
            value={founderEmail}
            onChange={(e) => setFounderEmail(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
         <div className="flex items-center mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Phone Number
          </div>
          <div className="flex items-center mt-1 shrink-0 h-10 rounded-lg bg-neutral-800 text-white px-0 py-4 max-md:max-w-full">
            <div className="p-1.5 ml-2.5 text-sm rounded-lg bg-neutral-700 text-white">
              +62
            </div>
            <input 
            type="text" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="flex-grow h-10 rounded-lg bg-neutral-800 text-white px-4 py-3" />
            </div>
          <div 
          onClick = {handleFounderForm}
          type="button"
          className="flex gap-2.5 justify-center self-end px-2 py-2 mt-4 max-w-full text-xl font-semibold tracking-widest text-black whitespace-nowrap bg-green-400 rounded-3xl w-[106px] hover:border-green-600 border-solid cursor-pointer">
            <div>NEXT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FounderForm;

