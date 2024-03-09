import React from "react";

const DashboardSection = ({ iconSrc, sectionTitle, altText }) => (
  <div className="flex gap-2 self-start mt-10 ml-8 whitespace-nowrap max-md:ml-2.5">
    <img loading="lazy" src={iconSrc} className="shrink-0 w-8 aspect-square" alt={altText} />
    <div className="flex-auto my-auto">{sectionTitle}</div>
  </div>
);

const StartupVaultApp = () => {
  const sections = [
    { id: 1, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?apiKey=9ff2a73e8144478896bce8206c80f3e2&", sectionTitle: "Overview", altText: "Overview icon" },
    { id: 2, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?apiKey=9ff2a73e8144478896bce8206c80f3e2&", sectionTitle: "Weekly Updates", altText: "Updates icon" },
    { id: 3, iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?apiKey=9ff2a73e8144478896bce8206c80f3e2&", sectionTitle: "Founder Details", altText: "Founder icon" },
  ];

  return (
    <main className="flex flex-col justify-center pb-20 bg-black">
      <header className="flex gap-5 justify-between py-6 pr-10 pl-20 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between text-white max-md:flex-wrap max-md:max-w-full">
          <h1 className="flex-auto text-4xl italic font-semibold tracking-wider leading-10">startupvault.id</h1>
          <nav className="flex gap-5 justify-between px-5 py-3 text-xl font-light max-md:flex-wrap max-md:px-5">
            <a href="#" className="grow">Showcase</a>
            <a href="#">Events</a>
            <a href="#" className="flex-auto">Our Investors</a>
            <a href="#" className="grow whitespace-nowrap text-stone-100">Our Startups</a>
          </nav>
        </div>
        <div className="flex gap-2 rounded-[30px]">
          <button className="grow justify-center px-5 py-3 text-xl font-light text-green-400 whitespace-nowrap rounded-3xl bg-green-400 bg-opacity-20">My Dashboard</button>
          <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&" className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[30px] w-[30px]" alt="User avatar" />
            <div className="self-stretch my-auto text-xl font-medium tracking-wide text-stone-100">Naznien</div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/081086ccfbd0bbab3badfd8655a0ab414aaf7a31d08fbc1f5199388c6bac11c8?apiKey=9ff2a73e8144478896bce8206c80f3e2&" className="shrink-0 self-stretch my-auto aspect-square w-[18px]" alt="User settings icon" />
          </div>
        </div>
      </header>
      <section className="w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <aside className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow self-stretch pt-6 pb-20 text-xl tracking-wide rounded-lg text-neutral-400 max-md:max-w-full">
              <div className="flex flex-col px-10 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-3 px-6 py-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300 max-md:px-5">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/92e705fdbc7d9eb92b8784a8c1ceb52df03c8aa7b6b8e5c590f04dd435f3a923?apiKey=9ff2a73e8144478896bce8206c80f3e2&" className="shrink-0 w-5 aspect-square" alt="Search icon" />
                  <div className="flex-auto">Search in dashboard</div>
                </div>
                {sections.map(section => (
                  <DashboardSection key={section.id} iconSrc={section.iconSrc} sectionTitle={section.sectionTitle} altText={section.altText} />
                ))}
              </div>
            </div>
          </aside>
          <article className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 pt-6 max-md:max-w-full">
              <header className="flex flex-wrap gap-5 justify-between content-center pr-52 w-full max-md:pr-5 max-md:max-w-full">
                <h2 className="text-5xl font-semibold tracking-wider leading-[54px] text-stone-100 max-md:text-4xl">Startup Details</h2>
                <button className="flex gap-1.5 justify-center pr-2 my-auto text-xl tracking-wide text-neutral-400">
                  Edit details
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/47a2b79e2cd2f53d4c64bb25cd7e75b71bc05669397f6a1b9fef848e83ac53a3?apiKey=9ff2a73e8144478896bce8206c80f3e2&" className="shrink-0 aspect-square w-[23px]" alt="Edit icon" />
                </button>
              </header>
              {/* Content of the article goes here */}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default StartupVaultApp;