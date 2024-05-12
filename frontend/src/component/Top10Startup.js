import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Top10Startup() {
    const [topEntry, setTopEntry] = React.useState([]);
    const myCookies = new Cookies();
    const token = myCookies.get('token');
  
    useEffect(() => {
      fetchTop10Data();
    }, []);
  
    const fetchTop10Data = async () => {
      try {
          // const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/top10`,{
          const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/top10`, {
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
          console.log(entry)
          setTopEntry(entry);
      } catch (error) {
          console.error("Error:", error);
      }
    };
  
    return (
      <div className={`flex flex-col p-6 mt-6 max-w-full rounded-lg bg-neutral-800 ${topEntry.length === 0 ? "h-[840px] w-[350px]" : "h-fit w-fit"}`}>
        <div className="text-xl font-medium tracking-wide text-white whitespace-nowrap">
          Top 10 Startups of The Week
        </div>
        {topEntry.map((item, index) => (
            <div className="flex gap-6 items-center mt-6 pr-1" key={index}>
                <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
                  {index+1}
                </div>
                <img
                    loading="lazy"
                    src={item.image}
                    className="aspect-[0.96] w-[40px]"
                />
                <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                    <div className="flex gap-1 font-medium tracking-wide text-stone-100" >
                        <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                          <Link to={`/startupDetails/${item.id}`}>
                              <div>{item.name}</div>
                          </Link>
                        </div>
                        <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                        className="shrink-0 w-5 aspect-square"
                        />
                    </div>
                    <div className="mt-1 tracking-normal whitespace-nowrap mr-8 text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.desc}
                    </div>
                </div>
            </div>
        ))}
      </div>
    );
  }


export default Top10Startup;