import React from "react";

const Header = () => (
  <header className="flex gap-5 justify-between px-20 py-6 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full text-white">
    <h1 className="flex-auto text-4xl italic font-semibold tracking-wider leading-10">startupvault.id</h1>
    <nav className="flex gap-5 justify-between px-8 my-auto text-xl font-light max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <a href="#" className="grow">Showcase</a>
      <a href="#">Events</a>
      <a href="#" className="flex-auto">Our Investors</a>
      <a href="#" className="grow whitespace-nowrap">Our Startups</a>
    </nav>
    <button className="justify-center px-5 py-3 text-xl font-semibold tracking-widest text-black whitespace-nowrap rounded-3xl shadow-sm bg-white max-md:px-5">sign up</button>
  </header>
);

const PostInput = () => (
  <section className="flex gap-4 p-6 rounded-lg bg-neutral-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <div className="flex justify-center items-center self-start aspect-square">
      <img loading="lazy" alt="User avatar" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f92f84b87a5bc92ccc7a955f5c94227b36db1d43c30684a0cae63170ace21c94?apiKey=50c5361058c6465f94eb30dfd5c845d1&" className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[52px]" />
    </div>
    <div className="flex flex-col flex-1 pt-3 max-md:max-w-full">
      <p className="text-base tracking-normal text-neutral-400 max-md:max-w-full">Any thoughts, jobs, links you want to share?</p>
      <div className="flex gap-5 justify-between mt-6 text-xl font-semibold tracking-widest text-black whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <img loading="lazy" alt="Icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fb975a2ee80526bf1c672d3b773278da2e66220e974b2a00c324524d3e639ee?apiKey=50c5361058c6465f94eb30dfd5c845d1&" className="my-auto aspect-square w-[22px]" />
        <button className="justify-center px-8 py-3 bg-green-400 rounded-3xl max-md:px-5">post</button>
      </div>
    </div>
  </section>
);

const Post = ({ username, timestamp, avatarSrc, postContent }) => (
  <article className="flex gap-4 p-6 mt-6 rounded-lg bg-neutral-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <div className="flex justify-center items-center self-start aspect-square">
      <img loading="lazy" alt="User avatar" src={avatarSrc} className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[39px]" />
    </div>
    <div className="flex flex-col flex-1 items-start max-md:max-w-full">
      <div className="flex gap-2 text-base font-medium tracking-wide whitespace-nowrap">
        <div className="grow text-stone-100">{username}</div>
        <img loading="lazy" alt="Clock Icon" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1e269ee2adbacb695a5c84c88a514973f88c8548d4b0047bdccf8abe5e3172a?apiKey=50c5361058c6465f94eb30dfd5c845d1&" className="w-5 aspect-square" />
        <span className="text-neutral-400">{timestamp}</span>
      </div>
      <p className="mt-1 text-xs tracking-wider text-neutral-400">SVID PARTNER</p>
      <p className="self-stretch mt-4 text-base tracking-normal text-stone-100 max-md:max-w-full">{postContent}</p>
    </div>
  </article>
);

const CategoryButton = ({ children }) => {
  return (
    <button className="grow justify-center px-4 py-3 rounded-3xl bg-neutral-700">
      {children}
    </button>
  );
};

function ShowcaseSearch() {
  const categories = ["Ed-Tech", "Health-Tech", "Transportation"];

  return (
    <main className="flex flex-col items-start py-5 pr-20 pl-5 text-base tracking-normal max-md:pr-5 max-md:max-w-full">
      <header className="flex gap-3 p-4 bg-neutral-800 rounded-[30px] text-stone-300">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8de9e80e28547cce198c2cb75b90d7874d511934c8811781b742ab3a0fbfa3f?apiKey=50c5361058c6465f94eb30dfd5c845d1&" className="w-5 aspect-square" alt="Search Icon" />
        <div className="flex-auto">Search in showcase</div>
      </header>
      <section className="flex flex-col items-start p-6 mt-6 max-w-full rounded-lg bg-neutral-800 text-stone-100 w-[338px] max-md:px-5">
        <h2 className="self-stretch text-xl font-medium tracking-wide text-white"> Popular categories </h2>
        <div className="flex gap-3 mt-6 whitespace-nowrap">
          <CategoryButton>Ed-Tech</CategoryButton>
          <CategoryButton>Health-Tech</CategoryButton>
        </div>
        <div className="flex gap-3 mt-3 whitespace-nowrap">
          <div className="flex flex-col flex-1">
            <CategoryButton>Transportation</CategoryButton>
            <CategoryButton className="mt-3">Fintech</CategoryButton>
          </div>
          <CategoryButton className="grow justify-center self-start">More...</CategoryButton>
        </div>
      </section>
    </main>
  );
}

const App = () => (
  <div className="flex flex-col pb-12 bg-black">
    <Header />
    <main className="w-full max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[67%] max-md:ml-0 max-md:w-full">
          <PostInput />
          <p className="mt-6 text-base tracking-normal text-white max-md:max-w-full">72 posts found</p>
          <Post
            username="Foundry Foundation"
            timestamp="10h"
            avatarsrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e03d7ebc85b49a9a134b4780fd944e7180321d7339b5449a9fbf1a09308af23b?apiKey=50c5361058c6465f94eb30dfd5c845d1&"postContent="Tak perlu tunggu gajian untuk terima promo PAYDAY..."
          />
          <Post
            username="Foundry Foundation"
            timestamp="10h"
            avatarsrc="https://cdn.builder.io/api/v1/image/assets/TEMP/b725698302dde0f3f0d9b520b7d7e095edc6086e27e0bf816f960f375c4e393d?apiKey=50c5361058c6465f94eb30dfd5c845d1&"postContent="Tak perlu tunggu gajian untuk terima promo PAYDAY..."
          />
        </div>
        <SearchBox />
      </div>
    </main>
  </div>
);

export default App;