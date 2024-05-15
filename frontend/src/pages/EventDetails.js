import * as React from "react";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import{ Cookies } from 'react-cookie';
import { Link, useParams } from 'react-router-dom';
import NavBar from "../component/NavBar";

function EventDetails(props){
    const [eventDetails, setEventDetails] = useState("");
    const [activeMenu, setActiveMenu] = useState("summary")
    const { idEvent } = useParams();
    const myCookies = new Cookies();
    const token = myCookies.get('token');
    const [formattedPrice, setFormattedPrice] = useState("");
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        fetchData();
    }, [idEvent]);

    const fetchData = async () => {
        try {
          const response = await fetch(`https://startupvault-foundry.vercel.app/event/${idEvent}/`, {
            method:"GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const details = await response.json();
          setEventDetails(details);
  
          console.log(details)

          setFormattedPrice(details.price.toLocaleString('id-ID'))

          let date = format(new Date(details.date), 'EEEE, d MMMM yyyy')
          setFormattedDate(date)
  
        } catch (error) {
          console.error("Error:", error);
        }
    };

    

    return (
      <div className="flex flex-col justify-center bg-black min-h-screen px-20 pb-7 overflow-auto">
        <NavBar status='events'/>
        <div className="w-full max-md:max-w-full">
          <div className="flex-col gap-5 max-md:flex-col max-md:gap-0"  style={{ minHeight: 'calc(100vh - 64px)' }}>
            <div className="flex-col gap-5 w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-1.5 items-start text-l text-neutral-400">
                <div>
                  <Link to="/event" className="cursor-pointer">Events</Link>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c4af313822c4d2ebe8cf42cf89977522625f5d0a038a4293a77d92c748a624e?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="shrink-0 my-auto w-5 aspect-square"
                />
                <div className="font-medium tracking-normal">{eventDetails.name}</div>
              </div>
              <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full mt-4">
                <img
                    loading="lazy"
                    src={eventDetails.image}
                    className="shrink-0 my-auto object-cover w-screen h-96 overflow-hidden"
                  />
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[60%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow pb-3 pr-5 max-md:max-w-full">
                    {/* tab */}
                    <div className="flex gap-5 justify-center items-center self-start py-1.5 mt-3 text-xl font-medium whitespace-nowrap border-2 border-black border-solid">
                      <div
                          className={`flex flex-col justify-center self-stretch ${activeMenu === "summary" ? "text-green-400" : "text-neutral-400"} hover:cursor-pointer`}
                          onClick={() => setActiveMenu("summary")}
                      >
                          Summary
                          <div className={`shrink-0 mt-2.5 h-0.5 ${activeMenu === "summary" ? "bg-green-400" : "bg-transparent"} rounded-xl`} />
                      </div>
                      <div
                          className={`self-stretch my-auto ${activeMenu === "about" ? "text-green-400" : "text-neutral-400"} hover:cursor-pointer`}
                          onClick={() => setActiveMenu("about")}
                      >
                          About
                          <div className={`shrink-0 mt-2.5 h-0.5 ${activeMenu === "about" ? "bg-green-400" : "bg-transparent"} rounded-xl`} />
                      </div>
                    </div>
                    {/* tab content */}
                    {activeMenu === "summary" && (
                      <div>
                        <div className="self-start mt-3 text-3xl font-medium text-stone-100">
                          {eventDetails.name}
                        </div>
                        <div className="self-start mt-2 text-lg font-normal tracking-normal text-stone-100">
                          {eventDetails.summary}
                        </div>
                        <div className="flex text-lg text-stone-100 gap-2 mt-3">
                          <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7550c69a99f4796bacfe196d0c93b4a8e58c41eb52ab2583cb5a72f15b9f9e60?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
                          className="shrink-0 my-auto max-w-full object-cover rounded-full border-dashed self-center aspect-square"
                          />
                          {eventDetails.location}
                        </div>
                        <div className="flex text-lg text-stone-100 gap-2 mt-1">
                          <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b75cbcda6869de20d280c01126a418c3bb65001f92bbaa89564ff32bb7041a5?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
                          className="shrink-0 my-auto max-w-full object-cover rounded-full border-dashed self-center aspect-square"
                          />
                          {formattedDate}
                        </div>
                        <Link to={`/event-details/${idEvent}/${eventDetails.partner_org_id}`}>
                        <div className="justify-start items-start gap-4 flex mt-5">
                          <img
                              loading="lazy"
                              src={eventDetails.organization_logo}
                              className="object-cover w-[55px] h-[55px] rounded-full border-dashed self-center"
                          />
                          <div className="relative font-semibold whitespace-nowrap text-stone-100 items-center">
                            <div className="flex gap-1 text-md items-center">
                              <div>{eventDetails.partner_organization}</div>
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cd0618b56d923d8e9393e8312d89bc42be642f17db4d5994a14565779c2265e?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
                                className="shrink-0 aspect-square w-[18px] self-center"
                              />
                            </div>
                            <div className="text-s text-neutral-400">Partner</div>
                          </div>
                        </div>
                        </Link>
                      </div>
                    )}
                    {activeMenu === "about" && (
                      <div>
                        <div className="mt-3 text-2xl font-semibold text-stone-100 max-md:max-w-full">
                          About this event
                        </div>
                        <div className="flex flex-wrap gap-3 mt-2 text-md text-stone-100 text-justify max-md:flex-wrap max-md:pr-5 whitespace-pre-line break-words">
                          {eventDetails.desc}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-[33%] mx-auto max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col relative items-start py-6 pr-20 pl-5 text-xl font-medium text-stone-100 group mt-3 ">
                    <div className="px-4 py-5 w-96 min-h-fit bg-neutral-800 border-1 border-neutral-400 mt-3 flex gap-3 flex-col justify-center items-center">
                      <div className="flex-1 text-xl font-medium self-center text-white max-md:max-w-full">
                        Starts from
                      </div>
                      <div className="flex-1 text-3xl font-medium self-center text-white max-md:max-w-full">
                        IDR {formattedPrice}
                      </div>
                      <a href={eventDetails.link} target="_blank" rel="noopener noreferrer" className="flex-1 text-lg rounded-lg bg-green-400 text-neutral-800 px-16 py-2 font-medium self-center mb-2 mt-2">
                          Buy here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EventDetails;