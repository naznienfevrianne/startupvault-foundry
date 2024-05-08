import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';
import Datepicker from 'react-tailwindcss-datepicker';

const ListEvent = () => {
  const myCookies = new Cookies();
  const [sort, setSort] = useState(false);
  const [value, setValue] = useState({ 
    startDate: null, 
    endDate: null
  }); 
  const token = myCookies.get('token');
  const [events, setEvents] = useState([]);
  console.log(events);
  const numberOfevents = events.length;
  console.log(numberOfevents); // This will log the total number of objects in your array
  const [currentPage, setCurrentPage] = useState('events');

  useEffect(() => {
      fetchData();
  }, [sort, value]);

  const fetchData = async () => {
    
    let endpoint;
    if(value.startDate != null && value.endDate != null){
      endpoint = `https://startupvault-foundry.vercel.app/event/?sort_by_date=${sort}&startDate=${value.startDate}&endDate=${value.endDate}`
    } else{
      endpoint = `https://startupvault-foundry.vercel.app/event/?sort_by_date=${sort}`
    }

    console.log("AAAAAAAAAAAAAAA")
    console.log(endpoint)
    try {
        const response = await fetch(endpoint, {
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
        setEvents(entry);
    } catch (error) {
        console.log("Error:", error);
    }
};

const handleSort = () => {
  setSort(prevSort => prevSort === true ? false : true);
  fetchData()
};

const handleValueChange = async(newValue) => {
  setValue(newValue);
  fetchData();
} 

return (
  <div className="flex flex-col items-center bg-black min-h-screen px-20">
    <NavBar status="events" />
    <main className="flex justify-center items-center px-px pb-20 w-full max-md:max-w-full h-full">
      <div className="flex flex-col w-full max-w-[940px] max-md:flex-wrap">
      <div>
            <div className="mb-2 text-3xl font-semibold tracking-wide text-stone-100">
              Events
            </div>
            <div className="text-base tracking-normal text-neutral-400">
              {events.length} events found
            </div>
          </div>
        <div className="flex mt-4 justify-between items-center mb-6">
          <div className="flex gap-3">
            <button onClick={handleSort} className="flex text-sm text-stone-100 justify-between pl-3 pr-4 py-2 rounded-[25px] border font-light tracking-wide border-solid border-neutral-400 items-center">
              {sort === false ? (
                <>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/09336f1e86e0673713128171ba8064262d4bd1188b3c06a9a1927d3fb0833bd3?"
                    className="w-10 aspect-square self-center"
                  />
                  <div>Latest</div>
                </>
              ) : (
                <>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0dbf444f4ed2068ea13b4fa12b9927d011b42ce3f3eae40a73704f2c533c26ce?"
                    className="w-10 aspect-square self-center"
                  />
                  <div>Oldest</div>
                </>
              )}
            </button>
            <Datepicker
              inputClassName="w-full pl-3 pr-4 py-2 rounded-[25px] border font-normal text-stone-100 border-neutral-400 bg-black"
              primaryColor={"emerald"}
              value={value} 
              onChange={handleValueChange}
              useRange={false}
              readOnly={true}
              placeholder="Date" 
              popoverDirection="down" 
            /> 
          </div>
          
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col p-6 rounded-lg bg-neutral-800">
              <div className="h-[200px] bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${event.image})` }}></div>
              <div className="flex items-center mt-4 text-sm text-neutral-400">
                {event.partnerName}
              </div>
              <div className="mt-2 text-xl font-bold text-stone-100">
                <Link to={`/event-details/${event.id}`} className="no-underline hover:underline">{event.name}</Link>
              </div>
              <div className="flex items-center mt-2 text-lg text-neutral-400">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/24d923b1a1f0e20f2236c810a17248bf7a7a2935815a5ba987913d1185a4e6db?apiKey=c7ebd85b29da4b398aac6462eda13ba9&" className="w-6 h-6 mr-1" />
                {event.location}
              </div>
              <div className="flex items-center mt-2 text-lg text-neutral-400">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/260154ece85ea9616db68ec02b42e3052763014d682a9a592183b3534e683630?apiKey=c7ebd85b29da4b398aac6462eda13ba9&" className="w-6 h-6 mr-1" />
                {event.date} 
              </div>
              <div className="flex items-center mt-2 text-2xl text-red-500">
                IDR {event.price.toLocaleString()}
              </div>
              <div className="mt-4">
                <Link to={`/event-details/${event.id}`} className="inline-block px-4 py-2 text-lg font-semibold text-black bg-stone-100 rounded-lg hover:bg-stone-200">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);

}

export default ListEvent;
