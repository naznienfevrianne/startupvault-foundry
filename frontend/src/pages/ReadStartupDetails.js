import React, { useState, useEffect } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';
import { useParams } from 'react-router-dom';

// const MenuItem = ({ src, alt, children }) => (
//   <div className="flex gap-2 self-start mt-10 whitespace-nowrap max-md:ml-2.5">
//     <img loading="lazy" src={src} alt={alt} className="shrink-0 w-8 aspect-square" />
//     <div className="grow my-auto">{children}</div>
//   </div>
// );

const StartupDetails = () => {

    // const [founderDetails, setFounderDetails] = useState("");
    // const storedProfilePicture = localStorage.getItem("image") || '';
    // const [profilePicture, setProfilePicture] = useState(storedProfilePicture);
    const myCookies = new Cookies();
    // const idFounder = myCookies.get('id');
    const token = myCookies.get('token');
    const [startup, setStartup] = useState("");
    console.log(startup);
    let { idStartup } = useParams();
    const idFounder = startup.founder_id;
    const [founder, setFounder] = useState("");
    // console.log(numberOfStartups); // This will log the total number of objects in your array
    // const sectorsArray = startup.sector ? startups.sector.split(',') : [];

    
    


    useEffect(() => {
        const fetchStartup = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/auth/startup/${idStartup}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch startup data');
                }
                const data = await response.json();
                setStartup(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        const fetchFounder = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/auth/founder/${idFounder}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch founder data');
                }
                const data = await response.json();
                setFounder(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        // Call both fetch functions
        fetchStartup();
        fetchFounder();
    }, [idStartup, idFounder, token]);
        

    return (
      <div className="flex flex-col justify-center bg-black min-h-screen px-20">
      <NavBar />
      <main className="px-px pb-20 w-full max-md:max-w-full">
      <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col grow items-end py-6 pr-5 max-md:pl-5 max-md:max-w-full">
      <div className="flex gap-2 self-start ml-10 text-xl text-neutral-400 max-md:ml-2.5">
        <div>
            <Link to="/listStartup" className="cursor-pointer">Our Startups</Link>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c4af313822c4d2ebe8cf42cf89977522625f5d0a038a4293a77d92c748a624e?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 my-auto w-5 aspect-square"
        />
        <div className="font-semibold tracking-wide">{startup.name}</div>
      </div>
      <div className="flex gap-5 justify-between py-1.5 mt-8 ml-20 max-w-full w-[930px] max-md:flex-wrap">
        <div className="flex gap-5 justify-between">
        { startup.image? (
          <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[100px] w-[100px]"
          style={{ backgroundImage: `url(${startup.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                > </div>
            ) : (
           <div className="flex justify-center items-center px-4 py-3.5 rounded-md bg-green-400 bg-opacity-20 h-[100px] w-[100px]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c45bf6f65da39b40642cc8b73f9a711819285d90069cb6e6376798d651b38272?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="aspect-square w-[39px]"
            />
          </div>
          )}
          <div className="flex flex-col whitespace-nowrap">
            <div className="flex gap-1 pr-4 py-2 text-2xl font-semibold tracking-wide text-stone-100">
              <div>{startup.name}</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc7a09571d7d489237a89ec6890870aee5974013125aa7ff1c55b8dd7dbf46e2?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 my-auto w-5 aspect-square"
              />
            </div>
            <div className="flex gap-1 pr-2 mt-2 text-lg">
              <div className="flex gap-1.5 py-1.5 pr-3 pl-2.5 font-semibold tracking-widest rounded-2xl bg-neutral-800 leading-[120%] text-stone-100">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9181465f9f9a6fc256dbec7bab40022c387c26366041165a06a7a1888c6af0e?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
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
          />
        </a>
        <a href={startup.linkedin} target="_blank" rel="noopener noreferrer">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/11f468775b14b62903b205e3f321893c259f5fa95e5c3548ee9783b53efc43ef?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="shrink-0 w-8 aspect-square"
          />
        </a>
        </div>
      </div>
      <div className="flex gap-5 justify-center items-center self-start py-1.5 mt-8 ml-20 text-xl font-medium tracking-wide border-2 border-black border-solid text-neutral-400 max-md:flex-wrap">
        <div className="flex flex-col justify-center self-stretch text-green-400 whitespace-nowrap">
          <div>Summary</div>
          <div className="shrink-0 mt-2.5 h-0.5 bg-green-400 rounded-xl" />
        </div>
        <div className="self-stretch my-auto">Metrics overview</div>
        <div className="self-stretch my-auto">Weekly diary</div>
        {/* <div className="self-stretch my-auto">Location</div> */}
      </div>
      <div className="justify-center p-6 mt-4 max-w-full text-lg tracking-normal rounded-lg bg-neutral-800 text-stone-100 max-w-full w-[930px] max-md:flex-wrap">
      <div className="text-xl text-neutral-400">Description</div>
      <div className="mt-3 text-xl text-stone-100">{startup.desc}</div>
      </div>
      <div className="mt-6 max-w-full w-[930px]">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start self-stretch p-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
              <div className="flex flex-col justify-center items-start p-3 max-w-full rounded-3xl bg-green-400 bg-opacity-20 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f64b204003e962c8fb199ec25c22278fb347bea33eeec8848dd611952edeb229?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="mt-4 text-xl text-neutral-400">Industry</div>
              <div className="mt-4 text-xl tracking-wide text-ellipsis text-stone-100">
              {startup.sector}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-3 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start self-stretch p-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
              <div className="flex flex-col justify-center items-start p-3 max-w-full rounded-3xl bg-green-400 bg-opacity-20 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f7fd005ad292176dcae7f9173df4785b4099dd2f4ed6d3a5dcc4836614b3f37?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="mt-4 text-xl text-neutral-400">Location</div>
              <div className="mt-4 text-xl tracking-wide text-stone-100">
              {startup.location}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-3 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start self-stretch p-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
              <div className="flex flex-col justify-center items-start p-3 max-w-full rounded-3xl bg-green-400 bg-opacity-20 max-md:pr-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/96851c837f7d82e7cd19e1339408cb9ab5eb1b2a44eee520193190f8526b8539?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                  className="w-6 aspect-square"
                />
              </div>
              <div className="mt-4 text-xl text-neutral-400">Valuation</div>
              <div className="mt-4 text-xl tracking-wide text-green-400">
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
        </div>
        <div className="self-start mt-6 text-2xl font-medium tracking-wide text-stone-100 max-md:ml-2.5">
        What We Need
        </div>
        <div className="flex gap-4 p-6 mt-3 text-xl rounded-lg bg-neutral-800 text-stone-100 max-md:flex-wrap max-md:px-5">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/272d36358684cc860b3ec43d1f7636a4779ab490b50050ec1fe304392614d0c3?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 self-start w-8 aspect-square"
            />
            <div className="flex-1 max-md:max-w-full">
                We are looking for {startup.support} from investor. Other than that, we also hope for capital
                investment for operational.
            </div>
        </div>
        <div className="self-start mt-6 text-2xl font-medium tracking-wide text-stone-100 max-md:ml-2.5">
        Pitchdeck
        </div>
        <div className="flex gap-4 self-start p-6 mt-3 text-xl whitespace-nowrap rounded-lg bg-neutral-800 text-stone-100 w-[320px]">
            <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/02aa65c41928011de3ea6fc659b82f410ccebe139bae4182b91e481a9d3d8b7d?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="shrink-0 w-8 aspect-square"
            />
            <a href={startup.pitchdeck} className="flex-1 my-auto" target="_blank" rel="noopener noreferrer">pitchdeck file (.pdf)</a>
            <a href={startup.pitchdeck} target="_blank" rel="noopener noreferrer">
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1eb15dc111ba5947765d8197860e8276c6893a9a90f1a1292453da72c8d608ae?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                className="shrink-0 w-8 aspect-square"
                />
            </a>
        </div>
        <div className="self-start mt-6 text-2xl font-medium tracking-wide text-stone-100 max-md:ml-2.5">
        Founder
        </div>
        <div className="flex flex-col items-start self-start p-6 mt-3 max-w-full rounded-lg bg-neutral-800 w-[410px] max-md:px-5 max-md:ml-2.5">
        <div className="flex gap-4">
          <div className="flex justify-center items-center">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f025720c880cb5b6642f4983eda61c6a62e4be4172b11ed0ea1b160f93d7c4a9?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
              className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[52px] w-[52px]"
            />
          </div>
          <div className="my-auto text-2xl font-medium tracking-wide text-stone-100">
            {founder.name}
          </div>
        </div>
        <div className="flex gap-4 justify-center p-1 mt-4 text-xl tracking-wide whitespace-nowrap text-stone-100">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/833ea78a634f14609cb17fe719b13e2437a8b7aa24f03b6c9802a02da3ee8c95?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="shrink-0 w-6 aspect-square"
          />
          <div>{founder.phoneNumber}</div>
        </div>
        <div className="flex gap-4 justify-center p-1 mt-2 text-xl tracking-wide whitespace-nowrap text-stone-100">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e5baed6a04982585ebd40aac0c6948a56d6794ee7e65a26c8808fe3423e0794?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="shrink-0 w-6 aspect-square"
          />
          <div>{founder.email}</div>
        </div>
        <div className="flex gap-4 p-1 mt-2 text-xl tracking-wide whitespace-nowrap text-stone-100">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3f618a1bc88a9ee0542368f9f240feb38e9dd5174b11d5626ae8a47c7bc8274?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="shrink-0 w-6 aspect-square"
          />
          <div>{founder.linkedin}</div>
        </div>
      </div>

      </div>
      <div className="flex gap-3 self-start mt-6 ml-10 text-base tracking-normal text-stone-100 max-md:ml-2.5" />
    </div>
        <SideContact />
        </aside>
        </main>
      </div>
  );
}

function SideContact() {
    const myCookies = new Cookies();
    // const idFounder = myCookies.get('id');
    const token = myCookies.get('token');
    const [startup, setStartup] = useState("");
    console.log(startup);
    let { idStartup } = useParams();
    const idFounder = startup.founder_id;
    const [founder, setFounder] = useState("");
    // console.log(numberOfStartups); // This will log the total number of objects in your array
    // const sectorsArray = startup.sector ? startups.sector.split(',') : [];

    const copyToClipboard = async (text) => {
        if ('clipboard' in navigator) {
          try {
            await navigator.clipboard.writeText(text);
            alert('Copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            alert('Copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
          document.body.removeChild(textarea);
        }
      };
    


    useEffect(() => {
        const fetchStartup = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/auth/startup/${idStartup}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch startup data');
                }
                const data = await response.json();
                setStartup(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        const fetchFounder = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/auth/founder/${idFounder}/`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch founder data');
                }
                const data = await response.json();
                setFounder(data);
            } catch (error) {
                console.log("Error:", error);
            }
        };

        // Call both fetch functions
        fetchStartup();
        fetchFounder();
    }, [idStartup, idFounder, token]);
  
  
    return (
    <div className="flex flex-col items-start py-6 pr-20 pl-3 max-md:pr-5 max-md:max-w-full">
      <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 w-[340px] rounded-[30px] text-stone-300">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cb446593643fc5888a09f9076f1b9a6893981e0397365468e85765b7a309812?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-5 aspect-square"
        />
        <div>Search in Startup Details</div>
      </div>
      <div className="flex flex-col p-7 mt-6 max-w-full rounded-lg bg-neutral-800 w-[340px] max-md:px-5">
      <div className="flex gap-1 pr-8 text-2xl font-medium tracking-wide whitespace-nowrap text-stone-100 max-md:pr-5">
        <div>{startup.name}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdce3eac0afa794662f1b9c1b0251811ace603733041f5abcaa4dc295e12964b?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 my-auto w-5 aspect-square"
        />
      </div>
      <div className="flex gap-4 mt-4">
        <div className="flex justify-center items-center px-3 py-2.5 rounded bg-green-400 bg-opacity-20 h-[80px] w-[80px]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bde4078a7f9fc47f5c92b5909bd96e41ab90205c57e74fd88b896198d3dbc60?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="aspect-square w-[30px]"
          />
        </div>
        <div className="my-auto text-base font-medium tracking-wide text-ellipsis text-neutral-400">
          <span className="text-2xl leading-7 text-stone-100">127</span>{" "}
          followers
        </div>
      </div>
      <div className="flex justify-center items-center p-3 mt-4 text-xl font-semibold tracking-widest text-black whitespace-nowrap bg-green-400 rounded-3xl">
        FOLLOW
    </div>
    </div>
      <div className="flex gap-2 justify-center mt-6 text-xl text-stone-100 w-[340px]">
        <div className="flex-1">Contact 
        <span className="text-xl font-semibold"> {startup.name}</span></div>
        <div className="flex-1 shrink-0 my-auto h-px border border-solid bg-neutral-400 border-neutral-400" />
      </div>
      <div className="flex gap-4 p-4 mt-6 text-xl font-medium tracking-wide whitespace-nowrap rounded-lg bg-neutral-800 text-stone-100 w-[340px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1395c447d349c52211298177bdfc474d8036628e1c8b9d4d8650f731b9465d3?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="flex-1">{founder.phoneNumber}</div>
        <button
        onClick={() => copyToClipboard(founder.email)}
        title="Copy Email"  // Providing a title for accessibility and usability
        >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ffae47cb816d5ac5b57e512113910e3a80652aebbaabf17304aa8d64e019d5d?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        </button>
      </div>
      <div className="flex gap-4 p-4 mt-4 text-xl font-medium tracking-wide whitespace-nowrap rounded-lg bg-neutral-800 text-stone-100 w-[340px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/daf72df48e17d81b24803c12cb158348c64ab6ee45505db07c4fc1e23121f601?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="flex-1">{founder.email}</div>
        <button
        onClick={() => copyToClipboard(founder.email)}
        title="Copy Email"  // Providing a title for accessibility and usability
        >
            <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
            className="shrink-0 w-6 h-6"  // Ensure your image fits well in the button
            alt="Copy Icon"  // Important for accessibility
            />
        </button>
      </div>
      {/* <div className="flex gap-4 p-4 mt-4 text-xl font-medium tracking-wide whitespace-nowrap rounded-lg bg-neutral-800 text-stone-100 w-[330px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2206c8e1be7362398f13508a66d6a1790b00e28d7cc2f93fdc2e58f7b81152cc?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
        <div className="flex-1">{founder.linkedin}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
          className="shrink-0 w-6 aspect-square"
        />
      </div> */}
    </div>
      
    );
  }

export default StartupDetails;

