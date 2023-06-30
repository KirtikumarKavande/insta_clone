import { configureStore } from "@reduxjs/toolkit";
import likesSlice from "./likesSlice";

const store = configureStore({reducer:{likes:likesSlice}});

export default store
