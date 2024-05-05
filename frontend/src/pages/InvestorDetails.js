import * as React from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import SideBar from "../component/SideInvestor";


function InvestorDetails(props) {
  const [investorData, setInvestorEntry] = React.useState({
    name: '',
    linkedin: '',
    email: '',
    phoneNumber: ''
  });
  const myCookies = new Cookies();
  const idInvestor = myCookies.get('id')
  const token = myCookies.get('token')

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

  return (
    <div className="flex flex-col pb-20 px-20 bg-black min-h-screen">
      <NavBar status={"dashboard"}/>
      <div className="z-10 mt-0 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <SideBar status={"profile"}/>
          <div className="flex flex-col w-[77%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 pt-9 pb-20 max-md:mt-5 max-md:max-w-full">
              <div className="flex flex-wrap gap-0 content-center pr-20 max-md:pr-5">
                <div className="text-2xl font-semibold tracking-wider leading-[54px] text-stone-100 max-md:text-4xl">
                  Investor Details
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
                src={investorData.image}
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
                  {investorData.linkedin.replace("https://www.linkedin.com/in/", "")}
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