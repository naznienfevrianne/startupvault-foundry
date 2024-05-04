import * as React from "react";
import { useState, useEffect } from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import SideBar from "../component/SidePartner";
import CreateEvent from './CreateEvent';
import styled from 'styled-components';

function CreatedEvents() {
 const [eventGroups, setEventGroups] = useState({ verified: [], not_verified: [], rejected: [] });
  const [partnerData, setPartnerEntry] = useState({});
 	const [listPost, setListPost] = useState([]);
     const myCookies = new Cookies();
     const token = myCookies.get('token')
 	const idPartnerOrg = myCookies.get("partnerOrganization")
 	const idPartner = myCookies.get("id")

    const [activeTab, setActiveTab] = useState('all');  // 'all', 'in_verification', 'published', 'rejected'
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const [counts, setCounts] = useState({
      all: 0,
      in_verification: 0,
      verified: 0,
      rejected: 0
    });

    const Tab = styled.div`
      cursor: pointer;
      padding: 10px;
      border-bottom: 2px solid ${props => props.isActive ? '#64EB8B' : 'transparent'};
      color: ${props => props.isActive ? '#64EB8B' : 'inherit'}; // Default to inherit unless active
      transition: border-color 0.3s ease, color 0.3s ease; // Add color to the transition for smooth effects
    `;

    const ModalBackground = styled.div`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5); // Dark semi-transparent background
      backdrop-filter: blur(4px); // Blur effect
      z-index: 1000; // High z-index to ensure it's on top
    `;

    const ModalContent = styled.div`
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 90%;
      max-width: 700px; // Set max-width for the modal
      max-height: 80vh; // Maximum height to 80% of the viewport height
      overflow-y: auto; // Enable vertical scrolling
      position: relative; // Position relative for the overflow to work effectively
    `;


 	const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);
      const openCreateEventModal = () => setCreateEventModalOpen(true);
      const closeCreateEventModal = () => setCreateEventModalOpen(false);


  const EventCard = ({ isVerified, image, title, location, date, price }) => {
    // Determine the display status based on the isVerified value
    const getStatus = (isVerified) => {
      switch (isVerified) {
        case 0:
          return "In Verification";
        case 1:
          return "verified";
        case 2:
          return "Rejected";
        default:
          return "Unknown"; // Default case if none of the above match
      }
    };

    return (
      <article className="flex flex-col self-stretch p-6 max-w-2xl rounded-lg border border-solid bg-neutral-800 border-neutral-700 mb-6">
        <div className="flex gap-5 justify-between text-base font-semibold tracking-wider text-stone-100">
          <div className="justify-center px-3 py-1 rounded-2xl bg-neutral-700">{getStatus(isVerified)}</div>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4222da277d9afa0284128b0b430a37bc1baa0bee0a68b008180e67960d3d6b1?placeholderIfAbsent=true" alt={title} className="shrink-0 my-auto w-6 aspect-square" />
        </div>
        <hr className="mt-6 h-px bg-neutral-700" />
        <div className="mt-6">
          <div className="flex gap-5">
            <div className="flex flex-col w-[26%]">
              <img src={image} alt={title} className="mx-auto h-[171px] w-[154px]" />
            </div>
            <div className="flex flex-col ml-5 w-[74%]">
              <h2 className="text-2xl font-medium text-stone-100">{title}</h2>
              <div className="mt-4 text-lg text-stone-100">{location}</div>
              <div className="mt-2 text-lg text-stone-100">{date}</div>
              <div className="mt-2 text-lg text-stone-100">IDR {price.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  useEffect(() => {

      const fetchEvents = async () => {
      if (!token) {
              console.error("No token available.");
              return; // Exit if there is no token
            }

        try {
                const response = await fetch(`http://localhost:8000/event/created-events/${idPartner}/`, {
                  method: 'GET',
                  headers: {
                    'Authorization': 'Bearer ' + token // Ensure you have a valid token
                  }
          });
          if (!response.ok) {
              const errorText = await response.text();  // Get response text which might include error details
              throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
            }

            const data = await response.json();
            setEventGroups(data);
            setCounts({
                    all: Object.values(data).flat().length,  // Sum of all events
                    in_verification: data.not_verified.length,
                    verified: data.verified.length,
                    rejected: data.rejected.length
                  });
            console.log(data);
          } catch (error) {
            console.error('Fetch error:', error);
          }
      };

      fetchEvents();
    }, [idPartner]);

  return (
    <div className="flex flex-col self-stretch max-w-2xl bg-transparent">
          <div className="flex gap-5 justify-between px-5 w-full font-semibold max-md:flex-wrap max-md:max-w-full">
            <div className="my-auto text-2xl tracking-wide text-stone-100">Your events</div>
            <div className="flex gap-2.5 justify-center px-5 py-3 text-xl tracking-widest text-black bg-green-400 rounded-lg cursor-pointer" onClick={openCreateEventModal}>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/565f5cbdb5778e2d0fff5686e6e930cecedc11f5c4f5f5d82c5a994a897fa2c8?apiKey=a9f236d74bde4869a09f0278cc07ff16&" className="shrink-0 w-6 aspect-square" />
              <div>Create event</div>
            </div>
          </div>
          <div className="flex gap-5 justify-center items-center self-start px-5 py-1.5 mt-6 text-s font-medium tracking-wide text-neutral-400 max-md:flex-wrap">
            <Tab isActive={activeTab === 'all'} onClick={() => handleTabClick('all')}>All ({counts.all})</Tab>
            <Tab isActive={activeTab === 'in_verification'} onClick={() => handleTabClick('in_verification')}>In verification ({counts.in_verification})</Tab>
            <Tab isActive={activeTab === 'verified'} onClick={() => handleTabClick('verified')}>Published ({counts.verified})</Tab>
            <Tab isActive={activeTab === 'rejected'} onClick={() => handleTabClick('rejected')}>Rejected ({counts.rejected})</Tab>
          </div>
          {isCreateEventModalOpen && (
                  <ModalBackground onClick={closeCreateEventModal}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                      <CreateEvent closeModal={closeCreateEventModal} />
                    </ModalContent>
                  </ModalBackground>
                )}
          <div className="flex flex-col justify-center max-w-2xl">
            {Object.entries(eventGroups).filter(([status]) => activeTab === 'all' || status === activeTab).map(([status, events]) => (
              <div key={status}>
                {events.map(event => (
                  <EventCard key={event.id} isVerified={event.isVerified} image={event.image} title={event.name} location={event.location} date={event.date} price={event.price} />
                ))}
              </div>
            ))}
          </div>
        </div>
  );
}

export default CreatedEvents;