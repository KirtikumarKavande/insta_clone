import React from "react";
import { BsSearch } from "react-icons/bs";
import Header from "../Header/Header";


const Feed = () => {

  return (
    <div className="w-full h-full bg-[#FAFAFA]">
      {/* <header className="w-full flex justify-around h-16 items-center shadow-lg ">
        <div className="text-xl font-semibold tracking-wider">Instagram</div>
        <div>
        
          <input
          placeholder="search"
            type="search"
            name="search"
            className="w-full px-2 py-1 transition rounded-lg bg-gray-100 border  outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
          />
        </div>
        <div>all icons here </div>
      </header> */}
      <Header/>
    </div>
  );
};

export default Feed;
