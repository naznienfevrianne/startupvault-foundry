import * as React from "react";
import { useState, useEffect } from "react";
import { format } from 'date-fns';
import Datepicker from "react-tailwindcss-datepicker";
import{ Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import NavBar from "../component/NavBar";


function InvestorDashboard(props){
    const [listEntries, setListEntries] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/diary/diaryEntries/investor/22?sort=-date`, {
          method:"GET",
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const entry = await response.json();
        setListEntries(entry);

      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
			<div className="flex flex-col justify-center bg-black min-h-screen">
				{/* navbar */}
				<div className="px-20">
					<NavBar />
				</div>
				<div className="pb-20 w-full max-md:pr-5 max-md:max-w-full">
					<div className="flex gap-5 max-md:flex-col max-md:gap-0">
					{/* side bar */}
						<div className="w-[320px] flex-col justify-start items-center inline-flex">
							<div className="h-[212px] flex-col justify-start items-center gap-5 flex">
								<div className="flex gap-3 p-4 text-base tracking-normal bg-neutral-800 rounded-[30px] text-stone-300">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/5141f2b3392732e7dceb2287d5276e2c7df22cecc85670302b617d425ec44b62?"
										className="shrink-0 w-5 aspect-square"
									/>
									<div className="flex-auto">Search in dashboard</div>
								</div>
								<div className="flex gap-5 justify-between pr-10 mt-5 font-medium text-green-400 whitespace-nowrap max-md:pr-5">
									<div className="w-1 self-stretch bg-green-400 rounded-tr-[10px] rounded-br-[10px] shadow" />
									<div className="h-12 flex pl-4 pr-20 gap-3 bg-green-400 bg-opacity-20 rounded-lg">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1487560442a58b51dcbec994221baf3cf665d63416908100ec5efda2c599f05?"
											className="shrink-0 w-8 aspect-square"
										/>
										<div className="text-green-400 text-xl pt-2 font-medium font-['SF Pro Display'] tracking-tight">Overview</div>
									</div>
								</div>
								<div className="pr-15 justify-start items-center inline-flex">
									<div className="justify-start items-center gap-2 flex">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/af603136276046e8322b35f550ed99cb4cb7f42f4be19979861c7f70c3f1a3ce?"
											className="shrink-0 w-8 aspect-square"
										/>
										<div className="text-neutral-400 text-xl font-normal font-['SF Pro Display'] tracking-tight">Organization details</div>
									</div>
								</div>
							</div>
						</div>
					{/* card */}
					<div className="flex flex-col w-[600px] max-md:ml-0 max-md:w-full">
						<div className="flex flex-col grow justify-center pt-6 max-md:max-w-full">
						<div className="self-stretch justify-between items-center inline-flex">
								<div className="text-stone-100 text-2xl font-semibold tracking-tight">Following Updates</div>
								<div className="justify-start items-center gap-3 flex">
								<div className="pl-3 pr-4 py-2 rounded-[25px] border border-neutral-400 justify-center items-center gap-2.5 flex">
										<div className="w-5 h-5 relative" />
										<div className="text-stone-100 text-base font-normal font-['SF Pro Display'] tracking-tight">Startup</div>
								</div>
								<div className="pl-3 pr-4 py-2 rounded-[25px] border border-neutral-400 justify-center items-center gap-2.5 flex">
										<div className="w-5 h-5 relative" />
										<div className="text-stone-100 text-base font-normal font-['SF Pro Display'] tracking-tight">Date</div>
								</div>
								<div className="pl-3 pr-4 py-2 rounded-[25px] border border-neutral-400 justify-center items-center gap-2.5 flex">
										<div className="w-5 h-5 relative" />
										<div className="text-stone-100 text-base font-normal font-['SF Pro Display'] tracking-tight">Search</div>
								</div>
								</div>
						</div>
						{/* card */}
						{listEntries.map((item, index) => (
								<li key={index}>
										<div className="self-stretch p-6 bg-neutral-800 rounded-lg flex-col justify-center items-start gap-6 flex">
												<div className="self-stretch justify-start items-center gap-[16.98px] inline-flex">
														<div className="justify-start items-start gap-4 flex">
																<div className="w-[60.72px] h-[60.72px] px-[13.43px] py-[11.09px] bg-green-400 bg-opacity-20 rounded justify-center items-center gap-[5.84px] flex">
																<div className="w-[34.45px] h-[34.45px] px-[1.08px] pt-[2.15px] pb-[4.31px] justify-center items-center flex" />
																</div>
																<div className="flex-col justify-start items-start gap-[7.04px] inline-flex">
																<div className="justify-start items-center gap-[3.52px] inline-flex">
																		<div className="text-stone-100 text-[21.12px] font-semibold font-['SF Pro Display'] tracking-tight">{item.startup}</div>
																		<div className="w-[17.60px] h-[17.60px] p-[1.65px] justify-center items-center flex" />
																</div>
																<div className="justify-start items-center gap-[7.04px] inline-flex">
																		<div className="pl-[7.92px] pr-[10.56px] py-[4.26px] bg-neutral-700 rounded-[16.95px] justify-start items-center gap-[4.52px] flex">
																		<div className="w-[15.84px] h-[15.84px] px-[0.49px] py-0.5 justify-center items-center flex" />
																		<div className="justify-start items-center gap-[4.74px] flex">
																				<div className="text-stone-100 text-base font-semibold font-['Zuume'] leading-[18.99px] tracking-wide">{item.startup_type}</div>
																		</div>
																		</div>
																</div>
																</div>
														</div>
												</div>
												<div className="flex flex-col p-6 rounded-lg bg-neutral-800 max-md:px-5 max-md:max-w-full">
                        <div className="flex gap-5 justify-between whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                            <div className="text-3xl font-medium tracking-wide text-neutral-400">
                            {/* {monday, sunday} = getMondayAndSundayDate(item.date) */}
                            test - test
                            </div>
                            <div className="justify-center self-start px-4 py-2 text-base tracking-normal rounded-lg bg-neutral-700 text-stone-100">
                                {format(new Date(item.date), 'd MMMM yyyy')}
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
                                    IDR {item.revenue}
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
                                    {item.user} user(s)
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="mt-3 text-lg font-semibold tracking-wide text-stone-100 max-md:max-w-full">
                            Lesson Learned
                        </div>
                        <div className="mt-4 text-base tracking-wide text-neutral-400 max-md:max-w-full">
                            {item.lessonLearned}
                        </div>
                        </div>
										</div>                        
								</li>
						))}
						</div>
					</div>
					{/* details */}
					<div className="w-[440px] px-10 py-6 flex-col justify-start items-end gap-6 inline-flex">
							<div className="h-[702px] p-6 bg-neutral-800 rounded-lg flex-col justify-start items-start gap-6 flex">
							<div className="self-stretch justify-between items-center inline-flex">
									<div className="w-44 text-white text-2xl font-medium font-['SF Pro Display'] tracking-tight">My Organization</div>
									<div className="justify-center items-center gap-1 flex">
									<div className="text-neutral-400 text-sm font-normal font-['SF Pro Display'] tracking-tight">Edit details</div>
									<div className="w-4 h-4 pl-0.5 pr-[1.50px] pt-[1.50px] pb-0.5 justify-center items-center flex" />
									</div>
							</div>
							<div className="justify-start items-center gap-6 inline-flex">
									<div className="w-[78.27px] h-[78.27px] px-[17.31px] py-[14.30px] bg-green-400 bg-opacity-20 rounded-md justify-center items-center gap-[7.53px] flex">
									<div className="w-[44.40px] h-[44.40px] px-[1.39px] pt-[2.77px] pb-[5.55px] justify-center items-center flex" />
									</div>
									<div className="flex-col justify-start items-start gap-1 inline-flex">
									<div className="justify-start items-center gap-2 inline-flex">
											<div className="text-white text-[37px] font-semibold font-['Zuume'] leading-[44.40px] tracking-wider">DEPOKVC</div>
											<div className="w-8 h-8 p-[3px] justify-center items-center flex" />
									</div>
									<div className="px-3 py-[5px] bg-neutral-700 rounded-[18.97px] justify-start items-center gap-[5.06px] inline-flex">
											<div className="justify-start items-center gap-[5.30px] flex">
											<div className="text-green-400 text-lg font-semibold font-['Zuume'] leading-snug tracking-wider">angel investor</div>
											</div>
									</div>
									</div>
							</div>
							<div className="self-stretch h-14 rounded-lg flex-col justify-start items-start gap-2 flex">
									<div className="self-stretch justify-start items-center gap-2 inline-flex">
									<div className="w-6 h-6 px-[0.75px] pt-[4.50px] pb-[3px] justify-center items-center flex" />
									<div className="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">Following</div>
									<div className="w-[86px] h-3.5 text-right text-green-400 text-sm font-normal font-['SF Pro Display'] tracking-tight">View following</div>
									</div>
									<div className="w-[225px] h-[29px] flex-col justify-start items-start gap-1 flex">
									<div className="self-stretch"><span className="text-stone-100 text-xl font-medium font-['SF Pro Display'] tracking-tight">127</span><span className="text-stone-100 text-base font-medium font-['SF Pro Display'] tracking-tight"> following</span></div>
									</div>
							</div>
							<div className="self-stretch h-14 rounded-lg flex-col justify-start items-start gap-2 flex">
									<div className="justify-center items-center gap-2 inline-flex">
									<div className="w-6 h-6 px-[3.75px] py-[1.50px] justify-center items-center flex" />
									<div className="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">Location</div>
									</div>
									<div className="text-white text-xl font-medium font-['SF Pro Display'] tracking-tight">Jakarta, Indonesia</div>
							</div>
							<div className="self-stretch h-[69px] rounded-lg flex-col justify-start items-start gap-2 flex">
									<div className="justify-center items-center gap-2 inline-flex">
									<div className="w-6 h-6 pl-[3px] pr-[2.25px] pt-[2.25px] pb-[3px] justify-center items-center flex" />
									<div className="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">Phone number</div>
									</div>
									<div className="px-4 py-2 bg-neutral-700 rounded-lg justify-center items-center gap-3 inline-flex">
									<div className="text-white text-lg font-medium font-['SF Pro Display'] tracking-tight">+62 81234567890</div>
									</div>
							</div>
							<div className="self-stretch h-[69px] rounded-lg flex-col justify-start items-start gap-2 flex">
									<div className="justify-center items-center gap-2 inline-flex">
									<div className="w-6 h-6 px-[2.25px] py-[4.50px] justify-center items-center flex" />
									<div className="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">Contact email</div>
									</div>
									<div className="px-4 py-2 bg-neutral-700 rounded-lg justify-center items-center gap-3 inline-flex">
									<div className="text-white text-lg font-medium font-['SF Pro Display'] tracking-tight">depokvc@gmail.com</div>
									</div>
							</div>
							<div className="self-stretch h-[72px] rounded-lg flex-col justify-start items-start gap-2 flex">
									<div className="justify-center items-center gap-2 inline-flex">
									<div className="w-6 h-6 p-[2.25px] justify-center items-center flex" />
									<div className="text-neutral-400 text-base font-normal font-['SF Pro Display'] tracking-tight">LinkedIn</div>
									</div>
									<div className="px-4 py-2 bg-neutral-700 rounded-lg justify-center items-center gap-3 inline-flex">
									<div className="text-white text-lg font-medium font-['SF Pro Display'] tracking-tight">LinkedIn/depokvc</div>
									<div className="w-6 h-6 p-[2.25px] justify-center items-center flex" />
									</div>
							</div>
							<div className="self-stretch px-5 py-3 bg-stone-100 rounded-lg justify-center items-center gap-2.5 inline-flex">
									<div className="w-8 h-8 p-[3px] justify-center items-center flex" />
									<div className="text-black text-xl font-semibold font-['Zuume'] tracking-wider">View public profile</div>
							</div>
							</div>
					</div>
					</div>
						
				</div>
			</div>
    )
}

export default InvestorDashboard;