import * as React from "react";
import { useState, useEffect } from "react";
import { endOfDay, format } from 'date-fns';
import Datepicker from "react-tailwindcss-datepicker";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";
import SideBar from "../component/SideFounder";

function FounderDiary(props) {
    const [sales, setSales] = useState("");
    const [revenue, setRevenue] = useState("");
    const [user, setUser] = useState("");
    const [lessonLearned, setLessonLearned] = useState("");
    const [listEntries, setListEntries] = useState([]);
    const [filledThisWeek, setFilledThisWeek] = useState(false);
    const [thisWeekEntryId, setThisWeekEntryId] = useState("");
    const [sort, setSort] = useState("-date");
    const [succesMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const todayDate = format(new Date(), 'd MMMM yyyy');
    const [value, setValue] = useState({ 
      startDate: null, 
      endDate: null
    }); 

    const myCookies = new Cookies();
    const idFounder = myCookies.get('id')
    const nameFounder = myCookies.get('name')
    const profilePicture = myCookies.get('image')
    const idStartup = myCookies.get('startup')
    const token = myCookies.get('token')

    const characterCount = lessonLearned.length;

    useEffect(() => {
        fetchData();
    }, [sort, value]);

    const fetchData = async () => {
      let endpoint;

      if(value.startDate != null && value.endDate != null){
        endpoint = `https://startupvault-foundry.vercel.app/diary/diaryEntries/founder/${idFounder}/?sort=${sort}&startDate=${value.startDate}&endDate=${value.endDate}`
      } else{
        endpoint = `https://startupvault-foundry.vercel.app/diary/diaryEntries/founder/${idFounder}/?sort=${sort}`
      }

      try {
        const response = await fetch(endpoint, {
          method:"GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const entry = await response.json();
        setListEntries(entry);

        console.log(entry)

        const today = new Date();
        const monday = getMonday(today);
        const sunday = getSunday(today);

        monday.setHours(0, 0, 0, 0);
        sunday.setHours(23, 59, 59, 999);

        const currentWeekEntry = entry.find(entry => {
          const entryDate = new Date(entry.date);
          console.log(entryDate)
          return entryDate >= monday && entryDate <= sunday;
        });

        if (currentWeekEntry) {
          console.log("ga masuk sini ya")
          setUser(currentWeekEntry.user);
          setSales(currentWeekEntry.sales);
          setRevenue(currentWeekEntry.revenue);
          setLessonLearned(currentWeekEntry.lessonLearned);
          setThisWeekEntryId(currentWeekEntry.id);
          setFilledThisWeek(true);
        } else {
          console.log("masuk sini")
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
        endpoint = "https://startupvault-foundry.vercel.app/diary/diaryEntries/" + thisWeekEntryId + "/";
        data = {
          "sales": sales,
          "revenue": revenue,
          "user": user, 
          "lessonLearned": lessonLearned,
        };
        method = "PUT"
        message = "Successfully update this week entry!";
        console.log("masuk ga")
      } else{
        endpoint = "https://startupvault-foundry.vercel.app/diary/diaryEntries/founder/" + idFounder + "/";
        data = {
          "sales": sales,
          "revenue": revenue,
          "user": user, 
          "lessonLearned": lessonLearned,
          "founder": idFounder
        };
        method = "POST"
        message = "Successfully create this week entry!";
        console.log("kalo ini")
      }

      try {
        const response = await fetch(endpoint, { 
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
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

    const handleSort = () => {
      if(sort === "-date"){
				setSort("date", () => {
					fetchData();
				});
			} else if(sort === "date"){
				setSort("-date", () => {
					fetchData();
				});
			}		
    };

    const handleClose = async() => {
      setSuccessMsg("");
    };

    function getMonday(date){
      let today = new Date(date)
      
      // set to "Sunday" for the previous week
      today.setDate(today.getDate() - (today.getDay() || 7)) // if getDay is 0 (Sunday), take 7 days
      return new Date(today.setDate(today.getDate() + 1))
    }

    function getSunday(date){
      let today = new Date(date)
      let sunday
      
      // set to "Sunday" for the previous week
      today.setDate(today.getDate() - (today.getDay() || 7)) // if getDay is 0 (Sunday), take 7 days

      return new Date(today.setDate(today.getDate() + 7))
    }

    const handleValueChange = async(newValue) => {
      setValue(newValue, () => {
				fetchData();
			});
    } 
    
    return (
      <div className="flex flex-col justify-center bg-black min-h-screen px-20 overflow-auto">
        <NavBar status={"dashboard"}/>
        <div className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
          <div className="flex gap-0 max-md:flex-col max-md:gap-0">
            <SideBar status={"diary"}/>
            <div className="flex flex-col w-[55%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center pt-6 max-md:max-w-full">
                <div className="flex gap-5 justify-between max-md:flex-wrap max-md:max-w-full">
                  <div className="text-stone-100 text-2xl font-semibold tracking-tight text-wrap">
                    Weekly Updates
                  </div>
                </div>
                <div className="mt-2 mb-1.5 text-base tracking-normal text-neutral-400 max-md:max-w-full">
                  What happened this week?
                </div>
                {succesMsg && ( <div id="alert-2" className="flex items-center p-4 mt-4 rounded-lg bg-neutral-800" role="alert" >
                    <svg className="flex-shrink-0 w-4 h-4 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium text-gray-300">
                      {succesMsg}
                    </div>
                    <button type="button" className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 inline-flex items-center justify-center h-8 w-8 bg-neutral-800 text-gray-300 hover:bg-gray-700 hover:text-white" onClick={handleClose}>
                      <span className="sr-only">Dismiss</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </button>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col p-6 mt-2 rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
                    <div className="flex gap-5 justify-between whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                      <div className="text-2xl font-medium tracking-wide text-white">
                        This Week Entry
                      </div>
                      <div className="justify-center self-start px-4 py-2 text-base tracking-normal rounded-lg bg-neutral-700 text-stone-100">
                        {todayDate}
                      </div>
                    </div>
                    <div className="shrink-0 mt-3 h-px bg-neutral-400 max-md:max-w-full" />
                    <div className="justify-center mt-3 max-md:px-5 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
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
                              <div className="flex-auto my-auto text-l font-semibold tracking-wide text-stone-100">
                                Sales
                              </div>
                            </div>
                            <input type="number" className="mt-3 block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer" placeholder=" " value={sales}onChange={(e) => setSales(e.target.value)} required />
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-3">
                            <div className="flex gap-3 justify-between py-1">
                              <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aebee5a48a90008dee58f7d64c18eee2794f3b8327dd132e82cf294f8ccc005?"
                                  className="w-full aspect-square"
                                />
                              </div>
                              <div className="flex-auto my-auto text-l font-semibold tracking-wide text-stone-100">
                                Revenue
                              </div>
                            </div>
                            <input type="number" className="mt-3 block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer" placeholder=" " value={revenue} onChange={(e) => setRevenue(e.target.value)} required />
                          </div>
                        </div>
                        <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                          <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-3">
                            <div className="flex gap-3 justify-between py-1">
                              <div className="flex justify-center items-center px-2.5 w-9 h-9 rounded-2xl aspect-square bg-green-400 bg-opacity-20">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/34323bc9996a3a8fedad074382f594477b98f86d0876cacd03790ce7711815c2?"
                                  className="w-full aspect-square"
                                />
                              </div>
                              <div className="flex-auto my-auto text-l font-semibold tracking-wide text-stone-100">
                                User Engagement
                              </div>
                            </div>
                            <input type="number" className="mt-3 block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer" placeholder=" " value={user} onChange={(e) => setUser(e.target.value)} required />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-l font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                      Lesson Learned
                    </div>
                    <textarea type="textarea" rows="4" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-green-400 focus:outline-none focus:ring-0 peer" placeholder=" " value={lessonLearned} onChange={(e) => setLessonLearned(e.target.value)} required />
                    <div className="text-sm text-gray-500 ">{characterCount}/1000 characters</div>
                    <div className="flex justify-between items-end">
                      <div className="my-auto">
                        {errorMsg && (
                              <p className="text-sm text-red-400">{errorMsg}</p>
                        )}
                      </div>
                      <div>
                        <button type="submit" className="px-6 py-3 text-base font-semibold text-black whitespace-nowrap bg-green-400 rounded-3xl shadow-2xl max-md:px-5">
                            Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex justify-between items-end mt-10">
                  <div>
                    <div className="mb-2 text-3xl font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                      Diary Entries
                    </div>
                    <div className="grow text-base tracking-normal text-neutral-400 max-md:max-w-full">
                      {listEntries.length} entries found
                    </div>
                  </div>
                  <div className="py-auto flex gap-3">
                    <button onClick={handleSort} className="flex text-sm text-stone-100 justify-between pl-3 pr-4 py-2 rounded-[25px] border font-light tracking-wide border-solid border-neutral-400 items-center">
                        {sort === "-date" ? (
                            <>
                                <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/09336f1e86e0673713128171ba8064262d4bd1188b3c06a9a1927d3fb0833bd3?"
                                className="w-10 aspect-square self-center"
                                />
                                <div>Oldest</div>
                            </>
                        ) : (
                            <>
                                <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0dbf444f4ed2068ea13b4fa12b9927d011b42ce3f3eae40a73704f2c533c26ce?"
                                className="w-10 aspect-square self-center"
                                />
                                <div>Latest</div>
                            </>
                        )}
                    </button>
                    <Datepicker
                      inputClassName="w-full pl-3 pr-4 py-2 rounded-[25px] border font-normal text-stone-100 border-neutral-400 bg-black"
                      primaryColor={"emerald"}
                      value={value} 
                      onChange={handleValueChange}
                      useRange={false}
											readOnly={true}
                      placeholder="Date" 
                    /> 
                  </div>
                </div>
                {listEntries.map((item, index) => (
                    <li key={index}>
                        <div className="flex flex-col p-6 mt-5 rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-5 justify-between whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                            <div className="text-3xl font-medium tracking-wide text-neutral-400">
                            {/* {monday, sunday} = getMondayAndSundayDate(item.date) */}
                            {format(getMonday(item.date), 'd MMM yyyy')} - {format(getSunday(item.date), 'd MMM yyyy')}
                            </div>
                            <div className="justify-center self-start px-4 py-2 text-base tracking-normal rounded-lg bg-neutral-700 text-stone-100">
                                {format(new Date(item.date), 'd MMMM yyyy')}
                            </div>
                        </div>
                        <div className="shrink-0 mt-3 h-px bg-neutral-400 max-md:max-w-full" />
                        <div className="justify-center mt-3 max-md:px-5 max-md:max-w-full">
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
                                    <div className="flex-auto my-auto text-lg font-semibold tracking-wide text-stone-100">
                                    Sales
                                    </div>
                                </div>
                                <div className="mt-7 text-base tracking-wide text-neutral-400">
                                    {item.sales.toLocaleString('id-ID')} unit(s)
                                </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-3">
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
                                    IDR {item.revenue.toLocaleString('id-ID')}
                                </div>
                                </div>
                            </div>
                            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col grow self-stretch py-5 mx-auto w-full rounded-md bg-neutral-800 max-md:mt-3">
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
                                    {item.user.toLocaleString('id-ID')} user(s)
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="mt-3 text-lg font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                            Lesson Learned
                        </div>
                        <div className="mt-4 text-base tracking-wide text-neutral-400 max-md:max-w-full break-words whitespace-pre-line">
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