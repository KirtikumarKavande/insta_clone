import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Header from "../Header/Header";
import Modal from "../../utilitis/Modal/Modal";
import Post from "../Post/Post";
import { storage } from "../../lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from "@firebase/util";

import UserCtx from "../../context/userContext";
import { GlobalDispatchContext } from "../../context/userContextProvider";
import MyModal from "../../utilitis/Modal/Modal";

const Feed = () => {
  const dataFetchedRef = useRef(false);

  const email = localStorage.getItem("email");

  const [posts, setPosts] = useState([]);

  const { isModalOpen } = useContext(UserCtx);
  const dispatch = useContext(GlobalDispatchContext);
  const { user } = useContext(UserCtx);

  let objectDate = new Date();
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();

  const closeModal = () => {
    dispatch({
      type: "IS_MODALOPEN",

      isModalOpen: false,
    });
  };

  const [file, setFile] = useState("");

  const [media, setMedia] = useState({
    src: "",
    isUploading: false,
    caption: "",
  });

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetch(
      "https://instagram-clone-64f73-default-rtdb.firebaseio.com/postData.json "
    ).then((res) => {
      res.json().then((dataFromDb) => {
        for (const key in dataFromDb) {
          const obj = {
            id: key,
            image: dataFromDb[key].url,

            userName: dataFromDb[key].userName,
            caption: dataFromDb[key].caption,
            createdAt: dataFromDb[key].createdAt,
            likeCount: dataFromDb[key].likeCount,
            likedByArray: dataFromDb[key].likedByArray,
          };

          setPosts((prev) => [obj, ...prev]);
        }
      });
    });
  }, []);

  useEffect(() => {
    fetch(
      `https://instagram-clone-64f73-default-rtdb.firebaseio.com/onBoardedData.json?orderBy="email"&equalTo=${JSON.stringify(
        email
      )}`
    ).then((res) => {
      res.json().then((data) => {
        dispatch({
          type: "SET_USER",
          user: { email, userName: data[Object.keys(data)].userName },
        });
      });
    });
  }, []);

  useEffect(() => {
    const reader = new FileReader();

    const handleEvent = (e) => {
      switch (e.type) {
        case "load":
          return setMedia((prev) => ({
            ...prev,
            src: reader.result,
          }));
        case "error":
          return toast.error("something not working");
        default:
          return;
      }
    };

    if (file) {
      reader.addEventListener("load", handleEvent);
      reader.addEventListener("error", handleEvent);
      reader.readAsDataURL(file);
    }

    return () => {
      reader.removeEventListener("load", handleEvent);
      reader.removeEventListener("error", handleEvent);
    };
  }, [file]);
  const sendPostDataToDB = (url) => {
    fetch(
      "https://instagram-clone-64f73-default-rtdb.firebaseio.com/postData.json",
      {
        method: "POST",
        body: JSON.stringify({
          ...user,
          url: url,
          caption: media.caption,
          likeCount: 0,
          likedByArray: ["dummy"],
          createdAt: `${day}-${month}--${year}`,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      res.json().then((data) => {});
      location.reload();
    });
  };

  const handleUploadPost = async () => {
    if (!file) return toast.error("please select a image first");
    setMedia((prev) => ({ ...prev, isUploading: true }));

    const toastId = toast.loading("uploading your post, wait a minute...");
    const postName = `posts/${uuidv4()}-${file.name}`;

    const storageRef = ref(storage, postName);

    try {
      const uploadTask = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);

      sendPostDataToDB(url);
      toast.success("image has uploaded", {
        id: toastId,
      });
    } catch (error) {
      toast.error("failed to upload the image", {
        id: toastId,
      });
    } finally {
      setMedia({
        src: "",
        isUploading: false,
        caption: "",
      });
      setFile("");
      closeModal();
    }
  };

  const [loading, setLoading] = useState(false);

  const removePost = () => {
    setFile("");
  };

  return (
    <div className=" bg-[#FAFAFA] flex  ">
      <Header />
      <MyModal isOpen={isModalOpen}>
        <div className="flex items-center justify-start flex-col">
          {!file ? (
            <>
              <label
                htmlFor="post"
                className="text-blue-500 cursor-pointer text-3xl font-bold"
              >
                Select Image
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                value={file.name}
                type="file"
                name="post"
                id="post"
                className="hidden"
                multiple={false}
                accept="image/jpeg,image/png"
              />
            </>
          ) : (
            <>
              <div className=" flex justify-center items-end">
                <img
                  type="image"
                  src={media.src}
                  id="fileElem"
                  className="w-[40rem] h-[24rem]"
                />
              </div>
              <input
                placeholder="Type caption(optional)"
                value={media.caption}
                onChange={(e) => {
                  setMedia((prev) => ({ ...prev, caption: e.target.value }));
                }}
                className="w-full rounded-md h-10 mt-1 border border-gray-400 p-2"
              />
              <div className="flex space-x-6">
                <button
                  className="bg-[#0095F6] py-2 px-4 mt-4 text-white active:scale-95 transform transition  disabled:bg-opacity-50 select-none cursor-pointer disabled:scale-100 rounded text-xl font-semibold"
                  onClick={handleUploadPost}
                >
                  Upload
                </button>
                <button
                  className="bg-[#0095F6] py-2 px-4 mt-4 text-white active:scale-95 transform transition  disabled:bg-opacity-50 select-none cursor-pointer disabled:scale-100 rounded text-xl font-semibold"
                  onClick={removePost}
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </div>
      </MyModal>

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
            {posts.map((postItem) => {
              return <Post {...postItem} />;
            })}
          </section>
        </div>
        <div className="col-span-1 bg-blue-400 h-fit  fixed  right-0 w-[8.3rem] md:w-[16rem] lg:w-[25rem] ">
          tyhjvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvacxb
          nxxxxxxxxxs
        </div>
      </div>
    </div>
  );
};

export default Feed;
