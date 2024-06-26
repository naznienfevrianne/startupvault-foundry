import React, { useState, useEffect, useRef } from 'react';
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from '../component/NavBar';
import SideBarContact from '../component/SideBarContact';
import { useParams } from 'react-router-dom';
import { Chart } from 'chart.js';
import { format } from 'date-fns';
import Datepicker from "react-tailwindcss-datepicker";


const StartupDetails = () => {


  const cookies = new Cookies();
  const token = cookies.get('token');
  const investorId = cookies.get('id');
  const { idStartup } = useParams();
  const [startup, setStartup] = useState("");
  const [founder, setFounder] = useState("");
  const [entry, setEntry] = useState("");
  const [listEntry, setListEntry] = useState([]);

  const [selectedChart, setSelectedChart] = useState("sales");
  const [activeTab, setActiveTab] = useState('summary');
  const [listEntries, setListEntries] = useState([]);
  const [descending, setDescending] = useState(true);





  useEffect(() => {
    if (activeTab === 'diary') {
      fetchWeeklyEntries(startup.founder_id);
    } else if (activeTab === 'metrics') {
      handleChartButtonClick(selectedChart);
    }
  }, [activeTab, startup.founder_id]);

  
  useEffect(() => {
      const fetchStartup = async () => {
          try {
              const response = await fetch(`https://startupvault-foundry.vercel.app/auth/startup/${idStartup}/`, {
                  method: "GET",
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
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

      fetchStartup();
  }, [idStartup, token]);

  useEffect(() => {
      if (startup && startup.founder_id) {
          const fetchFounder = async () => {
              try {
                  const response = await fetch(`https://startupvault-foundry.vercel.app/auth/founder/${startup.founder_id}/`, {
                      method: "GET",
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
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
          
          fetchFounder();
          fetchDataMetrics(startup.founder_id);
          fetchDataAnalytics(startup.founder_id);
      }
  }, [startup, token]);

  const fetchDataMetrics = async (founderId) => {
      try {
          const response = await fetch(`https://startupvault-foundry.vercel.app/diary/${founderId}/`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });
          if (!response.ok) {
              throw new Error("Failed to fetch data");
          }
          const entryMetrics = await response.json();
          setEntry(entryMetrics);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  const fetchDataAnalytics = async (founderId) => {
      if (!founderId) return; // Ensure founderId is available

      try {
          const response = await fetch(`https://startupvault-foundry.vercel.app/diary/diaryEntriesRead/founder/${founderId}?sort=date`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              }
          });
          if (!response.ok) {
              throw new Error("Failed to fetch data");
          }
          const entryAnalytics = await response.json();
          setListEntry(entryAnalytics.slice(0, 8));
          console.log(listEntry);

      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  

useEffect(() => {
  if (listEntry.length > 0 && activeTab === 'metrics') {
      const canvas = document.getElementById('lineChart');
      console.log('Canvas:', canvas);

      if (canvas) {
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
      } else {
          console.error('Canvas not found');
      }
  }
}, [listEntry, selectedChart]);

    const handleChartButtonClick = (chartType) => {
      setSelectedChart(chartType);
      // setShowCanvas(true);  
    };


  const handleWeeklyChange = newValue => {
    setValue(newValue, () => {
      fetchWeeklyEntries();
    });
  }



  function getMonday(date){
    let today = new Date(date)
    
    // set to "Sunday" for the previous week
    today.setDate(today.getDate() - (today.getDay() || 7)) // if getDay is 0 (Sunday), take 7 days
    return new Date(today.setDate(today.getDate() + 1))
  }

  function getSunday(date){
    let today = new Date(date)
    
    // set to "Sunday" for the previous week
    today.setDate(today.getDate() - (today.getDay() || 7)) // if getDay is 0 (Sunday), take 7 days

    return new Date(today.setDate(today.getDate() + 7))
  }

  const [value, setValue] = useState({ 
    startDate: "", 
    endDate: ""
  });

  const [sort, setSort] = useState("-date");


  const fetchWeeklyEntries = async () => {

    let endpoint = `https://startupvault-foundry.vercel.app/diary/diaryEntries/investor/${investorId}?sort=${sort}&startup_name=${startup.name}`;

    if (value.startDate && value.endDate) {
        endpoint += `&startDate=${value.startDate}&endDate=${value.endDate}`;
    }
    

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const entry = await response.json();
      setListEntries(entry);
      console.log(listEntries);
      // setTotalPages(totalPages);

    } catch (error) {
      console.error("Error:", error);
        }
    };

    const handleSort = () => {
      setSort(prevSort => (prevSort === "-date" ? "date" : "-date"), fetchWeeklyEntries);
    };


    useEffect(() => {
      fetchWeeklyEntries();
    }, [sort, value]);


    const handleTabClick = (tabName) => {
      setActiveTab(tabName);
    };

    const TabContent = () => {
      switch (activeTab) {
          case 'summary':
            return <SummaryTab startup={startup} founder={founder} />;
          case 'metrics':
              return <MetricsTab />;
          case 'diary':
              return <DiaryTab />;
          default:
              return <SummaryTab startup={startup} founder={founder} />;
      }

  };

    const SummaryTab = () => {
      return (
        <>
        <div className="mb-2 mt-12 text-3xl max-w-full w-[930px] font-semibold tracking-wide text-stone-100 max-md:max-w-full">
            About
            </div>
          <div className="justify-center p-6 mt-4 text-lg tracking-normal rounded-lg bg-neutral-800 text-stone-100 max-w-full w-[930px] max-md:flex-wrap">
          <div className="text-xl text-neutral-400">Description</div>
          <div className="mt-3 text-xl text-stone-100 whitespace-pre-line break-all">{startup.desc}</div>
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
                  <div className="mt-4 text-xl text-neutral-400">Ticket size</div>
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
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c785140e93ef7df38c896c220a92fe3ee37b702cce118ddcfe7a5eba277bdf6a?apiKey=9ff2a73e8144478896bce8206c80f3e2&"
                    className="shrink-0 w-8 aspect-square"
                    />
                </a>
            </div>
            <div className="self-start mt-6 text-2xl font-medium tracking-wide text-stone-100 max-md:ml-2.5">
            Founder
            </div>
            <div className="flex flex-col items-start self-start p-6 mt-3 max-w-full rounded-lg bg-neutral-800 w-[500px] max-md:px-5 max-md:ml-2.5">
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
        </>
      );
    };

    const MetricsTab = () => {
        return (
          <>
          <div className="mt-2 max-w-full w-[930px] h-[400px]">
            <div className="mb-2 mt-10 text-3xl font-semibold tracking-wide text-stone-100 max-md:max-w-full">
            Metrics Overview
            </div>
            <div className="flex gap-5 justify-between mt-5 w-full whitespace-nowrap text-stone-100 max-md:flex-wrap max-md:max-w-full h-[42px]">
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
                <div style={{ color: 'white', opacity: '0.5', fontSize: '14px', marginTop: '70px' }}>No entries available</div>
              ) : (
                <canvas id="lineChart" width="200" height="60"></canvas>
              )}
            </div>
            <div style={{ color: 'white', opacity: '0.6', fontSize: '14px', textAlign: 'right', marginTop: '8px' }} className="not-italic">{listEntry.length > 0 ? "Last updated: " + listEntry[listEntry.length - 1].date : ''}</div>
            
          </div>
        </>
        );
    };

    const DiaryTab = () => {
        return (
          <>
          <div className="mt-2 max-w-full w-[930px]" style={{ minHeight: '400px' }}>
            
          <div className="flex flex-col w-[65%]">
									<div className="flex flex-col pt-6">
									<div className="justify-between items-center inline-flex w-[900px]">
											<div className="text-stone-100 text-3xl font-semibold tracking-tight text-wrap w-[300px]">Weekly Entry</div>
											<div className="justify-start items-center gap-3 flex">
                      <button onClick={handleSort} className="pl-4 pr-5 py-2 rounded-[25px] border text-stone-100 border-neutral-400 justify-center items-center gap-1 inline-flex w-[140px]">
													{sort === "-date" ? (
														<>
															<img
															loading="lazy"
															src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e3ec73880ece29d00f20e4db0e4b5475499af7b473b69d767d47b11119c4c98?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
															className="self-center w-8 aspect-square"
															/>
															<div>Oldest</div>
														</>
													) : (
														<>
															<img
															loading="lazy"
															src="https://cdn.builder.io/api/v1/image/assets/TEMP/f17953187a4d2276470cd675c51584dad8f4c8e4316cd91c37a457aba3eac469?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
															className="self-center w-8 aspect-square"
															/>
															<div>Latest</div>
														</>
													)}
												</button>
												<Datepicker
													inputClassName="w-full pl-10 pr-3 py-2 placeholder-stone-100 rounded-[25px] focus:outline-none border font-normal text-stone-100 border-neutral-400 bg-black" 
													value={value} 
													onChange={handleWeeklyChange}
													useRange={false}
													readOnly={true}  
													primaryColor={"emerald"}
													placeholder="Date" 
													toggleClassName="absolute left-0 h-full px-3 text-neutral-400 focus:outline-none" 

												/> 
											</div>
									</div>
                  <div className="my-auto mt-3 text-xl text-neutral-400">
                      {listEntries.length} entries found
                  </div>
									{/* card */}
									{listEntries.map((item, index) => (
										<li key={index}>
											<div className="p-6 bg-neutral-800 rounded-lg flex-col justify-center items-start gap-6 flex mt-5 w-[900px]">
												<div className="justify-start items-center gap-[16.98px] inline-flex">
														<div className="justify-start items-start gap-4 flex">
																<img
																				loading="lazy"
																				src={item.startup_image}
																				className="object-cover w-[55px] h-[55px] rounded-full border-dashed self-center"
																/>
																<div className="font-semibold whitespace-nowrap text-stone-100">
																	<div className="flex gap-1 text-xl items-center">
																		<Link to={`/startupDetails/${item.startup_id}`}><div className="hover:text-green-400">{item.startup}</div></Link>
																		<img
																			loading="lazy"
																			src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cd0618b56d923d8e9393e8312d89bc42be642f17db4d5994a14565779c2265e?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
																			className="shrink-0 aspect-square w-[18px] self-center"
																		/>
																	</div>
																	<div className=" justify-center inline-flex gap-1.5 pt-0.5 pb-1 pr-2.5 pl-2 mt-2 text-base rounded-2xl bg-neutral-700">
																		<img
																			loading="lazy"
																			src="https://cdn.builder.io/api/v1/image/assets/TEMP/9254c7dc72155b0caec172b38820d32a17a1ff2eb1cf09d72b8ebe5abdfc1ebb?apiKey=c7ebd85b29da4b398aac6462eda13ba9&"
																			className="shrink-0 aspect-square w-[15px] self-center"
																		/>
																		<div>{item.startup_type}</div>
																	</div>
																</div>
														</div>
												</div>
												<div className="flex self-stretch flex-col px-6 pb-6 pt-4 rounded-lg border-neutral-700 border bg-neutral-800 max-md:px-5 max-md:max-w-full">
													<div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full items-center">
															<div className="text-2xl font-medium tracking-wide text-neutral-400">
																{format(getMonday(item.date), 'd MMM yyyy')} - {format(getSunday(item.date), 'd MMM yyyy')}
															</div>
															<div className="justify-center self-start px-4 py-2 text-md tracking-normal rounded-lg bg-neutral-700 text-stone-100">
																{format(new Date(item.date), 'd MMMM yyyy')}
															</div>
													</div>
													<div className="shrink-0 mt-3 h-px bg-neutral-400 max-md:max-w-full" />
													<div className="justify-center max-md:px-5 max-md:max-w-full flex flex-col">
															<div className="flex max-md:flex-col max-md:gap-0">
															<div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
																	<div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-3">
																	<div className="flex gap-3 justify-between py-1">
																			<div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
																			<img
																					loading="lazy"
																					src="https://cdn.builder.io/api/v1/image/assets/TEMP/caa64bea637c6e0743f04ffbd7595c0fca032edb636e138e18c6ab2c45155fbe?"
																					className="w-full aspect-square"
																			/>
																			</div>
																			<div className="flex-auto my-auto font-semibold tracking-wide text-stone-100">
																			Sales
																			</div>
																	</div>
																	<div className="mt-7 text-base tracking-wide text-neutral-400">
																			{item.sales.toLocaleString('id-ID')} unit(s)
																	</div>
																	</div>
															</div>
															<div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
																	<div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-3">
																	<div className="flex gap-3 justify-between py-1">
																			<div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
																			<img
																					loading="lazy"
																					src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aebee5a48a90008dee58f7d64c18eee2794f3b8327dd132e82cf294f8ccc005?"
																					className="w-full aspect-square"
																			/>
																			</div>
																			<div className="flex-auto my-auto font-semibold tracking-wide text-stone-100">
																			Revenue
																			</div>
																	</div>
																	<div className="mt-7 text-base tracking-wide text-neutral-400">
																			IDR {item.revenue.toLocaleString('id-ID')}
																	</div>
																	</div>
															</div>
															<div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
																	<div className="flex flex-col py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-3">
																	<div className="flex gap-3 justify-between py-1 items-center">
																			<div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
																			<img
																					loading="lazy"
																					src="https://cdn.builder.io/api/v1/image/assets/TEMP/34323bc9996a3a8fedad074382f594477b98f86d0876cacd03790ce7711815c2?"
																					className="w-full aspect-square"
																			/>
																			</div>
																			<div className="flex-auto font-semibold tracking-wide text-nowrap text-stone-100">
																				User Engagement
																			</div>
																	</div>
																	<div className="mt-7 text-base tracking-wide whitespace-nowrap text-neutral-400">
																			{item.user.toLocaleString('id-ID')} user(s)
																	</div>
																	</div>
															</div>
														</div>
													</div>
													<div className="mt-3 font-semibold tracking-wide text-stone-100 max-md:max-w-full">
															Lesson Learned
													</div>
													<div className="mt-4 text-base tracking-wide text-neutral-400 max-md:max-w-full break-words text-wrap whitespace-pre-line">
															{item.lessonLearned}
													</div>
												</div>
											</div>                        
										</li>
									))}
									</div>
								</div>
          </div>
        </>
        );
    };
        

    return (
      <div className="flex flex-col justify-center bg-black min-h-screen px-20 overflow-auto">
      <NavBar status={"startups"}/>
      <main className="px-px pb-20 w-full max-md:max-w-full">
      <aside className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col grow items-end py-6 pr-5 max-md:pl-5 max-md:max-w-full">
      <div className="flex gap-2 self-start ml-10 text-xl text-neutral-400 max-md:ml-2.5">
        <div>
            <Link to="/startupList" className="cursor-pointer">Our Startups</Link>
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
      
      {/* opsi tab */}
      <div className="flex gap-5 justify-center items-center self-start py-1.5 mt-8 ml-20 text-xl font-medium tracking-wide border-2 border-black border-solid text-neutral-400 max-md:flex-wrap">
          {/* Updated tab divs */}
          <div className={`flex flex-col justify-center self-stretch whitespace-nowrap ${activeTab === 'summary' ? 'text-green-400' : ''}`} onClick={() => handleTabClick('summary')}>
              <div>Summary</div>
              {activeTab === 'summary' && (
                  <div className="shrink-0 mt-2.5 h-0.5 bg-green-400 rounded-xl" />
              )}
          </div>
          <div className={`self-stretch my-auto ${activeTab === 'metrics' ? 'text-green-400' : ''}`} onClick={() => handleTabClick('metrics')}>
              Metrics Overview
              {activeTab === 'metrics' && (
                  <div className="shrink-0 mt-2.5 h-0.5 bg-green-400 rounded-xl" />
              )}
          </div>
          <div className={`self-stretch my-auto ${activeTab === 'diary' ? 'text-green-400' : ''}`} onClick={() => handleTabClick('diary')}>
              Weekly Diary
              {activeTab === 'diary' && (
                  <div className="shrink-0 mt-2.5 h-0.5 bg-green-400 rounded-xl" />
              )}
          </div>
      </div>
      <TabContent />
      <div className="flex gap-3 self-start mt-6 ml-10 text-base tracking-normal text-stone-100 max-md:ml-2.5" />
    </div>
    
        <SideBarContact />
        </aside>
        </main>
      </div>
  );
  
}

export default StartupDetails;

