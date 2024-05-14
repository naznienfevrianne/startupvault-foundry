import * as React from "react";
import Chart from "chart.js/auto";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import SideBar from "../component/SideFounder";

function FounderDashboard(props) {
  
  const [entry, setEntry] = React.useState("");
  const [listEntry, setListEntry] = React.useState([]);
  const [selectedChart, setSelectedChart] = React.useState('sales'); // sales is default
  const [startupData, setStartupData] = React.useState({});
  const [totalFollowers, setTotalFollowers] = React.useState("");
  const myCookies = new Cookies();

  const idFounder = myCookies.get('id')
  const nameFounder = myCookies.get('name')
  const profilePicture = myCookies.get('image')
  const idStartup = myCookies.get('startup')
  const token = myCookies.get('token')
  

  React.useEffect(() => {
    fetchDataMetrics();
    fetchDataAnalytics();
    fetchStartupData();
  }, []);

 
  React.useEffect(() => {
    if (listEntry.length > 0) {

      let chartData = [];
      let chartLabel = '';
  
      switch (selectedChart) {
        case 'sales':
          chartData = listEntry.map(entry => entry.sales);
          chartLabel = 'Sales';
          break;
        case 'revenue':
          chartData = listEntry.map(entry => entry.revenue);
          chartLabel = 'Revenue';
          break;
        case 'user':
          chartData = listEntry.map(entry => entry.user);
          chartLabel = 'User';
          break;
        default:
          break;
      }

      const dates = listEntry.map(entry => entry.date);
  
      const chartConfig = {
        labels: dates,
        datasets: [{
          label: chartLabel,
          data: chartData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }],  
      };
  
      const canvas = document.getElementById("lineChart");
      const ctx = canvas.getContext("2d");
  
      if (canvas.chart) {
        canvas.chart.destroy(); 
      }
  
      canvas.chart = new Chart(ctx, {
        type: 'line',
        data: chartConfig,
        options: {
          scales: {
            x: {
              display: false, 
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } 
  }, [listEntry, selectedChart]);

  const fetchStartupData = async () => {
    try {
      const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error("Failed to fetch startup data");
      } else{
        const followersResponse = await fetch(`https://startupvault-foundry.vercel.app/diary/total_followers/${idStartup}/`, {
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          });
          const follsData = await followersResponse.json();
          if (followersResponse.ok) {
            setTotalFollowers(follsData.total_followers);
          } else {
            console.error('Error fetching total followers:', follsData.message);
          }
      }

      const data = await response.json();
      setStartupData(data);

      
  } catch (error) {
      console.error('Error fetching startup data:', error);
  }
  }

  const fetchDataMetrics = async () => {
    try {
      const responseMetrics = await fetch("https://startupvault-foundry.vercel.app/diary/" + idFounder + "/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!responseMetrics.ok) {
        throw new Error("Failed to fetch data");
      }
      const entryMetrics = await responseMetrics.json();
      setEntry(entryMetrics);
      console.log(entry)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataAnalytics = async () => {
    try {
      const responseAnalytics = await fetch("https://startupvault-foundry.vercel.app/diary/diaryEntries/founder/" + idFounder + "/?sort=date", {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!responseAnalytics.ok) {
        throw new Error("Failed to fetch data");
      }
      const entryAnalytics = await responseAnalytics.json();
      const first8Entries = entryAnalytics.slice(0, 8);
     
      setListEntry(first8Entries);
      console.log(listEntry)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 

  const handleChartButtonClick = (chartType) => {
    setSelectedChart(chartType);
  };

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


  const fetchDataFounder = async () => {
    try {
        const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`,{
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
        setStartupData(entry);
    } catch (error) {
        console.log("Error:", error);
    }
};

  return (
    <div className="flex flex-col justify-center bg-black min-h-screen px-20 overflow-auto">
    <NavBar status={"dashboard"}/>
      <div className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <div className="max-md:mt-10 max-md:max-w-full">
              <div className="flex max-md:flex-col max-md:gap-0">
                {/* <div className="flex flex-col w-[25%] max-md:ml-0 max-md:w-full pl-0"> */}
                <SideBar status={"overview"}/>
                {/* </div> */}
                <div className="flex flex-col ml-6 w-[67%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center pt-6 max-md:max-w-full">
                    <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                      <div className="text-stone-100 text-2xl font-semibold tracking-tight text-wrap">
                        Metrics Overview
                      </div>
                      <div className="flex-auto text-right text-base tracking-normal text-neutral-400">
                        {entry.date ? `Last updated ${entry.date}` : 'No entry this week'}
                      </div>
                    </div>
                    <div className="mt-6 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                        <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow self-stretch py-6 pr-14 pl-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
                            <div className="flex flex-col bg-green w-10 h-10 rounded-full bg-green-400 bg-opacity-20 justify-center items-center">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0c79b536b24cf63fb0a0c726e9ebc73a79254f4a31be87e2067f6620b6adbceb?"
                                className="w-6 aspect-square"
                              />
                            </div>
                            <div className="mt-4 text-l text-neutral-400">
                              Sales
                            </div>
                            <div className="mt-4 text-l font-medium tracking-wide whitespace-nowrap text-stone-100">
                              {entry.sales ? entry.sales.toLocaleString('id-ID') : '-'} unit(s)
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-1 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow self-stretch px-6 py-7 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
                            <div className="flex flex-col bg-green w-10 h-10 rounded-full bg-green-400 bg-opacity-20 justify-center items-center">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e5be6e4332bd1cbe13b731850cb50438dce43bb09882cdfbca08a8e688ac628?"
                                className="w-6 aspect-square"
                              />
                            </div>
                            <div className="mt-4 text-l text-neutral-400">
                              Revenue
                            </div>
                            <div className="mt-4 text-l font-medium tracking-wide text-stone-100">
                              IDR {entry.revenue ? entry.revenue.toLocaleString('id-ID') : '-'}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-1 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow self-stretch py-7 pr-16 pl-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
                            <div className="flex flex-col bg-green w-10 h-10 rounded-full bg-green-400 bg-opacity-20 justify-center items-center">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b43982b4ac927ef3fdc24af1bf25f4c1004ea4e3a456f7c5a94bd5587318cf3f?"
                                className="w-6 aspect-square"
                              />
                            </div>
                            <div className="mt-3 text-l text-neutral-400">
                              User
                            </div>
                            <div className="mt-4 text-l font-medium tracking-wide whitespace-nowrap text-stone-100">
                              {entry.user ? entry.user.toLocaleString('id-ID') : '-'} user(s)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 justify-between mt-10 w-full whitespace-nowrap text-stone-100 max-md:flex-wrap max-md:max-w-full">
                      <div className="text-stone-100 text-2xl font-semibold tracking-tight text-wrap">
                        Analytics
                      </div>
                      <div className="flex gap-3 text-base tracking-normal">
                      <button
                        onClick={() => handleChartButtonClick('sales')}
                        className={`grow justify-center px-4 py-2 ${selectedChart === 'sales' ? 'bg-green-400 bg-opacity-20 text-green-400 border border-green-400 border-solid rounded-3xl' : 'border border-solid border-neutral-400 rounded-3xl'}`}>
                        Sales
                      </button>
                      <button
                        onClick={() => handleChartButtonClick('revenue')}
                        className={`grow justify-center px-4 py-2 ${selectedChart === 'revenue' ? 'bg-green-400 bg-opacity-20 text-green-400 border border-green-400 border-solid rounded-3xl' : 'border border-solid border-neutral-400 rounded-3xl'}`}>
                        Revenue
                      </button>
                      <button
                        onClick={() => handleChartButtonClick('user')}
                        className={`grow justify-center px-4 py-2 ${selectedChart === 'user' ? 'bg-green-400 bg-opacity-20 text-green-400 border border-green-400 border-solid rounded-3xl' : 'border border-solid border-neutral-400 rounded-3xl'}`}>
                        User
                      </button>
                      </div>
                    </div>
                    <div>
                      {listEntry.length == 0 ? (
                        <div style={{ color: 'white', opacity: '0.5', fontSize: '14px', marginTop: '8px' }}>No entries available</div>
                      ) : (
                        <canvas id="lineChart" width="400" height="200"></canvas>
                      )}
                    </div>
                    <div style={{ color: 'white', opacity: '0.6', fontSize: '14px', textAlign: 'right', marginTop: '8px' }} className="not-italic">{listEntry.length > 0 ? "Last updated: " + listEntry[listEntry.length - 1].date : ''}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-8 w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-6 mx-auto mt-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-10">
              <div className="flex gap-5 justify-between w-full break-words">
                <div className="flex-auto text-xl font-medium tracking-wide text-white">
                  My Startup
                </div>
                <div className="flex gap-1 justify-center my-auto text-sm tracking-normal whitespace-nowrap text-neutral-400">
                  <div className="grow">
                    <Link to="/startupEditForm">Edit details</Link>
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff531139fba3701d653303021c8a4f2f727855541856b2bf3f58981c305dcd5f?"
                    className="shrink-0 self-start w-4 aspect-square"
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center rounded-xl bg-opacity-20 mt-6">
                  <img
                    loading="lazy"
                    srcSet={startupData.image}
                    className="flex flex-col justify-center items-start mt-3.5 max-w-full rounded-xl w-[120px] h-[120px] max-md:px-5 bg-green-700"
                  />
                </div>
                <div className="flex gap-5 justify-between mt-4 mr-3">
                <div className="flex gap-2 self-start pr-2 text-2xl font-semibold tracking-wider leading-10 text-white">
                  <div className="grow" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',  // Ensures the text stays in a single line
                    maxWidth: '80%',      // Use maxWidth to allow the container to grow and shrink dynamically
                  }}>
                    {startupData.name}
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6417a1a8e6e4f317123380fe8fed9093f6b5dd538926f00e91d377d6f03966c5?"
                    className="shrink-0 my-auto w-8 aspect-square"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-center mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/97b5e927b15b2192eff00b24a9a685bcad2e5754dcdd9a0e35510d22663829cf?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">Followers</div>
              </div>
              <div className="mt-2 text-l font-medium tracking-wide text-white">
                {totalFollowers} Followers
              </div>
              <div className="flex gap-2 justify-center mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4263cd58fed17a65ad368432c73d30f163497d15e331bdd1d6e05c2a90401749?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">Location</div>
              </div>
              <div className="mt-2 text-l font-medium tracking-wide text-white">
                {startupData.location}
              </div>
              <div className="flex gap-2 justify-center mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7f0b7e030c7f881e404bf529ed1a4cfb4f8bdc0098eda15b85f926a0ea48cac?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">Sector</div>
              </div>
              <div className="mt-2 text-l font-medium tracking-wide text-white">
                {startupData.sector}
              </div>
              <div className="flex gap-2 justify-center mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/52141d7798bf792b06a76e0e1a7f77deec220905b0a849c5f87321776223fc28?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">Website</div>
              </div>
              <div className="flex gap-3 justify-center px-5 py-2 mt-2 text-l font-medium tracking-wide text-white whitespace-nowrap rounded-lg bg-neutral-700 max-md:px-5">
                <div className="flex-1">{startupData.website}</div>
                <button
                onClick={() => copyToClipboard(startupData.website)}
                title="Copy phoneNumber"  // Providing a title for accessibility and usability
                >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0224ac84b32ad76b568287a3ea7b9360aa3be50f2415ddeaa0468b0b120b93b0?"
                  className="shrink-0 w-6 aspect-square"
                />
                </button>
              </div>
              <div className="flex gap-2 justify-center self-start mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2206c8e1be7362398f13508a66d6a1790b00e28d7cc2f93fdc2e58f7b81152cc?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">LinkedIn</div>
              </div>
              <div className="flex gap-3 justify-center px-5 py-2 mt-2 text-l font-medium tracking-wide text-white whitespace-nowrap rounded-lg bg-neutral-700 max-md:px-5">
                <div className="flex-1">{startupData.linkedin}</div>
                <button
                onClick={() => copyToClipboard(startupData.linkedin)}
                title="Copy phoneNumber"  // Providing a title for accessibility and usability
                >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0224ac84b32ad76b568287a3ea7b9360aa3be50f2415ddeaa0468b0b120b93b0?"
                  className="shrink-0 w-6 aspect-square"
                />
                </button>
              </div>
              <div className="flex gap-2.5 justify-center px-16 py-3 mt-6 text-l font-semibold tracking-widest text-black whitespace-nowrap rounded-lg bg-stone-100 max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/00ef0af1e644c1bb102e817c9deeb66348c69aded2f176f8e4bf89a60f937ff5?"
                  className="shrink-0 w-8 aspect-square"
                />
                <a href="/startupReadForm" className="grow my-auto">View public profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FounderDashboard;


