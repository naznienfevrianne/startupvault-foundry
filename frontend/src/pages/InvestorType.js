import * as React from "react";
import { useNavigate } from "react-router-dom";

function InvestorType(props) {
    const navigate = useNavigate();
    function handleInvestorType(param) {
        if (param == 1) {
            localStorage.setItem("investorType", "angel")
        } else if (param == 2) {
            localStorage.setItem("investorType", "venture")
        }
        navigate("/investorForm")

    }
    function handlePrev() {
        navigate("/pickRole")
    }
  return (
    <div className="flex flex-col justify-center bg-black min-h-screen">
      <div className="flex justify-center items-center px-20 py-3 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col mt-1 mb-30 w-full max-w-[950px] max-md:my-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto text-4xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text-4xl">
              Which type investor best describe you?
            </div>
            <div className="flex gap-2.5 my-auto">
              <div className="shrink-0 w-3.5 bg-green-900 rounded-full h-[10px]" />
              <div className="shrink-0 w-3.5 bg-green-400 rounded-full h-[12px]" />
              <div className="shrink-0 w-3.5 bg-green-900 rounded-full h-[12px]" />
            </div>
          </div>
          <div className="self-center mt-10 max-w-full w-[725px] max-md:mt-10">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div 
                type="button"
                onClick={() => handleInvestorType(1)}
              className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-end self-stretch px-5 pt-5 pb-9 w-full text-center rounded-lg border border-black bg-neutral-800 max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/225971856a9141b6a7957c4e2304821dba71aad746001bcdffa1cbd425526c1c?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                    className="self-center max-w-full aspect-[1.39] w-241px]"
                  />
                  <div className="mt-6 text-base tracking-normal text-white">
                    I want to provide capital, mentorship, <br />
                    and connections
                  </div>
                  <div className="mt-3 text-4xl font-semibold tracking-wider leading-10 whitespace-nowrap bg-clip-text text-green-400">
                    angel investor
                  </div>
                </div>
              </div>
              <div 
                 type="button"
                 onClick={() => handleInvestorType(2)}
              className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow justify-end self-stretch px-5 py-5 pb-9 w-full text-center rounded-lg border border-black bg-neutral-800 max-md:px-5 max-md:mt-10 hover:border-green-400 border-solid cursor-pointer">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c64b1b567f0844d76630fbc692da4a4776e8f6a0a76aff7a3f7cebf2a82e1766?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                    className="self-center max-w-full aspect-[1.39] w-[241px]"
                  />
                  <div className="mt-6 text-base tracking-normal text-white">
                    I want to invest to high-growth startups <br />
                    in exchange for equity
                  </div>
                  <div className="mt-3 text-4xl font-semibold tracking-wider leading-10 whitespace-nowrap bg-clip-text text-green-400">
                    venture capital
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div 
          type="button"
          onClick={handlePrev}
          className="flex gap-2.5 justify-center self-start px-5 py-3 mt-3 text-l font-semibold tracking-widest whitespace-nowrap rounded-3xl border border-solid border-stone-100 text-stone-100 max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/89284abb4a3a9f6ed90954b4580f829c637307abcfe8f168c546f55998b55f61?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
              className="shrink-0 w-6 aspect-square"
            />
            <div>PREV</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InvestorType;

