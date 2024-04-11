import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';

const ListStartup = () => {

    const myCookies = new Cookies();
    
    const token = myCookies.get('token');
    const [startups, setStartups] = useState([]);
    console.log(startups);
    const numberOfStartups = startups.length;
    console.log(numberOfStartups); // This will log the total number of objects in your array
    const sectorsArray = startups.sector ? startups.sector.split(',') : [];
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://startupvault-foundry.vercel.app/auth/startup/',{
                  method: "GET", 
                  headers:{
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
                  }
                  }
                  );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const entry = await response.json();
                setStartups(entry);
                // setProfilePicture(entry.image);

            } catch (error) {
                console.log("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
      <div className="flex flex-col justify-center bg-black min-h-screen px-20">
      <NavBar />
      <main className="px-px pb-20 w-full max-md:max-w-full">
      <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col grow items-end pt-6 pr-5 pl-20 max-md:pl-5 max-md:max-w-full">
          <div className="flex gap-4 justify-between py-2 max-w-full w-[940px] max-md:flex-wrap">
            <div className="my-auto text-xl text-neutral-400">
            {startups.length} startups found
            </div>
            <div className="flex gap-3 text-base tracking-normal whitespace-nowrap text-stone-100">
              <div className="flex gap-2.5 justify-center py-2 pr-4 pl-3 rounded-3xl border border-solid border-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/85601aacb93b518683dbd710458eea90f4de83c1b708d701ec5543a9a9b660cd?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="shrink-0 w-5 aspect-square"
                />
                <div>Industry</div>
              </div>
              <div className="flex gap-2.5 justify-center py-2 pr-4 pl-3 rounded-3xl border border-solid border-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fee837a745f802cecb79662a1f0609bc8d399196b617eb56d66895a971123a8d?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="shrink-0 w-5 aspect-square"
                />
                <div>Stage</div>
              </div>
              <div className="flex gap-2.5 justify-center py-2 pr-4 pl-3 rounded-3xl border border-solid border-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b81be879e9b21bbfb78421e13ff5f0026d60a83548509c5b61d69426ac47fe95?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="shrink-0 w-5 aspect-square"
                />
                <div>Sort</div>
              </div>
            </div>
          </div>

          {startups.map((startup) => (
          <div className="flex flex-col p-6 mt-6 max-w-full rounded-lg bg-neutral-800 w-[930px] max-md:px-5">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex gap-5 justify-between">
                {/* <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[69px] w-[69px]">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe89fd4bfc24bd6fe10001ef6745d29dfc88ea91b8b532ed8089fdbeaaa7558?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="aspect-square w-[39px]"
                    default image
                  />
                </div> */} 
                { startup.image? (
                <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[69px] w-[69px]"
                style={{ backgroundImage: `url(${startup.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                    </div>
                 ) : (
                <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[69px] w-[69px]">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fe89fd4bfc24bd6fe10001ef6745d29dfc88ea91b8b532ed8089fdbeaaa7558?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="aspect-square w-[39px]"
                />
                </div>
                )}
                <div className="flex flex-col whitespace-nowrap">
                  <div className="flex gap-1 pr-3.5 text-2xl font-semibold tracking-wide text-stone-100">
                    <div key={startup.id}>
                      <Link to={`/startupDetails/${startup.id}`}>
                          <div>{startup.name}</div>
                      </Link>
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc7a09571d7d489237a89ec6890870aee5974013125aa7ff1c55b8dd7dbf46e2?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="shrink-0 my-auto w-5 aspect-square"
                    />
                  </div>
                  <div className="flex gap-2 mt-2 text-lg">
                    <div className="flex gap-1.5 py-1.5 pr-3 pl-2.5 font-semibold tracking-widest rounded-2xl bg-neutral-700 leading-[120%] text-stone-100">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/64cfc87d2edc37bd5638567dedb00ca03fb7bb0667651df0d3d24fc02fd65653?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 my-auto aspect-square w-[18px]"
                      />
                      <div>{startup.typ}</div>
                    </div>
                    <div className="flex gap-1 px-2 py-1.5 font-light tracking-wide text-white rounded-3xl">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5f09dc683253c86335e89ff33f2b25448a1041ad0619ff661800ffbe5058868?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                        className="shrink-0 self-start w-5 aspect-square"
                      />
                      <div>{startup.location}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 self-start">
              <a href={startup.website} target="_blank" rel="noopener noreferrer">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/62e0e5f129c4a122d7f77968332bd78cc39b5f2f5fa17d52be3e208facf2a919?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-8 aspect-square"
                    alt="Description for first image"
                />
                </a>
                <a href={startup.linkedin} target="_blank" rel="noopener noreferrer">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/11f468775b14b62903b205e3f321893c259f5fa95e5c3548ee9783b53efc43ef?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-8 aspect-square"
                    alt="Description for second image"
                />
                </a>
              </div>
            </div>
            <div className="flex gap-5 justify-center mt-6 max-md:flex-wrap">
              <div className="flex flex-col flex-1 rounded-md bg-neutral-800">
                <div className="flex gap-3 py-1">
                  <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ac4c6c678c288e616bf4f20bc7e9b46e7353bbf79a4dc8c7809184ba96503b5?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="aspect-square w-[18px]"
                    />
                  </div>
                  <div className="my-auto text-lg font-semibold tracking-wide text-stone-100">
                    Industry
                  </div>
                </div>
                <div className="mt-2 text-base tracking-wide text-ellipsis text-neutral-400">
                {startup.sector}
                </div>
              </div>
              {/* <div className="flex flex-col flex-1 rounded-md bg-neutral-800">
                <div className="flex gap-3 py-1">
                  <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/615b4db904bcb43c393af0247ec63a22e0ab58392d096ea2873d0821f684921c?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="aspect-square w-[18px]"
                    />
                  </div>
                  <div className="my-auto text-lg font-semibold tracking-wide text-stone-100">
                    Size
                  </div>
                </div>
                <div className="mt-2 text-lg tracking-wide text-neutral-400">
                  belum ada var Employees di API
                </div>
              </div> */}
              <div className="flex flex-col flex-1 pb-1.5 rounded-md bg-neutral-800">
                <div className="flex gap-2.5">
                  <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aebee5a48a90008dee58f7d64c18eee2794f3b8327dd132e82cf294f8ccc005?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                      className="aspect-square w-[18px]"
                    />
                  </div>
                  <div className="flex-1 my-auto text-lg font-semibold tracking-wide text-stone-100">
                    Valuation
                  </div>
                </div>
                <div className="mt-2 text-lg tracking-wide text-green-400">
                {(() => {
                switch (startup.revenue) {
                case 0:
                    return 'USD 0-50K';
                case 1:
                    return 'USD 1-10K';
                case 2:
                    return 'USD 11-50K';
                case 3:
                    return 'USD 51-100K';
                case 4:
                    return 'USD 101-500K';
                case 5:
                    return 'USD 501+K';
                default:
                    return 'N/A'; // Default case if the value is not in the specified range
                }
            })()}
                </div>
              </div>
            </div>
            <div className="mt-6 text-lg tracking-normal text-stone-100 max-md:max-w-full">
              {startup.desc}
            </div>
            <div className="justify-center self-end px-5 py-3 mt-6 text-xl font-semibold tracking-widest text-black whitespace-nowrap bg-green-400 rounded-lg">
              Follow
            </div>
          </div>
          ))}
        </div>
        <Top10Startup />
        </aside>
        </main>
      </div>
  );
}

function Top10Startup() {
    // const myCookies = new Cookies();
    // const idFounder = myCookies.get('id')
    // const nameFounder = myCookies.get('name')
    // const profilePicture = myCookies.get('image')
    // const idStartup = myCookies.get('startup')
    // const token = myCookies.get('token')
  
    const menuItems = [
      { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Overview icon", text: "Overview" },
      { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Updates icon", text: "Weekly Updates" },
      { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?apiKey=9ff2a73e8144478896bce8206c80f3e2&", alt: "Details icon", text: "Startup Details" },
    ];
  
    return (
      <div className="flex flex-col items-start py-6 pr-20 pl-5 max-md:pr-5 max-md:max-w-full">
      <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffe486c8ee1641fa7bcfe3c257c03ed30e751cd4712c27d2d4905931fe89621c?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-5 aspect-square"
        />
        <div>Search in showcase</div>
      </div>
      <div className="flex flex-col p-6 mt-6 max-w-full rounded-lg bg-neutral-800 w-[338px] max-md:px-5">
        <div className="text-xl font-medium tracking-wide text-white">
          Top 10 Startups of The Week
        </div>
        <div className="flex gap-4 items-center mt-6">
          <div className="flex flex-col self-stretch my-auto text-sm tracking-wider text-center whitespace-nowrap text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/98fe5579df6eb1b0e9655813276be01e652fca3e6629f4576456a2239b11b420?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="self-center aspect-[1.28] fill-green-400 w-[18px]"
            />
            <div className="text-ellipsis">1</div>
          </div>
          <div className="flex justify-center items-center self-stretch px-3 py-2.5 rounded bg-green-400 bg-opacity-20 h-[49px] w-[49px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/542c65599475a184bc43a5d70d342fe2c8487f0d88f26d91b8c8afe5df5ef293?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="aspect-[0.96] w-[27px]"
            />
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto text-base">
            <div className="flex gap-1 px-0.5 font-medium tracking-wide text-stone-100">
              <div>Foundry Foundation</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f29ba9573512a5935787da883445d82b3f0437746f2b75506f4e42e2d1d9b1dd?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="mt-1 tracking-normal whitespace-nowrap text-ellipsis text-neutral-400">
              Foundry foundation is a company
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-6">
          <div className="flex flex-col self-stretch my-auto text-sm tracking-wider text-center whitespace-nowrap text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8bc8cdedb78bcea20719d396dbab8ba487c0c58378e5d7cc78694c5993fb32f?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="self-center aspect-[1.28] fill-rose-500 w-[18px]"
            />
            <div className="text-ellipsis">2</div>
          </div>
          <div className="flex justify-center items-center self-stretch px-3 py-2.5 rounded bg-green-400 bg-opacity-20 h-[49px] w-[49px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/542c65599475a184bc43a5d70d342fe2c8487f0d88f26d91b8c8afe5df5ef293?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="aspect-[0.96] w-[27px]"
            />
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto text-base">
            <div className="flex gap-1 px-0.5 font-medium tracking-wide text-stone-100">
              <div>Foundry Foundation</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f29ba9573512a5935787da883445d82b3f0437746f2b75506f4e42e2d1d9b1dd?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="mt-1 tracking-normal whitespace-nowrap text-ellipsis text-neutral-400">
              Foundry foundation is a company
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-6">
          <div className="flex flex-col self-stretch my-auto text-sm tracking-wider text-center whitespace-nowrap text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/98fe5579df6eb1b0e9655813276be01e652fca3e6629f4576456a2239b11b420?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="self-center aspect-[1.28] fill-green-400 w-[18px]"
            />
            <div className="text-ellipsis">3</div>
          </div>
          <div className="flex justify-center items-center self-stretch px-3 py-2.5 rounded bg-green-400 bg-opacity-20 h-[49px] w-[49px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/542c65599475a184bc43a5d70d342fe2c8487f0d88f26d91b8c8afe5df5ef293?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="aspect-[0.96] w-[27px]"
            />
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto text-base">
            <div className="flex gap-1 px-0.5 font-medium tracking-wide text-stone-100">
              <div>Foundry Foundation</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f29ba9573512a5935787da883445d82b3f0437746f2b75506f4e42e2d1d9b1dd?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="mt-1 tracking-normal whitespace-nowrap text-ellipsis text-neutral-400">
              Foundry foundation is a company
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-6">
          <div className="flex flex-col self-stretch my-auto text-sm tracking-wider text-center whitespace-nowrap text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/98fe5579df6eb1b0e9655813276be01e652fca3e6629f4576456a2239b11b420?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="self-center aspect-[1.28] fill-green-400 w-[18px]"
            />
            <div className="text-ellipsis">4</div>
          </div>
          <div className="flex justify-center items-center self-stretch px-3 py-2.5 rounded bg-green-400 bg-opacity-20 h-[49px] w-[49px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/542c65599475a184bc43a5d70d342fe2c8487f0d88f26d91b8c8afe5df5ef293?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="aspect-[0.96] w-[27px]"
            />
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto text-base">
            <div className="flex gap-1 px-0.5 font-medium tracking-wide text-stone-100">
              <div>Foundry Foundation</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f29ba9573512a5935787da883445d82b3f0437746f2b75506f4e42e2d1d9b1dd?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="mt-1 tracking-normal whitespace-nowrap text-ellipsis text-neutral-400">
              Foundry foundation is a company
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-6">
          <div className="flex flex-col self-stretch my-auto text-sm tracking-wider text-center whitespace-nowrap text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/98fe5579df6eb1b0e9655813276be01e652fca3e6629f4576456a2239b11b420?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="self-center aspect-[1.28] fill-green-400 w-[18px]"
            />
            <div className="text-ellipsis">5</div>
          </div>
          <div className="flex justify-center items-center self-stretch px-3 py-2.5 rounded bg-green-400 bg-opacity-20 h-[49px] w-[49px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/542c65599475a184bc43a5d70d342fe2c8487f0d88f26d91b8c8afe5df5ef293?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="aspect-[0.96] w-[27px]"
            />
          </div>
          <div className="flex flex-col flex-1 self-stretch my-auto text-base">
            <div className="flex gap-1 px-0.5 font-medium tracking-wide text-stone-100">
              <div>Foundry Foundation</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f29ba9573512a5935787da883445d82b3f0437746f2b75506f4e42e2d1d9b1dd?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="mt-1 tracking-normal whitespace-nowrap text-ellipsis text-neutral-400">
              Foundry foundation is a company
            </div>
          </div>
        </div>
      </div>
    </div>
      );
  }

export default ListStartup;

