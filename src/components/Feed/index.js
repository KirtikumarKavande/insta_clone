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
  const { isModalOpen } = useContext(UserCtx);
  const dispatch = useContext(GlobalDispatchContext);

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

  console.log("media",media.src)
  console.log(file)
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
          console.log(e);
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

  const handleUploadPost = async () => {
    if (!file) return toast.error("please select a image first");
    setMedia((prev) => ({ ...prev, isUploading: true }));

    const toastId = toast.loading("uploading your post, wait a minute...");
    const postName = `posts/${uuidv4()}-${file.name}`;

    const storageRef = ref(storage, postName);

    try {
      const uploadTask = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(uploadTask.ref);
      console.log(url);
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

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const removePost=()=>{
   setFile('')
  }

  console.log(posts);
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
                <img type="image" src={media.src} id="fileElem" className="w-[40rem] h-[24rem]" />
              </div>
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
            {new Array(10).fill(0).map(() => {
              return <Post />;
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
