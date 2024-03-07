import React from "react";

const NavbarItem = ({ children, href = "#" }) => (
  <a href={href} className="grow text-xl font-light">
    {children}
  </a>
);

const SidebarIcon = ({ src, alt, onClick }) => (
  <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-8" onClick={onClick} />
);

const FounderDetailsPage = () => {
  return (
    <main className="flex flex-col justify-center bg-black">
      <header className="flex gap-5 justify-between py-6 pr-10 pl-20 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <h1 className="text-4xl italic font-semibold tracking-wider leading-10 text-white">startupvault.id</h1>
        <nav className="flex gap-5 justify-between px-5 py-3 text-xl font-light text-white max-md:flex-wrap max-md:px-5">
          <NavbarItem>Showcase</NavbarItem>
          <NavbarItem>Events</NavbarItem>
          <NavbarItem>Our Investors</NavbarItem>
          <NavbarItem>Our Startups</NavbarItem>
          <div className="grow justify-center px-5 py-3 text-xl font-light text-green-400 whitespace-nowrap rounded-3xl bg-green-400 bg-opacity-20">My Dashboard</div>
          <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
            <SidebarIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Profile"/>
            <div className="self-stretch my-auto text-xl font-medium tracking-wide text-stone-100">Naznien</div>
            <SidebarIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/aca2dff95296ab989f15145ad36a70193b5909ff90be344bcc4f7b745efb7c2c?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Settings"/>
          </div>
        </nav>
      </header>
      <section className="px-px pb-20 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <aside className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch mt-6 text-xl tracking-wide">
              <div className="flex flex-col pr-6 pl-8 text-neutral-400 max-md:px-5">
                <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                  <SidebarIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cb446593643fc5888a09f9076f1b9a6893981e0397365468e85765b7a309812?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Search"/>
                  <div className="flex-auto">Search in Dashboard</div>
                </div>
                {[["https://cdn.builder.io/api/v1/image/assets/TEMP/d8e45b697ba9280e7165307c6c05ef695190fe00175e4c3795f18d129cd84075?apiKey=9ff2a73e8144478896bce8206c80f3e2&", "Overview"], ["https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?apiKey=9ff2a73e8144478896bce8206c80f3e2&", "Weekly Updates"], ["https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?apiKey=9ff2a73e8144478896bce8206c80f3e2&", "Startup Details"]].map(([src, alt], index) => (
                  <div className="flex gap-2 self-start mt-10 ml-3 whitespace-nowrap max-md:ml-2.5" key={index}>
                    <SidebarIcon src={src} alt={alt}/>
                    <div className="grow my-auto">{alt}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-5 justify-between pr-10 mt-10 text-green-400 max-md:pr-5">
                <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                <div className="flex gap-2 px-4 py-2 mr-0 rounded-lg bg-green-400 bg-opacity-20">
                  <SidebarIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/4353c199aa337d69d582f433be97a45637b37c04f61a6f6b59f69e10302e5fb3?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Founder Details"/>
                  <div className="flex-auto my-auto">Founder Details</div>
                </div>
              </div>
            </div>
          </aside>
          <article className="flex flex-col ml-5 w-[77%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 pt-9 pb-20 max-md:max-w-full">
              <div className="flex flex-wrap gap-5 justify-between content-center self-start pr-14 text-stone-100 max-md:pr-5">
                <h2 className="flex-auto text-5xl font-semibold tracking-wider leading-[54px] max-md:text-4xl">Founder Details</h2>
                <div className="flex gap-1.5 justify-center px-3.5 py-1.5 my-auto text-xl tracking-wide whitespace-nowrap rounded-xl border border-solid shadow-sm bg-neutral-400 bg-opacity-40 border-neutral-400">
                  <div className="grow">editing mode</div>
                  <SidebarIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5d0ae113ccfc579537d618aff75ac80c67dcf63b59a2ace26b1fcf0e6a39c0d?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Edit Mode"/>
                </div>
              </div>
              <div className="flex gap-4 self-start mt-5">
                <div className="flex flex-1 justify-center items-center">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/44cb276bec2a2c28ab8eaca388c366123f6642bfea778f9199179a6bc02ce34b?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Profile Picture" className="bg-green-700 rounded-full aspect-[0.99] h-[74px] w-[74px]" />
                </div>
                <div className="grow my-auto text-sm font-light tracking-normal text-blue-400 whitespace-nowrap"> Change profile picture </div>
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full"> Email </div>
              <div className="justify-center items-start py-3.5 pr-28 pl-3 mt-2.5 -mr-1 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                naznienfavr@gmail.com
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full"> Name </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                Naznien
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full"> LinkedIn </div>
              <div className="flex gap-2.5 py-1.5 mt-2.5 text-sm whitespace-nowrap rounded-md bg-neutral-800 max-md:flex-wrap">
                <div className="justify-center p-2 tracking-normal text-white rounded-md bg-neutral-700">
                  linkedin.com/in/
                </div>
                <div className="flex-auto my-auto font-light tracking-normal text-neutral-400 max-md:max-w-full">
                  naznienfavr
                </div>
              </div>
              <div className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full"> Phone Number </div>
              <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                +62 81804050600
              </div>
              <div className="flex gap-2 pr-20 mt-5 text-xl font-semibold tracking-widest whitespace-nowrap max-md:flex-wrap max-md:pr-5">
                <div className="justify-center px-4 py-2 rounded-2xl border border-solid border-stone-100 text-stone-100">
                  cancel
                </div>
                <button className="justify-center px-5 py-2 text-black bg-green-400 rounded-2xl max-md:px-5">
                  save
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default FounderDetailsPage;