import React from "react";
import Header from "../Header/Header";
import Post from "../Post/Post";

const Feed = () => {
  return (
    <div className="w-full h-full bg-[#FAFAFA]">
      <Header />

      <div className="grid grid-cols-3 mt-20 w-full mx-auto max-w-screen-lg gap-6  ">
        <div className="col-span-2  w-full  ">
          <section className="flex items-center  overflow-x-scroll h-fit p-2 ">
            {new Array(20).fill(0).map((_, index) => (
              <div
                key={index}
                className=" w-14 h-14 border bg-black rounded-full ring-[2px]  ring-pink-500 ring-offset-2   mr-2  flex-none"
              />
            ))}
          </section>
          <section className=" flex flex-col gap-y-3 max-h-96">
            {new Array(10).fill(0).map(() => {
              return <Post />;
            })}
          </section>
        </div>
        <div className="col-span-1 bg-blue-400 h-fit  fixed  right-0 w-[8.3rem] md:w-[16rem] lg:w-[30rem] ">
          tyhjvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvacxb nxxxxxxxxxs
        </div>
      </div>
    </div>
  );
};

export default Feed;
