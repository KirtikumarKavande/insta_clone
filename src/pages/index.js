import React, { useContext, useEffect, useState } from "react";
import Auth from "../components/Auth";
import Feed from "../components/Feed";
import UserCtx from "../context/userContext";
import { GlobalDispatchContext } from "../context/userContextProvider";

const HomePage = () => {
  const dispatch = useContext(GlobalDispatchContext);

  const { isAuthounticated, isOnboared } = useContext(UserCtx);
  return <div>{isAuthounticated && isOnboared ? <Feed /> : <Auth />}</div>;
};

export default HomePage;
