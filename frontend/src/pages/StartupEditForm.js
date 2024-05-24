import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import{ Cookies } from 'react-cookie';
import NavBar from "../component/NavBar";
import { Link } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import SideBar from "../component/SideFounder";

const StartupEditDetails = () => {

    const [startupDetails, setStartupDetails] = useState({
        typ: "",
        image: "",
        name: "",
        location: "",
        sector: [],
        desc: "",
        pitchdeck: "",
        revenue: 0,
        support: "",
        website: "",
        linkedin: ""

    });

    const storedLogo = localStorage.getItem("image") || '';
    const storedPitchDeck = localStorage.getItem("pitchdeck") || '';

    const [startupLogo, setStartupLogo] = useState("storedLogo") ;
    const [pitchdeck, setPitchdeck] = useState("storedPitchDeck") ;
    const [pitchdeckFile, setPitchdeckFile] = useState("") ;

    const [wordCount, setWordCount] = useState(0);
    const [previousSector, setPreviousSector] = useState("");
    const [sector, setSector] = useState([]);

    const navigate = useNavigate();
    const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
    const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
    const supabase = createClient(supabaseUrl, supabaseKey);

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }
    
      const storedValue = startupDetails.name;
      const valueWithoutSpaces = storedValue.replace(/\s/g, '');
      const fileName = valueWithoutSpaces + "/" + generateRandomString(25);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`,{
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
                setStartupDetails(entry);
                setPreviousSector(entry.sector);
                setPitchdeckFile(entry.pitchdeck);
                setStartupLogo(entry.image);

                const sectors = entry.sector ? entry.sector.split(',').map(item => item.trim()) : [];
                setSector(sectors);


            } catch (error) {
                console.log("Error:", error);
            }
        };
    
        fetchData();
    }, []);
    
      

    const options = [
        ['Technology and SaaS', 'E-commerce and Marketplaces', 'HealthTech and MedTech', 'FinTech', 'CleanTech and Sustainability'], // Column 1
        ['Gaming and Entertainment', 'Food and Agriculture', 'Education and Self Development', 'Insurance', 'Travel'], // Column 2
        ['Mobility Tech (EV, ride-sharing, ride-hailing)', 'Human Resource', 'Human and Psychology', 'Gender and Society'] // Column 3
      ];
    const [errorMessage, setErrorMessage] = useState(' ');

    
    const myCookies = new Cookies();
    const idStartup = myCookies.get('startup');
    const token = myCookies.get('token');
    console.log(myCookies);

    if(idStartup){
    console.log(myCookies.get('startup'))
    }else{
    console.log("cookies does not exist.")
    }

    

    const handleStartupLogoChange = async (e) => {
        
        let file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        setStartupLogo(imageUrl);
        console.log(imageUrl);
        console.log(startupDetails.image);
    
    
        localStorage.setItem("image", imageUrl);
    
        const photoUrl = await uploadUserImg(fileName);
        console.log(photoUrl)
        // const fileUrl = await uploadUserImg(file);
    
      
        setStartupDetails({
          ...startupDetails,
          image: photoUrl, // Update the image property with the new value
        });
        
      }
    
      const uploadUserImg = async (fileName) => {
        return fetch(localStorage.getItem("image"))
          .then(response => response.blob())
          .then(async blob => {
            // Upload the image to Supabase Storage
            const { data, error } = await supabase.storage
              .from('startupimg')
              .upload(fileName, blob);
      
            if (error) {
              console.error('Error uploading profilePicture:', error.message);
              throw error; // Throw the error to propagate it
            } else {
              console.log('Image uploaded successfully:', fileName);
              return supabaseUrl + "/storage/v1/object/public/startupimg/" + fileName;
            }
          })
          .catch(error => {
            console.error('profilePicture fetching image from localhost:', error);
            throw error; // Throw the error to propagate it
          });
      };

    const [fileButton, setFileButton] = useState(false);

    const handlePitchdeckChange = async (e) => {
        let file = e.target.files[0];
        const pdfUrl = URL.createObjectURL(file)
        setPitchdeck(pdfUrl);
        setPitchdeckFile(file);
        setFileButton(true);
        
        try {
            localStorage.setItem("pitchdeckFile", file);
            localStorage.setItem("pitchdeck", pdfUrl);
        } catch (error) {
            console.error("Error reading file: ", error);
        }

        const pitchdeckUrl = await uploadPitchDeck(fileName);
        console.log(pitchdeckUrl)
        // const fileUrl = await uploadUserImg(file);
    
      
        setStartupDetails({
          ...startupDetails,
          pitchdeck: pitchdeckUrl, // Update the image property with the new value
        });
    };

    const uploadPitchDeck = async (fileName) => {
        return fetch(localStorage.getItem("pitchdeck"))
          .then(response => response.blob())
          .then(async blob => {
            // Upload the image to Supabase Storage
            const { data, error } = await supabase.storage
              .from('pitchdeck')
              .upload(fileName, blob);
      
            if (error) {
              console.error('Error uploading pitchdeck:', error.message);
              throw error; 
            } else {
              console.log('File pitchdeck uploaded successfully:', fileName);
              return supabaseUrl + "/storage/v1/object/public/pitchdeck/" + fileName;
            }
          })
          .catch(error => {
            console.error('File pitchdeck fetching pitchdeck from localhost:', error);
            throw error; 
          });
      };
    
    const deletePitchdeck = () => {
      setFileButton(false);
      setPitchdeck(null);
    };

    // const [descValid, setDescValid] = useState(true);
    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
      
        // Validate description word count
        const wordCount = newDescription.trim().split(/\s+/).length;
        setWordCount(wordCount);

        // if (!startupDetails.desc) {
        //   setDescValid(false);
        //     setErrorMessage("Please input startup's description")
        // } else if (wordCount < 4 || wordCount > 50) {
        //   setDescValid(false);
        //   setErrorMessage('Please input a startup description between 4 and 50 words.');
        // }else{
          // setDescValid(true);
          setStartupDetails({
            ...startupDetails,
            desc: newDescription,
        });
        // }  
        
      };

    const [isWebsiteValid, setIsWebsiteValid] = useState(true);

    const handleWebsiteChange = (e) => {
      const url = e.target.value;
      setStartupDetails({ ...startupDetails, website: url });
      validateWebsite(url);
    };
  
    const validateWebsite = (url) => {
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      setIsWebsiteValid(!!pattern.test(url));
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
        setStartupDetails({ ...startupDetails, linkedin: value });
      };

    const handleUpdate = async () => {
    
          try {
           
            console.log( JSON.stringify(startupDetails))
          
            const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`, {
              method: "PUT",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(startupDetails),
          });
            if (!response.ok) {
                console.log("data not updated");
                throw new Error("Failed to update data");
                
            }else{
                console.log("data updated");
            }
            console.log("Data updated successfully");
            console.log("Navigating to /startupReadForm...");
            navigate('/startupReadForm');
                
    
            if (response.ok) {
              const data = await response.json();
              alert("Submission successful!");
              console.log(data);
              
            } else {
              const jsonData = await response.json();
                console.log(jsonData);
                
            }  
        } catch (error) {
            console.error("Error:", error);
            console.log("tes error1");
            alert("Error: " + error.message);
            console.log("tes error");
        }


      
  };
  

  const StartupSectorSelector = (option) => {
    setSector(prevSectors => {
        // This ensures we have the most recent state
        const updatedSectors = prevSectors.includes(option)
            ? prevSectors.filter(item => item !== option)
            : [...prevSectors, option];

        // Asynchronously update startupDetails after updating sectors
        setStartupDetails(prevDetails => ({
            ...prevDetails,
            sector: updatedSectors.join(', '), // Assuming backend expects a comma-separated string
        }));

        return updatedSectors; // Return the updated sectors
    });
};

    const TypeRadioSelector = (option) => {
        console.log('Selected:', option);
        setStartupDetails({
            ...startupDetails,
            typ: option,
        });

    };

    const RevenueRadioSelector = (option) => {
        setStartupDetails({
            ...startupDetails,
            revenue: option,
        });

    };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const UpdateConfirmationModal = ({ onClose, onUpdate }) => {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-gray-800 p-8 rounded-lg">
          <p className="text-white mb-4">Are you sure you want to update these details?</p>
          <div className="flex justify-end">
            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={onClose}>No</button>
            <button className="bg-green-500 text-white py-2 px-4 mr-4 ml-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={onUpdate}>Yes</button>
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
        <div className="flex flex-col justify-center pb-20 bg-black px-20">
          <NavBar status={"dashboard"}/>
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <SideBar status={"startup"}/>
              <form onSubmit={handleSubmit}>
              <div className="flex flex-col grow pt-6 pr-28 pl-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-5 justify-between content-center pr-20 w-full text-stone-100 max-md:pr-5 max-md:max-w-full">
                    <div className="text-stone-100 text-2xl font-semibold tracking-tight text-wrap">
                    Startup Details
                    </div>
                    <div className="flex gap-1.5 justify-center px-5 py-1.5 my-auto text-xl tracking-wide rounded-xl border border-solid shadow-sm bg-neutral-400 bg-opacity-40 border-neutral-400 max-md:pr-5">
                    <a type="button" href="/startupReadForm" className="flex-auto">editing mode</a>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/97ac5af528cb3936cf0e1512d21c1dd2c8dc805305efad9b219ab0b6f6f5a598?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 aspect-square w-[23px]"
                    />
                    </div>
                </div>    
                <div className="flex gap-4 self-start mt-5">
                    { startupDetails.image? (
                    <div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full rounded-xl w-[146px] h-[146px] max-md:px-5 bg-green-700"
                    style={{ backgroundImage: `url(${ startupDetails.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    >
                      </div>
                    ) : (
                        <div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full rounded-xl w-[146px] h-[146px] max-md:px-5 bg-green-700">
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
                      onChange={(e) => handleStartupLogoChange(e)}
                      style={{ display: "none" }} // Hide the file input
                    />
                    <label htmlFor="profile-picture-upload" className="cursor-pointer text-sm font-light tracking-wide text-blue-400 whitespace-nowrap">
                    Change logo
                    </label>
                    </div>
                  </div>
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Stage
                    <div className="flex gap-5 justify-between mt-3 max-w-full text-base tracking-normal whitespace-nowrap text-stone-100 w-[300px]">
                        <div className="flex flex-col">
                        <div className="flex gap-2 justify-between">
                            <input
                            type="radio"
                            id="typ-idea"
                            name="typ"
                            value="idea"
                            checked={startupDetails.typ === 'idea'}
                            onChange={() => TypeRadioSelector('idea')}
                            className="hidden"
                            />
                            <label
                            htmlFor="typ-idea"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.typ === 'idea' ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                                className={`w-3.5 rounded-full h-3.5 border-solid border-[1px] ${
                                startupDetails.typ === 'idea' ? 'bg-green-400 border-green-400' : ''
                                }`}
                            ></div>
                            <div>Idea</div>
                            </label>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <input
                            type="radio"
                            id="typ-seed"
                            name="typ"
                            value="seed"
                            checked={startupDetails.typ === 'seed'}
                            onChange={() => TypeRadioSelector('seed')}
                            className="hidden"
                            />
                            <label
                            htmlFor="typ-seed"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.typ === 'seed' ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                                className={`w-3.5 rounded-full h-3.5 border-solid border-[1px] ${
                                startupDetails.typ === 'seed' ? 'bg-green-400 border-green-400' : ''
                                }`}
                            ></div>
                            <div>Seed</div>
                            </label>
                        </div>
                        <div className="flex gap-2 justify-between">
                            <input
                            type="radio"
                            id="typ-growth"
                            name="typ"
                            value="growth"
                            checked={startupDetails.typ === 'growth' }
                            onChange={() => TypeRadioSelector('growth')}
                            className="hidden"
                            />
                            <label
                            htmlFor="typ-growth"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.typ === 'growth' ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                                className={`w-3.5 rounded-full h-3.5 border-solid border-[1px] ${
                                startupDetails.typ === 'growth' ? 'bg-green-400 border-green-400' : ''
                                }`}
                            ></div>
                            <div>Growth</div>
                            </label>
                        </div>
                        {/* Render other radio options in a similar manner */}
                        </div>
                    </div>
                    </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Name</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={startupDetails.name}
                    onChange={(e) => setStartupDetails({ ...startupDetails, name: e.target.value })}
                    required
                  />
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Location</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={startupDetails.location}
                    onChange={(e) => setStartupDetails({ ...startupDetails, location: e.target.value })}
                    required
                  />
            <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Sector</div>
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
            <div className="mt-5 text-xs font-medium tracking-wide text-green-400">
                Previous Selection : {previousSector}
            </div>
            <div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 mr-4">
                    Describe your startup in less than 50 words
                    <span className="self-start mt-3 text-base font-semibold tracking-normal text-green-400 ml-3">
                    {wordCount}/50
                    </span>
                </div>
                <textarea
                className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer`}
                placeholder=""
                value={startupDetails.desc}
                onChange={handleDescriptionChange}
                rows={3} // Set the number of rows
                required
                />
                
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Existing Startup Pitchdeck
                </div>
                {startupDetails.pitchdeck ? (
                <a href={startupDetails.pitchdeck} className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-green-400 border-solid bg-green-400 bg-opacity-20 text-stone-100 max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc2edde9f8ae8f079b56f3bbd090661b2694c068012ac8b9ab8b9a0a34ddb1d8?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-6 aspect-square"
                    href={startupDetails.pitchdeck}
                  />
                  <div className="flex-auto my-auto">pitch deck (.pdf)</div>
                </a>
                ) : (
                  <div className='flex gap-2.5 self-start max-md:px-5'>
                  <div className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-red-400 border-solid bg-red-400 bg-opacity-20 text-stone-100">
                    <div className="flex-auto my-auto">File is not found</div>
                  </div>
                  <div className="self-start mt-10 text-xs font-xs tracking-wide text-red-400">
                  *Your current startup stage might not require any pitchdeck file.
                  </div>
                  </div>
                )}


            {startupDetails.typ === "idea" ? (
               <>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Upload Here For Updated Startup Pitchdeck 
                </div>
                  <div className="self-start mt-2 text-xs font-xs tracking-wide text-red-400">
                    * A pitchdeck file is not required for your current startup stage (idea) *
                  </div>
               </>
              
                ) : (
                  <>
                
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Upload Here For Updated Startup Pitchdeck 
                </div>
                <div className="flex gap-2.5 self-start px-3 py-3 mt-2 text-m font-semibold tracking-widest text-black rounded bg-stone-100 hover:border-green-600 border-solid cursor-pointer">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/af8cf579d55d28b96355c0f20f34b97d03d322289eb0ffacc1358c9ce119e9dc?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                        className="w-6 aspect-square"
                    />
                    <div className="flex-auto">
                        <label htmlFor="pitchdeck-upload" className="hover:border-green-600 border-solid cursor-pointer">Select file</label>
                        <input
                        type="file"
                        accept=".pdf"
                        id="pitchdeck-upload"
                        onChange={handlePitchdeckChange}
                        style={{ display: "none" }}
                        />
                    </div>
                    </div>
                {fileButton ? (
                  <div className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-green-400 border-solid bg-green-400 bg-opacity-20 text-stone-100 max-md:px-5">
                    <a href={startupDetails.pitchdeck} className="flex items-center gap-2">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc2edde9f8ae8f079b56f3bbd090661b2694c068012ac8b9ab8b9a0a34ddb1d8?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                            alt="Download Pitch Deck"
                            className="w-6 h-6" // Ensure width and height are set correctly
                        />
                        <span className="text-base font-medium tracking-wide">{pitchdeckFile.name}</span>
                    </a>
                    <button onClick={deletePitchdeck} className="ml-auto">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a56fd396fdab4213e78daed12611689f2e3db816efc9c0281e2b8b0ba63f5b4?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                            alt="Delete Pitch Deck"
                            className="w-6 h-6 cursor-pointer"
                        />
                    </button>
                </div>
                ):(
                  <div></div>
                )}
                </>
                  
                )}
                
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Revenue over the last 6 months
                    <div className="flex gap-5 justify-between mt-3 max-w-full text-base tracking-normal whitespace-nowrap text-stone-100 w-[300px]">
                        <div className="flex flex-col">
                        <div className="flex gap-2 justify-between">
                            <input
                            type="radio"
                            id="revenue-0"
                            name="revenue"
                            value="0"
                            checked={startupDetails.revenue === 0}
                            onChange={() => RevenueRadioSelector(0)}
                            className="hidden"
                            />
                            <label
                            htmlFor="revenue-0"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.revenue === 0 ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                            className={`w-3.5 rounded-full h-3.5 border-solid border-[1px] ${
                                startupDetails.revenue === 0 ? 'bg-green-400 border-green-400' : ''
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
                            checked={startupDetails.revenue === 1}
                            onChange={() => RevenueRadioSelector(1)}
                            className="hidden"
                            />
                            <label
                            htmlFor="revenue-1"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.revenue === 1 ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                            className={`w-3.5 rounded-full h-3.5  border-solid border-[1px] ${
                                startupDetails.revenue === 1 ? 'bg-green-400 border-green-400' : ''
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
                            checked={startupDetails.revenue === 2}
                            onChange={() => RevenueRadioSelector(2)}
                            className="hidden"
                            />
                            <label
                            htmlFor="revenue-2"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.revenue === 2 ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                            className={`w-3.5 rounded-full h-3.5  border-solid border-[1px] ${
                                startupDetails.revenue === 2 ? 'bg-green-400 border-green-400' : ''
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
                            checked={startupDetails.revenue === 3}
                            onChange={() => RevenueRadioSelector(3)}
                            className="hidden"
                            />
                            <label
                            htmlFor="revenue-3"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.revenue === 3 ? 'text-green-400' : 'text-white'
                            }`}
                            >
                <div
                            className={`w-3.5 rounded-full h-3.5  border-solid border-[1px] ${
                                startupDetails.revenue === 3 ? 'bg-green-400 border-green-400' : ''
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
                            checked={startupDetails.revenue === 4}
                            onChange={() => RevenueRadioSelector(4)}
                            className="hidden"
                            />
                            <label
                            htmlFor="revenue-4"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.revenue === 4 ? 'text-green-400' : 'text-white'
                            }`}
                            >
                <div
                            className={`w-3.5 rounded-full h-3.5 border-solid border-[1px] ${
                                startupDetails.revenue === 4 ? 'bg-green-400 border-green-400' : ''
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
                            checked={startupDetails.revenue === 5}
                            onChange={() => RevenueRadioSelector(5)}
                            className="hidden"
                            />
                            <label
                            htmlFor="revenue-5"
                            className={`flex gap-2 items-center cursor-pointer ${
                                startupDetails.revenue === 5 ? 'text-green-400' : 'text-white'
                            }`}
                            >
                <div
                            className={`w-3.5 rounded-full h-3.5 border-solid border-[1px] ${
                                startupDetails.revenue === 5 ? 'bg-green-400 border-green-400' : ''
                            }`}
                            ></div>                <div>USD 501+K</div>
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    What kind of support do you need in the StartupVault ecosystem?
                </div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    value={startupDetails.support}
                    onChange={(e) => setStartupDetails({ ...startupDetails, support: e.target.value })}
                    required
                  />
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Startup Website
                </div>
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                  placeholder="Enter website URL"
                  value={startupDetails.website}
                  onChange={handleWebsiteChange}
                  required
                />
                {!isWebsiteValid && (
                  <div className="text-red-500 text-xs mt-1">
                    Please enter a valid website URL.
                  </div>
                )}
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Startup LinkedIn
                </div>
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  value={startupDetails.linkedin}
                  onChange={handleLinkedinChange}
                  required
                />
                {!isLinkedinValid && (
                      <div className="text-red-500 text-xs mt-1">
                          Please enter a valid LinkedIn URL.
                      </div>
                  )}
                <div className="flex gap-2 mt-5 pr-20 text-base font-semibold">
                  <a type="button" href="/startupReadForm" className="px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">Cancel</a>
                  <button className="px-5 py-2 text-black bg-green-400 rounded-2xl" type="submit">Save</button>
                </div>
                </div>
              </form>
            </div>
            </div>
            {showConfirmationModal && (
              <UpdateConfirmationModal
                onClose={() => setShowConfirmationModal(false)}
                onUpdate={handleUpdateConfirmation}
              />
            )}
            </div>
            
        
      );
  
}

export default StartupEditDetails;