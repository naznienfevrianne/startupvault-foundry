import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import{ Cookies } from 'react-cookie';
import { createClient } from "@supabase/supabase-js";

const StartupEditDetails = () => {
   
    const [startupDetails, setStartupDetails] = useState("");
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
    const [descValid, setDescValid] = useState(true);
    const [wordCount, setWordCount] = useState(0);
    const storedRevenue = localStorage.getItem("revenue") || "";
    const [revenue, setRevenue] = useState(storedRevenue);
    const [typ, setType] = useState("");
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
    const navigate = useNavigate();
    const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
    const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"

    const options = [
        ['Technology and SaaS', 'E-commerce and Marketplaces', 'HealthTech and MedTech', 'FinTech', 'CleanTech and Sustainability'], // Column 1
        ['Gaming and Entertainment', 'Food and Agriculture', 'Education and Self Development', 'Insurance', 'Travel'], // Column 2
        ['Mobility Tech (EV, ride-sharing, ride-hailing)', 'Human Resource', 'Human and Psychology', 'Gender and Society'] // Column 3
      ];
    const [errorMessage, setErrorMessage] = useState(' ');

    
    const myCookies = new Cookies();
    const idStartup = myCookies.get('startup');
    const token = myCookies.get('token');

    if(idStartup){
    console.log(myCookies.get('startup'))
    }else{
    console.log("cookies does not exist.")
    }

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

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);
      
        // Validate description word count
        const wordCount = newDescription.trim().split(/\s+/).length;
        setWordCount(wordCount);

        if (!description) {
            setDescValid(false);
            setErrorMessage("Please input startup's description")
        } else if (wordCount < 4 || wordCount > 50) {
          setDescValid(false);
          setErrorMessage('Please input a startup description between 4 and 50 words.');
        } else {
            setDescValid(true);
            setErrorMessage('');
        }
      };

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

      if (!pitchdeck) {
        pitchDeckValid = false
        setErrorMessage("Please upload startup's pitchdeck")
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

    //   console.log(startupLogoValid);
    //   console.log(startupNameValid);
    //   console.log(locationValid);
    //   console.log(sectorValid);
    //   console.log(descValid);
    //   console.log(pitchDeckValid);
    //   console.log(revenueValid);
    //   console.log(supportValid);
    //   console.log(websiteValid);
    //   console.log(startupLinkedinValid);

      if(!startupLogoValid){
        startupLogoValid = true
        
      }

      if (!startupLogoValid || !startupNameValid || !locationValid || !sectorValid
        || !descValid || !pitchDeckValid || !revenueValid || !supportValid
        || !websiteValid || !startupLinkedinValid){
        startupLogoValid = true
        startupName = startupDetails.name;
        startupNameValid = true
        startupLogo = startupDetails.image;
        locationValid = true
        location = startupDetails.location;
        sectorValid = true
        descValid = true
        pitchDeckValid = true
        revenueValid = true
        supportValid = true
        websiteValid = true
        startupLinkedinValid = true
    
      }

      console.log(startupLogoValid);
      console.log(startupNameValid);
      console.log(locationValid);
      console.log(sectorValid);
      console.log(descValid);
      console.log(pitchDeckValid);
      console.log(revenueValid);
      console.log(supportValid);
      console.log(websiteValid);
      console.log(startupLinkedinValid);


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
          localStorage.setItem("linkedin", startupLinkedin)
          try {
            const storedValue = localStorage.getItem("name");

            // Remove all spaces from the stored value
            const valueWithoutSpaces = storedValue.replace(/\s/g, '');

            // const fileName = valueWithoutSpaces + "/" + generateRandomString(25)
  
            console.log( JSON.stringify({
              "typ": localStorage.getItem("startupType"),
              "image": localStorage.getItem("startupLogo"),
            //   "image": supabaseUrl + "/storage/v1/object/public/startupimg/" + fileName,
              "name": localStorage.getItem("startupName"),
              "location": localStorage.getItem("location"),
              "sector": localStorage.getItem("sector"),
              "desc": localStorage.getItem("description"),
              "pitchdeck": localStorage.getItem(storedPitchdeckFile),
            //   "pitchdeck": supabaseUrl + "/storage/v1/object/public/pitchdeck/" + fileName,
              "revenue": localStorage.getItem("revenue"),
              "support": localStorage.getItem("support"),
              "website": localStorage.getItem("website"),
              "linkedin": localStorage.getItem("startupLinkedin")
          }))
          
          const response = await fetch(`http://localhost:8000/auth/startup/${idStartup}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({

                "typ": localStorage.getItem("startupType"),
                "image": localStorage.getItem("startupLogo"),
                // "image": supabaseUrl + "/storage/v1/object/public/startupimg/" + fileName,
                "name": localStorage.getItem("startupName"),
                "location": localStorage.getItem("location"),
                "sector": localStorage.getItem("sector"),
                "desc": localStorage.getItem("description"),
                "pitchdeck": localStorage.getItem(storedPitchdeckFile),
                // "pitchdeck": supabaseUrl + "/storage/v1/object/public/pitchdeck/" + fileName,
                "revenue": localStorage.getItem("revenue"),
                "support": localStorage.getItem("support"),
                "website": localStorage.getItem("website"),
                "linkedin": "https://linkedin.com" + localStorage.getItem("startupLinkedin")
            
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to update data");
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
    const TypeRadioSelector = (option) => {
        console.log('Selected:', option);
        setType(option);
    };

    const RevenueRadioSelector = (option) => {
        setRevenue(option);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/auth/startup/${idStartup}/`,{
                method: "GET", 
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + token
                }
                }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const entry = await response.json();
                setStartupDetails(entry);
                // setStartupName(startupDetails.name);
                // setStartupLogo(startupDetails.image);
                // setLocation(startupDetails.location);
                // setType(startupDetails.typ);
                // setDescription(startupDetails.desc);
                // setRevenue(startupDetails.revenue);

                console.log("revenue ", revenue);



            } catch (error) {
                console.log("Error:", error);
            }
        };
    
        fetchData();
    }, []);
    
    
    return (
        <div className="flex flex-col justify-center pb-20 bg-black">
          <div className="flex gap-5 justify-between py-6 pr-10 pl-20 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex gap-5 justify-between text-white max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto text-4xl italic font-semibold tracking-wider leading-10">
                startupvault.id
              </div>
              <div className="flex gap-5 justify-between px-5 py-3 text-xl font-light max-md:flex-wrap max-md:px-5">
                <div className="grow">Showcase</div>
                <div>Events</div>
                <div className="flex-auto">Our Investors</div>
                <div className="grow whitespace-nowrap text-stone-100">
                  Our Startups
                </div>
              </div>
            </div>
            <div className="flex gap-2 rounded-[30px]">
              <div className="grow justify-center px-5 py-3 text-xl font-light text-green-400 whitespace-nowrap rounded-3xl bg-green-400 bg-opacity-20">
                My Dashboard
              </div>
              <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
                <div className="flex justify-center items-center self-stretch basis-0">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[30px] w-[30px]"
                  />
                </div>
                <div className="self-stretch my-auto text-xl font-medium tracking-wide text-stone-100">
                  Naznien
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/081086ccfbd0bbab3badfd8655a0ab414aaf7a31d08fbc1f5199388c6bac11c8?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="shrink-0 self-stretch my-auto aspect-square w-[18px]"
                />
              </div>
            </div>
          </div>
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow self-stretch pt-6 pb-20 text-xl tracking-wide rounded-lg text-neutral-400">
                  <div className="flex flex-col px-8 max-md:px-5">
                    <div className="flex gap-3 px-5 py-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/92e705fdbc7d9eb92b8784a8c1ceb52df03c8aa7b6b8e5c590f04dd435f3a923?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="flex-auto">Search in dashboard</div>
                    </div>
                    <div className="flex gap-2 self-start mt-10 ml-8 whitespace-nowrap max-md:ml-2.5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="grow my-auto">Overview</div>
                    </div>
                    <div className="flex gap-2 self-center pr-5 mt-12 whitespace-nowrap max-md:mt-10">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="grow my-auto">Weekly Updates</div>
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between pr-6 mt-10 text-green-400 max-md:pr-5">
                    <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                    <div className="flex flex-auto gap-2 px-5 py-2 rounded-lg bg-green-400 bg-opacity-20">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbfe1e3b28c84ff800a8172798e7a2d18a3c86aff8fc82df5ba2d6080962d15a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="flex-auto my-auto">Startup Details</div>
                    </div>
                  </div>
                  <div className="flex gap-2 self-center pr-5 mt-8 whitespace-nowrap">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="shrink-0 w-8 aspect-square"
                    />
                    <div className="grow my-auto">Founder Details</div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="flex flex-col grow pt-6 pr-28 pl-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-5 justify-between content-center pr-20 w-full text-stone-100 max-md:pr-5 max-md:max-w-full">
                    <div className="text-5xl font-semibold tracking-wider leading-[54px] max-md:text-4xl">
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
                    style={{ backgroundImage: `url(${startupDetails.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
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
                            checked={typ === 'idea' || startupDetails.typ === 'idea'}
                            onChange={() => TypeRadioSelector('idea')}
                            className="hidden"
                            />
                            <label
                            htmlFor="typ-idea"
                            className={`flex gap-2 items-center cursor-pointer ${
                                typ === 'idea' ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                                className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                                typ === 'idea' ? 'bg-green-400 border-green-400' : ''
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
                            checked={typ === 'seed' || startupDetails.typ === 'seed'}
                            onChange={() => TypeRadioSelector('seed')}
                            className="hidden"
                            />
                            <label
                            htmlFor="typ-seed"
                            className={`flex gap-2 items-center cursor-pointer ${
                                typ === 'seed' ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                                className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                                typ === 'seed' ? 'bg-green-400 border-green-400' : ''
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
                            checked={typ === 'growth'|| startupDetails.typ === 'growth' }
                            onChange={() => TypeRadioSelector('growth')}
                            className="hidden"
                            />
                            <label
                            htmlFor="typ-growth"
                            className={`flex gap-2 items-center cursor-pointer ${
                                typ === 'growth' ? 'text-green-400' : 'text-white'
                            }`}
                            >
                            <div
                                className={`w-3.5 rounded-full h-3.5 border border-solid border-[1px] ${
                                typ === 'growth' ? 'bg-green-400 border-green-400' : ''
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
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={startupName|| startupDetails.name}
                    onChange={(e) => setStartupName(e.target.value)}
                    required
                  />
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Location</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={location || startupDetails.location}
                    onChange={(e) => setLocation(e.target.value)}
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
                                    <label
                                        htmlFor={`option-${colIndex}-${index}`}
                                        className={`ml-2 ${sector.includes(option) ? 'text-green-400' : 'text-white'}`}
                                    >
                                        {option}
                                    </label>
                                    {sector.includes(option) && (
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/566dfb038bcdfb819f51aab03f573a170251e627f2279d5e2009b411c76e3919?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                                            className="shrink-0 my-auto w-3.5 aspect-square ml-2"
                                            alt="Green Indicator"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Describe your startup in less than 50 words
                    <span className={`text-${descValid ? 'green-400' : 'red-500'} ml-2`}>
                    {wordCount}/50
                    </span>
                </div>
                <textarea
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer`}
                placeholder=""
                value={description || startupDetails.desc}
                onChange={handleDescriptionChange}
                rows={3} // Set the number of rows
                required
                />
                {!descValid && (
                    <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                )}
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Existing Startup Pitchdeck
                </div>
                <a href={startupDetails.pitchdeck} className="flex gap-2.5 self-start px-3 py-3 mt-3 text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-green-400 border-solid bg-green-400 bg-opacity-20 text-stone-100 max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc2edde9f8ae8f079b56f3bbd090661b2694c068012ac8b9ab8b9a0a34ddb1d8?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="shrink-0 w-6 aspect-square"
                      href={startupDetails.pitchdeck}
                    />
                    <div className="flex-auto my-auto">pitch deck (.pdf)</div>
                  </a>
                  <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Upload Here For Updated Startup Pitchdeck 
                </div>
                {!pitchdeck ? (
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
                ) : (
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
                            checked={revenue === '1'|| startupDetails.revenue === '1'}
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
                            checked={revenue === '2'|| startupDetails.revenue === '2'}
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
                            checked={revenue === '3' || startupDetails.revenue === '3'}
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
                            checked={revenue === '4' || startupDetails.revenue === '4'}
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
                            checked={revenue === '5' || startupDetails.revenue === '5'}
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
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    What kind of support do you need in the StartupVault ecosystem?
                </div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={support || startupDetails.support}
                    onChange={(e) => setStartupDetails({ ...startupDetails, support: e.target.value })}
                    required
                  />
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Startup Website
                </div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={website || startupDetails.website}
                    onChange={(e) => setStartupDetails({ ...startupDetails, website: e.target.value })}
                    required
                  />
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Startup LinkedIn
                </div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder="linkedin.com/in/"
                    value={startupLinkedin || startupDetails.linkedin}
                    onChange={(e) => setStartupDetails({ ...startupDetails, linkedin: e.target.value })}
                    required
                  />linkedin.com/in/
                <div className="flex gap-2 mt-5 pr-20 text-xl font-semibold tracking-widest">
                  <a type="button" href="/startupReadForm" className="px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">cancel</a>
                  <button className="px-5 py-2 text-black bg-green-400 rounded-2xl" type="submit">save</button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  
}


export default StartupEditDetails;