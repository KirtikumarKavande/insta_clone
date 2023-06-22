"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import UserCtx from "./userContext";
import { ReducerFunc } from "./ReducerFunc";
export const GlobalDispatchContext = createContext(null);

const UserContextProvider = (props) => {
  const intialState = {
    user: {},
    isAuthounticated: false,
    isOnboared: false,
    isLoading: false,
    isModalOpen:false
  };
  const [state, dispatch] = useReducer(ReducerFunc, intialState);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (!!token) {
      dispatch({type:"IS_AUTHONTICATED",isAuthounticated:true})
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDwipkFw3qiq1a5kQ4vF4LoeXzCDH_-VBI",
        {
          method: "POST",
          body: JSON.stringify({ idToken: token }),
          headers: {
            "content-type": "application/json",
          },
        }
      ).then((res) => {
        res.json().then((data) => {
          console.log(data);
        if(data.users){
          if (!!data?.users[0]?.displayName) {
            dispatch({ type: "IS_ONBOARDED", isOnboared: true });
          } else {
            dispatch({ type: "IS_ONBOARDED", isOnboared: false });
          }
      }});
      });
    }
  }, []);
  return (
    <UserCtx.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {props.children}
      </GlobalDispatchContext.Provider>{" "}
    </UserCtx.Provider>
  );
};

export default UserContextProvider;
