import * as React from "react";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import Datepicker from "react-tailwindcss-datepicker";
import{ Cookies } from 'react-cookie';

function FounderDiary(props) {
    const [sales, setSales] = useState("");
    const [revenue, setRevenue] = useState("");
    const [user, setUser] = useState("");
    const [lessonLearned, setLessonLearned] = useState("");
    const [listEntries, setListEntries] = useState([]);
    const [filledThisWeek, setFilledThisWeek] = useState(false);
    const [thisWeekEntryId, setThisWeekEntryId] = useState("");
    const [descending, setDescending] = useState(true);
    const [succesMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const todayDate = format(new Date(), 'd MMMM yyyy');

    const myCookies = new Cookies();
    const idFounder = myCookies.get('id')

    const characterCount = lessonLearned.length;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/diary/diaryEntries/founder/${idFounder}?sort=-date`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const entry = await response.json();
        setListEntries(entry);

        const today = new Date();
        const monday = getMonday(today)
        const sunday = getSunday(today);

        const currentWeekEntry = entry.find(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= monday && entryDate <= sunday;
        });

        if (currentWeekEntry) {
          setUser(currentWeekEntry.user);
          setSales(currentWeekEntry.sales);
          setRevenue(currentWeekEntry.revenue);
          setLessonLearned(currentWeekEntry.lessonLearned);
          setThisWeekEntryId(currentWeekEntry.id);
          setFilledThisWeek(true);
        } else {
          setFilledThisWeek(false);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (sales < 0 || revenue < 0 || user < 0){
          setErrorMsg("The number you input can't be a negative number");
          return;
      } else if(lessonLearned.length > 1000){
          setErrorMsg("The maximum character for lesson learned is 1000");
        return;
      }

      let endpoint;
      let data;
      let method;
      let message;
      if (filledThisWeek){
        endpoint = "http://localhost:8000/diary/diaryEntries/" + thisWeekEntryId;
        data = {
          "sales": sales,
          "revenue": revenue,
          "user": user, 
          "lessonLearned": lessonLearned,
        };
        method = "PUT"
        message = "Successfully update this week entry!";
      } else{
        endpoint = "http://localhost:8000/diary/diaryEntries/founder/" + idFounder;
        data = {
          "sales": sales,
          "revenue": revenue,
          "user": user, 
          "lessonLearned": lessonLearned,
          "founder": idFounder
        };
        method = "POST"
        message = "Successfully create this week entry!";
      }

      try {
        const response = await fetch(endpoint, { 
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error("Failed to add data");
        }

        await fetchData();

        await handleClose();

        setSuccessMsg(message);
        setErrorMsg("");

      } catch (error) {
          console.error("Error:", error);
      }
    };

    const handleSort = async () => {
      try {
        let response;
        if(descending){ // if udah descending bakal manggil yg ascending
            response = await fetch("http://localhost:8000/diary/diaryEntries/founder/7?sort=date");
        } else{
            response = await fetch("http://localhost:8000/diary/diaryEntries/founder/7?sort=-date");
        }

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const entry = await response.json();
        setListEntries(entry);
        setDescending(!descending); // mengubah nilai descending

      } catch (error) {
          console.error("Error:", error);
      }
    };

    const handleClose = async() => {
      setSuccessMsg("");
    };

    function getMonday(date){
      const today = new Date(date);
      const monday = new Date(today);
      monday.setDate(today.getDate() - today.getDay() + 1); // Monday
      return monday
    }

    function getSunday(date){
      const today = new Date(date);
      const sunday = new Date(today);
      sunday.setDate(today.getDate() - today.getDay() + 7); // Sunday

      return sunday
    }

    const [value, setValue] = useState({ 
      startDate: "", 
      endDate: ""
    }); 

    const handleValueChange = async(newValue) => {
      setValue(newValue);

      try {
        let response;
        if(newValue.startDate === null && newValue.endDate === null){
          await fetchData();
          return;
        }

        response = await fetch(`http://localhost:8000/diary/diaryEntries/founder/7?sort=-date&startDate=${newValue.startDate}&endDate=${newValue.endDate}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const entry = await response.json();
        setListEntries(entry);

      } catch (error) {
          console.error("Error:", error);
      }
    } 
    
    return (
        <div className="flex flex-col justify-center bg-black">
        <div className="flex gap-5 justify-between py-6 pr-10 pl-20 w-full max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between text-white max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto text-4xl italic font-semibold tracking-wider leading-10">
              startupvault.id
            </div>
            <div className="flex gap-5 justify-between px-5 py-3 text-xl font-light max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="grow">Showcase</div>
              <div>Events</div>
              <div className="flex-auto">Our Investors</div>
              <div className="grow whitespace-nowrap text-stone-100">
                Our Startups
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-between rounded-[30px]">
            <div className="grow justify-center px-5 py-3 text-xl font-light text-green-400 whitespace-nowrap rounded-3xl bg-green-400 bg-opacity-20">
              My Dashboard
            </div>
            <div className="flex gap-2 items-center px-2.5 py-2 bg-neutral-800 rounded-[30.497px]">
              <div className="flex justify-center items-center self-stretch aspect-square">
                <img
                  loading="lazy"
                  srcSet="..."
                  className="rounded-full aspect-square bg-green-400 bg-opacity-20 w-[30px]"
                />
              </div>
              <div className="self-stretch my-auto text-xl font-medium tracking-wide text-stone-100">
                Naznien
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d480841e901ee690cdb968358a4fdd7ed1a2243aef55995816a8978e3a48610?"
                className="self-stretch my-auto aspect-square w-[18px]"
              />
            </div>
          </div>
        </div>
        <div className="w-full max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[23%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch pb-2 mt-6">
                <div className="flex flex-col px-10 max-md:px-5">
                  <div className="flex gap-3 justify-between p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
                      className="w-5 aspect-square"
                    />
                    <div className="flex-auto">Search in dashboard</div>
                  </div>
                  <div className="flex gap-2 self-start mt-10 ml-4 text-xl tracking-wide whitespace-nowrap text-neutral-400 max-md:ml-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/27c36da114ed300adb9add9fce8d851f4c7b22802ffaf460c4b83dfdad7092bb?"
                      className="w-8 aspect-square"
                    />
                    <div className="grow my-auto">
                        <a href="/dashboard/" className="grow my-auto">Overview</a>
                      </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between pr-10 mt-10 text-xl font-medium tracking-wide text-green-400 max-md:pr-5">
                  <div className="w-1 h-12 bg-green-400 rounded-none shadow-sm" />
                  <div className="flex gap-2 justify-between px-4 py-2 rounded-lg bg-green-400 bg-opacity-20">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/24e60d617991b8b60b29d864ec77b569626e6840703c3541bfcb8b3681b8aa21?"
                      className="w-8 aspect-square"
                    />
                    <div className="flex-auto my-auto">Weekly Updates</div>
                  </div>
                </div>
                <div className="flex gap-2 self-center mt-10 text-xl tracking-wide whitespace-nowrap text-neutral-400">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
                    className="w-8 aspect-square"
                  />
                  <div className="grow my-auto">Startup Details</div>
                </div>
                <div className="flex gap-2 self-center mt-12 text-xl tracking-wide whitespace-nowrap text-neutral-400 max-md:mt-10">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f06c757951079842a9d6e5f08a6cb907c6632c2879d3daa3ad22a2e2979cd8c5?"
                    className="w-8 aspect-square"
                  />
                  <div className="grow my-auto">Founder Details</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[55%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center pt-6 max-md:max-w-full">
                <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                  <div className="flex-auto text-3xl font-semibold tracking-wide text-stone-100">
                    Weekly Updates
                  </div>
                </div>
                <div className="mt-2 mb-1.5 text-base tracking-normal text-neutral-400 max-md:max-w-full">
                  What happened this week?
                </div>
                {succesMsg && ( <div id="alert-2" class="flex items-center p-4 mt-4 rounded-lg bg-red-50 dark:bg-neutral-800" role="alert" >
                    <svg class="flex-shrink-0 w-4 h-4 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span class="sr-only">Info</span>
                    <div class="ms-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                      {succesMsg}
                    </div>
                    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleClose}>
                      <span class="sr-only">Dismiss</span>
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </button>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col p-6 mt-2 rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-5 justify-between whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <div className="text-3xl font-medium tracking-wide text-neutral-400">
                      This Week Entry
                    </div>
                    <div className="justify-center self-start px-4 py-2 text-base tracking-normal rounded-lg bg-neutral-700 text-stone-100">
                      {todayDate}
                    </div>
                  </div>
                  <div className="shrink-0 mt-6 h-px bg-neutral-400 max-md:max-w-full" />
                  <div className="justify-center mt-6 max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                      <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-6">
                          <div className="flex gap-3 justify-between py-1">
                            <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/caa64bea637c6e0743f04ffbd7595c0fca032edb636e138e18c6ab2c45155fbe?"
                                className="w-full aspect-square"
                              />
                            </div>
                            <div className="flex-auto my-auto text-lg font-semibold tracking-wide text-stone-100">
                              Sales
                            </div>
                          </div>
                          <input type="number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " value={sales}onChange={(e) => setSales(e.target.value)} required />
                        </div>
                      </div>
                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-6">
                          <div className="flex gap-3 justify-between py-1">
                            <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aebee5a48a90008dee58f7d64c18eee2794f3b8327dd132e82cf294f8ccc005?"
                                className="w-full aspect-square"
                              />
                            </div>
                            <div className="flex-auto my-auto text-lg font-semibold tracking-wide text-stone-100">
                              Revenue
                            </div>
                          </div>
                          <input type="number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " value={revenue} onChange={(e) => setRevenue(e.target.value)} required />
                        </div>
                      </div>
                      <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                        <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-6">
                          <div className="flex gap-3 justify-between py-1">
                            <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/34323bc9996a3a8fedad074382f594477b98f86d0876cacd03790ce7711815c2?"
                                className="w-full aspect-square"
                              />
                            </div>
                            <div className="flex-auto my-auto text-lg font-semibold tracking-wide text-stone-100">
                              User Engagement
                            </div>
                          </div>
                          <input type="number" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " value={user} onChange={(e) => setUser(e.target.value)} required />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-lg font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                    Lesson Learned
                  </div>
                  <textarea type="textarea" rows="4" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:border-green-400 peer" placeholder=" " value={lessonLearned} onChange={(e) => setLessonLearned(e.target.value)} required />
                  <div className="text-sm text-gray-500 ">{characterCount}/1000 characters</div>
                  <div class="flex justify-between items-end">
                    <div class="my-auto">
                      {errorMsg && (
                            <p class="text-sm text-red-500 dark:text-red-400">{errorMsg}</p>
                      )}
                    </div>
                    <div>
                      <button type="submit" class="px-6 py-3 text-xl font-semibold tracking-widest text-black whitespace-nowrap bg-green-400 rounded-3xl shadow-2xl max-md:px-5">
                          SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
                </form>
                <div class="flex justify-between items-end mt-10">
                  <div>
                    <div className="mb-2 text-3xl font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                      Diary Entries
                    </div>
                    <div className="grow text-base tracking-normal text-neutral-400 max-md:max-w-full">
                      {listEntries.length} entries found
                    </div>
                  </div>
                  <div className="py-auto flex gap-3">
                    <button onClick={handleSort} className="flex text-sm text-stone-100 justify-between px-3 py-2.5 font-light tracking-wide rounded-2xl border-solid border-[0.75px] border-[color:var(--line-white,#9E9FA0)]">
                        {descending ? (
                            <>
                                <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/09336f1e86e0673713128171ba8064262d4bd1188b3c06a9a1927d3fb0833bd3?"
                                className="self-start w-10 aspect-square"
                                />
                                <div>Oldest</div>
                            </>
                        ) : (
                            <>
                                <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0dbf444f4ed2068ea13b4fa12b9927d011b42ce3f3eae40a73704f2c533c26ce?"
                                className="self-start w-10 aspect-square"
                                />
                                <div>Latest</div>
                            </>
                        )}
                    </button>
                    <Datepicker
                      primaryColor={"emerald"} 
                      value={value} 
                      onChange={handleValueChange} 
                    /> 
                  </div>
                </div>
                {listEntries.map((item, index) => (
                    <li key={index}>
                        <div className="flex flex-col p-6 rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-5 justify-between whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                            <div className="text-3xl font-medium tracking-wide text-neutral-400">
                            {/* {monday, sunday} = getMondayAndSundayDate(item.date) */}
                            {format(getMonday(item.date), 'd MMM yyyy')} - {format(getSunday(item.date), 'd MMM yyyy')}
                            </div>
                            <div className="justify-center self-start px-4 py-2 text-base tracking-normal rounded-lg bg-neutral-700 text-stone-100">
                                {format(new Date(item.date), 'd MMMM yyyy')}
                            </div>
                        </div>
                        <div className="shrink-0 mt-6 h-px bg-neutral-400 max-md:max-w-full" />
                        <div className="justify-center mt-6 max-md:px-5 max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-6">
                                <div className="flex gap-3 justify-between py-1">
                                    <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/caa64bea637c6e0743f04ffbd7595c0fca032edb636e138e18c6ab2c45155fbe?"
                                        className="w-full aspect-square"
                                    />
                                    </div>
                                    <div className="flex-auto my-auto text-lg font-semibold tracking-wide text-stone-100">
                                    Sales
                                    </div>
                                </div>
                                <div className="mt-7 text-base tracking-wide text-neutral-400">
                                    {item.sales} unit(s)
                                </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-6">
                                <div className="flex gap-3 justify-between py-1">
                                    <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aebee5a48a90008dee58f7d64c18eee2794f3b8327dd132e82cf294f8ccc005?"
                                        className="w-full aspect-square"
                                    />
                                    </div>
                                    <div className="flex-auto my-auto text-lg font-semibold tracking-wide text-stone-100">
                                    Revenue
                                    </div>
                                </div>
                                <div className="mt-7 text-base tracking-wide text-neutral-400">
                                    IDR {item.revenue}
                                </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-6">
                                <div className="flex gap-3 justify-between py-1">
                                    <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                                    <img
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/34323bc9996a3a8fedad074382f594477b98f86d0876cacd03790ce7711815c2?"
                                        className="w-full aspect-square"
                                    />
                                    </div>
                                    <div className="flex-auto my-auto text-lg font-semibold tracking-wide text-stone-100">
                                    User Engagement
                                    </div>
                                </div>
                                <div className="mt-7 text-base tracking-wide whitespace-nowrap text-neutral-400">
                                    {item.user} user(s)
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="mt-6 text-lg font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                            Lesson Learned
                        </div>
                        <div className="mt-4 text-base tracking-wide text-neutral-400 max-md:max-w-full">
                            {item.lessonLearned}
                        </div>
                        </div>
                    </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FounderDiary;