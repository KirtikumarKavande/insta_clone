import React, { useMemo } from "react";
import Lottie from "react-lottie-player";
import lottieJson from "../../public/assets/animations/auth-page-animation.json";
import useForm from "../hooks/useForm";

const HomePage = () => {
  const { formValues, handleChange } = useForm({ email: "", password: "" });

  const isDisabled = useMemo(() => {
    return Object.values(formValues).every((item) => !!item);
  }, [formValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };
  return (
    <div className="h-screen w-screen justify-center items-center flex bg-[#FFFFFF] ">
      <div className="flex h-4/5 w-4/5">
        <div className=" w-full h-full">
          <Lottie
            loop
            animationData={lottieJson}
            play
            className="w-full h-full"
          />
        </div>
        <div className="w-full h-full border-red-900 p-1 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center space-y-5"
          >
            <div className="text-5xl my-5"> Insagram</div>

            <input
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Email"
              className="bg-gray-200 hover:bg-transparent focus:bg-transparent  placeholder:text-sm px-2 py-2 outline-none w-full rounded-md focus:border-gray-400 border"
            />
            <input
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Password"
              className="bg-gray-200 hover:bg-transparent focus:bg-transparent  placeholder:text-sm px-2 py-2 outline-none w-full rounded-md focus:border-gray-400 border"
            />
            <button
              className="bg-[#0098F6] py-1 w-full disabled:bg-opacity-40 text-white text-sm font-semibold rounded"
              disabled={!isDisabled}
            >
              Login
            </button>
          </form>
          <div>
            <div className="w-full flex items-center justify-center my-5 space-x-2"></div>
            <div className="h-[0.8px] w-2/5 bg-slate-400 inline-block" />
            <div className="text-gray-400 text-center w-1/5 inline-block">OR</div>
            <div className="h-[0.8px]  bg-slate-400 w-2/5 inline-block"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
