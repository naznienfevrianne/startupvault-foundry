import * as React from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import { useNavigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";

function UpdateInvestorDetails(props) {
  const navigate = useNavigate();

  const [investorData, setInvestorEntry] = React.useState({
    name: '',
    linkedin: '',
    email: '',
    phoneNumber: ''
  });
  const myCookies = new Cookies();
  const emailInvestor = myCookies.get('email')
  const idInvestor = myCookies.get('id')
  const token = myCookies.get('token')
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isPhoneNumberValid, setPhoneNumberValid] = React.useState(true);
  const [isDigit, setIsDigit] = React.useState(true);
  const [isLinkedinValid, setLinkedinValid] = React.useState(true);
  const supabaseUrl= "https://yitzsihwzshujgebmdrg.supabase.co";
  const supabaseKey= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdHpzaWh3enNodWpnZWJtZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MzQyMjYsImV4cCI6MjAyMzExMDIyNn0.vDEP-XQL4BKAww7l_QW1vsQ4dZCM5GknBPACrgPXfKA"
  const supabase = createClient(supabaseUrl, supabaseKey);

  React.useEffect(() => {
    fetchDataInvestor();
  }, []);

  const fetchDataInvestor = async () => {
    try {
        const response = await fetch(`https://startupvault-foundry.vercel.app/auth/investor/${idInvestor}/`, {
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
        setInvestorEntry(entry);
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

      const filePath = `${investorData.name}/${fileName}`;
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
      setInvestorEntry((prevState) => ({
          ...prevState,
          image: imageUrl
      }));
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const handleUpdateName = async (e) => {
    const { name, value } = e.target;
    setInvestorEntry((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateEmail = async (e) => {
    const { name, value } = e.target;
    setInvestorEntry((prevState) => ({
      ...prevState,
      [name]: value
    }));
  
    try {
      const response = await fetch('https://startupvault-foundry.vercel.app/auth/checkEmail/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: value }),
      });
  
      const data = await response.json();
      if (data.message === 'Email already used') {
        if (value == emailInvestor){
          setIsEmailValid(true); 
        } else{
          console.log('Email already used');
          setIsEmailValid(false); 
        }
      } else {
        console.log('Email is available');
        setIsEmailValid(true); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleUpdateLinkedin = async (e) => {
    const { name, value } = e.target;
    setInvestorEntry((prevState) => ({
      ...prevState,
      [name]: value
    }));
  
    if (value && value.startsWith("https://www.linkedin.com/in/")){
      setLinkedinValid(true); 
    } else {
      setLinkedinValid(false); 
    }
  };

  const handleUpdatePhoneNumber = async (e) => {
    const { name, value } = e.target;
    if (value === '') { //Empty
      setInvestorEntry((prevState) => ({
        ...prevState,
        [name]: value
      }));
      setIsDigit(true)
      setPhoneNumberValid(true); 
    } else if (!isNaN(Number(value))){ //Numeric
      setInvestorEntry((prevState) => ({
        ...prevState,
        [name]: value
      }));
      setIsDigit(true)
      setPhoneNumberValid(value.length <= 12); //Valid length
    } else {
      setIsDigit(false)
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://startupvault-foundry.vercel.app/auth/investor/${idInvestor}/`, {
        method: "PUT",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(investorData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      navigate('/investorDetails');
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <div className="flex flex-col pb-20 px-20 min-h-screen bg-black">
      <form onSubmit={handleSubmit}>
        <NavBar />
        
        <div className="z-10 mt-0 w-full max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <aside className=" flex w-[23%px] flex-col justify-start mt-6">
            <div className="h-[50px] flex-col justify-start items-center gap-3 flex">
              <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
                  className="shrink-0 w-5 aspect-square"
                />
                <div className="flex-auto">Search in dashboard</div>
              </div>
              <Link to="/dashboardInvestor">
              <div className="pr-15 mt-5 justify-start items-center inline-flex pl-0 whitespace-nowrap">
                <div className="justify-start items-center gap-2 flex pr-40 pl-12">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?"
                    className="shrink-0 w-8 aspect-square self-center"
                  />
                  <div className="text-neutral-400 text- font-normal item-center tracking-tight">Overview</div>
                </div>
              </div>
              </Link>
              <Link to="/investorDetails">
              <div className="flex gap-5 font-medium items-center text-green-400 whitespace-nowrap max-md:pr-5">
                <div className="w-1 self-stretch bg-green-400 rounded-tr-[10px] rounded-br-[10px] shadow" />
                <div className="h-12 flex pr-20 gap-2 bg-green-400 bg-opacity-20 rounded-lg">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a5577d29bac61b16c070200e8b671c8672d78decbbc90ab7b4e8000d208cade?"
                    className="shrink-0 w-8 aspect-square self-center ml-3"
                  />
                  <div className="text-green-400 text- font-medium item-center tracking-tight my-auto">Investor Details</div>
                </div>
              </div>
              </Link>
            </div>
          </aside>
            <div className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow px-5 pt-9 pb-20 max-md:mt-5 max-md:max-w-full">
                <div className="flex flex-wrap gap-0 content-center pr-20 max-md:pr-5 text-stone-100">
                  <div className="text-4xl font-semibold tracking-wider leading-[54px]  max-md:text-4xl">
                    INVESTOR DETAILS
                  </div>
                  <div className="flex gap-1.5 justify-center ml-4 px-2 py-1 my-auto text-sm tracking-wide rounded-xl border border-solid shadow-sm bg-neutral-400 bg-opacity-40 border-neutral-400">
                    <div>editing mode</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9848d50a147fb47447c8f785bb29761ae1a620604a4ca40606a51993ba1037e?"
                      className="shrink-0 self-start aspect-[1.04] w-[20px]"
                    />
                  </div>
                </div>
                <div className="flex gap-4 justify-between self-start mt-5">
                  <div className="flex justify-center items-center">
                    <img
                      loading="lazy"
                      src={investorData.image}
                      className="mt-5 bg-green-700 rounded-full aspect-[0.99] h-[74px] w-[74px]"
                    />
                  </div>
                  <input
                      type="file"
                      accept="image/*"
                      id="profile-picture-upload"
                      onChange= {handleUpdateImage}
                      style={{ display: "none" }} 
                    />
                  <label htmlFor="profile-picture-upload" className="cursor-pointer mt-10 text-sm font-light tracking-normal text-blue-400">
                    Change profile picture
                  </label>
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                  Name
                </div>
                <input 
                  type="text"
                  name="name"
                  value={investorData.name || ''}
                  onChange={handleUpdateName}
                  className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]"
                  required
                />
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                  LinkedIn
                </div>
                <input
                    type="text"
                    name="linkedin"
                    value={investorData.linkedin || ''}
                    onChange={handleUpdateLinkedin}
                    className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]"
                  />
                { !isLinkedinValid && (
                  <div className="text-red-500 text-sm mt-2">The link should start with https://www.linkedin.com/in/</div>
                )}
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                  Email
                </div>
                <input 
                  type="text"
                  name="email"
                  value={investorData.email || ''}
                  onChange={handleUpdateEmail}
                  className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]"
                  required
                />
                { !isEmailValid && (
                  <div className="text-red-500 text-sm mt-2">This email has been taken.</div>
                )}
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                  Phone Number
                </div>
                <input 
                  type="text"
                  name="phoneNumber"
                  value={investorData.phoneNumber || ''}
                  onChange={handleUpdatePhoneNumber}
                  className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]"
                  required
                />
                { !isPhoneNumberValid && (
                  <div className="text-red-500 text-sm mt-2">Phone number cannot exceed 12 characters.</div>
                )}
                { !isDigit && (
                  <div className="text-red-500 text-sm mt-2">Numeric characters only.</div>
                )}
                <div className="flex gap-4 pr-20 mt-8 text-base font-semibold whitespace-nowrap max-md:flex-wrap max-md:pr-5">
                  <Link to="/investorDetails" className="flex">
                    <div className="justify-center px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">
                      CANCEL
                    </div>    
                  </Link>              
                  <button className="justify-center px-4 py-2 text-black bg-green-400 rounded-2xl max-md:px-5" type="submit" disabled={!isEmailValid || !isPhoneNumberValid || !isLinkedinValid}>
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateInvestorDetails;