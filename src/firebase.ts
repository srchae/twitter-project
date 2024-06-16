import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzel-wQ5JfpB03rrpNeVnzBcTzp-gCQ4A",
  authDomain: "twitter-project-72bbf.firebaseapp.com",
  projectId: "twitter-project-72bbf",
  storageBucket: "twitter-project-72bbf.appspot.com",
  messagingSenderId: "56714007361",
  appId: "1:56714007361:web:452f8a7f85f3ac45d9c7c0",
  measurementId: "G-Y6V0SX6K12",
};

/** config 옵션을 통해 app 객체 생성 후, 인증 옵션을 통해 auth 객체 생성 */
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/** 데이터베이스와 스토리지에 대한 엑세스 권한 얻기 */
export const storage = getStorage(app);
export const db = getFirestore(app);
