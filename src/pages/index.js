import React, { useState } from "react";
import Auth from "../components/Auth";
import Feed from "../components/Feed";

const HomePage = () => {
  const[isAuthonticatesd,setIsAuthonticatesd]=useState(false)
  return (
    <div>
      {
        !isAuthonticatesd?  <Auth />:<Feed/>
      }
    
    </div>
  );
};

export default HomePage;
