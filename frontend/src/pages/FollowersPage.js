import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';
import Follow from './Follow';
import { useParams } from "react-router-dom";


const FollowersPage = () => {

  const myCookies = new Cookies();
  const token = myCookies.get('token');
  const [investors, setInvestors] = useState([]);
  const { startupId } = useParams();
 
  console.log(startupId);
  const numberOfInvestors = investors.length;
  console.log(numberOfInvestors); // This will log the total number of objects in your array


  useEffect(() => {


    const fetchData = async () => {
      try {
        console.log("Fetching investors...");
        const investorResponse = await fetch(`https://startupvault-foundry.vercel.app/diary/startups/${startupId}/followers/`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });

        if (!investorResponse.ok) {
          throw new Error(`Failed to fetch startups, status: ${investorResponse.status}`);
        }
        const investorsData = await investorResponse.json();
        console.log("Investors fetched:", investorsData);


        setInvestors(investorsData);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex flex-col items-center bg-black min-h-screen px-20 overflow-auto">
    <NavBar status="investor" />
    <main className="px-px pb-20 w-full max-md:max-w-full">
    <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col grow items-start pt-6 pr-5 pl-20 max-md:pl-5 max-md:max-w-full">
        

        { !numberOfInvestors? (
              <div className="flex gap-4 justify-between py-2 max-w-full w-[860px] max-md:flex-wrap">
              <div className="my-auto text-xl text-neutral-400">
             Followers not found
              </div>
              
            </div>
               ) : (
                <div className="my-auto text-xl text-neutral-400">
                {investors.length} investors found
                {investors.map((investor) => (
                    <div className="flex flex-col p-6 mt-6 max-w-full rounded-lg bg-neutral-800 w-[870px] max-md:px-5">
                    <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                        <div className="flex gap-5 justify-between">
                        { investor.image? (
                        <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[69px] w-[69px]"
                        style={{ backgroundImage: `url(${investor.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            </div>
                        ) : (
                        <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[69px] w-[69px]">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe89fd4bfc24bd6fe10001ef6745d29dfc88ea91b8b532ed8089fdbeaaa7558?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                            className="aspect-square w-[39px]"
                        />
                        </div>
                        )}
                        <div className="flex flex-col whitespace-nowrap">
                            <div className="flex gap-1 pr-3.5 text-2xl font-semibold tracking-wide text-stone-100">
                            <div key={investor.id}>
                                <Link to={`/startupDetails/${investor.id}`}>
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}  class="no-underline hover:underline">{investor.name}</div>
                                </Link>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc7a09571d7d489237a89ec6890870aee5974013125aa7ff1c55b8dd7dbf46e2?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                                className="shrink-0 my-auto w-5 aspect-square"
                            />
                            </div>
                            
                        </div>
                        </div>
                    </div>
                    </div>
                    ))}
                </div>
              )}
        

        
      </div>
      </aside>
      </main>
    </div>
);
}

export default FollowersPage;

