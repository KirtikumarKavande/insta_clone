import React, { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { GrEmoji } from "react-icons/gr";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

import { BsBookmark } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { GlobalDispatchContext } from "../../context/userContextProvider";
import { databaseUrl } from "../../utilitis/api";
import { useDispatch, useSelector } from "react-redux";
import { likeAction, likesCountManageAction } from "../../store/likesSlice";
import UserCtx from "../../context/userContext";

const Post = (props) => {
  const likesData = useSelector((state) => state.likes.likes);
  const { user } = useContext(UserCtx);

  console.log(["props", props]);
  const dispatch = useDispatch();
  const dataFetchedRef = useRef(false);
  const dataFetchedRef2 = useRef(false);

  const [likes, setLikes] = useState();
  const [likesCount, setLikesCount] = useState(false);

  useEffect(() => {

    setLikes(likesData[props.id]?.likedByArray?.includes(user.userName));
  }, []);

  useEffect(() => {
    likeGetData();
  }, [likes]);

  const likeGetData = async () => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const res = await fetch(`${databaseUrl}/postData.json`);
    const data = await res.json();
    dispatch(likeAction(data));
  };



  console.log("likes", likesData);
  console.log("likes1", props);

 

  const AddLikeButton = () => {


    setLikes(true);
    
    if (likesData[props.id]) {
      fetch(`${databaseUrl}/postData/${props.id}.json`, {
        method: "PUT",
        body: JSON.stringify({
          ...props,
          url: props.image,
          likeCount: Number(likesData[props.id].likeCount) + 1,

          likedByArray:  [...likesData[props.id]?.likedByArray, user?.userName]
          
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      // dispatch(likesCountManageAction({likeCount:props.likeCount+1}))
      // dispatch(likeAction({...likesData,likeCount:likesData[props.id].likeCount+1}));
    }
  };

  const removeFromLike = () => {
    setLikes(false);

    const updatedArray = likesData[props.id].likedByArray.filter((item) => {
      return item !== user.userName;
    });
    if (likesData[props.id]) {
      fetch(`${databaseUrl}/postData/${props.id}.json`, {
        method: "PUT",
        body: JSON.stringify({
          ...props,
          url: props.image,
          likeCount: Number(likesData[props.id].likeCount) - 1,

          likedByArray: updatedArray,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
    }
    // dispatch(likeAction({...likesData,likeCount:likesData[props.id].likeCount-1}));

  };
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

      <img src={props.image} className="2 w-full h-96 " />
      <div className="3 flex justify-between">
        <div className="flex  mt-2 space-x-3">
          <div>
           

            {likesData[props.id]?.likedByArray?.includes(user.userName) && (
              <div onClick={removeFromLike}>
                <AiFillHeart
                  size={25}
                  className="cursor-pointer text-red-400"
                />
              </div>
            )}
            {!likesData[props.id]?.likedByArray?.includes(user.userName) && (
              <div onClick={AddLikeButton}>
                <AiOutlineHeart
                  size={25}
                  className="cursor-pointer hover:text-black/50"
                />
              </div>
            )}
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
      <div className="text-sm">{props.caption}</div>

      <div>{props.likesCount}</div>
      <div>
        {new Array(3).fill(1).map((_, i) => (
          <div className="flex space-x-2">
            <div className="font-semibold">username</div>
            <div>comment{i + 1}</div>
          </div>
        ))}
      </div>
      <div className="text-sm ">{props.createdAt}</div>
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
