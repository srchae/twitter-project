import React from "react";
import { Navigate } from "react-router";
import { auth } from "../firebase";

/* firebase에게 로그인한 사용자가 누구인지 물어보는 route component */
export default function ProtectedRoutes({children} : {children:React.ReactNode}) {
    /* firebase(auth)에 user 정보를 요청 */
    // currentUser : user의 로그인 여부를 알려줌
    // 로그인 된 user의 값을 넘겨주거나, null 값을 return 
    const user = auth.currentUser;

    // user가 로그인을 안 했을 경우는 Navigate를 통해 로그인 페이지(login.tsx)로 redirection! 
    if(user === null) {
        return <Navigate to="/login"/>
    }
    return children;
}

/* firebase에게 로그인한 사용자가 누구인지 물어보는 route component */
export default function ProtectedRoutes({children} : {children:React.ReactNode}) {
    /* firebase(auth)에 user 정보를 요청 */
    // currentUser : user의 로그인 여부를 알려줌
    // 로그인 된 user의 값을 넘겨주거나, null 값을 return 
    const user = auth.currentUser;

    // user가 로그인을 안 했을 경우는 Navigate를 통해 로그인 페이지(login.tsx)로 redirection! 
    if(user === null) {
        return <Navigate to="/login"/>
    }
    return children;
}