import * as React from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";


function OrgInvestorReadForm(props) {
  const [investorData, setInvestorEntry] = React.useState({});
  const [contactData, setContactEntry] = React.useState({});
  const myCookies = new Cookies();
  const idInvestor = myCookies.get('id')
  const token = myCookies.get('token')
  const idInvestorOrg = myCookies.get("investorOrganization")
  const [activeMenu, setActiveMenu] = React.useState("summary");


  React.useEffect(() => {
    console.log(token);
    console.log(idInvestor);
    fetchDataInvestor();

  }, []);



  const fetchDataInvestor = async () => {
    try {
        // const response = await fetch(`https://startupvault-foundry.vercel.app/auth/investor/${idInvestor}/`,{
        const response = await fetch("https://startupvault-foundry.vercel.app/auth/investororg/" + idInvestorOrg, {
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
        try {
            const response = await fetch("https://startupvault-foundry.vercel.app/auth/investor/" + idInvestor + "/", {
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
  
  function renderSupportIcon(sector) {
    switch (sector.toLowerCase()) {
      case 'mentorship':
        return (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9ea7626adfdcf68ab2874768daac813747b82fa55d9e6f444b3a921b9651cc8?" // Replace "URL_TO_MENTORSHIP_ICON" with the actual URL of the mentorship sector icon
            className="shrink-0 w-8 aspect-square"
            alt="Mentorship Icon"
          />
        );
      case 'legal assistance':
        return (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c6035d09e45f8a1f7afd38d0321da102330d3dd9c50c37cfe090036cd5eaca5?"// Replace "URL_TO_LEGAL_ASSISTANCE_ICON" with the actual URL of the legal assistance sector icon
            className="shrink-0 w-8 aspect-square"
            alt="Legal Assistance Icon"
          />
        );
      case 'introduction':
        return (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/75cf97640a91df542a2b7cf4cc1bd2104e8b2ae502c746e7a7a3b12f84a11283?" // Replace "URL_TO_INTRODUCTION_ICON" with the actual URL of the introduction sector icon
            className="shrink-0 w-8 aspect-square"
            alt="Introduction Icon"
          />
        );
        case 'capital':
        return (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4441046a6d37676ea814e3652737389c2b6f9dc9e0a93381c9527e232f1190c?"
            className="shrink-0 w-8 aspect-square"
            alt="Introduction Icon"
          />
        );
      default:
        return null;
    }
  }
  function renderStageIcon(stage) {
    switch (stage.toLowerCase()) {
      case 'pre-seed':
        return (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/84697b0b23ce70dfbbd5e9b5c9b685b29b26adf5ab6a335db5bba1c9fc6a7539?"// Replace "URL_TO_LEGAL_ICON" with the actual URL of the legal sector icon
            className="shrink-0 w-8 aspect-square"
            alt="Legal Icon"
          />
        );
      case 'beyond a':
        return (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ecdcc98cb8c9c8bdb3d2921515afb705126f11f55eeb800d9358779082498b5?"
            className="shrink-0 w-8 aspect-square"
            alt="Mentorship Icon"
          />
        );
      case 'series a':
        return (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2657d620c74b57d68f23e15a75c83871df7b302e09e15c4b885c2d22fce36bc?"
            className="shrink-0 w-8 aspect-square"
            alt="Legal Assistance Icon"
          />
        );
    }
  }
  const handleClick = (menu) => {
    setActiveMenu(menu);
  }

  return (
    <div className="flex flex-col justify-center bg-black min-h-screen px-20">
      <NavBar style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}/>
      <div className="w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0"  style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow pb-3 pr-5 max-md:max-w-full">
              <div className="flex gap-5 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col justify-center items-start py-2 pr-1 pl-1 rounded-none border-t border-r border-b border-green-400 border-solid bg-green-400 bg-opacity-20">
                  <Link to="/dashboardInvestor">
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
                    <Link to="/orgInvestorEditForm">
                    <div className="text-base">Edit profile</div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col self-end mt-6 px-0 max-w-full w-[822px]"> */}
                <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full mt-4">
                  <div className="flex gap-5 justify-between">
                    <div className="flex justify-center items-center rounded-md bg-green-400 bg-opacity-20 h-[69px] w-[69px]">
                      <img
                        loading="lazy"
                        src={investorData.logo}
                        className="aspect-square"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-1 pr-4 text-xl font-semibold tracking-wide whitespace-nowrap text-stone-100">
                        <div>{investorData.name}</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1703c0f29824e839c1b5e4f85dc89fa5d983de6f4cf2e268e2cd6f85ea79ac6?"
                          className="shrink-0 my-auto w-5 aspect-square"
                        />
                      </div>
                      <div className="flex gap-1 mt-1 text-base">
                        <div className="justify-center px-3 py-1 font-semibold tracking-widest rounded-xl bg-neutral-800 leading-normal text-stone-100">
                          {investorData.typ}
                        </div>
                        <div className="flex gap-1 px-2 py-1.5 font-light tracking-wide text-white whitespace-nowrap rounded-3xl">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/66d73d03e5226e5c23a64085edc9624dfc19793374b9757dc32685f504621d7e?"
                            className="shrink-0 self-start w-5 aspect-square"
                          />
                          <div className="underline">{investorData.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 self-start">
                  <a href={`https://${investorData.website}`} target="_blank" rel="noopener noreferrer">
                  <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/62e0e5f129c4a122d7f77968332bd78cc39b5f2f5fa17d52be3e208facf2a919?"
                      className="shrink-0 w-8 aspect-square"
                    />
                 </a>

                 <a href={`https://linkedin.com/in/${investorData.linkedin}`} target="_blank" rel="noopener noreferrer"> 
                 <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/11f468775b14b62903b205e3f321893c259f5fa95e5c3548ee9783b53efc43ef?"
                      className="shrink-0 w-8 aspect-square"
                    />
                 </a>
                  
                  </div>
                </div>
                <div className="flex gap-5 justify-center items-center self-start py-1.5 mt-3 text-xl font-medium tracking-wide whitespace-nowrap border-2 border-black border-solid">
                <div
                    className={`flex flex-col justify-center self-stretch ${activeMenu === "summary" ? "text-green-400" : "text-neutral-400"} hover:cursor-pointer`}
                    onClick={() => handleClick("summary")}
                >
                    Summary
                    <div className={`shrink-0 mt-2.5 h-0.5 ${activeMenu === "summary" ? "bg-green-400" : "bg-transparent"} rounded-xl`} />
                </div>
                <div
                    className={`self-stretch my-auto ${activeMenu === "industry" ? "text-green-400" : "text-neutral-400"} hover:cursor-pointer`}
                    onClick={() => handleClick("industry")}
                >
                    Industry
                    <div className={`shrink-0 mt-2.5 h-0.5 ${activeMenu === "industry" ? "bg-green-400" : "bg-transparent"} rounded-xl`} />
                </div>
                <div
                    className={`self-stretch my-auto ${activeMenu === "location" ? "text-green-400" : "text-neutral-400"} hover:cursor-pointer`}
                    onClick={() => handleClick("location")}
                >
                    Location
                    <div className={`shrink-0 mt-2.5 h-0.5 ${activeMenu === "location" ? "bg-green-400" : "bg-transparent"} rounded-xl`} />
                </div>
                </div>

                {activeMenu === "summary" && (
                <div>
                    <div className="justify-center p-4 mt-3 text-base tracking-normal rounded-lg bg-neutral-800 text-stone-100 max-md:px-5 max-md:max-w-full">
                  {investorData.desc}
                </div>
                <div className="self-start mt-3 text-2xl font-medium tracking-wide text-stone-100">
                  Ticket size
                </div>
                <div className="flex gap-4 self-start p-3 mt-3 rounded-lg bg-neutral-800 max-md:px-5">
                  <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b4441046a6d37676ea814e3652737389c2b6f9dc9e0a93381c9527e232f1190c?"
                      className="aspect-square w-[18px]"
                    />
                  </div>
                  <div className="my-auto text-xl text-stone-100">
                    Rp{investorData.ticket}
                  </div>
                </div>
                <div className="mt-3 text-2xl font-medium tracking-wide text-stone-100">
                    What we can offer
                </div>
                <div className="flex flex-wrap gap-3 mt-3 max-md:flex-wrap">
                    {investorData.support && investorData.support.split(',').map((support, index) => (
                    <div key={index} className="flex items-center">
                    <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl bg-green-400 bg-opacity-20">
                        {renderSupportIcon(support.trim())}
                    </div>
                        <div className="ml-2 text-xl text-stone-100">{support.trim()}</div>
                    </div>
                    ))}
                </div>
                <div className="self-start mt-3 text-2xl font-medium tracking-wide text-stone-100">
                  Stage preferences
                </div>
                <div className="flex flex-wrap gap-3 mt-3 max-md:flex-wrap">
                    {investorData.stage && investorData.stage.split(',').map((stage, index) => (
                    <div key={index} className="flex items-center">
                    <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl bg-green-400 bg-opacity-20">
                        {renderStageIcon(stage.trim())}
                    </div>
                        <div className="ml-2 text-xl text-stone-100">{stage.trim()}</div>
                    </div>
                    ))}
                </div>
                </div>
                )}
                {activeMenu === "industry" && (
                <div>
                <div className="mt-6 text-2xl font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                  Industry
                </div>
                {investorData.sector && (
                <div className="flex flex-wrap gap-3 mt-6 text-base text-stone-100 max-md:flex-wrap max-md:pr-5">
                    {investorData.sector.split(',').map((sector, index) => (
                    <div key={index} className="justify-center p-3 whitespace-nowrap rounded-lg bg-neutral-800">
                        {sector.trim()}
                    </div>
                    ))}
                </div>
                )}
                </div>
                )}
                {activeMenu === "location" && (
                <div>
                  
                <div className="mt-6 text-2xl font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                  Location
                </div>
                
                <div className="flex gap-4 p-4 bg-neutral-800 max-md:flex-wrap max-md:px-5 mt-3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5b6a7a664cd2652ba347d22223bcf3b9ea1bee4f0573a3f2a03b3337e265d4?"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <div className="flex-1 my-auto text-xl font-medium tracking-wide text-white max-md:max-w-full">
                    {investorData.location}
                  </div>
                </div>
                </div>
                )}

              </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start py-6 pr-20 pl-5 text-xl font-medium text-stone-100 max-md:pr-5 max-md:max-w-full">
            <div className="flex gap-2 justify-center mt-5">
              <div className="flex-1">Contact</div>
              <div className="flex-1 shrink-0 my-auto h-px border border-solid bg-neutral-400 border-neutral-400" />
            </div>
            <div className="flex gap-4 p-4 mt-6 tracking-wide whitespace-nowrap rounded-lg bg-neutral-800">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5eea301424cfc427d25367620bd195d0f7e1264a11e9b7cc1970ec9a308fc013?"
                className="shrink-0 w-6 aspect-square"
              />
              <div className="flex-1" style={{ width: '320px' }}>+62 {contactData.phoneNumber}</div>
              <a className="hover:cursor-pointer" onClick={() => {
                    navigator.clipboard.writeText("+62" + contactData.phoneNumber)
                }}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ffae47cb816d5ac5b57e512113910e3a80652aebbaabf17304aa8d64e019d5d?"
                className="shrink-0 w-6 aspect-square"
              />
              </a>
            </div>
            <div className="flex gap-4 p-4 mt-4 tracking-wide whitespace-nowrap rounded-lg bg-neutral-800">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/10271fc0c5a99e3cb97c7da3ca08a0806d87b5e791b29fc5b639a1c9492051fc?"
                className="shrink-0 w-6 aspect-square"
              />
              <div className="flex-1" style={{ width: '320px' }}>{contactData.email}</div>
              <a href={`mailto:${contactData.email}`}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?"
                className="shrink-0 w-6 aspect-square"
              />
              </a>
            </div>
            <div className="flex gap-4 p-4 mt-4 tracking-wide whitespace-nowrap rounded-lg bg-neutral-800">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d7274dd451c8cd9b962b4549c3872acb89029f86f7c2f2041ae3dfe9fa6b9271?"
                className="shrink-0 w-6 aspect-square"
              />
              <div className="flex-1" style={{ width: '300px' }}>
                <a
                  href={`${contactData.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-200 hover:underline flex items-center px-0"
                >
                 {contactData.linkedin}
                </a>
              </div>
              <a
                href={`${investorData.linkedin}`}
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



export default OrgInvestorReadForm;
