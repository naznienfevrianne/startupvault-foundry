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
const isLogin = myCookies.get('login')


const NavbarItem = ({ children, href }) => (
  <div className="grow">
    <Link to={href} className="text-white hover:text-gray-300">
      {children}
    </Link>
  </div>
);

const PostCount = () => {
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts();
        setPostCount(data.length); // Set the count based on the length of posts
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="self-stretch mt-6 text-base tracking-normal text-white max-md:max-w-full">
      {postCount} posts found
    </div>
  );
};

const NavigationBar = () => (
  <nav className="flex gap-5 justify-between items-center px-8 my-auto text-xl font-light max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <NavbarItem href="/showcase">Showcase</NavbarItem>
    <NavbarItem href="/events">Events</NavbarItem>
    <NavbarItem href="/investors">Our Investors</NavbarItem>
    <NavbarItem href="/startups">Our Startups</NavbarItem>
  </nav>
);


const SignUpButton = () => (
  <div
      className="justify-center self-center px-5 py-2 mt-0 text-xl font-semibold tracking-widest text-black bg-green-400 whitespace-nowrap rounded-3xl shadow-sm max-md:mt-10 hover:bg-green-500 cursor-pointer"
      type="button">
       <Link to="/login">LOG IN</Link>
  </div>
);

const LogOutButton = () => (
  <div
      className="justify-center self-center px-5 py-2 mt-0 text-xl font-semibold tracking-widest text-black bg-green-400 whitespace-nowrap rounded-3xl shadow-sm max-md:mt-10 hover:bg-green-500 cursor-pointer"
      type="button">
      <Link to="/logout">LOG OUT</Link>
  </div>
);

const Header = () => (
  <header className="flex gap-5 justify-between items-center px-20 py-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <div className="flex gap-5 justify-between items-center self-start text-white max-md:flex-wrap max-md:max-w-full">
      <h1 className="flex-auto text-l italic font-semibold tracking-wider leading-10">
        startupvault.id
      </h1>
      <NavigationBar />
    </div>
    {isLogin ? (
      <LogOutButton />
    ):(
      <SignUpButton />
    )}
  </header>
);

const fetchPosts = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/showcase/');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};


const ShowcasePost = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
          const fetchData = async () => {
              try {
                  const data = await fetchPosts();
                  setPosts(data);
                  console.log(data);
              } catch (error) {
                  // Handle errors or show a message
                  console.error(error.message);
              }
          };

          fetchData();
      }, []);

  const filteredPosts = posts.filter(post =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );// Empty dependency array to run the effect only once on component mount


 const Avatar = ({ avatar }) => {
    const defaultAvatar = 'https://yitzsihwzshujgebmdrg.supabase.co/storage/v1/object/public/userimg/avatar.png'; // path icon avatar
    return (
      <div className="flex justify-center items-center self-start aspect-square">
        <img loading="lazy" alt="User avatar" src={avatar || defaultAvatar} className="rounded-full bg-green-400 bg-opacity-20 w-[39px] h-[39px]" />
      </div>
    );
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

const ImageWithDescription = ({ src, description }) => (
  <img src={src} alt={description} className="grow self-stretch w-full aspect-[1.12]" />
);


const Image = ({ images }) => {
  // Assuming 'images' is an array of image URLs
  return (
    <div className="mt-6 rounded-2xl border border-solid border-neutral-700 max-md:max-w-full">
      <div className="flex flex-wrap justify-center items-center gap-4">
        {images.map((imageSrc, index) => (
          <div key={index} className="w-full max-md:w-full">
            <img src={imageSrc} alt={`Post image ${index}`} className="w-full aspect-auto object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};


const Likes = ({ LikedPost, user, initialLikes, isInitiallyLiked }) => {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);

  useEffect(() => {
    // This is to reflect any external changes to the initial likes or like status
    setLikesCount(initialLikes);
    setIsLiked(isInitiallyLiked);
  }, [initialLikes, isInitiallyLiked]);

  const toggleLike = async () => {
    const response = await fetch("http://127.0.0.1:8000/showcase/toggle_like/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "post": LikedPost,  // Assuming this is the ID of the post to be liked/unliked
        "user": user,  // Assuming this is the ID of the user performing the action
      })
    });

    if (response.ok) {
      const data = await response.json();
      // Use the likesCount from the response to update state
      setLikesCount(data.likesCount);
      setIsLiked(data.message === 'Like added');  // Determine like status based on the action taken
    } else {
      // Handle error case
      console.error("Failed to toggle like");
    }
  };

  return (
    <div onClick={toggleLike} className="like-button flex items-center cursor-pointer text-neutral-400 flex mr-2 mt-4 text-base tracking-normal text-neutral-400">
      <img
        src={isLiked ? 'https://cdn.builder.io/api/v1/image/assets/TEMP/a6b6a6fc12b49d682d339e680a99d0813ad9d1df078c58ecd84437a1faf83427?' : 'https://cdn.builder.io/api/v1/image/assets/TEMP/f90fa44f5c875dc682630d4e52d5606c05c4a6cc35fc4b07a84d3cd0bba786b7?apiKey=50c5361058c6465f94eb30dfd5c845d1&'}
        alt={isLiked ? 'Unlike' : 'Like'}
        className="w-6 h-6 mr-2"
      />
      <span>{likesCount} likes</span>
    </div>
  );
};

   return (
      <div>
        <div className="self-stretch mt-6 text-base tracking-normal text-white max-md:max-w-full">
              {filteredPosts.length} posts found
        </div>
        {filteredPosts.map((post, index) => (
          <div key={index} className="post-class">
            <div className="flex gap-4 p-6 mt-6 rounded-lg bg-neutral-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex justify-center items-center self-start aspect-square">
                <Avatar src={post.user.image} />
              </div>
              <div className="flex flex-col flex-1 items-start max-md:max-w-full">
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
                <Likes LikedPost={post.id} user={post.user_id} initialLikes={post.likes} isInitiallyLiked={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

const Icon = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="w-5 aspect-square" />
);

const CategoryButton = ({ categoryName, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer justify-center bg-neutral-700 text-white flex items-center rounded-full"
    style={{ padding: '12px 16px' }} // Apply dynamic padding
  >
    {categoryName}
  </div>
);



const CategoriesSection = ({ setSelectedCategory }) => {
  const categories = ["Ed-Tech", "Health-Tech", "Transportation", "Fin-Tech", "Food-Tech"]; // Example categories

  return (
    <section className="flex flex-col items-start p-6 mt-6 rounded-lg w-[338px] bg-neutral-800 text-stone-100 max-md:px-5">
      <header className="self-stretch mb-3">
        <h2 className="text-xl font-medium tracking-wide text-white">Popular categories</h2>
      </header>
      <div className="flex gap-3 flex-wrap">
        {categories.map(categoryName => (
          <CategoryButton key={categoryName} categoryName={categoryName} onClick={() => setSelectedCategory(categoryName)} />
        ))}
      </div>
    </section>
  );
};



const SearchBar = ({ setSearchTerm }) => { // Accept setSearchTerm as a prop
  return (
    <div className="flex gap-3 p-4 bg-neutral-800 rounded-[30px] w-[338px] text-stone-300">
      <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8de9e80e28547cce198c2cb75b90d7874d511934c8811781b742ab3a0fbfa3f?apiKey=50c5361058c6465f94eb30dfd5c845d1&" alt="Search Icon" />
      <input // Changed from <p> to <input>
        type="text"
        className="flex-auto bg-transparent outline-none" // Ensure input blends into the search bar
        placeholder="Search in showcase"
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
      />
    </div>
  );
};

const Showcase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const myCookies = new Cookies();
  const rejectionNote = myCookies.get('rejectionNote');
  
   return (
  <div className="flex flex-col h-screen bg-black min-h-screen"> {/* Ensures the main container takes up the full viewport height */}
    <Header />
    <div className="flex flex-1 overflow-hidden"> {/* This div becomes the flex container for your main content and aside */}
      <main className="flex-1 overflow-auto ml-[120px] mr-[40px]"> {/* Main content area that scrolls */}

        {isLogin && rejectionNote !== null && (
          <div className="bg-red-500 text-white p-2 rounded mt-2 mb-4 opacity-70">
            Sorry we can not verify your account: {rejectionNote}
          </div>
        )}
        
        <ShowcaseForm afterPostSuccess={fetchPosts} />
        <ShowcasePost searchTerm={searchTerm}/>
      </main>
      <aside className="w-1/3 h-full overflow-auto sticky top-0"> {/* Aside section made sticky */}
        <SearchBar setSearchTerm={setSearchTerm}/>
        <CategoriesSection/>
      </aside>
    </div>
  </div>
);

}
export default Showcase;

