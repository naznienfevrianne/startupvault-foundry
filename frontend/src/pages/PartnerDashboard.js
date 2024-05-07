import * as React from "react";
import { useState, useEffect } from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import SideBar from "../component/SidePartner";
import CreatedEvents from "./CreatedEvents"; 
import OrgPartnerPreview from "./OrgPartnerPreview"; 

function PartnerDashboard(props) {

    const [partnerData, setPartnerEntry] = useState({});
	const [listPost, setListPost] = useState([]);
	const [counts, setCounts] = useState({all: 0});
    const myCookies = new Cookies();
    const token = myCookies.get('token')
	const idPartnerOrg = myCookies.get("partnerOrganization")
	const idPartner = myCookies.get("id")
	
	useEffect(() => {
		fetchDataPartner();
		fetchDataPost();
		fetchDataEvent();
	}, [])

	const fetchDataPartner = async () => {
		try {
			const response = await fetch("https://startupvault-foundry.vercel.app/auth/partnerorg/" + idPartnerOrg, {
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
			setPartnerEntry(entry);

		} catch (error) {
			console.error("Error:", error);
		}
	  };

    const fetchDataPost = async () => {
        const endpoint = `https://startupvault-foundry.vercel.app/showcase/${idPartner}/`
  
        try {
          const response = await fetch(endpoint, {
            method:"GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const post = await response.json();
          setListPost(post);

        } catch (error) {
          console.error("Error:", error);
        }
    };

	const fetchDataEvent = async () => {
		try {
			const response = await fetch(`https://startupvault-foundry.vercel.app/event/created-events/${idPartner}/`, {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token
				}
			});
			if (!response.ok) {
				const errorText = await response.text();  
				throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
			}
			const data = await response.json();
			setCounts({all: Object.values(data).flat().length});
		} catch (error) {
			console.error('Fetch error:', error);
		}
	};

    return (
		<div className=" px-20 flex flex-col justify-center self-center bg-black overflow-auto">
			<NavBar status={"dashboard"}/>
			<div className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
				<div className="flex gap-8 max-md:flex-col max-md:gap-0">
					<SideBar status={"overview"}/>
					<CreatedEvents />
					<OrgPartnerPreview />
				</div>						
			</div>
		</div>
    )
}

export default PartnerDashboard;