import React, { useContext, useMemo, useState } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/assets/animations/auth-page-animation.json";
import useForm from "../../hooks/useForm";
import { AiFillFacebook } from "react-icons/ai";
import UserCtx from "../../context/userContext";
import { GlobalDispatchContext } from "../../context/userContextProvider";
import { accountInfo } from "../../utilitis/api";

import { BiLoaderCircle } from "react-icons/bi";
import {
  handleLoginPromise,
  handleSignupPromise,
} from "../../utilitis/handlePromise";
import { toast } from "react-hot-toast";
const Auth = () => {
  const { formValues, handleChange, setForm } = useForm({
    email: "",
    password: "",
  });
  const { formValues: OnBoardedValues, handleChange: handleOnBardedData } =
    useForm({
      fullName: "",
      userName: "",
    });

  const [displayLogin, setDisplayLogin] = useState(true);
  const { user, isAuthounticated, isOnboared, isLoading } = useContext(UserCtx);
  const dispatch = useContext(GlobalDispatchContext);

  const isDisabled = useMemo(() => {
    return Object.values(formValues).every((item) => !!item);
  }, [formValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "IS_LOADING", isLoading: true });

    if (displayLogin) {
      const data = await handleLoginPromise(formValues);
      console.log("----",data)

      if (data.error) {
        
        toast.error("Check your Email or Password ");
      } else {
        dispatch({ type: "IS_AUTHONTICATED", isAuthounticated: true });
        dispatch({ type: "IS_ONBOARDED", isOnboared: !!data.displayName });


        toast.success("Login Successful");
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("email", data.email);
      }
    } else {
      const data = await handleSignupPromise(formValues);
      if (data.error) {
        toast.error(data?.error?.message);
      } else {
        toast.success("SignUp  Successful please Login");
      }
    }

    setForm({ email: "", password: "" });
    dispatch({ type: "IS_LOADING", isLoading: false });
  };

  const handleOnboardedData = (e) => {
    e.preventDefault();

    fetch(
      `https://instagram-clone-64f73-default-rtdb.firebaseio.com/onBoardedData.json?orderBy="userName"&equalTo=${JSON.stringify(
        OnBoardedValues.userName
      )}`
    ).then((res) => {
      res.json().then((data) => {
        if (Object.keys(data).length === 0) {
          fetch(
            "https://instagram-clone-64f73-default-rtdb.firebaseio.com/onBoardedData.json",

            {
              method: "POST",
              body: JSON.stringify(OnBoardedValues),
              headers: {
                "content-type": "application/json",
              },
            }
          ).then((data) => {
            const token=localStorage.getItem('token')
            toast.success("Username Succesfully Created");
            fetch(`${accountInfo}AIzaSyDwipkFw3qiq1a5kQ4vF4LoeXzCDH_ - VBI`, {
              method: "POST",
              body: JSON.stringify({
                idToken:token,
                displayName:String(true)
              }),
              headers: {
                "content-type": "application/json",
              },
            }).then((res)=>{
              res.json().then((data)=>{
                console.log("user data",data)
              })
            })
            dispatch({ type: "IS_ONBOARDED", isOnboared: true });

          });
        } else {
          toast.error("username Already Exists");
        }
      });
    });

    console.log("OnBoardedValues", OnBoardedValues);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex w-4/5 h-4/5">
        <div className="w-full h-full">
          <Lottie
            play
            loop
            animationData={lottieJson}
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col w-full space-y-5 ">
          <div className="relative flex flex-col w-full p-10 space-y-5 bg-white border border-gray-300">
            {!isAuthounticated && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center space-y-5 relative z-1"
              >
                {isLoading && (
                  <div className="z-30 absolute flex justify-center items-center">
                    <BiLoaderCircle size={50} className=" animate-spin" />
                  </div>
                )}

                <div className="my-5 text-5xl tracking-wider">Instagram</div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formValues.email}
                  className="w-full px-2 py-1 bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
                  placeholder="Email"
                />
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={formValues.password}
                  placeholder="Password"
                  className="w-full px-2 py-1 transition bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
                />
                <button
                  type="submit"
                  className="bg-[#0095F6] py-1 cursor-pointer text-white active:scale-95 transform transition w-full disabled:bg-opacity-50 disabled:scale-100 rounded text-sm font-semibold"
                  disabled={!isDisabled}
                >
                  {displayLogin ? "Login" : "signup"}
                </button>
              </form>
            )}
            {isAuthounticated && !isOnboared && (
              <form
                onSubmit={handleOnboardedData}
                className="flex flex-col items-center space-y-5 relative z-1"
              >
                <div className="text-red-400">
                  Lets Create UserName to Uniquelly identify{" "}
                </div>
                {isLoading && (
                  <div className="z-30 absolute flex justify-center items-center">
                    <BiLoaderCircle size={50} className=" animate-spin" />
                  </div>
                )}

                <div className="my-5 text-5xl tracking-wider">Instagram</div>
                <input
                  type="text"
                  name="fullName"
                  id="name"
                  onChange={handleOnBardedData}
                  value={OnBoardedValues.fullName}
                  className="w-full px-2 py-1 bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  name="userName"
                  id="usename"
                  onChange={handleOnBardedData}
                  value={OnBoardedValues.userName}
                  placeholder="User Name"
                  className="w-full px-2 py-1 transition bg-gray-100 border rounded-sm outline-none hover:bg-transparent focus:bg-transparent placeholder:text-sm focus:border-gray-400"
                />
                <button
                  type="submit"
                  className="bg-[#0095F6] py-1 cursor-pointer text-white active:scale-95 transform transition w-full disabled:bg-opacity-50 disabled:scale-100 rounded text-sm font-semibold"
                >
                  Submit
                </button>
              </form>
            )}
            <div className="flex items-center justify-center w-full my-5 space-x-2">
              <div className="h-[0.8px] w-full bg-slate-400" />
              <div className="text-sm font-semibold text-center text-gray-400">
                OR
              </div>
              <div className="h-[0.8px] w-full bg-slate-400" />
            </div>
            {!displayLogin && (
              <div className="flex items-center justify-center w-full text-center text-indigo-900">
                <AiFillFacebook className="inline-block mr-2 text-2xl" />
                <span className="text-sm font-semibold">
                  signup with Facebook
                </span>
              </div>
            )}
            {displayLogin && (
              <div className="w-full text-xs text-center text-indigo-900">
                Forgotten your password?
              </div>
            )}
          </div>
          <div className="w-full py-5 space-y-5 text-sm text-center bg-white border border-gray-300">
            Dont have account{" "}
            <div
              className="text-blue-500 inline-block cursor-pointer"
              onClick={() => {
                setDisplayLogin(!displayLogin);
              }}
            >
              {" "}
              {displayLogin ? "signUp" : "sign in"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
