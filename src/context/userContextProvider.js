import React, { createContext, useContext, useReducer } from "react";
import UserCtx from "./userContext";
import { ReducerFunc } from "./ReducerFunc";
export const GlobalDispatchContext = createContext(null);

const UserContextProvider = (props) => {
  const intialState = {
    user: {},
    isAuthounticated: false,
    isOnboared: false,
    isLoading: false,
  };
  const [state, dispatch] = useReducer(ReducerFunc, intialState);
  return <UserCtx.Provider value={state}><GlobalDispatchContext.Provider value={dispatch}>{props.children}</GlobalDispatchContext.Provider>  </UserCtx.Provider>;
};

export default UserContextProvider;
