import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function SideBarContact() {
    const myCookies = new Cookies();
    // const idFounder = myCookies.get('id');
    const token = myCookies.get('token');
    const [startup, setStartup] = useState("");
    let { idStartup } = useParams();
    const idFounder = startup.founder_id;
    const [founder, setFounder] = useState("");
    console.log(founder);
    const role = myCookies.get('role')
    const idInvestor = myCookies.get('id'); // Assuming the investor's/user's ID is stored under 'id'

    const [totalFollowers, setTotalFollowers] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`, {
          method:"GET",
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        });
        const data = await response.json();
        console.log('Fetched data:', data);
        console.log('role cookie:', role);
        if (response.ok) {
          setStartup(data);
  
          // Fetch total followers separately
          const followersResponse = await fetch(`https://startupvault-foundry.vercel.app/diary/total_followers/${idStartup}/`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          }
          });
          const follsData = await followersResponse.json();
          console.log('Fetched followers count:', follsData );
          if (followersResponse.ok) {
            setTotalFollowers(follsData.total_followers);
          } else {
            console.error('Error fetching total followers:', follsData.message);
          }
        }
  
        if (role === 'investor') {
          fetchFollowStatus();
        }
  
      } catch (error) {
        console.error('Error fetching startup details:', error);
      }
  
    };
  
   const fetchFollowStatus = async () => {
     try {
       const response = await fetch(`https://startupvault-foundry.vercel.app/diary/check_follow/?startup_id=${idStartup}&investor_id=${idInvestor}`, {
         method: "GET",
         headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
       });
       const data = await response.json();
       console.log('Fetched isFollowing:', data);
       if (response.ok) {
         setIsFollowing(data.is_following);
       } else {
         console.error('Error fetching follow status:', data.message);
       }
     } catch (error) {
       console.error('Error fetching follow status:', error);
     }
   };
  
    const toggleFollow = async () => {
  
      try {
        const response = await fetch('https://startupvault-foundry.vercel.app/diary/follow/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            startup: idStartup,
            investor: idInvestor,
          }),
        });
  
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setIsFollowing(data.follow_status === 'Followed');
          setTotalFollowers(data.total_followers);
        } else {
          console.error('Error:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    

    const copyToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          try {
            await navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            alert('Copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
          document.body.removeChild(textarea);
        }
      };
    


    useEffect(() => {
        const fetchFounder = async () => {
            try {
                const response = await fetch(`https://startupvault-foundry.vercel.app/auth/founder/${idFounder}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch founder data');
                }
                const data = await response.json();
                setFounder(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        // Call both fetch functions
        fetchFounder();
    }, [idFounder, token]);
  
  
    return (
    <div className="flex flex-col items-start py-6 pr-20 pl-3 max-md:pr-5 max-md:max-w-full">
      <div className="flex flex-col p-7 mt-6 max-w-full rounded-lg bg-neutral-800 w-[360px] max-md:px-5">
      <div className="flex gap-1 pr-8 text-2xl font-medium tracking-wide whitespace-nowrap text-stone-100 max-md:pr-5">
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{startup.name}</div>

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdce3eac0afa794662f1b9c1b0251811ace603733041f5abcaa4dc295e12964b?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 my-auto w-5 aspect-square"
        />
      </div>
      <div className="flex gap-4 mt-4">
      { startup.image? (
          <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[100px] w-[100px]"
          style={{ backgroundImage: `url(${startup.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                > </div>
            ) : (
           <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[100px] w-[100px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c45bf6f65da39b40642cc8b73f9a711819285d90069cb6e6376798d651b38272?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="aspect-square w-[39px]"
            />
          </div>
          )}
        <div className="my-auto text-base font-medium tracking-wide text-ellipsis text-neutral-400">

          <span className="text-2xl leading-7 text-stone-100">{totalFollowers}</span>{" "}
          follower(s)

        </div>
      </div>
      {role === 'investor' && (
            <button
              className={`justify-center items-center px-5 py-3 mt-4 text-xl font-semibold text-black whitespace-nowrap rounded-3xl ${
                isFollowing ? 'bg-gray-400' : 'bg-green-400'
              }`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>

          )}
        </div>
      <div className="flex gap-2 justify-center mt-10 text-xl text-stone-100 w-[360px]">
        <div className="flex-1" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Contact 
        <span className="text-xl font-semibold"> {startup.name}</span></div>
        <div className="flex-1 shrink-0 my-auto h-px border border-solid bg-neutral-400 border-neutral-400" />
      </div>
      <div className="flex gap-4 p-4 mt-6 text-xl font-medium tracking-wide whitespace-nowrap rounded-lg bg-neutral-800 text-stone-100 w-[360px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1395c447d349c52211298177bdfc474d8036628e1c8b9d4d8650f731b9465d3?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="flex-1">{founder.phoneNumber}</div>
        <button
        onClick={() => copyToClipboard(founder.phoneNumber)}
        title="Copy phoneNumber"  // Providing a title for accessibility and usability
        >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ffae47cb816d5ac5b57e512113910e3a80652aebbaabf17304aa8d64e019d5d?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        </button>
      </div>
      <div className="flex gap-4 p-4 mt-4 text-xl font-medium tracking-wide whitespace-nowrap rounded-lg bg-neutral-800 text-stone-100 w-[360px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/daf72df48e17d81b24803c12cb158348c64ab6ee45505db07c4fc1e23121f601?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="flex-1">{founder.email}</div>
        <button
        onClick={() => copyToClipboard(founder.email)}
        title="Copy Email"  // Providing a title for accessibility and usability
        >
            <img
            loading="lazy"
            // src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ffae47cb816d5ac5b57e512113910e3a80652aebbaabf17304aa8d64e019d5d?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="shrink-0 w-6"  // Ensure your image fits well in the button
            alt="Copy Icon"  // Important for accessibility
            />
        </button>
      </div>
      {/* <div className="flex gap-4 p-4 mt-4 text-xl font-medium tracking-wide whitespace-nowrap rounded-lg bg-neutral-800 text-stone-100 w-[330px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2206c8e1be7362398f13508a66d6a1790b00e28d7cc2f93fdc2e58f7b81152cc?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="flex-1">{founder.linkedin}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
      </div> */}
    </div>
      
    );
  }

  export default SideBarContact