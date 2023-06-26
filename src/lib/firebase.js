import { getApp, getApps, initializeApp } from "firebase/app";
 
import {getStorage}from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDwipkFw3qiq1a5kQ4vF4LoeXzCDH_-VBI",
  authDomain: "instagram-clone-64f73.firebaseapp.com",
  projectId: "instagram-clone-64f73",
  storageBucket: "instagram-clone-64f73.appspot.com",
  messagingSenderId: "708244125281",
  appId: "1:708244125281:web:b74912f3315c676b3cdc20"
};
const app=!getApps().length?initializeApp(firebaseConfig):getApp()

const storage=getStorage()
export {app,storage};