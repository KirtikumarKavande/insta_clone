import React, { useMemo } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../../public/assets/animations/auth-page-animation.json";
import useForm from "../../hooks/useForm";
import { AiFillFacebook } from "react-icons/ai";

const Auth = () => {
  const { formValues, handleChange } = useForm({ email: "", password: "" });

  const isDisabled = useMemo(() => {
    return Object.values(formValues).every((item) => !!item);
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-5"
            >
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
                className="bg-[#0095F6] py-1 text-white active:scale-95 transform transition w-full disabled:bg-opacity-50 disabled:scale-100 rounded text-sm font-semibold"
                disabled={!isDisabled}
              >
                Login
              </button>
            </form>

            <div className="flex items-center justify-center w-full my-5 space-x-2">
              <div className="h-[0.8px] w-full bg-slate-400" />
              <div className="text-sm font-semibold text-center text-gray-400">
                OR
              </div>
              <div className="h-[0.8px] w-full bg-slate-400" />
            </div>
            <div className="flex items-center justify-center w-full text-center text-indigo-900">
              <AiFillFacebook className="inline-block mr-2 text-2xl" />
              <span className="text-sm font-semibold">
                signup with Facebook
              </span>
            </div>

            <div className="w-full text-xs text-center text-indigo-900">
              Forgotten your password?
            </div>
          </div>
          <div className="w-full py-5 space-y-5 text-sm text-center bg-white border border-gray-300">
            Dont have account SignUp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
