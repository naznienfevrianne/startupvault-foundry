import * as React from "react";
import { useState, useEffect } from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import DynamicImageGallery from './DynamicImageGallery';
import SideBar from "../component/SidePartner";
import OrgPartnerPreview from "./OrgPartnerPreview";

function CreatedShowcase(props) {
    const [listPost, setListPost] = useState([]);
    const [sort, setSort] = useState("-date");
    const [searchTerm, setSearchTerm] = useState("");
		const [isDropdownOpen, setIsDropdownOpen] = useState(false)
		const [typedValue, setTypedValue] = useState("")

		const myCookies = new Cookies();
    const idPartner = myCookies.get('id')
    const token = myCookies.get('token')

		const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        fetchData();
    }, [sort, searchTerm]);

    const fetchData = async () => {
        let endpoint;
  
        if(searchTerm != ""){
          endpoint = `https://startupvault-foundry.vercel.app/showcase/${idPartner}/?sort=${sort}&search=${typedValue}`
        } else{
          endpoint = `https://startupvault-foundry.vercel.app/showcase/${idPartner}/?sort=${sort}`
        }
  
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
  
		  		console.log("ini", searchTerm)
          console.log(post)

        } catch (error) {
          console.error("Error:", error);
        }
      };

		const handleChange = (e) => {
			const inputValue = e.target.value;
			setTypedValue(inputValue)
			if (inputValue === '') {
				setSearchTerm("", () => {
					fetchData();
				});
			}
		};

	  const handleKeyDown = (e) => {
			if (e.key === 'Enter') {
				setSearchTerm(typedValue, () => {
					fetchData();
				});
			}
	  };
		
		const handleSort = () => {
			if(sort === "-date"){
				setSort("date", () => {
					fetchData();
				});
			} else if(sort === "date"){
				setSort("-date", () => {
					fetchData();
				});
			}		 	
		}

		const countTimeStamp = (date) => {
			const postDate = new Date(date);
			const now = new Date();
			const diffInSeconds = Math.round((now - postDate) / 1000);
			const diffInMinutes = Math.round(diffInSeconds / 60);
			const diffInHours = Math.round(diffInMinutes / 60);
			const diffInDays = Math.round(diffInHours / 24);
		
			if (diffInSeconds < 60) return `${diffInSeconds}s`;
			if (diffInMinutes < 60) return `${diffInMinutes}m`;
			if (diffInHours < 24) return `${diffInHours}h`;
			if (diffInDays < 7) return `${diffInDays}d`;
			return postDate.toLocaleDateString();
		};

		const Content = ({ content }) => {
			return (
				<article className="self-stretch mt-4 text-base tracking-normal text-stone-100 max-md:max-w-full whitespace-pre-line break-words">
					{content}
				</article>
			);
		};

		const Icon = ({ src, alt }) => (
			<img loading="lazy" src={src} alt={alt} className="w-5 aspect-square" />
		);

		return (
			<div className="flex px-20 flex-col self-center h-screen bg-black overflow-auto">
			  {/* navbar */}
			  <NavBar status={"dashboard"} />
			  <div className="pb-20 w-full max-md:pr-5 max-md:max-w-full flex gap-8 max-md:flex-col max-md:gap-0">
				<div className="flex flex-col w-[70%] max-md:ml-0 max-md:w-full pl-0">
				  <div className="flex gap-8 max-md:flex-col max-md:gap-0">
					{/* side bar */}
					<SideBar status={"post"} />
					<div className="flex flex-col w-[73%]">
					  <div className="flex flex-col pt-6">
						{/* title + button create showcase */}
						<div className="justify-between inline-flex pb-3">
						  <div className="text-stone-100 text-2xl font-semibold tracking-tight text-wrap">My Posts</div>
						  <Link to="/">
							<div className="flex gap-1 self-end px-2 py-2 text-md font-semibold text-black whitespace-nowrap bg-green-400 rounded-lg cursor-pointer">
							  <img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/bb664ab38f6a0f7947922610a982985d1f9721a3d18321070c5bbe56d358a643?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
								className="shrink-0 w-5 aspect-square"
							  />
							  Create New Post
							</div>
						  </Link>
						</div>
						{/* button sort & search */}
						<div className="flex justify-between items-end mt-1 mb-4">
						  <div className="self-center">
							<div className="grow text-base tracking-normal text-neutral-400 self-center max-md:max-w-full">
							  {listPost.length} posts found
							</div>
						  </div>
						  <div className="py-auto flex gap-3">
							<button onClick={handleSort} className="px-1 py-2 rounded-[25px] border text-stone-100 border-neutral-400 justify-center items-center gap-1 inline-flex w-[100px]">
								{sort === "-date" ? (
									<>
										<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e3ec73880ece29d00f20e4db0e4b5475499af7b473b69d767d47b11119c4c98?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
										className="self-center w-6 aspect-square"
										/>
										<div>Oldest</div>
									</>
								) : (
									<>
										<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/f17953187a4d2276470cd675c51584dad8f4c8e4316cd91c37a457aba3eac469?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
										className="self-center w-6 aspect-square"
										/>
										<div>Latest</div>
									</>
								)}
							</button>
							<div className="pl-4 pr-4 py-2 rounded-[25px] border border-neutral-400 justify-center items-center gap-1 flex self-end">
							  <>
								<img
								  loading="lazy"
								  src="https://cdn.builder.io/api/v1/image/assets/TEMP/05c363040cc2ed7eb073d542d2cdc515d11e022240c5cedb019f596e03556fde?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
								  className="self-center w-6 aspect-square"
								/>
								<input type="text"
								  className="w-2px text-md bg-transparent appearance-none text-white border-gray-600 focus:outline-none focus:ring-0"
								  placeholder="Search Post"
								  value={typedValue}
								  onChange={handleChange}
								  onKeyDown={handleKeyDown}>
								</input>
							  </>
							</div>
						  </div>
						</div>
						{/* card */}
						{listPost.map((post, index) => (
						  <div key={index} className="post-class">
							<div className="flex gap-4 p-6 mb-6 rounded-lg bg-neutral-800">
							  <div className="flex justify-center items-center self-start aspect-square">
								<div className="flex justify-center items-center self-start aspect-square">
								  <img loading="lazy" alt="User avatar" src={post.user_avatar} className="rounded-full bg-green-400 bg-opacity-20 w-[39px] h-[39px]" />
								</div>
							  </div>
							  <div className="flex flex-col flex-1 items-start">
								<header className="flex gap-2 text-base font-medium tracking-wide whitespace-nowrap">
								  <h2 className="grow text-stone-100">{post.user}</h2>
								  <Icon
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/124b5d5efd3e4196ebf083fa4f204a1199db6acebb70a317cbba4e5b973e8053?apiKey=50c5361058c6465f94eb30dfd5c845d1&"
									alt="Verified Badge"
								  />
								  <time className="text-neutral-400">{countTimeStamp(post.date)}</time>
								</header>
								<div className="mt-1 text-xs tracking-wider text-neutral-400">SVID PARTNER</div>
								<Content content={post.content} />
								{post.image && post.image.length > 0 ? (
								  <DynamicImageGallery images={post.image.map(src => ({ src, alt: 'Image description' }))} />
								) : null}
								<div className="like-button items-center text-neutral-400 flex mr-2 mt-4 text-base tracking-normal">
								  <img
									src={'https://cdn.builder.io/api/v1/image/assets/TEMP/a6b6a6fc12b49d682d339e680a99d0813ad9d1df078c58ecd84437a1faf83427?'}
									alt={'Like'}
									className="w-6 h-6 mr-2"
								  />
								  <span>{post.likes} likes</span>
								</div>
							  </div>
							</div>
						  </div>
						))}
					  </div>
					</div>
				  </div>
				</div>
				<OrgPartnerPreview />
			  </div>
			</div>
		  );
}

export default CreatedShowcase;