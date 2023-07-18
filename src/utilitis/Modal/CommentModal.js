import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { databaseUrl } from "../api";

export default function CommentModal({ isOpen, setIsCommentModal, data }) {
  const [apiData, setApiData] = useState([]);
  // console.log("data in modal", data);
  //   let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsCommentModal(false);
  }

  function openModal() {
    setIsCommentModal(true);
  }

  useEffect(() => {
    fetchData();
  }, [data, isOpen]);

  const fetchData = async () => {
    const res = await fetch(`${databaseUrl}/commentData/${data.id}.json`);
    let apiData = await res.json();
    setApiData(apiData);
    // console.log("apidata", apiData);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 w-[70rem] h-[70rem]"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  ">
                  <div className="mt-2 flex  ">
                    <div className="w-2/3 sticky top-0">
                      <img src={data.image} className="min-h-screen " />{" "}
                    </div>
                    <div className="w-1/3 overflow-y-scroll h-screen  ">
                      {apiData &&
                        apiData.map((item) => {
                          return (
                            <div>
                              <div className="flex">
                                <div className=" ml-2 ">
                                  <CgProfile size={25} />
                                </div>
                                <div className=" ml-2  font-semibold">
                                  {item.whoCommainted}
                                </div>
                              </div>
                              <div className="ml-[2.5rem] text-sm mb-3 ">
                                {item.comment}
                              </div>
                            </div>
                          );
                        })}
                      {!apiData && (
                        <span className="text-gray-500 font-bold mx-[6rem]">
                          No comment Found
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Back
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
