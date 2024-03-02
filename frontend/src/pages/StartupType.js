import * as React from "react";
import { useNavigate } from "react-router-dom";

function StartupType(props) {
    const navigate = useNavigate();
    function handleStartupType(param) {
        if (param == 1) {
            localStorage.setItem("startupType", "idea")
        } else if (param == 2) {
            localStorage.setItem("startupType", "seed")
        } else if (param == 3) {
            localStorage.setItem("startupType", "growth")
        }
        navigate("/startupForm")
    }
    function handlePrev() {
        navigate("/founderForm")
    }


  return (
    <div className="flex flex-col justify-center bg-black">
      <div className="flex justify-center items-center px-20 py-3 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-1 mb-40 w-full max-w-[950px] max-md:my-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto text-4xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text-4xl">
              Which type best describe your startup?
            </div>
            <div className="flex gap-2.5 my-auto">
              <div className="w-3.5 bg-green-900 rounded-full h-[10px]" />
              <div className="w-3.5 bg-green-400 rounded-full h-[12px]" />
              <div className="w-3.5 bg-green-900 rounded-full h-[12px]" />
            </div>
          </div>
          <div className="mt-4 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div 
              type="button"
              className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
              onClick={() => handleStartupType(1)}>
                <div className="flex flex-col grow justify-end self-stretch px-5 py-5 w-full text-center rounded-lg border-[3px] border-white border-solid bg-neutral-800 max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b16074d18dbb9d4e3639a3d75cb664148748c72482a1f060eb9a37968e138f81?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                    className="self-center max-w-full aspect-[0.89] w-[155px]"
                  />
                  <div className="mt-6 text-base tracking-normal text-white">
                    I have an idea and is seeking feedback and early resources
                  </div>
                  <div className="mt-3 text-4xl font-semibold tracking-wider leading-10 bg-clip-text text-green-400">
                    IDEA
                  </div>
                </div>
              </div>
              <div 
              type="button"
              className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
              onClick={() => handleStartupType(2)}>
                <div className="flex flex-col grow justify-end self-stretch px-5 py-5 w-full text-center rounded-lg border-[3px] border-white border-solid bg-neutral-800 max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/9a6b0aae9de201954f50e20e2944786e3b75ee592806ca2adb1ead9a5152b0ed?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                    className="self-center max-w-full aspect-[1.35] w-[234px]"
                  />
                  <div className="mt-6 text-base tracking-normal text-white">
                    I am developing an MVP and is seeking capital to start
                    operations
                  </div>
                  <div className="mt-3 text-4xl font-semibold tracking-wider leading-10 bg-clip-text text-green-400">
                    SEED
                  </div>
                </div>
              </div>
                <div 
                type="button"
                className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
                onClick={() => handleStartupType(3)}>
                <div className="flex flex-col grow justify-end self-stretch px-5 py-5 w-full text-center rounded-lg border-[3px] border-white border-solid bg-neutral-800 max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3216fc0be645dd49f916ff19733862382faca1050974e7e8c97c635f2dc8a524?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                    className="self-center w-60 max-w-full aspect-[1.39]"
                  />
                  <div className="mt-6 text-base tracking-normal text-white">
                    I have a validated product and is <br />
                    seeking for significant investment to scale rapidly
                  </div>
                  <div className="mt-3 text-4xl font-semibold tracking-wider leading-10 bg-clip-text text-green-400">
                    GROWTH
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div 
          type="button"
          onClick={handlePrev}
          className="flex gap-2.5 justify-center px-3 py-2 mt-3 max-w-full text-l font-semibold tracking-widest whitespace-nowrap rounded-3xl border-solid border-[1.048px] border-[color:var(--secondary-button-outline,#F3F1ED)] text-stone-100 w-[106px] max-md:mt-10 hover:border-green-600 border-solid cursor-pointer">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1490109502cde58f41daf764ada1e96816a28eb0bdf60fae2f6faa1f38c7c09d?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
              className="flex-1 shrink-0 w-full aspect-square"
            />
            <div>PREV</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StartupType;

