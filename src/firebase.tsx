import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzel-wQ5JfpB03rrpNeVnzBcTzp-gCQ4A",
  authDomain: "twitter-project-72bbf.firebaseapp.com",
  projectId: "twitter-project-72bbf",
  storageBucket: "twitter-project-72bbf.appspot.com",
  messagingSenderId: "56714007361",
  appId: "1:56714007361:web:452f8a7f85f3ac45d9c7c0",
  measurementId: "G-Y6V0SX6K12"
};

// Firebase 초기화
/* config 옵션을 통해 app 객체 생성 후, 인증 옵션을 통해 auth 객체 생성*/
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);