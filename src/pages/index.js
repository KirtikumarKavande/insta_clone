import React, { useContext, useEffect, useState } from "react";
import Auth from "../components/Auth";
import Feed from "../components/Feed";
import UserCtx from "../context/userContext";



const HomePage = () => {
 

  const { isAuthounticated, isOnboared } = useContext(UserCtx);
  console.log('onboarded',isOnboared)

  return (
    <div>
      {isAuthounticated && isOnboared ? (
        <div>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default HomePage;
