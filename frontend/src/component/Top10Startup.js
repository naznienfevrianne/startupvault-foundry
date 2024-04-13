import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { useParams } from 'react-router-dom';


function Top10Startup() {
    const [topEntry, setTopEntry] = React.useState({});
    const myCookies = new Cookies();
    const token = myCookies.get('token');
  
    useEffect(() => {
      fetchTop10Data();
    }, []);
  
    const fetchTop10Data = async () => {
      try {
          // const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/top10`,{
          const response = await fetch(`http://localhost:8000/auth/startup/top10`, {
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
      <div className="flex flex-col p-6 mt-6 max-w-full rounded-lg bg-neutral-800 w-[338px] h-[840px] max-md:px-5">
        <div className="text-xl font-medium tracking-wide text-white">
          Top 10 Startups of The Week
        </div>
        {topEntry.rank1 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              1
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank1.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100" >
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank1.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank1.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank2 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              2
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank2.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank2.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank2.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank3 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              3
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank3.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank3.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank3.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank4 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              4
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank4.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank4.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank4.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank5 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              5
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank5.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank5.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank5.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank6 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              6
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank6.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank6.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank6.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank7 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              7
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank7.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank7.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank7.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank8 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              8
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank8.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank8.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank8.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank9 && (
          <div className="flex gap-6 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              9
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank9.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank9.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank9.desc}
                  </div>
              </div>
          </div>
          )}
        {topEntry.rank10 && (
          <div className="flex gap-4 items-center mt-6">
              <div className="self-stretch my-auto text-sm tracking-wider text-center text-ellipsis text-neutral-400">
              10
              </div>
              <img
                  loading="lazy"
                  src={topEntry.rank10.image}
                  className="aspect-[0.96] w-[40px]"
              />
              <div className="flex flex-col flex-1 self-stretch my-auto text-base">
                  <div className="flex gap-1 px-2 font-medium tracking-wide text-stone-100">
                      <div style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{topEntry.rank10.name}</div>
                      <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c34af8d6c205a583fb45ec7f725bd6664117f28f17b00fbe113679fc140d660?"
                      className="shrink-0 w-5 aspect-square"
                      />
                  </div>
                  <div className="mt-1 ml-2 tracking-normal whitespace-nowrap text-neutral-400" style={{ width: '165px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {topEntry.rank10.desc}
                  </div>
              </div>
          </div>
          )}
      </div>
    );
  }


export default Top10Startup;