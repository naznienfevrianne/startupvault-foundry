import React from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ShowcaseForm from './CreateShowcase.js'

const NavbarItem = ({ children, href }) => (
  <div className="grow">
    <Link to={href} className="text-white hover:text-gray-300">
      {children}
    </Link>
  </div>
);

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
      className="justify-center self-center px-5 py-2 mt-3 text-xl font-semibold tracking-widest text-black bg-green-400 whitespace-nowrap rounded-3xl shadow-sm max-md:mt-10 hover:bg-green-500 cursor-pointer"
      type="button">
      SIGN UP
  </div>
);

const Header = () => (
  <header className="flex gap-5 justify-between items-center px-20 py-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <div className="flex gap-5 justify-between items-center self-start text-white max-md:flex-wrap max-md:max-w-full">
      <h1 className="flex-auto text-sm italic font-semibold tracking-wider leading-10">
        startupvault.id
      </h1>
      <NavigationBar />
    </div>
    <SignUpButton />
  </header>
);

const ShowcasePost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/showcase/');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        // Handle errors or show a message
        console.error(error.message);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to run the effect only once on component mount


 const Avatar = ({ avatar }) => { //itu avatarSrc belom tau jg
    const defaultAvatar = 'frontend/public/avatar.png'; // path icon avatar
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
  return (
    <div className="self-stretch mt-6 rounded-2xl border border-solid border-neutral-700 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <ImageWithDescription
              src={image.src}
              description={image.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Icon = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

//const Likes = ({ count }) => {
//  return (
//    <div className="flex mr-2 mt-4 text-base tracking-normal text-neutral-400">
//      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f90fa44f5c875dc682630d4e52d5606c05c4a6cc35fc4b07a84d3cd0bba786b7?apiKey=50c5361058c6465f94eb30dfd5c845d1&" alt="Like Icon" className="w-5 aspect-square mr-1.5" />
//      <div>{count} likes</div>
//    </div>
//  );
//};

const Likes = ({ postId, initialLikes, isInitiallyLiked }) => {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // This is to reflect any external changes to the initial likes or like status
    setLikesCount(initialLikes);
    setIsLiked(isInitiallyLiked);
  }, [initialLikes, isInitiallyLiked]);

  const toggleLike = async () => {
  console.log("ini loh" + postId);
    // Assuming CSRF tokens are handled globally or not needed for this demo
    const response = await fetch(`http://127.0.0.1:8000/showcase/toggle_like/${postId}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include headers for CSRF token if necessary
        // 'X-CSRFToken': 'your-csrf-token-here',
      },
    });

    if (!response.ok) {
      console.error('Failed to toggle like');
      return;
    }

    const data = await response.json();

    // Update UI based on the response
    setIsLiked(data.isLiked);
    setLikesCount(data.likesCount);
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
      console.log(post);
        {posts.map((post, index) => (
          <div key={index} className="post-class">
            <div className="flex gap-4 p-6 mt-6 rounded-lg bg-neutral-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex justify-center items-center self-start aspect-square">
                <Avatar src={post.user.profilePicture} />
              </div>
              <div className="flex flex-col flex-1 items-start max-md:max-w-full">
                <header className="flex gap-2 text-base font-medium tracking-wide whitespace-nowrap">
                  <h2 className="grow text-stone-100">{post.user}</h2>
                  <Icon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/124b5d5efd3e4196ebf083fa4f204a1199db6acebb70a317cbba4e5b973e8053?apiKey=50c5361058c6465f94eb30dfd5c845d1&"
                    alt="Verified Badge"
                    className="w-5 aspect-square"
                  />
                  <time className="text-neutral-400">{countTimeStamp(post.date)}</time>
                </header>
                <div className="mt-1 text-xs tracking-wider text-neutral-400">SVID PARTNER</div>
                <Content content={post.content} />
                {post.images && post.images.length > 0 ? (
                                <Image images={post.images} />
                 ) : null}
                <Likes postId={post.id} initialLikes={post.likes} isInitiallyLiked={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

//function createPost = () => (
//// pilih role dulu kalo dia partner bs langsung post
//// input everything
//// submitted
////balikin ke state kosong lagi
//)

const Icon = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} className="w-5 aspect-square" />
);

function SearchBar() {
  return (
    <div className="flex gap-3 p-4 bg-neutral-800 rounded-[30px] w-[338px] text-stone-300">
      <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8de9e80e28547cce198c2cb75b90d7874d511934c8811781b742ab3a0fbfa3f?apiKey=50c5361058c6465f94eb30dfd5c845d1&" alt="Search Icon" />
      <p className="flex-auto">Search in showcase</p>
    </div>
  );
}

const CategoryButton = ({ categoryName }) => (
  <div className="grow justify-center px-4 py-3 rounded-3xl bg-neutral-700">{categoryName}</div>
);

const CategoriesSection = () => {
  const categories = ["Ed-Tech", "Health-Tech", "Transportation"];
  return (
    <section className="flex flex-col items-start p-6 mt-6 max-w-full rounded-lg bg-neutral-800 text-stone-100 w-[338px] max-md:px-5">
      <header className="self-stretch">
        <h2 className="text-xl font-medium tracking-wide text-white">Popular categories</h2>
      </header>
      <div className="flex gap-3 mt-6 whitespace-nowrap">
        <CategoryButton categoryName={categories[0]} />
        <CategoryButton categoryName={categories[1]} />
      </div>
      <div className="flex gap-3 mt-3 whitespace-nowrap">
        <div className="flex flex-col flex-1">
          <CategoryButton categoryName={categories[2]} />
          <CategoryButton categoryName={categories[1]} className="mt-3" />
        </div>
        <CategoryButton categoryName={categories[1]} />
      </div>
    </section>
  );
};

const Showcase = () => (
  <main className="flex flex-col pb-12 bg-black">
    <Header />
    <section className="flex gap-5 pt-6">
      <div className="w-2/3 ml-28 mr-10">
        <ShowcaseForm />
        <ShowcasePost />
      </div>
      <aside className="w-1/3">
        <div>
          <SearchBar/>
          <CategoriesSection/>
        </div>
      </aside>
    </section>
  </main>
);

export default Showcase;
