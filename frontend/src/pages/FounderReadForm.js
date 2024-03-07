import React, { useState, useEffect } from 'react';

const MenuItem = ({ src, alt, children }) => (
  <div className="flex gap-2 self-start mt-10 whitespace-nowrap max-md:ml-2.5">
    <img loading="lazy" src={src} alt={alt} className="shrink-0 w-8 aspect-square" />
    <div className="grow my-auto">{children}</div>
  </div>
);

const FounderDetails = () => {
    // const [founderDetails, setFounderDetails] = useState({
    //     name: entry.name,
    //     email: entry.email,
    //     linkedin: entry.linkedin,
    //     phoneNumber: entry.phoneNumber
    // });
    const [founderDetails, setFounderDetails] = useState("");
    // const [founderName, setFounderName] = useState("");
    // const [founderEmail, setFounderEmail] = useState("");
    // const [founderLinkedIn, setFounderLinkedIn] = useState("");
    // const [founderPhoneNumber, setFounderPhoneNumber] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/auth/founder/7/");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const entry = await response.json();
                setFounderDetails(entry);
                // setFounderDetails(entry);
                // setFounderName(entry.name);
                // setFounderEmail(entry.email);
                // setFounderLinkedIn(entry.linkedin);
                // setFounderPhoneNumber(entry.phoneNumber);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="flex flex-col px-5 pt-9 pb-20 max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between content-center pr-20 max-md:pr-5">
                <h1 className="text-5xl font-semibold tracking-wider leading-[54px] text-stone-100 max-md:text-4xl">Founder Details</h1>
                <div className="flex gap-1.5 justify-center px-0.5 my-auto text-xl tracking-wide whitespace-nowrap text-neutral-400">
                    <div className="grow">edit details</div>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/04c641284d7871837890bdbbf518752e3d58158fa19f353bc7632662bcd27883?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Edit icon" className="shrink-0 aspect-square w-[23px]" />
                </div>
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/301d1c1baa7c888ca094c200e6628c0467efd8a91277c3e53073791219eac3ab?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Founder's portrait" className="mt-5 bg-green-700 rounded-full aspect-[0.99] h-[74px] w-[74px]" />
            <h2 className="mt-5 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">Name</h2>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.name}
            </div>
            <h3 className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">LinkedIn</h3>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.linkedin}
            </div>
            {/* <div className="flex flex-col justify-center items-start py-1.5 pr-20 mt-2.5 text-sm tracking-normal text-white whitespace-nowrap rounded-md bg-neutral-800 max-md:pr-6 max-md:max-w-full">
                <div className="justify-center p-2 rounded-md bg-neutral-700">linkedin.com/in/</div> {founderDetails.linkedin}
            </div> */}
            <h4 className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">Email</h4>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal whitespace-nowrap rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.email}
            </div>
            <h5 className="mt-5 text-xl font-medium tracking-wide text-stone-100 max-md:max-w-full">Phone Number</h5>
            <div className="justify-center items-start py-3.5 pr-16 pl-3 mt-2.5 text-sm font-light tracking-normal rounded-md bg-neutral-800 text-neutral-400 max-md:pr-5 max-md:max-w-full">
                {founderDetails.phoneNumber}
            </div>
        </section>
    );
};

function Dashboard() {
  const menuItems = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Overview icon", text: "Overview" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Updates icon", text: "Weekly Updates" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Details icon", text: "Startup Details" },
  ];

  return (
    <div className="flex flex-col justify-center bg-black">
      <header className="flex gap-5 justify-between py-6 pr-10 pl-20 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <nav className="flex gap-5 justify-between text-white max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto text-4xl italic font-semibold tracking-wider leading-10">startupvault.id</div>
          <div className="flex gap-5 justify-between px-5 py-3 text-xl font-light max-md:flex-wrap max-md:px-5">
            <div className="grow">Showcase</div>
            <div>Events</div>
            <div className="flex-auto">Our Investors</div>
            <div className="grow whitespace-nowrap text-stone-100">Our Startups</div>
          </div>
        </nav>
        <div className="flex gap-2 rounded-[30px]">
          <div className="grow justify-center px-5 py-3 text-xl font-light text-green-400 whitespace-nowrap rounded-3xl bg-green-400 bg-opacity-20">My Dashboard</div>
          <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
            <div className="flex justify-center items-center self-stretch basis-0">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="User profile" className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[30px] w-[30px]" />
            </div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1345ea404a723338ff721ac0a6577f3b2b779ec21cbe5039152ea32aaaf38f?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="User icon" className="shrink-0 self-stretch my-auto aspect-square w-[30px]" />
            <div className="self-stretch my-auto text-xl font-medium tracking-wide text-stone-100">Naznien</div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/081086ccfbd0bbab3badfd8655a0ab414aaf7a31d08fbc1f5199388c6bac11c8?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Settings icon" className="shrink-0 self-stretch my-auto aspect-square w-[18px]" />
          </div>
        </div>
      </header>
      <main className="px-px pb-20 w-full max-md:max-w-full">
        <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col self-stretch mt-6 text-xl tracking-wide">
              <div className="flex flex-col pr-7 pl-10 text-neutral-400 max-md:px-5">
                <div className="flex gap-3 p-4 mr-0 -ml-px text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/92e705fdbc7d9eb92b8784a8c1ceb52df03c8aa7b6b8e5c590f04dd435f3a923?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Search icon" className="shrink-0 w-5 aspect-square" />
                  <div className="flex-auto -mr-0.5">Search in dashboard</div>
                </div>
                {menuItems.map((item, index) => (
                  <MenuItem key={index} src={item.src} alt={item.alt}>{item.text}</MenuItem>
                ))}
              </div>
              <div className="flex gap-5 justify-between pr-10 mt-10 text-green-400 max-md:pr-5">
                <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                <div className="flex gap-2 px-4 py-2 -mr-1 rounded-lg bg-green-400 bg-opacity-20">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0ac874774d74b16428095b5fd34e492283a512f4a7323a8d6634fc264f32384?apiKey=9ff2a73e8144478896bce8206c80f3e2&" alt="Founder details icon" className="shrink-0 w-8 aspect-square" />
                  <div className="flex-auto my-auto">Founder Details</div>
                </div>
              </div>
            </div>
          </div>
          <FounderDetails />
        </aside>
      </main>
    </div>
  );
}

export default Dashboard;
