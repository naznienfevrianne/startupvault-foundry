import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import NavBar from "../component/NavBar";
import { useCookies, Cookies } from 'react-cookie';
import { useEffect } from "react";


function OrgInvestorEditForm(props) {
  const myCookies = new Cookies();
  console.log(myCookies)
  const investorOrganization = myCookies.get('investorOrganization')
  const [investorLogo, setInvestorLogo] = useState('');
  const [investorName, setInvestorName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [investorLocation, setInvestorLocation] = useState('');
  const [investorDescription, setInvestorDescription] = useState('');
  const [investorSector, setInvestorSector] = useState([]);
  const [ticketSize, setTicketSize] = useState('');
  const [stage, setStage] = useState([]);
  const [investorSupport, setInvestorSupport] = useState([]);
  const [investorWebsite, setInvestorWebsite] = useState('');
  const [investorLinkedin, setInvestorLinkedin] = useState('');
  const navigate = useNavigate();
  const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
    const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
  const supabase = createClient(supabaseUrl, supabaseKey);
  let logoChanged = false

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/investororg/' + investorOrganization, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log(jsonData)

        const sectors = jsonData.sector ? jsonData.sector.split(',').map(item => item.trim()) : [];
        const stages = jsonData.stage ? jsonData.stage.split(',').map(item => item.trim()) : [];
        const support = jsonData.support ? jsonData.support.split(',').map(item => item.trim()) : [];
        // Set the fetched data to state
        
        setInvestorLogo(jsonData.logo);
        setInvestorName(jsonData.name || '');
        setInvestorLocation(jsonData.location || '');
        setInvestorDescription(jsonData.desc || '');
        setInvestorSector(sectors);
        setTicketSize(jsonData.ticket || '');
        setStage(stages);
        setInvestorSupport(support);
        setInvestorWebsite(jsonData.website || '');
        setInvestorLinkedin(jsonData.linkedin || '');
        setLogoUrl(jsonData.logo)
      } catch (error) {
        alert(error.message)
      }
    };
    fetchData();
  }, [investorOrganization]);

    
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

      function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      
        return result;
      }

    function handlePrevious () {
        navigate("/investorType")
    }

    const uploadInvestorImg = (fileName) => {
        fetch(localStorage.getItem("investorLogo"))
        .then(response => response.blob())
        .then(async blob => {
        // Upload the image to Supabase Storage
        const { data, error } = supabase.storage
            .from('investorlogo')
            .upload(fileName, blob);

        if (error) {
            console.error('Error uploading profilePicture:', error.message);
        } else {

            console.log('Image uploaded successfully:', data);
            alert("SUCCESS! " + logoUrl)
            console.log("blob ", logoUrl)
            console.log("investor logo in local INI DIA", localStorage.getItem("investorLogo"))
            return supabaseUrl + "/storage/v1/object/public/investorlogo/" + fileName;
        }
        })
        .catch(error => {
        console.error('profilePicture fetching image from localhost:', error);
        });
      }

      
    const handleSubmit = async () => {
      let investorLogoValid = true
      let investorNameValid = true
      let investorLocationValid = true
      let investorDescriptionValid = true
      let investorSectorValid = true
      let stageValid = true
      let ticketSizeValid = true
      let supportValid = true
      let investorWebsiteValid = true
      let investorLinkedinValid = true

      if (!investorLinkedin || investorLinkedin < 1) {
        investorLinkedinValid = false
        setErrorMessage("Please input valid startup's linkedin link")
      }

      if (!investorWebsite || investorWebsite < 4 || !investorWebsite.includes(".")) {
        investorWebsiteValid = false
        setErrorMessage("Please input valid startup's investorWebsite")
      }

      if (!investorSupport) {
        supportValid = false
        setErrorMessage("Please pick support that your organization offer")
      }

      if (!ticketSize) {
        ticketSizeValid = false
        setErrorMessage("Please input a valid ticket size")
      }
    
      if (!stage) {
        stageValid=false
        setErrorMessage("Please pick stage of startup that you're interested to invest for")
      }

      if (!investorSector) {
        investorSectorValid = false
      }
     

      if (!investorDescription || investorDescription < 4) {
        investorDescriptionValid = false
        setErrorMessage("Please input organization's description")
      }
      if (!investorLocation || investorLocation.length < 1) {
        investorLocationValid = false
        setErrorMessage("Please input organization's investorLocation")
      } 

      if (!investorName || investorName < 1) {
        investorNameValid = false
        setErrorMessage("Please input organization's name")
      }

      if (!investorLogo) {
        investorLogoValid = false
        setErrorMessage("Please upload organization's logo")
      }

      if ( investorLogoValid && investorNameValid && investorLocationValid && investorDescriptionValid &&
         investorSectorValid && stageValid && supportValid && investorWebsiteValid && investorLinkedinValid) {
          setErrorMessage("")
          localStorage.setItem("investorName", investorName)
          localStorage.setItem("investorLocation", investorLocation)
          localStorage.setItem("investorDescription", investorDescription)
          localStorage.setItem("investorSector", investorSector)
          localStorage.setItem("ticketSize", ticketSize)
          localStorage.setItem("stage", stage)
          localStorage.setItem("investorSupport", investorSupport)
          localStorage.setItem("investorWebsite", investorWebsite)
          localStorage.setItem("investorLinkedin", investorLinkedin)
          try {

            console.log("user img in local ", localStorage.getItem("profilePicture"))
            console.log("investor logo in local", localStorage.getItem("investorLogo"))
            console.log(JSON.stringify({
              "location": localStorage.getItem("investorLocation"),
              "desc": localStorage.getItem("investorDescription"),
              "sector": localStorage.getItem("investorSector"),
              "ticket": localStorage.getItem("ticketSize"),
              "stage": localStorage.getItem("stage"),
              "support": localStorage.getItem("investorSupport"),
              "website": localStorage.getItem("investorWebsite"),
              "linkedin": localStorage.getItem("investorLinkedin"),
              "logo": logoUrl,
              "name": localStorage.getItem("investorName")
          }))
            const response = await fetch("http://localhost:8000/auth/investororg/" + investorOrganization, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "location": localStorage.getItem("investorLocation"),
                    "desc": localStorage.getItem("investorDescription"),
                    "sector": localStorage.getItem("investorSector"),
                    "ticket": localStorage.getItem("ticketSize"),
                    "stage": localStorage.getItem("stage"),
                    "support": localStorage.getItem("investorSupport"),
                    "website": localStorage.getItem("investorWebsite"),
                    "linkedin": localStorage.getItem("investorLinkedin"),
                    "logo": logoUrl,
                    "name": localStorage.getItem("investorName")
                })
            })
  
            if (response.ok) {
              const data = await response.json();
              alert("Submission successful!");
              navigate("/orgInvestorReadForm")
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
  
  

    const handleInvestorLogoChange = async (e) => {
        let file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        setInvestorLogo(imageUrl);
        const valueWithoutSpaces = investorName.replace(/\s/g, '');
        const fileName = valueWithoutSpaces + "/" + generateRandomString(25)
        localStorage.setItem("investorLogo", imageUrl)
        setLogoUrl(supabaseUrl + "/storage/v1/object/public/investorlogo/" + fileName)
        const url = await uploadInvestorImg(fileName);
    };
    const InvestorSectorSelector = (option) => {
        if (investorSector.includes(option)) {
            setInvestorSector(investorSector.filter(item => item !== option));
        } else {
            setInvestorSector([...investorSector, option]);
        }
    };

    const InvestorStageSelector = (option) => {
        if (stage.includes(option)) {
            setStage(stage.filter(item => item !== option));
        } else {
            setStage([...stage, option]);
        }
    };

    const InvestorSupportSelector = (option) => {
        setInvestorSupport(prevSupport => {
            if (prevSupport.includes(option)) {
                return prevSupport.filter(item => item !== option);
            } else {
                return [...prevSupport, option];
            }
        });
    };

    function handlePrevious () {
      navigate("/orgInvestorReadForm")
  }
    
  return (
    <>
    <div className="flex flex-col justify-center pb-4 bg-black min-h-screen px-20">
      <NavBar />
      <div className="flex justify-center items-center px-0 py-6 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-0 mb-8 w-full max-w-[1120px] max-md:my-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="mt-0 text-3xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text-4xl">
               Public profile
              </div>
            </div>
          </div>
          <div className="flex gap-5 justify-between self-start mt-2">
            {investorLogo ? (
              <div className="flex flex-1 justify-center items-center">
              <img
                src={investorLogo}
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
          onChange={(e) => handleInvestorLogoChange(e)}
          style={{ display: "none" }} // Hide the file input
        />
      </div>
          </div>
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Name
          </div>
          <input 
            type="text" 
            value={investorName}
            onChange={(e) => setInvestorName(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Operational Location
          </div>
          <input 
            type="text" 
            value={investorLocation}
            onChange={(e) => setInvestorLocation(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          {/* ini MASIH pusing */}
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Describe your investing mission in less than 50 words
          </div>
          <input 
            type="text" 
            value={investorDescription}
            onChange={(e) => setInvestorDescription(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
          <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Startup Sector Selector
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
                        checked={investorSector.includes(option)}
                        onChange={() => InvestorSectorSelector(option)}
                        />
                        <label htmlFor={`option-${colIndex}-${index}`} className={`ml-2 ${investorSector.includes(option) ? 'text-green-400' : 'text-white'}`}>{option}</label>
                    </div>
                    ))}
                </div>
                ))}
            </div>
            </div>

            <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Ticket Size
          </div>
          <input 
            type="number" 
            value={ticketSize}
            onChange={(e) => setTicketSize(e.target.value)}
            className="shrink-0 mt-1 h-8 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />

            <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Startup Stage Selector
          </div>
          <div className="mt-1 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            <div className="grid grid-cols-1 max-md:grid-cols-1">
            {options2.map((option, index) => (
                <div key={index} className="flex items-center">
                    <input
                        type="checkbox"
                        id={`option2-${index}`}
                        value={option}
                        checked={stage.includes(option)}
                        onChange={() => InvestorStageSelector(option)}
                    />
                    <label htmlFor={`option2-${index}`} className={`ml-2 ${stage.includes(option) ? 'text-green-400' : 'text-white'}`}>{option}</label>
                </div>
            ))}
            </div>
            </div>

            <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            What kind of support do you offer in the StartupVault ecosystem?
          </div>
          <div className="mt-1 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            <div className="grid grid-cols-1 max-md:grid-cols-1">
            {options3.map((option, index) => (
                <div key={index} className="flex items-center">
                    <input
                        type="checkbox"
                        id={`option3-${index}`}
                        value={option}
                        checked={investorSupport.includes(option)}
                        onChange={() => InvestorSupportSelector(option)}
                    />
                    <label htmlFor={`option3-${index}`} className={`ml-2 ${investorSupport.includes(option) ? 'text-green-400' : 'text-white'}`}>{option}</label>
                </div>
            ))}

            </div>
            </div>

          
            <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
            Investor Website
          </div>
          <input 
            type="text" 
            value={investorWebsite}
            onChange={(e) => setInvestorWebsite(e.target.value)}
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
            value={investorLinkedin}
            onChange={(e) => setInvestorLinkedin(e.target.value)}
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
export default OrgInvestorEditForm;

