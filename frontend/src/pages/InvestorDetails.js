import * as React from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";


function InvestorDetails(props) {
  const [investorData, setInvestorEntry] = React.useState({});
  const myCookies = new Cookies();
  const idInvestor = myCookies.get('id')
  const token = myCookies.get('token')

  React.useEffect(() => {
    fetchDataInvestor();
  }, []);

  const fetchDataInvestor = async () => {
    try {
        // const response = await fetch(`https://startupvault-foundry.vercel.app/auth/investor/${idInvestor}/`,{
        const response = await fetch(`http://localhost:8000/auth/investor/${idInvestor}/`, {
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

  return (
    <div className="flex flex-col pb-20 bg-black">
      <div className="flex gap-5 justify-between py-6 pr-10 pl-20 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between text-white max-md:flex-wrap max-md:max-w-full">
          <div className="text-4xl italic font-semibold tracking-wider leading-10">
            startupvault.id
          </div>
          <div className="flex gap-5 justify-center px-5 py-3 text-xl font-light max-md:flex-wrap max-md:px-5">
            <div>Showcase</div>
            <div>Events</div>
            <div>Our Investors</div>
            <div className="text-stone-100">Our Startups</div>
          </div>
        </div>
        <div className="flex gap-2 rounded-[30px]">
          <div className="justify-center px-5 py-2 text-xl font-light text-green-400 rounded-3xl bg-green-400 bg-opacity-20">
            My Dashboard
          </div>
          <div className="flex gap-2 items-center py-2 pr-3 pl-2 bg-neutral-800 rounded-[30.497px]">
            <div className="flex justify-center items-center self-stretch">
              <img
                loading="lazy"
                srcSet="..."
                className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[30px] w-[30px]"
              />
            </div>
            <div className="self-stretch my-auto text-xl font-medium tracking-wide text-stone-100">
              Naznien
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3037ca457875e4d12293bd650e7c90ca95f4b4173a966fed9d00ec84228efb5?"
              className="shrink-0 self-stretch my-auto aspect-square w-[18px]"
            />
          </div>
        </div>
      </div>
      <div className="z-10 mt-0 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch mt-8 max-md:mt-10">
              <div className="flex flex-col px-10 max-md:px-5">
                <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/26d78780db79f19729d43a2126d1797e7b5347b6580c850be4e9ef6a2b20e40a?"
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div>Search in dashboard</div>
                </div>
                <div className="flex gap-2 self-start mt-10 ml-16 text-xl tracking-wide whitespace-nowrap text-neutral-400 max-md:ml-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <div className="my-auto">Overview</div>
                </div>
                <div className="flex gap-5 justify-between mt-10 text-xl font-medium tracking-wide text-green-400">
                  <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                  <div className="flex gap-2 px-4 py-2 rounded-lg bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a5577d29bac61b16c070200e8b671c8672d78decbbc90ab7b4e8000d208cade?"
                      className="shrink-0 w-8 aspect-square"
                    />
                    <div className="my-auto">Investor details</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 pt-9 pb-20 max-md:mt-5 max-md:max-w-full">
              <div className="flex flex-wrap gap-0 content-center pr-20 max-md:pr-5">
                <div className="text-4xl font-semibold tracking-wider leading-[54px] text-stone-100 max-md:text-4xl">
                  INVESTOR DETAILS
                </div>
                <Link to="/updateInvestorDetails" className="flex">
                  <div className="flex gap-1.5 ml-4 justify-between px-0.5 my-auto text-base tracking-wide text-neutral-400">
                    <div>edit details</div> 
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/82b7e4e12d761b2431f64664a5f91254af5e65f00c8ef3b13c9b59844d36b44c?"
                      className="shrink-0 aspect-square w-[20px]"
                    />
                  </div>
                </Link>
              </div>
              <img
                loading="lazy"
                srcSet={investorData.image}
                className="mt-5 bg-green-700 rounded-full aspect-[0.99] h-[74px] w-[74px]"
              />
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                Name
              </div>
              <div className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]">
                {investorData.name}
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                LinkedIn
              </div>
              <div className="flex gap-2.5 py-1.5 mt-2.5 text-sm whitespace-nowrap rounded-md max-w-[800px] bg-neutral-800 max-md:flex-wrap">
                <div className="justify-center ml-2 p-2 tracking-normal text-white rounded-md bg-neutral-700">
                  linkedin.com/in/
                </div>
                {investorData.linkedin && (
                <div className="my-auto font-light tracking-normal text-neutral-400 max-md:max-w-full">
                  {investorData.linkedin.replace("https://linkedin.com/", "")}
                </div>
                )}
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                Email
              </div>
              <div className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]">
                {investorData.email}
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">
                Phone Number
              </div>
              <div className="justify-center items-start px-3 py-3.5 mt-2.5 text-sm font-light tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-w-[800px]">
                {investorData.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorDetails;