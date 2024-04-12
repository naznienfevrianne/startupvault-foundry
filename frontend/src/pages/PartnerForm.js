import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";


function PartnerForm(props) {
    
    const storedPartnerLogo = localStorage.getItem("partnerLogo") | "";
    const [partnerLogo, setPartnerLogo]= useState(storedPartnerLogo);
    const storedPartnerName = localStorage.getItem("partnerName") || "";
    const [partnerName, setPartnerName] = useState(storedPartnerName);
    const storedPartnerLocation = localStorage.getItem("partnerLocation") || "";
    const [partnerLocation, setPartnerLocation] = useState(storedPartnerLocation);
    const storedPartnerDescription = localStorage.getItem("partnerDescription") || "";
    const [partnerDescription, setPartnerDescription] = useState(storedPartnerDescription);
    const storedPartnerInterest = localStorage.getItem("partnerInterest") || "";
    const [partnerInterest, setPartnerInterest] = useState(storedPartnerInterest)
    const storedPartnerWebsite = localStorage.getItem("partnerWebsite") || "";
    const [partnerWebsite, setPartnerWebsite] = useState(storedPartnerWebsite);
    const storedPartnerLinkedin = localStorage.getItem("partnerLinkedin") || "";
    const [partnerLinkedin, setPartnerLinkedin] = useState(storedPartnerLinkedin);
    const navigate = useNavigate();
    const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
    const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const options = [
        ['Technology and SaaS', 'E-commerce and Marketplaces', 'HealthTech and MedTech', 'FinTech', 'CleanTech and Sustainability'], // Column 1
        ['Gaming and Entertainment', 'Food and Agriculture', 'Education and Self Development', 'Insurance', 'Travel'], // Column 2
        ['Mobility Tech (EV, ride-sharing, ride-hailing)', 'Human Resource', 'Human and Psychology', 'Gender and Society'] // Column 3
      ];
    const options2 = [
        'Pre-seed', 'Series A', 'Beyond A'
    ]
    const options3 = [
        'Capital', 'Mentorship', 'Introductions', 'Legal Assistance'
    ]
    const [errorMessage, setErrorMessage] = useState(' ');

      

    function handlePrevious () {
        navigate("/partnerType")
    }

    const handleSubmit = async () => {
      let partnerLogoValid = true
      let partnerNameValid = true
      let partnerLocationValid = true
      let partnerDescriptionValid = true
      let partnerInterestValid = true
      let partnerWebsiteValid = true
      let partnerLinkedinValid = true

      if (!partnerLinkedin || partnerLinkedin < 1) {
        partnerLinkedinValid = false
        setErrorMessage("Please input valid organization's linkedin link")
      }

      if (!partnerWebsite || partnerWebsite < 4 || !partnerWebsite.includes(".")) {
        partnerWebsiteValid = false
        setErrorMessage("Please input valid organization's website")
      }

      if (!partnerInterest || partnerInterest < 1 || partnerInterest > 50) {
        partnerInterestValid = false
        setErrorMessage("Please input valid organization's description")
      }
     

      if (!partnerDescription || partnerDescription < 4) {
        partnerDescriptionValid = false
        setErrorMessage("Please input organization's description")
      }
      if (!partnerLocation || partnerLocation.length < 1) {
        partnerLocationValid = false
        setErrorMessage("Please input organization's partnerLocation")
      } 

      if (!partnerName || partnerName < 1) {
        partnerNameValid = false
        setErrorMessage("Please input organization's name")
      }

      if (!partnerLogo) {
        partnerLogoValid = false
        setErrorMessage("Please upload organization's logo")
      }

      if ( partnerLogoValid && partnerNameValid && partnerLocationValid && partnerDescriptionValid &&
          partnerInterestValid && partnerWebsiteValid && partnerLinkedinValid) {
          setErrorMessage("")
          localStorage.setItem("partnerLogo", partnerLogo)
          localStorage.setItem("partnerName", partnerName)
          localStorage.setItem("partnerLocation", partnerLocation)
          localStorage.setItem("partnerDescription", partnerDescription)
          localStorage.setItem("partnerInterest", partnerInterest)
          localStorage.setItem("partnerWebsite", partnerWebsite)
          localStorage.setItem("partnerLinkedin", partnerLinkedin)
          navigate("/MOUSubmission")
    }
      
  };
  
  

    async function handlePartnerLogoChange (e) {

        let file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        console.log("ini imagenya")
        console.log(imageUrl)
        setPartnerLogo(imageUrl);
        localStorage.setItem("partnerLogo", imageUrl);
        
    };
    
  return (
    <>
    <div className="flex flex-col justify-center pb-4 bg-black min-h-screen">
      <div className="flex justify-center items-center px-32 py-6 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-0 mb-8 w-full max-w-[1120px] max-md:my-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="mt-0 text-5xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text-4xl">
                TELL US MORE ABOUT YOUR ORGANIZATION
              </div>
            </div>
            <div className="flex gap-2.5 my-auto">
              <div className="w-3.5 bg-green-900 rounded-full h-[15px] stroke-[1px]" />
              <div className="w-3.5 bg-green-900 rounded-full h-[15px] stroke-[1px]" />
              <div className="w-3.5 bg-green-400 rounded-full h-[15px] stroke-[1px]" />
            </div>
          </div>
          <div className="flex gap-5 justify-between self-start mt-2">
            {partnerLogo ? (
              <div className="flex flex-1 justify-center items-center">
              <img
                src={partnerLogo}
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
          Change logo
        </label>
        <input
          type="file"
          accept="image/*"
          id="profile-picture-upload"
          onChange={(e) => handlePartnerLogoChange(e)}
          style={{ display: "none" }} // Hide the file input
        />
      </div>
          </div>
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Name
          </div>
          <input 
            type="text" 
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Operational Location
          </div>
          <input 
            type="text" 
            value={partnerLocation}
            onChange={(e) => setPartnerLocation(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          {/* ini MASIH pusing */}
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Describe your organization mission in less than 50 words
          </div>
          <input 
            type="text" 
            value={partnerDescription}
            onChange={(e) => setPartnerDescription(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />

          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Why are you interested in becoming our partner?
          </div>
          <input 
            type="text" 
            value={partnerInterest}
            onChange={(e) => setPartnerInterest(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
        
          
            <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Organization Website
          </div>
          <input 
            type="text" 
            value={partnerWebsite}
            onChange={(e) => setPartnerWebsite(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          <div className="flex items-center mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Organization Linkedin
          </div>
          <div className="flex items-center mt-1 shrink-0 h-10 rounded-lg bg-neutral-800 text-white px-0 py-4 max-md:max-w-full">
            <div className="p-1.5 ml-2.5 text-sm rounded-lg bg-neutral-700 text-white">
              linkedin.com/
            </div>
            <input 
            type="text" 
            value={partnerLinkedin}
            onChange={(e) => setPartnerLinkedin(e.target.value)}
            className="flex-grow h-10 rounded-lg bg-neutral-800 text-white px-4 py-3" />
            </div>
            {errorMessage && (
            <div className="mt-1 text-red-500 text-sm mb-2">{errorMessage}</div>
            )}
          <div className="flex gap-5 justify-between mt-6 w-full text-l font-semibold tracking-widest whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div 
            onClick = {handlePrevious}
            type="button"
            className="flex gap-2.5 justify-between px-3 py-2 rounded-3xl border-solid border-[1.048px] border-[color:var(--secondary-button-outline,#F3F1ED)] text-stone-100 hover:border-green-600 border-solid cursor-pointer">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1490109502cde58f41daf764ada1e96816a28eb0bdf60fae2f6faa1f38c7c09d?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="w-6 aspect-square"
              />
              <div>PREV</div>
            </div>
            <div 
            onClick = {handleSubmit}
            type="button"
            className="flex gap-2.5 justify-between px-3 py-2 text-black bg-green-400 rounded-3xl hover:border-green-600 border-solid cursor-pointer">
              <div>NEXT</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4dfdc2d09f7db460f0dc4c1b665b65ad9ca9df48bf8263c3aa81b68cfc4cdfe?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="w-6 aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default PartnerForm;

