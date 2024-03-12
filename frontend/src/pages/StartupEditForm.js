import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import{ Cookies } from 'react-cookie';
import NavBar from "../component/NavBar";
import { Link } from 'react-router-dom';

const StartupEditDetails = () => {
    const storedProfilePicture = localStorage.getItem("profilePicture") || '';
    const [startupDetails, setStartupDetails] = useState("");
    const myCookies = new Cookies();
        const idStartup = myCookies.get('startup');
        const token = myCookies.get('token');
    
        if(idStartup){
        console.log(myCookies.get('startup'))
        }else{
        console.log("cookies does not exist.")
        }
    
    const [profilePicture, setProfilePicture] = useState(storedProfilePicture);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`,{
                method: "GET", 
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
                }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const entry = await response.json();
                setStartupDetails(entry);
            } catch (error) {
                console.log("Error:", error);
            }
        };
    
        fetchData();
    }, []);
    
    const handleProfilePictureChange = (e) => {
        
        let file = e.target.files[0]
        const imageUrl = URL.createObjectURL(file)
        setProfilePicture(imageUrl);
        localStorage.setItem("profilePicture", imageUrl);
    }
    
    
    const handleUpdate = async () => {
        try {
            const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer' + token
                },
                body: JSON.stringify(startupDetails),
            });
            if (!response.ok) {
                throw new Error("Failed to update data");
            }
            console.log("Data updated successfully");
            console.log("Navigating to /founderReadForm...");
            navigate('/startupReadForm');
        } catch (error) {
            console.error("Error:", error);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();
    };

    return (
        <div className="flex flex-col justify-center pb-20 bg-black px-20">
          <NavBar />
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                          
            <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full pl-0">
              <div className="flex flex-col items-center self-stretch pb-2 mt-6 text- tracking-wide text-neutral-400">
                <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="flex-auto">Search in dashboard</div>
                </div>
                <div className="flex gap-2 mt-5 whitespace-nowrap">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <div className="grow my-auto">
                  <Link to="/dashboard">Overview</Link>
                    </div>
                </div>
                <div className="flex gap-2 mt-5 whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="grow my-auto">
                        <Link to="/diary">Weekly Updates</Link>
                        </div>
                    </div>
                    <div className="flex gap-5 justify-between self-stretch pr-10 mt-5 font-medium text-green-400 whitespace-nowrap max-md:pr-5">
                  <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                  <div className="flex gap-2 pr-12 pl- py-2 rounded-lg bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbfe1e3b28c84ff800a8172798e7a2d18a3c86aff8fc82df5ba2d6080962d15a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      />
                    <div className="flex-auto my-auto">
                    <Link to="/startupReadForm">Startup Details</Link>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-5 whitespace-nowrap max-md:mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <div className="grow my-auto">
                  <Link to="/founderReadForm">Founder Details</Link>
                    </div>
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
                {/* <div className="flex gap-3.5 self-start mt-3.5">
                    <div className="flex justify-center items-center px-3 bg-green-700 rounded h-[57px] w-[57px]">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8ebc8fc6ad43f082eef76cd4df07a8450ac59a0fabac0a4704061598e6f6ba6?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="w-8 aspect-square"
                    />
                    </div>
                    <div className="flex-auto my-auto text-sm font-light tracking-normal text-blue-400">
                    Change logo
                    </div>
                </div> */}
                <div className="flex gap-4 self-start mt-5">
                    {profilePicture ? (
                    <div className="flex flex-1 justify-center items-center">
                        <img
                        src={profilePicture}
                        loading="lazy"
                        className="aspect-[1.01] w-[160px] bg-green-700 rounded-xl"
                        alt="profile avatar"
                        />
                    </div>
                    ) : (
                        <div className="flex flex-col justify-center items-start px-8 py-8 mt-3.5 max-w-full bg-green-700 rounded-xl w-[146px] max-md:px-5">
                            <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/47ca398fa854e64d37677f75ca6a4dfad6cf6c9cad694afcabd944dce2397c1b?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                            className="aspect-[1.01] w-[83px]"
                            />
                        </div>
                          )}
                        <div className="flex justify-center items-center mt-3 pl-6">
                    <input
                      type="file"
                      accept="image/*"
                      id="profile-picture-upload"
                      onChange={handleProfilePictureChange}
                      style={{ display: "none" }} // Hide the file input
                    />
                    <label htmlFor="profile-picture-upload" className="cursor-pointer text-sm font-light tracking-wide text-blue-400 whitespace-nowrap">
                      Change logo
                    </label>
                    </div>
                  </div>
                <div className="mt-3.5 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Stage
                </div>
                <div className="flex flex-col justify-center py-1.5 pr-10 pl-3 mt-2 max-w-full text-sm font-light tracking-normal text-green-400 whitespace-nowrap rounded-2xl bg-zinc-700 w-[131px] max-md:px-5">
                    <div className="flex gap-1.5 items-center pr-52 -mr-0.5 max-md:pr-5">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a83580d51c130e7ec5d8183968df5517eec3b80b5585d5a8fe9fbdf7c681d2bd?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 self-stretch aspect-[1.04] w-[23px]"
                    />
                    <div className="self-stretch my-auto">Pre-seed</div>
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e14bdb26e882d6df91a027be2703c186ab4bacfdcbd5009522fb76206bcbc74?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 self-stretch my-auto aspect-[0.94] w-[17px]"
                    />
                    </div>
                </div>
                <div className="mt-5 text-xl font-medium tracking-wide text-stone-100">Name</div>
                  <input
                    type="text"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer"
                    placeholder=" "
                    value={startupDetails.name}
                    onChange={(e) => setStartupDetails({ ...startupDetails, name: e.target.value })}
                    required
                  /><div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Sector
                </div>
                <div className="mt-3 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-base tracking-normal text-stone-100 max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-2 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            Technology and SaaS
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 font-semibold text-green-400 max-md:flex-wrap">
                            <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/566dfb038bcdfb819f51aab03f573a170251e627f2279d5e2009b411c76e3919?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                            className="shrink-0 my-auto w-3.5 aspect-square"
                            />
                            <div className="flex-auto max-md:max-w-full">
                            E-commerce and Marketplaces
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            HealthTech and MedTech
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 whitespace-nowrap max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">FinTech</div>
                        </div>
                        <div className="flex gap-2 mt-3 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            CleanTech and Sustainability
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            Gaming and Entertainment
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow text-base tracking-normal text-stone-100 max-md:mt-10 max-md:max-w-full">
                        <div className="flex gap-2 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            Technology and SaaS
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 font-semibold text-green-400 max-md:flex-wrap">
                            <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/566dfb038bcdfb819f51aab03f573a170251e627f2279d5e2009b411c76e3919?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                            className="shrink-0 my-auto w-3.5 aspect-square"
                            />
                            <div className="flex-auto max-md:max-w-full">
                            E-commerce and Marketplaces
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            HealthTech and MedTech
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 whitespace-nowrap max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">FinTech</div>
                        </div>
                        <div className="flex gap-2 mt-3 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            CleanTech and Sustainability
                            </div>
                        </div>
                        <div className="flex gap-2 mt-3 max-md:flex-wrap">
                            <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-sm border border-solid border-neutral-400" />
                            <div className="flex-auto max-md:max-w-full">
                            Gaming and Entertainment
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Describe your startup in less than 50 words
                </div>
                <div className="shrink-0 mt-3 h-24 rounded-lg bg-neutral-800 max-md:max-w-full" />
                <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Startup Pitchdeck
                </div>
                <div className="flex gap-2.5 self-start py-3 pr-3.5 pl-1.5 mt-3 text-xl font-semibold tracking-widest text-black rounded bg-stone-100 max-md:flex-wrap max-md:px-5">
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/779f10a85520b59db93097ff9e3026cc3ac4c5c929daca80463bcdb14743035c?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-6 aspect-square"
                    />
                    <div className="flex-auto">SELECT FILE</div>
                </div>
                <div className="flex gap-2.5 self-start py-3 pr-3.5 pl-3.5 mt-3 -mr-px text-base font-medium tracking-wide whitespace-nowrap rounded-lg border border-green-400 border-solid bg-green-400 bg-opacity-20 text-stone-100 max-md:flex-wrap max-md:px-5">
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/31fcabcb80276512fb0ad571f3578d4efbc2285976490daff7709e38ae806266?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-6 aspect-square"
                    />
                    <div className="my-auto">Pitchdeck.pdf</div>
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5c3b45e1d73817522de2dd1a4c959c52182b795836e359c4f83422632710d0a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-6 aspect-square"
                    />
                </div>
                <div className="self-start mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    Revenue over the last 6 months
                </div>
                <div className="flex gap-5 justify-between pr-20 mt-3 max-w-full text-base tracking-normal whitespace-nowrap text-stone-100 w-[437px] max-md:flex-wrap max-md:pr-5">
                    <div className="flex flex-col flex-1 flex-1">
                    <div className="flex gap-2">
                        <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-full border border-solid border-neutral-400 stroke-[1px]" />
                        <div className="grow">0 revenue</div>
                    </div>
                    <div className="flex gap-2 mt-3 font-semibold text-green-400 max-md:mr-2">
                        <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/32fdf41196637cae9a3d0edf3580a49528084d8bc200080149841d7473a69ef9?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 my-auto w-3.5 aspect-square"
                        />
                        <div className="grow">USD 1-10K</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-full border border-solid border-neutral-400 stroke-[1px]" />
                        <div className="grow">USD 11-50K</div>
                    </div>
                    </div>
                    <div className="flex flex-col flex-1 flex-1">
                    <div className="flex gap-2">
                        <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-full border border-solid border-neutral-400 stroke-[1px]" />
                        <div className="grow">USD 51-100K</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-full border border-solid border-neutral-400 stroke-[1px]" />
                        <div className="grow">USD 101-500K</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <div className="shrink-0 my-auto w-3.5 h-3.5 rounded-full border border-solid border-neutral-400 stroke-[1px]" />
                        <div className="grow">USD 501K+</div>
                    </div>
                    </div>
                </div>
                <div className="mt-3 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                    What kind of support do you need in the StartupVault ecosystem?
                </div>
                <div className="flex gap-2 mt-5 pr-20 text-xl font-semibold tracking-widest">
                  <a type="button" href="/founderReadForm" className="px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">cancel</a>
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