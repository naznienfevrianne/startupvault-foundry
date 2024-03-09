import * as React from "react";
import Chart from "chart.js/auto";
import{ Cookies } from 'react-cookie';


function FounderDashboard(props) {
  
  const [entry, setEntry] = React.useState("");
  const [listEntry, setListEntry] = React.useState([]);
  const [selectedChart, setSelectedChart] = React.useState('sales'); // sales is default

  const myCookies = new Cookies();

  const idFounder = myCookies.get('id')
  const nameFounder = myCookies.get('name')

  React.useEffect(() => {
    fetchDataMetrics();
    fetchDataAnalytics();
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

  const fetchDataMetrics = async () => {
    try {
      const responseMetrics = await fetch("http://localhost:8000/diary/" + idFounder + "/");
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
      const responseAnalytics = await fetch("http://localhost:8000/diary/diaryEntries/founder/" + idFounder + "?sort=date");
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

  return (
    <div className="flex flex-col justify-center bg-black">
      <div className="flex gap-5 justify-between py-6 pr-10 pl-20 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between text-white max-md:flex-wrap max-md:max-w-full">
          <div className="flex-auto text-4xl italic font-semibold tracking-wider leading-10">
            startupvault.id
          </div>
          <div className="flex gap-5 justify-between px-5 py-3 text-xl font-light max-md:flex-wrap max-md:px-5">
            <div className="grow">Showcase</div>
            <div>Events</div>
            <div className="flex-auto">Our Investors</div>
            <div className="grow whitespace-nowrap text-stone-100">
              Our Startups
            </div>
          </div>
        </div>
        <div className="flex gap-2 rounded-[30px]">
          <div className="grow justify-center px-5 py-3 text-xl font-light text-green-400 whitespace-nowrap rounded-3xl bg-green-400 bg-opacity-20">
            My Dashboard
          </div>
          <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
            <div className="flex justify-center items-center self-stretch basis-0">
              <img
                loading="lazy"
                srcSet="..."
                className="rounded-full aspect-square bg-green-400 bg-opacity-20 h-[30px] w-[30px]"
              />
            </div>
            <div className="self-stretch my-auto text-xl font-medium tracking-wide text-stone-100">
              {nameFounder}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d480841e901ee690cdb968358a4fdd7ed1a2243aef55995816a8978e3a48610?"
              className="shrink-0 self-stretch my-auto aspect-square w-[18px]"
            />
          </div>
        </div>
      </div>
      <div className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[74%] max-md:ml-0 max-md:w-full">
            <div className="max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[25%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col items-center self-stretch pb-2 mt-6 text-xl tracking-wide text-neutral-400">
                    <div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="flex-auto">Search in dashboard</div>
                    </div>
                    <div className="flex gap-5 justify-between self-stretch pr-10 mt-8 font-medium text-green-400 whitespace-nowrap max-md:pr-5">
                      <div className="shrink-0 w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                      <div className="flex gap-2 px-4 py-2 rounded-lg bg-green-400 bg-opacity-20">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1487560442a58b51dcbec994221baf3cf665d63416908100ec5efda2c599f05?"
                          className="shrink-0 w-8 aspect-square"
                        />
                        <div className="flex-auto my-auto">Overview</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-10 whitespace-nowrap">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3cef65a25dfa47f096a12f653a5687356c49974a2b901252287cba6ffe7f302d?"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="grow my-auto">Weekly Updates</div>
                    </div>
                    <div className="flex gap-2 mt-12 whitespace-nowrap max-md:mt-10">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="grow my-auto">Startup Details</div>
                    </div>
                    <div className="flex gap-2 mt-12 whitespace-nowrap max-md:mt-10">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?"
                        className="shrink-0 w-8 aspect-square"
                      />
                      <div className="grow my-auto">Founder Details</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow justify-center pt-6 max-md:max-w-full">
                    <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                      <div className="flex-auto text-2xl font-semibold tracking-wide text-stone-100">
                        Metrics Overview
                      </div>
                      <div className="flex-auto text-right text-base tracking-normal text-neutral-400">
                        {entry.date ? `Last updated ${entry.date}` : 'No new entry this week'}
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
                            <div className="mt-4 text-xl text-neutral-400">
                              Sales
                            </div>
                            <div className="mt-4 text-xl font-medium tracking-wide whitespace-nowrap text-stone-100">
                              {entry.sales ? entry.sales.toLocaleString('id-ID') : '-'} unit(s)
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow self-stretch px-6 py-7 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
                            <div className="flex flex-col bg-green w-10 h-10 rounded-full bg-green-400 bg-opacity-20 justify-center items-center">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3e5be6e4332bd1cbe13b731850cb50438dce43bb09882cdfbca08a8e688ac628?"
                                className="w-6 aspect-square"
                              />
                            </div>
                            <div className="mt-4 text-xl text-neutral-400">
                              Revenue
                            </div>
                            <div className="mt-4 text-xl font-medium tracking-wide text-stone-100">
                              IDR {entry.revenue ? entry.revenue.toLocaleString('id-ID') : '-'}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow self-stretch py-7 pr-16 pl-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-6">
                            <div className="flex flex-col bg-green w-10 h-10 rounded-full bg-green-400 bg-opacity-20 justify-center items-center">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b43982b4ac927ef3fdc24af1bf25f4c1004ea4e3a456f7c5a94bd5587318cf3f?"
                                className="w-6 aspect-square"
                              />
                            </div>
                            <div className="mt-3 text-xl text-neutral-400">
                              User
                            </div>
                            <div className="mt-4 text-xl font-medium tracking-wide whitespace-nowrap text-stone-100">
                              {entry.user ? entry.user.toLocaleString('id-ID') : '-'} user(s)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 justify-between mt-10 w-full whitespace-nowrap text-stone-100 max-md:flex-wrap max-md:max-w-full">
                      <div className="flex-auto my-auto text-2xl font-semibold tracking-wide">
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
          <div className="flex flex-col ml-5 w-[26%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-6 mx-auto mt-6 w-full rounded-lg bg-neutral-800 max-md:px-5 max-md:mt-10">
              <div className="flex gap-5 justify-between w-full">
                <div className="flex-auto text-2xl font-medium tracking-wide text-white">
                  My Startup
                </div>
                <div className="flex gap-1 justify-center my-auto text-sm tracking-normal whitespace-nowrap text-neutral-400">
                  <div className="grow">Edit details</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff531139fba3701d653303021c8a4f2f727855541856b2bf3f58981c305dcd5f?"
                    className="shrink-0 self-start w-4 aspect-square"
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-between mt-6">
                <div className="flex flex-1 justify-center items-center py-5 pr-9 pl-4 rounded-md bg-green-400 bg-opacity-20 max-md:pr-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/aee088f017d081eaad61108de32666c86f1ecfeb90c6d756d849b1ba7ce8133f?"
                    className="aspect-[1.02] w-[46px]"
                  />
                </div>
                <div className="flex gap-2 self-start pr-2 text-4xl font-semibold tracking-wider leading-10 text-white whitespace-nowrap">
                  <div className="grow">EduGrow</div>
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
              <div className="mt-2 text-xl font-medium tracking-wide text-white">
                127 Followers
              </div>
              <div className="flex gap-2 justify-center mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4263cd58fed17a65ad368432c73d30f163497d15e331bdd1d6e05c2a90401749?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">Location</div>
              </div>
              <div className="mt-2 text-xl font-medium tracking-wide text-white">
                Jakarta, Indonesia
              </div>
              <div className="flex gap-2 justify-center mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7f0b7e030c7f881e404bf529ed1a4cfb4f8bdc0098eda15b85f926a0ea48cac?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">Sector</div>
              </div>
              <div className="mt-2 text-xl font-medium tracking-wide text-white">
                Education Technology
              </div>
              <div className="flex gap-2 justify-center mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/52141d7798bf792b06a76e0e1a7f77deec220905b0a849c5f87321776223fc28?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">Website</div>
              </div>
              <div className="flex gap-3 justify-center px-10 py-2 mt-2 text-xl font-medium tracking-wide text-white whitespace-nowrap rounded-lg bg-neutral-700 max-md:px-5">
                <div className="flex-auto">EduGrow.id</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0224ac84b32ad76b568287a3ea7b9360aa3be50f2415ddeaa0468b0b120b93b0?"
                  className="shrink-0 w-6 aspect-square"
                />
              </div>
              <div className="flex gap-2 justify-center self-start mt-6 text-base tracking-wide whitespace-nowrap text-neutral-400">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2206c8e1be7362398f13508a66d6a1790b00e28d7cc2f93fdc2e58f7b81152cc?"
                  className="shrink-0 w-6 aspect-square"
                />
                <div className="flex-auto my-auto">LinkedIn</div>
              </div>
              <div className="flex gap-3 justify-center self-start px-4 py-2 mt-2 text-xl font-medium tracking-wide text-white whitespace-nowrap rounded-lg bg-neutral-700">
                <div className="grow">LinkedIn/EduGrow.id</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0224ac84b32ad76b568287a3ea7b9360aa3be50f2415ddeaa0468b0b120b93b0?"
                  className="shrink-0 w-6 aspect-square"
                />
              </div>
              <div className="flex gap-2.5 justify-center px-16 py-3 mt-6 text-xl font-semibold tracking-widest text-black whitespace-nowrap rounded-lg bg-stone-100 max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/00ef0af1e644c1bb102e817c9deeb66348c69aded2f176f8e4bf89a60f937ff5?"
                  className="shrink-0 w-8 aspect-square"
                />
                <div className="grow my-auto">View public profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FounderDashboard;


