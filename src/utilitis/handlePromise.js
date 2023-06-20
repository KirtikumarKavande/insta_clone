import { signIn, signUp } from "./api";

export const handleLoginPromise = async (payload) => {
  const default_Obj = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${signIn}AIzaSyDwipkFw3qiq1a5kQ4vF4LoeXzCDH_-VBI`,
      default_Obj
    );
    const data = await response.json();

    console.log("payload", data);
    if (email) {
      return data;
    } else {
      return new Error("error occured");
    }
  } catch (error) {
    return error;
  }
};

export const handleSignupPromise = async (payload) => {
  const default_Obj = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${signUp}AIzaSyDwipkFw3qiq1a5kQ4vF4LoeXzCDH_-VBI`,
      default_Obj
    );
    const data = await response.json();
    if (email) {
      return data;
    } else {
      return new Error("error occured");
    }
  } catch (error) {
    return error;
  }
};
