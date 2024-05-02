import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';


const ListEvent = () => {

  const myCookies = new Cookies();
    
  const token = myCookies.get('token');
  const [events, setEvents] = useState([]);
  console.log(events);
  const numberOfevents = events.length;
  console.log(numberOfevents); // This will log the total number of objects in your array
  const [currentPage, setCurrentPage] = useState('events');

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('http://localhost:8000/event/',{
                method: "GET", 
                headers:{
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + token
                }
                }
                );
              if (!response.ok) {
                  throw new Error("Failed to fetch data");
              }
              const entry = await response.json();
              setEvents(entry);
              // setProfilePicture(entry.image);
              console.log(events)

          } catch (error) {
              console.log("Error:", error);
          }
      };

      fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center bg-black min-h-screen px-20">
      <NavBar status="events" />
      <main className="flex justify-center items-center px-px pb-20 w-full max-md:max-w-full h-full">
        <div className="flex flex-wrap justify-center gap-6 max-w-full w-[940px] max-md:flex-wrap">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col p-6 mt-6 rounded-lg bg-neutral-800 w-[280px] max-md:w-[calc(33.333% - 24px)]">
              <div className="h-[200px] bg-cover bg-center rounded-t-lg" style={{ backgroundImage: `url(${event.image})` }}></div>
              <div className="flex items-center mt-4 text-sm text-neutral-400">
                {event.partnerName}
              </div>
              <div className="mt-2 text-xl font-bold text-stone-100">
                <Link to={`/eventDetails/${event.id}`} className="no-underline hover:underline">{event.name}</Link>
              </div>
              <div className="flex items-center mt-2 text-lg text-neutral-400">
                <img src="https://i.ibb.co/ftd8Zhx/circle.png" className="w-5 h-5 mr-2" />
                {event.location}
              </div>
              <div className="flex items-center mt-2 text-lg text-stone-500">
                <img src="https://i.ibb.co/CVqLqCR/calendar.png" className="w-5 h-5 mr-2" />
                {event.date} 
              </div>
              <div className="flex items-center mt-2 text-2xl text-red-500">
                ${event.price}
              </div>
              <div className="mt-4">
                <Link to={`/eventDetails/${event.id}`} className="inline-block px-4 py-2 text-lg font-semibold text-black bg-stone-100 rounded-lg hover:bg-stone-200">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

}

export default ListEvent;

