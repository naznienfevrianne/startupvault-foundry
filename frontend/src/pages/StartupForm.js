import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";


function StartupForm(props) {
    
    const storedStartupLogo = localStorage.getItem("startupLogo") | "";
    const [startupLogo, setStartupLogo]= useState(storedStartupLogo);
    const storedStartupName = localStorage.getItem("startupName") || "";
    const [startupName, setStartupName] = useState(storedStartupName);
    const storedLocation = localStorage.getItem("location") || "";
    const [location, setLocation] = useState(storedLocation);
    const storedSector = [];
    const [sector, setSector] = useState([]);
    const storedDescription = localStorage.getItem("description") || "";
    const [description, setDescription] = useState(storedDescription);
    const storedRevenue = localStorage.getItem("revenue") || "";
    const [revenue, setRevenue] = useState(storedRevenue);
    const storedSupport = localStorage.getItem("support") || "";
    const [support, setSupport] = useState(storedSupport);
    const storedWebsite = localStorage.getItem("website") || "";
    const [website, setWebsite] = useState(storedWebsite);
    const storedStartupLinkedin = localStorage.getItem("startupLinkedin") || "";
    const [startupLinkedin, setStartupLinkedin] = useState(storedStartupLinkedin);
    const storedPitchdeck = ""
    const [pitchdeck, setPitchdeck] = useState(storedPitchdeck) || "";
    const storedPitchdeckFile = ""
    const [pitchdeckFile, setPitchdeckFile] = useState(storedPitchdeckFile);
    console.log(pitchdeckFile.name);
    const navigate = useNavigate();
    const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
    const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
    const supabase = createClient(supabaseUrl, supabaseKey);
    const options = [
        ['Technology and SaaS', 'E-commerce and Marketplaces', 'HealthTech and MedTech', 'FinTech', 'CleanTech and Sustainability'], // Column 1
        ['Gaming and Entertainment', 'Food and Agriculture', 'Education and Self Development', 'Insurance', 'Travel'], // Column 2
        ['Mobility Tech (EV, ride-sharing, ride-hailing)', 'Human Resource', 'Human and Psychology', 'Gender and Society'] // Column 3
      ];
    const [errorMessage, setErrorMessage] = useState(' ');

      function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      
        return result;
      }
      const uploadUserImg = (fileName) => {
        fetch(localStorage.getItem("profilePicture"))
        .then(response => response.blob())
        .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = supabase.storage
            .from('userimg')
            .upload(fileName, blob);

        if (error) {
            console.error('Error uploading profilePicture:', error.message);
        } else {
            console.log('Image uploaded successfully:', data);
            
            return supabaseUrl + "/storage/v1/object/public/userimg/" + fileName;
        }
        })
        .catch(error => {
        console.error('profilePicture fetching image from localhost:', error);
        });
      }
      const uploadStartupImg = (fileName) => {
        fetch(localStorage.getItem("startupLogo"))
        .then(response => response.blob())
        .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = supabase.storage
            .from('startupimg')
            .upload(fileName, blob);

        if (error) {
            console.error('Error uploading startup logo:', error.message);
        } else {
          console.log('Image uploaded successfully:', data);
            
          return supabaseUrl + "/storage/v1/object/public/startupimg/" + fileName;
        }
        })
        .catch(error => {
        console.error('startup logo fetching image from localhost:', error);
        });
      }
      
      const uploadPitchdeck = (fileName) => {
        fetch(localStorage.getItem("pitchdeck"))
        .then(response => response.blob())
        .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = supabase.storage
            .from('pitchdeck')
            .upload(fileName, blob);

        if (error) {
            console.error('Error uploading pitchdeck:', error.message);
        } else {
          console.log('Image uploaded successfully:', data);
            
          return supabaseUrl + "/storage/v1/object/public/pitchdeck/" + fileName;
        }
        })
        .catch(error => {
        console.error('profilePicture fetching image from localhost:', error);
        });
    };
    
    

    

    const handlePitchdeckChange = (e) => {
        let file = e.target.files[0];
        const pdfUrl = URL.createObjectURL(file)
        setPitchdeck(pdfUrl);
        setPitchdeckFile(file);
        try {
            localStorage.setItem("pitchdeckFile", file);
            localStorage.setItem("pitchdeck", pdfUrl);
        } catch (error) {
            console.error("Error reading file: ", error);
        }
    };
    
    const deletePitchdeck = () => {
    setPitchdeck(null);
    };

    function handlePrevious () {
        navigate("/startupType")
    }

    const handleSubmit = async () => {
      let startupLogoValid = true
      let startupNameValid = true
      let locationValid = true
      let sectorValid = true
      let descValid = true
      let pitchDeckValid = true
      let revenueValid = true
      let supportValid = true
      let websiteValid = true
      let startupLinkedinValid = true

      if (!startupLinkedin || startupLinkedin < 1) {
        startupLinkedinValid = false
        setErrorMessage("Please input valid startup's linkedin link")
      }

      if (!website || website < 4 || !website.includes(".")) {
        websiteValid = false
        setErrorMessage("Please input valid startup's website")
      }

      if (!support || support < 4 ) {
        supportValid = false
        setErrorMessage("Please input startup's support needs")
      }

      if (!revenue) {
        revenueValid = false
        setErrorMessage("Please pick startup's revenue")
      }

      if (!pitchdeck && localStorage.getItem("startupType") !== 'idea') {
        pitchDeckValid = false
        setErrorMessage("Please upload startup's pitchdeck")
      }

      if (!description || description < 4) {
        descValid = false
        setErrorMessage("Please input startup's description")
      }

      if (!sector) {
        sectorValid = false
        setErrorMessage("Please pick startup's sector")
      }
      if (!location || location.length < 1) {
        locationValid = false
        setErrorMessage("Please input startup's location")
      } 

      if (!startupName || startupName < 1) {
        startupNameValid = false
        setErrorMessage("Please input startup's name")
      }

      if (!startupLogo) {
        startupLogoValid = false
        setErrorMessage("Please upload startup's logo")
      }

      if ( startupLogoValid && startupNameValid && locationValid && sectorValid && descValid && pitchDeckValid 
        && revenueValid && supportValid && websiteValid && startupLinkedinValid) {
          setErrorMessage("")
          localStorage.setItem("startupName", startupName)
          localStorage.setItem("location", location)
          localStorage.setItem("sector", sector)
          localStorage.setItem("description", description)
          localStorage.setItem("pitchdeck", pitchdeck)
          localStorage.setItem("revenue", revenue)
          localStorage.setItem("support", support)
          localStorage.setItem("website", website)
          localStorage.setItem("startupLinkedin", startupLinkedin)
          try {
            const storedValue = localStorage.getItem("name");

            // Remove all spaces from the stored value
            const valueWithoutSpaces = storedValue.replace(/\s/g, '');

            const fileName = valueWithoutSpaces + "/" + generateRandomString(25)
            const pitchdeckURL = uploadPitchdeck(fileName)
            const userimgURL = uploadUserImg(fileName)
            const startupimgURL = uploadStartupImg(fileName)
            console.log("User Image URL:", userimgURL);
            console.log("Startup Logo URL:", startupimgURL);
            console.log("Pitchdeck URL:", pitchdeckURL);
            console.log("user img in local ", localStorage.getItem("profilePicture"))
            console.log("startup logo in local", localStorage.getItem("startupLogo"))
            console.log("pitchdeck in local", localStorage.getItem("pitchdeck"))
  
          let urlPitchdeck = supabaseUrl + "/storage/v1/object/public/pitchdeck/" + fileName
          if (localStorage.getItem("startupType") == "idea") {
            urlPitchdeck = null
          }
            const response = await fetch("http://localhost:8000/auth/startup/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "typ": localStorage.getItem("startupType"),
                    "image": supabaseUrl + "/storage/v1/object/public/startupimg/" + fileName,
                    "name": localStorage.getItem("startupName"),
                    "location": localStorage.getItem("location"),
                    "sector": localStorage.getItem("sector"),
                    "desc": localStorage.getItem("description"),
                    "pitchdeck": urlPitchdeck,
                    "revenue": localStorage.getItem("revenue"),
                    "support": localStorage.getItem("support"),
                    "website": localStorage.getItem("website"),
                    "linkedin": "https://linkedin.com/" + localStorage.getItem("startupLinkedin")
                })
            })
  
            if (response.ok) {
              const data = await response.json();
              alert("Submission successful!");
              console.log(data);
              const pk = data.id
              // Perform fetch request
              const responseFounder = await fetch("http://localhost:8000/auth/founder/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  
                    "email": localStorage.getItem("email"),
                    "role": "founder",
                    "password": localStorage.getItem("password"),
                    "isVerified": 0,
                    "image": supabaseUrl + "/storage/v1/object/public/userimg/" + fileName, // profile picture
                    "linkedin": "https://linkedin.com/" + localStorage.getItem("linkedin"),
                    "name": localStorage.getItem("name"),
                    "phoneNumber": localStorage.getItem("phoneNumber"),
                    "startup": pk
                })
            })
            if (!responseFounder.ok) {
              const founderJsonData = await responseFounder.json();
              console.log(founderJsonData);
            } else {
              const founderJsonData = await responseFounder.json();
              alert("Submission successful!");
              console.log(founderJsonData);
              localStorage.clear()
              navigate("/login")
            }
                
            } else {
              const jsonData = await response.json();
                console.log(jsonData);
                
            }  
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
        }
      
  };
  
  

    async function handleStartupLogoChange (e) {

        let file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        setStartupLogo(imageUrl);
        localStorage.setItem("startupLogo", imageUrl);
        
    };
    const StartupSectorSelector = (option) => {
        if (sector.includes(option)) {
            setSector(sector.filter(item => item !== option));
        } else {
            setSector([...sector, option]);
        }
    };
    const RevenueRadioSelector = (option) => {
        setRevenue(option);
    }
    
  return (
    <>
    <div className="flex flex-col justify-center pb-4 bg-black min-h-screen">
      <div className="flex justify-center items-center px-32 py-6 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-0 mb-8 w-full max-w-[1120px] max-md:my-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="text-xs tracking-wide text-neutral-400 max-md:max-w-full">
                To set up your startup's public profile
              </div>
              <div className="mt-0 text-5xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text-4xl">
                TELL US MORE ABOUT YOUR STARTUP
              </div>
            </div>
            <div className="flex gap-2.5 my-auto">
              <div className="w-3.5 bg-green-900 rounded-full h-[15px] stroke-[1px]" />
              <div className="w-3.5 bg-green-900 rounded-full h-[15px] stroke-[1px]" />
              <div className="w-3.5 bg-green-400 rounded-full h-[15px] stroke-[1px]" />
            </div>
          </div>
          <div className="flex gap-5 justify-between self-start mt-2">
            {startupLogo ? (
              <div className="flex flex-1 justify-center items-center">
              <img
                src={startupLogo}
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
          onChange={(e) => handleStartupLogoChange(e)}
          style={{ display: "none" }} // Hide the file input
        />
      </div>
          </div>
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Name
          </div>
          <input 
            type="text" 
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Location
          </div>
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          {/* ini MASIH pusing */}
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Sector
          </div>
          <div className="mt-1 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
                {options.map((column, colIndex) => (
                <div key={colIndex}>
                    {column.map((option, index) => (
                    <div key={index} className="flex items-center">
                        <input
                        type="checkbox"
                        id={`option-${colIndex}-${index}`}
                        value={option}
                        checked={sector.includes(option)}
                        onChange={() => StartupSectorSelector(option)}
                        />
                        <label htmlFor={`option-${colIndex}-${index}`} className={`ml-2 ${sector.includes(option) ? 'text-green-400' : 'text-white'}`}>{option}</label>
                    </div>
                    ))}
                </div>
                ))}
            </div>
            </div>

          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Describe your startup in less than 50 words
          </div>
          <input 
            type="text" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
       {localStorage.getItem("startupType") !== 'idea' && (
        <div className="self-start mt-3 text-base font-medium tracking-wide text-stone-100">
          Startup Pitchdeck
        </div>
      )}
      {localStorage.getItem("startupType") !== 'idea' && !pitchdeck ? (
        <div className="flex gap-2.5 self-start px-3 py-3 mt-2 text-m font-semibold tracking-widest text-black rounded bg-stone-100 hover:border-green-600 border-solid cursor-pointer">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/af8cf579d55d28b96355c0f20f34b97d03d322289eb0ffacc1358c9ce119e9dc?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
            className="w-6 aspect-square"
          />
          <div className="flex-auto">
            <label htmlFor="pitchdeck-upload" className="hover:border-green-600 border-solid cursor-pointer">SELECT FILE</label>
            <input
              type="file"
              accept=".pdf"
              id="pitchdeck-upload"
              onChange={handlePitchdeckChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      ) : null}
      {localStorage.getItem("startupType") !== 'idea' && pitchdeck ? (
        <div className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-solid bg-green-400 bg-opacity-20 border-[color:var(--brand,#64EB8B)] text-stone-100">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2eb1a4a819d2a070f192a5e0474b58e7bd87cd1a993b40548d71a50a0cfc81e1?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
            className="w-6 aspect-square"
          />
          <div className="flex-auto self-start mt-1">
            {pitchdeckFile.name}
          </div>
          <img
            onClick={deletePitchdeck}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a56fd396fdab4213e78daed12611689f2e3db816efc9c0281e2b8b0ba63f5b4?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
            className="w-6 aspect-square cursor-pointer"
          />
        </div>
      ) : null}

         
<div className="self-start mt-3 text-base font-medium tracking-wide text-stone-100">
      Revenue over the last 6 months
      <div className="flex gap-5 justify-between mt-3 max-w-full text-base tracking-normal whitespace-nowrap text-stone-100 w-[300px]">
        <div className="flex flex-col">
          <div className="flex gap-2 justify-between">
            <input
              type="radio"
              id="revenue-0"
              name="revenue"
              value="0"
              checked={revenue === '0'}
              onChange={() => RevenueRadioSelector('0')}
              className="hidden"
            />
            <label
              htmlFor="revenue-0"
              className={`flex gap-2 items-center cursor-pointer ${
                revenue === '0' ? 'text-green-400' : 'text-white'
              }`}
            >
            <div
            className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                revenue === '0' ? 'bg-green-400 border-green-400' : ''
            }`}
            ></div>                <div>USD 0-50K</div>
            </label>
          </div>
          <div className="flex gap-2 justify-between">
            <input
              type="radio"
              id="revenue-1"
              name="revenue"
              value="1"
              checked={revenue === '1'}
              onChange={() => RevenueRadioSelector('1')}
              className="hidden"
            />
            <label
              htmlFor="revenue-1"
              className={`flex gap-2 items-center cursor-pointer ${
                revenue === '1' ? 'text-green-400' : 'text-white'
              }`}
            >
            <div
            className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                revenue === '1' ? 'bg-green-400 border-green-400' : ''
            }`}
            ></div>              
            <div>USD 1-10K </div>
            </label>
          </div>
          <div className="flex gap-2 justify-between">
            <input
              type="radio"
              id="revenue-2"
              name="revenue"
              value="2"
              checked={revenue === '2'}
              onChange={() => RevenueRadioSelector('2')}
              className="hidden"
            />
            <label
              htmlFor="revenue-2"
              className={`flex gap-2 items-center cursor-pointer ${
                revenue === '2' ? 'text-green-400' : 'text-white'
              }`}
            >
            <div
            className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                revenue === '2' ? 'bg-green-400 border-green-400' : ''
            }`}
            ></div>                <div>USD 11-50K</div>
            </label>
          </div>
          {/* Render other radio options in a similar manner */}
        </div>
        <div className="flex flex-col">
        <div className="flex gap-2 justify-between">
            <input
              type="radio"
              id="revenue-3"
              name="revenue"
              value="3"
              checked={revenue === '3'}
              onChange={() => RevenueRadioSelector('3')}
              className="hidden"
            />
            <label
              htmlFor="revenue-3"
              className={`flex gap-2 items-center cursor-pointer ${
                revenue === '3' ? 'text-green-400' : 'text-white'
              }`}
            >
<div
            className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                revenue === '3' ? 'bg-green-400 border-green-400' : ''
            }`}
            ></div>                <div>USD 51-100K</div>
            </label>
          </div>
          <div className="flex gap-2 justify-between">
            <input
              type="radio"
              id="revenue-4"
              name="revenue"
              value="4"
              checked={revenue === '4'}
              onChange={() => RevenueRadioSelector('4')}
              className="hidden"
            />
            <label
              htmlFor="revenue-4"
              className={`flex gap-2 items-center cursor-pointer ${
                revenue === '4' ? 'text-green-400' : 'text-white'
              }`}
            >
<div
            className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                revenue === '4' ? 'bg-green-400 border-green-400' : ''
            }`}
            ></div>                
            <div>USD 101-500k</div>
            </label>
          </div>
          <div className="flex gap-2 justify-between">
            <input
              type="radio"
              id="revenue-5"
              name="revenue"
              value="5"
              checked={revenue === '5'}
              onChange={() => RevenueRadioSelector('5')}
              className="hidden"
            />
            <label
              htmlFor="revenue-5"
              className={`flex gap-2 items-center cursor-pointer ${
                revenue === '5' ? 'text-green-400' : 'text-white'
              }`}
            >
<div
            className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                revenue === '5' ? 'bg-green-400 border-green-400' : ''
            }`}
            ></div>                <div>USD 501+K</div>
            </label>
          </div>
        </div>
      </div>
    </div>

          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
          What kind of support do you need in the StartupVault ecosystem?
          </div>
          <input 
            type="text" 
            value={support}
            onChange={(e) => setSupport(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
            
            <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Startup Website
          </div>
          <input 
            type="text" 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          <div className="flex items-center mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Startup Linkedin
          </div>
          <div className="flex items-center mt-1 shrink-0 h-10 rounded-lg bg-neutral-800 text-white px-0 py-4 max-md:max-w-full">
            <div className="p-1.5 ml-2.5 text-sm rounded-lg bg-neutral-700 text-white">
              linkedin.com/
            </div>
            <input 
            type="text" 
            value={startupLinkedin}
            onChange={(e) => setStartupLinkedin(e.target.value)}
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
              <div>SUBMIT</div>
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
export default StartupForm;

