import * as React from "react";
import { useState, useEffect } from "react";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import DynamicImageGallery from './DynamicImageGallery';

function CreatedShowcase(props) {
    const [listPost, setListPost] = useState([]);
    const [sort, setSort] = useState("-date");
    const [searchTerm, setSearchTerm] = useState("");
		const [isDropdownOpen, setIsDropdownOpen] = useState(false)

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
          endpoint = `http://localhost:8000/showcase/${idPartner}/?sort=${sort}&search=${searchTerm}`
        } else{
          endpoint = `http://localhost:8000/showcase/${idPartner}/?sort=${sort}`
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
  
          console.log(post)

        } catch (error) {
          console.error("Error:", error);
        }
      };
		
		const handleSortChange = (event) => {
			setSort(event.target.value);
			console.log("inih", sort)
		};

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
				<article className="self-stretch mt-4 text-base tracking-normal text-stone-100 max-md:max-w-full">
					{content}
				</article>
			);
		};

		const Icon = ({ src, alt }) => (
			<img loading="lazy" src={src} alt={alt} className="w-5 aspect-square" />
		);

		return (
			<div className=" px-20 flex flex-col self-center h-screen bg-black overflow-auto">
				{/* navbar */}
				<NavBar />
				<div className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
					<div className="flex gap-8 max-md:flex-col max-md:gap-0">
						<div  className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full pl-0">
							<div className="flex gap-9 max-md:flex-col max-md:gap-0">
								{/* side bar */}
								<aside className=" flex w-[23%px] flex-col justify-start mt-6">
									<div className="h-[212px] flex-col justify-start gap-3 flex">
										<div className="flex gap-3 p-4 mb-3 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
											<img
												loading="lazy"
												src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
												className="shrink-0 w-5 aspect-square"
											/>
											<div className="flex-auto">Search in dashboard</div>
										</div>
										<Link to="/investorDetails">
										<div className="pr-15 justify-start items-center inline-flex pl-8 whitespace-nowrap">
											<div className="justify-start items-center gap-2 flex">
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
													className="shrink-0 w-8 aspect-square self-center"
												/>
												<div className="text-neutral-400 text- font-normal item-center tracking-tight">Overview</div>
											</div>
										</div>
										</Link>
										<Link to="/investorDetails">
										<div className="pr-15 justify-start items-center inline-flex pl-8 whitespace-nowrap">
											<div className="justify-start items-center gap-2 flex">
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
													className="shrink-0 w-8 aspect-square self-center"
												/>
												<div className="text-neutral-400 text- font-normal item-center tracking-tight">Events</div>
											</div>
										</div>
										</Link>
										<div className="flex gap-5 font-medium items-center text-green-400 whitespace-nowrap">
											<div className="w-1 self-stretch bg-green-400 rounded-tr-[10px] rounded-br-[10px] shadow" />
											<div className="h-12 flex pr-20 gap-2 bg-green-400 bg-opacity-20 rounded-lg">
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1487560442a58b51dcbec994221baf3cf665d63416908100ec5efda2c599f05?"
													className="shrink-0 w-8 aspect-square self-center ml-2"
												/>
												<div className="text-green-400 font-medium item-center tracking-tight my-auto">Showcase Posts</div>
											</div>
										</div>
										<Link to="/investorDetails">
										<div className="pr-15 justify-start items-center inline-flex pl-8 whitespace-nowrap">
											<div className="justify-start items-center gap-2 flex">
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
													className="shrink-0 w-8 aspect-square self-center"
												/>
												<div className="text-neutral-400 text- font-normal item-center tracking-tight">Partner details</div>
											</div>
										</div>
										</Link>
									</div>
								</aside>
								<div className="flex flex-col w-[73%]">
									<div className="flex flex-col pt-6">
									{/* title + button create showcase */}
									<div className="justify-between inline-flex pb-3">
											<div className="self-start justify-start flex text-stone-100 text-2xl font-semibold tracking-tight text-wrap">My Posts</div>
											<Link to="/">
												<div className="flex gap-1 self-end px-2 py-2 text-md tracking-tight  font-semibold text-black whitespace-nowrap bg-green-400 rounded-lg cursor-pointer">
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
									<div className="flex">
										<div className="gap-3 flex justify-between">
											<div className="self-center">
												<div className="flex-1 text-base tracking-normal text-neutral-400 items-start">{listPost.length} posts found</div>
											</div>
											<div className="flex gap-3 text-sm whitespace-nowrap text-stone-100">
												<div className = "relative">
														<div className="flex gap-1 items-center pl-3 px-5 py-2 rounded-[25px] cursor-pointer text-stone-100 border border-neutral-400 bg-black" onClick={toggleDropdown}>
															<img
																loading="lazy"
																src="https://cdn.builder.io/api/v1/image/assets/TEMP/202d10897ec64fd7e51df1a8588619036ca06ad2803a7b30eb675b677c8755f0?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
																className="self-center w-6 aspect-square"
																/>
															Sort
														</div>
														{isDropdownOpen && (
															<div className="absolute left-0 mt-2">
																<div className="flex gap-2 items-right px-1 py-3 bg-neutral-900 rounded-[10px] w-[250px]">
																	<ul className="px-3 self-stretch text-sm flex flex-col">
																		<div className="flex-col flex rounded">
																			<li className="pb-1">
																				<input id="latest" type="radio" value="-date" className="w-4 h-4 accent-green-400 rounded" onChange={handleSortChange}
																					checked={sort === '-date'}
																				></input>
																				<label htmlFor="latest" className="w-full hover:text-green-400 ms-2 text-sm font-medium text-stone-100 rounded">Latest to Oldest</label>
																			</li>
																			<li className="pb-1">
																				<input id="oldest" type="radio" value="date" className="w-4 h-4 accent-green-400 rounded" onChange={handleSortChange}
																					checked={sort === 'date'}
																				></input>
																				<label htmlFor="oldest" className="w-full hover:text-green-400 ms-2 text-sm font-medium text-stone-100 rounded">Oldest to Latest</label>
																			</li>
																			<li className="pb-1">
																				<input id="most" type="radio" value="likes" className="w-4 h-4 accent-green-400 rounded" onChange={handleSortChange}
																					checked={sort === 'likes'}
																				></input>
																				<label htmlFor="most" className="w-full hover:text-green-400 ms-2 text-sm font-medium text-stone-100 rounded">Most Likes</label>
																			</li>
																			<li className="pb-1">
																				<input id="least" type="radio" value="-likes" className="w-4 h-4 accent-green-400 rounded" onChange={handleSortChange}
																					checked={sort === '-likes'}
																				></input>
																				<label htmlFor="least" className="w-full hover:text-green-400 ms-2 text-sm font-medium text-stone-100 rounded">Least Likes</label>
																			</li>
																		</div>
																	</ul>
																</div>
															</div>
														)}

												</div>
												<div className="pl-4 pr-4 py-2 rounded-[25px] border border-neutral-400 justify-center items-center gap-1 flex self-end">
													<>
													<img
															loading="lazy"
															src="https://cdn.builder.io/api/v1/image/assets/TEMP/05c363040cc2ed7eb073d542d2cdc515d11e022240c5cedb019f596e03556fde?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
															className="self-center w-6 aspect-square"
															/>
														<input type="text" 
															className="w-2px text-md bg-transparent appearance-none text-white border-gray-600  focus:outline-none focus:ring-0" 
															placeholder="Search Post" 
															value={searchTerm} 
															onChange={(e) => {
																setSearchTerm(e.target.value, 
																	() => {
																		fetchData();});
															}}>
														</input>
														</>
												</div>
											</div>
										</div>
									</div>
									
									{/* card */}
									{listPost.map((post, index) => (
										<div key={index} className="post-class">
											<div className="flex gap-4 p-6 mt-6 rounded-lg bg-neutral-800">
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
					</div>
				</div>
			</div>
    )


}

export default CreatedShowcase;