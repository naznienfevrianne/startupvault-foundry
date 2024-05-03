import * as React from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";


function OrgPartnerReadForm(props) {
  const [orgPartnerData, setOrgPartnerEntry] = React.useState({});
  const [contactData, setContactEntry] = React.useState({});
  const myCookies = new Cookies();
  const idPartner = myCookies.get('id')
  const token = myCookies.get('token')
  const idOrgPartner = myCookies.get("partnerOrganization")
  const [activeMenu, setActiveMenu] = React.useState("summary");


  React.useEffect(() => {
    fetchDataOrgPartner();
  }, []);



  const fetchDataOrgPartner = async () => {
    try {
        // const response = await fetch(`https://startupvault-foundry.vercel.app/auth/investor/${idInvestor}/`,{
        const response = await fetch("https://startupvault-foundry.vercel.app/auth/partnerorg/" + idOrgPartner, {
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
        setOrgPartnerEntry(entry);
        try {
            const response = await fetch("http://localhost:8000/auth/partner/" + idPartner + "/", {
            // const response = await fetch("https://startupvault-foundry.vercel.app/auth/partner/" + idPartner + "/", {
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
            setContactEntry(entry);
        } catch (error) {
            console.error("Error:", error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
  };
  
  

  return (
    <div className="flex flex-col justify-center bg-black min-h-screen px-20">
      <NavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }} status={"dashboard"}/>
      <div className="w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0"  style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pb-3 pr-5 max-md:max-w-full">
              <div className="flex gap-5 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-center items-start py-2 pr-1 pl-1 rounded-none border-t border-r border-b border-green-400 border-solid bg-green-400 bg-opacity-20">
                  <Link to="/dashboardSementara">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/21b0b24d5b53b756d71a21ed0c3e4ce07ee023c54ab50c6bc97779c396f7faf4?"
                    className="w-5 aspect-square"
                  />
                  </Link>
                </div>
                <div className="flex gap-5 py-1 pr-20 max-md:flex-wrap">
                  <div className="text-2xl font-semibold tracking-wide text-stone-100">
                    Public profile
                  </div>
                  <div className="flex gap-1.5 justify-center my-auto text-xl tracking-wide text-neutral-400">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3964155d5eada7de0e1a24e27d475a201a8c5bfaaf18562fa030ba1f626a9b26?"
                      className="shrink-0 aspect-square w-[23px]"
                    />
                    <Link to="/orgPartnerEditForm">
                    <div className="text-base">Edit profile</div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col self-end mt-6 px-0 max-w-full w-[822px]"> */}
                <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full mt-8">
                  <div className="flex gap-5 justify-between">
                    <div className="flex justify-center items-center rounded-md bg-green-400 bg-opacity-20 h-[69px] w-[69px]">
                      <img
                        loading="lazy"
                        src={orgPartnerData.logo}
                        className="aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-1 pr-4 text-xl font-semibold tracking-wide whitespace-nowrap text-stone-100">
                        <div>{orgPartnerData.name}</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1703c0f29824e839c1b5e4f85dc89fa5d983de6f4cf2e268e2cd6f85ea79ac6?"
                          className="shrink-0 my-auto w-5 aspect-square"
                        />
                      </div>
                      <div className="flex gap-1 mt-1 text-base">
                        <div className="justify-center px-3 py-1 font-semibold tracking-widest rounded-xl bg-neutral-800 leading-normal text-stone-100">
                          Partner
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 self-start">
                  <a href={`https://${orgPartnerData.website}`} target="_blank" rel="noopener noreferrer">
                  <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/62e0e5f129c4a122d7f77968332bd78cc39b5f2f5fa17d52be3e208facf2a919?"
                      className="shrink-0 w-8 aspect-square"
                    />
                 </a>

                 <a href={orgPartnerData.linkedin} target="_blank" rel="noopener noreferrer"> 
                 <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/11f468775b14b62903b205e3f321893c259f5fa95e5c3548ee9783b53efc43ef?"
                      className="shrink-0 w-8 aspect-square"
                    />
                 </a>
                  
                  </div>
                </div>

                <div>
                  <div className="self-start mt-5 text-xl font-medium tracking-wide text-stone-100">
                    Description
                  </div>
                  <div className="justify-center p-4 mt-3 text-base tracking-normal rounded-lg bg-neutral-800 text-stone-100 max-md:px-5 max-md:max-w-full">
                    {orgPartnerData.desc}
                  </div>              
                  <div className="self-start mt-3 text-xl font-medium tracking-wide text-stone-100">
                    Location
                  </div>
                  <div className="flex p-4 mt-3 text-base tracking-normal rounded-lg bg-neutral-800 text-stone-100 max-md:px-5 max-md:max-w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/66d73d03e5226e5c23a64085edc9624dfc19793374b9757dc32685f504621d7e?"
                      className="shrink-0 self-start w-5 aspect-square"
                    />
                    <div className="underline ml-3">{orgPartnerData.location}</div>
                  </div>        
                </div>
                
              </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start py-6 pr-20 pl-5 text-xl font-medium text-stone-100 max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-2 justify-center mt-5">
              <div className="flex-1">Contact</div>    
            </div>
            <div className="flex gap-4 p-4 mt-6 tracking-wide whitespace-nowrap rounded-lg bg-neutral-800" style={{ width: '100%' }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5eea301424cfc427d25367620bd195d0f7e1264a11e9b7cc1970ec9a308fc013?"
                className="shrink-0 w-6 aspect-square"
              />
              <div className="flex-grow text-base" style={{ maxWidth: 'calc(100% - 8px)' }}>+62{contactData.phoneNumber}</div>
              <a className="hover:cursor-pointer" 
                style={{ wordBreak: 'break-all' }}
                onClick={() => {
                  navigator.clipboard.writeText("+62" + contactData.phoneNumber)
                }}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ffae47cb816d5ac5b57e512113910e3a80652aebbaabf17304aa8d64e019d5d?"
                  className="shrink-0 w-6 aspect-square"
                />
              </a>
            </div>
            <div className="flex gap-4 p-4 mt-4 tracking-wide whitespace-nowrap rounded-lg bg-neutral-800" style={{ width: '100%' }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/10271fc0c5a99e3cb97c7da3ca08a0806d87b5e791b29fc5b639a1c9492051fc?"
                className="shrink-0 w-6 aspect-square"
              />
              <div className="flex-1 text-base" style={{ maxWidth: 'calc(100% - 8px)' }}>{contactData.email}</div>
              <a 
              style={{ wordBreak: 'break-all' }}
              href={`mailto:${contactData.email}`}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?"
                className="shrink-0 w-6 aspect-square"
              />
              </a>
            </div>
            <div className="flex gap-4 p-4 mt-4 text-lg tracking-wide rounded-lg bg-neutral-800" style={{ width: '100%' }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7274dd451c8cd9b962b4549c3872acb89029f86f7c2f2041ae3dfe9fa6b9271?"
                className="shrink-0 w-6 aspect-square"
              />
              <div className="flex-1 text-base" style={{ maxWidth: 'calc(100% - 8px)' }}>
                <a
                  href={`${contactData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-200 hover:underline flex items-center px-0"
                  style={{ wordBreak: 'break-all' }}
                >
                 {contactData.linkedin}
                </a>
              </div>
              <a
                href={`${contactData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 w-6 aspect-square"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?"
                  className="w-full h-full aspect-square"
                />
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgPartnerReadForm;
