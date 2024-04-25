import React from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShowcaseForm from './CreateShowcase.js';
import { useCookies } from 'react-cookie';
import DynamicImageGallery from './DynamicImageGallery';
import{ Cookies } from 'react-cookie';

const myCookies = new Cookies();
const profilePicture = myCookies.get('image');
const idStartup = myCookies.get('startup'); //ambil id startup dari startup yg lagi diliat
const token = myCookies.get('token');
const role = myCookies.get('role')
const idInvestor = myCookies.get('id'); // Assuming the investor's/user's ID is stored under 'id'

function Follow({ page }) {
  const [startupName, setStartupName] = useState("");
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const token = myCookies.get('token')


  const fetchData = async () => {
    try {
      const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`, {
        method: "GET",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
      });
      const data = await response.json();
      console.log('Fetched data:', data);
      console.log('role cookie:', role);
      if (response.ok) {
        setStartupName(data.name);

        // Fetch total followers separately
        const followersResponse = await fetch(`https://startupvault-foundry.vercel.app/diary/total_followers/${idStartup}/`, {
          method: 'GET',
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
<<<<<<< HEAD
     const response = await fetch(`https://startupvault-foundry.vercel.app/diary/check_follow/?startup_id=${idStartup}&investor_id=${idInvestor}`);
=======
     const response = await fetch(`https://startupvault-foundry.vercel.app/diary/check_follow/?startup_id=${idStartup}&investor_id=${idInvestor}`, {
       method: 'GET',
       headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
     });
>>>>>>> 2f13b0cca1f560a4af0be6f0ef3ecb1fa172797a
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

  return (
  <>
    {page === 'detail' && (
    <div className="flex flex-col self-stretch p-6 rounded-lg bg-neutral-800 max-w-[338px]">
          <div className="flex gap-1 pr-8 text-2xl font-medium tracking-wide whitespace-nowrap text-stone-100">
            <div>{startupName}</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc7a09571d7d489237a89ec6890870aee5974013125aa7ff1c55b8dd7dbf46e2?apiKey=a9f236d74bde4869a09f0278cc07ff16&"
              className="shrink-0 my-auto w-5 aspect-square"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <div>
              <img
                loading="lazy"
                srcSet={profilePicture}
                style={{ width: '49px', height: '49px' }} // Set both width and height to 49px
              />
            </div>
            <div className="my-auto text-base font-medium tracking-wide text-ellipsis text-neutral-400">
              <span className="text-2xl leading-7 text-stone-100">{totalFollowers}</span> followers
            </div>
          </div>
          {role === 'investor' && (
            <button
              className={`justify-center items-center px-5 py-3 mt-4 text-xl font-semibold tracking-widest text-black whitespace-nowrap rounded-3xl ${
                isFollowing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-400'
              }`}
              onClick={toggleFollow}
            >
              {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
            </button>

          )}
        </div>
    )}
    {page === 'list' && (
          <div>
            {role === 'investor' && (
              <button
                className={`justify-center items-center px-5 py-3 mt-4 text-xl font-semibold tracking-widest text-black whitespace-nowrap rounded-lg ${
                  isFollowing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-400'
                }`}
                onClick={toggleFollow}
              >
                {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
              </button>
            )}
          </div>
    )}
    </>
  );
}

export default Follow;
