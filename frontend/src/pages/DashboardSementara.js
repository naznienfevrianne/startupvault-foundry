import * as React from "react";
import { useState, useEffect } from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";

function DashboardSementara(props){

    const [partnerData, setPartnerEntry] = useState({});
	const [listPost, setListPost] = useState([]);
    const myCookies = new Cookies();
    const token = myCookies.get('token')
	const idPartnerOrg = myCookies.get("partnerOrganization")
	const idPartner = myCookies.get("id")
	
	useEffect(() => {
		fetchDataPartner();
		fetchDataPost();
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
        const endpoint = `http://localhost:8000/showcase/${idPartner}/`
  
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
          console.log(post)

        } catch (error) {
          console.error("Error:", error);
        }
      };


    return (
			<div className=" px-20 flex flex-col justify-center self-center bg-black overflow-auto">
				<NavBar />
				<div className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
					<div className="flex gap-8 max-md:flex-col max-md:gap-0">

						<aside className="flex w-[26%] flex-col justify-start items-end gap-6">
							<div className="flex flex-col p-6 mt-6 w-full rounded-lg bg-neutral-800 gap-6">
								<div className="self-stretch justify-between items-center inline-flex">
										<div className="w-10 text-white text-2xl font-medium font-['SF Pro Display'] tracking-tight">My Organization</div>
										<div className="justify-right items-right gap-1 flex">
										<Link to="/orgPartnerEditForm">
										<div className="text-neutral-400 text-sm font-normal font-['SF Pro Display'] tracking-tight">Edit details</div>
										</Link>
										<div className="w-4 h-4 pl-0.5 pr-[1.50px] pt-[1.50px] pb-0.5 justify-center items-center flex" />
										</div>
								</div>
								<div className="justify-start items-center gap-6 inline-flex">
										<div className="w-[78.27px] h-[78.27px] bg-opacity-20 rounded-md justify-center items-center gap-[7.53px] flex">
										<img
                                          loading="lazy"
                                          src={partnerData.logo}
                                         className="aspect-square"
                                          />
										<div className="w-[44.40px] h-[44.40px] px-[1.39px] pt-[2.77px] pb-[5.55px] justify-center items-center flex" />
										</div>
										<div className="flex-col justify-start items-start gap-1 inline-flex">
										<div className="justify-start items-center gap-2 inline-flex">
												<div className="text-white text-[37px] font-semibold font-['Zuume'] leading-[44.40px] tracking-wider">{partnerData.name}</div>
												<div className="w-8 h-8 p-[3px] justify-center items-center flex" />
										</div>		
										</div>
								</div>
								<div class="self-stretch h-14 rounded-lg flex-col justify-start items-start gap-2 flex">
									<div class="w-[225px] h-[29px] flex-col justify-start items-start gap-1 flex">
										<div class="self-stretch">
											<span class="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">Event</span>
										</div>
									</div>
									<div class="w-[225px] h-[29px] flex-col justify-start items-start gap-1 flex">
										<div class="self-stretch">
											{/* <span class="text-stone-100 text-xl font-medium font-['SF Pro Display'] tracking-tight">{listEvent.length}</span> */}
											<span class="text-stone-100 text-base font-medium font-['SF Pro Display'] tracking-tight"> event</span>
										</div>
									</div>
								</div>
								<div class="self-stretch h-14 rounded-lg flex-col justify-start items-start gap-2 flex">
									<div class="w-[225px] h-[29px] flex-col justify-start items-start gap-1 flex">
										<div class="self-stretch">
											<span class="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">Post</span>
										</div>
									</div>
									<div class="w-[225px] h-[29px] flex-col justify-start items-start gap-1 flex">
										<div class="self-stretch">
											<span class="text-stone-100 text-xl font-medium font-['SF Pro Display'] tracking-tight">{listPost.length}</span>
											<span class="text-stone-100 text-base font-medium font-['SF Pro Display'] tracking-tight"> post</span>
										</div>
									</div>
								</div>
								<div className="self-stretch h-14 rounded-lg flex-col justify-start items-start gap-2 flex">
									<div class="w-[225px] h-[29px] flex-col justify-start items-start gap-1 flex">
										<div class="self-stretch">
											<span class="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">Location</span>
										</div>
									</div>
									<div className="text-white text-base font-medium font-['SF Pro Display'] tracking-tight">{partnerData.location}</div>
								</div>

								<div className="self-stretch h-[72px] rounded-lg flex-col justify-start items-start gap-2 flex" style={{ marginBottom:'20px'}}>
								<div class="w-[225px] h-[29px] flex-col justify-start items-start gap-1 flex">
									<div class="self-stretch">
										<span class="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">LinkedIn</span>
									</div>
								</div>
										<div className="px-4 py-2 bg-neutral-700 rounded-lg justify-center items-center gap-3 inline-flex" style={{ maxWidth: 'calc(100% - 8px)'}}>
										<div className="text-white text-base font-medium font-['SF Pro Display'] tracking-tight " style={{ wordBreak: 'break-all' }}>{partnerData.linkedin}</div>
										<div className="w-6 h-6 p-[2.25px] justify-center items-center flex" />
										</div>
								</div>
								<div className="mt-5 self-stretch h-[72px] rounded-lg flex-col justify-start items-start gap-2 flex">
								<Link to="/orgPartnerReadForm">
								<div className="flex justify-end px-5 py-3 bg-stone-100 rounded-lg justify-center items-center gap-2.5 inline-flex" >				
									<div className="text-black text-xl font-semibold font-['Zuume'] tracking-wider">View public profile</div>
								</div>
								</Link>
								</div>
							</div>
						</aside>
					</div>						
				</div>
			</div>
    )
}

export default DashboardSementara;