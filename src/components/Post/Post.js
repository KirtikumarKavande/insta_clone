import React, { useContext, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

import { BsBookmark } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { GlobalDispatchContext } from "../../context/userContextProvider";

const Post = (props) => {
  console.log(props)
  return (
    <div className="mainContainer w-full border border-gray-100  ">
      <div className="1 upper flex bg-white p-2 justify-between">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 bg-gray-400 border border-pink-400 rounded-full " />
          <div className="  ml-2">{props.userName}</div>
        </div>
        <div className="items-center">
          <BsThreeDots size={25} />
        </div>
      </div>
      {/* <div className="2 w-full h-96 bg-black aspect-square ">{props.image}</div> */}

      <img src={props.image} className="2 w-full h-96 "/>
      <div className="3 flex justify-between">
        <div className="flex  mt-2 space-x-3">
          <div>
            <AiOutlineHeart
              size={25}
              className="cursor-pointer hover:text-black/50"
            />
          </div>
          <div>
            <FaRegComment
              size={25}
              className="cursor-pointer hover:text-black/50"
            />
          </div>
          <div>
            <IoShareOutline
              size={25}
              className="cursor-pointer hover:text-black/50"
            />
          </div>
        </div>
        <div>
          <BsBookmark
            size={25}
            className=" mt-2 cursor-pointer hover:text-black/50"
          />
        </div>
      </div>
      <div>100 likes</div>
      <div>
        {new Array(3).fill(1).map((_, i) => (
          <div className="flex space-x-2">
            <div className="font-semibold">username</div>
            <div>comment{i + 1}</div>
          </div>
        ))}
      </div>
      <div className="">3 hours ago</div>
      <div className="flex items-center w-full bg-white border border-l-gray-50">
        <div className="m-2 bg-white">
          <GrEmoji size={20} />
        </div>
        <form className="w-full">
          <div className="flex border border-t-gray-100 border-l-white">
            <input
              type="text"
              className="outline-none w-full h-10 bg-white  "
              placeholder="Add a Comment..."
            />
            <button className="text-blue-600 font-bold mr-2">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Post;
