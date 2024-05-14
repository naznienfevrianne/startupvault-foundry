import * as React from "react";
import NavBar from "../component/NavBar";

function NoAccess(props) {
  
  return (
    <div className="flex flex-col bg-black min-h-screen px-20 overflow-auto">
    <NavBar/>
      <div className="text-stone-100 items-center text-center text-4xl font-semibold justify-center">
        You have yet to be verified
      </div>
    </div>
  );
}
export default NoAccess;


