import * as React from "react";
import { useNavigate } from "react-router-dom";

function PickRole(props) {
    const navigate = useNavigate();
    function handlePickRole (param) {
        if (param == 1) {
            localStorage.setItem("role", "founder");
            navigate("/founderForm");
        } else if (param == 2) {
            localStorage.setItem("role", "investor");
            navigate("/investorForm");
        } else if (param == 3){
            localStorage.setItem("role", "partner");
            navigate("/partnerForm");
        }
    }
  return (
    <>
    <div className="flex justify-center items-center px-16 py-12 bg-black max-md:px-5">
      <div className="mt-5 w-full max-w-[1120px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div 
            type="button" 
            className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
            onClick={() => handlePickRole(1)}  
          >
            <div className="flex flex-col grow justify-end self-stretch px-8 py-9 w-5/8 text-center rounded-lg bg-neutral-800 border-[3px] max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="self-center max-w-full aspect-[0.89] w-[155px]"
              />
              <div className="mt-6 text-base tracking-normal text-white">
                I’m building or leading a startup, seeking resources, guidance,
                and opportunities to grow my business.
              </div>
              <div className="mt-7 text-4xl font-semibold tracking-wider leading-10 bg-clip-text text-green-400">
                FOUNDER
              </div>
            </div>
          </div>
          <div 
            type="button" 
            className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full"
            onClick={() => handlePickRole(2)}
          >
          <div className="flex flex-col grow justify-end self-stretch px-8 py-9 w-5/8 text-center rounded-lg bg-neutral-800 border-[3px] max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="self-center max-w-full aspect-[1.35] w-[234px]"
              />
              <div className="mt-6 text-base tracking-normal text-white">
                I’m interested in exploring and investing in innovative
                startups, looking for potential growth opportunities.
              </div>
              <div className="mt-7 text-4xl font-semibold tracking-wider leading-10 bg-clip-text text-green-400">
                INVESTOR
              </div>
            </div>
          </div>
          <div type="button" 
            className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full"
            onClick={() => handlePickRole(3)}  
          >
          <div className="flex flex-col grow justify-end self-stretch px-8 py-9 w-5/8 text-center rounded-lg bg-neutral-800 border-[3px] max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/253646dd233a456e0f320b348ba357efeb3879aab2f2c37109d95bba2d724b60?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="self-center w-60 max-w-full aspect-[1.39]"
              />
              <div className="mt-6 text-base tracking-normal text-white">
                I'm interested in showcasing my events and sharing insights on
                the Startupvault platform.
              </div>
              <div className="mt-7 text-4xl font-semibold tracking-wider leading-10 bg-clip-text text-green-400">
                PARTNER
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default PickRole;

