import { Outlet } from "react-router-dom";

export default function Layout() {
    // path가 home이 아닌 profile로 이동 시 Outlet 컴포넌트가 profile 컴포넌트로 대체되어짐
    return (
        <>
            <h2>layout!</h2>
            <Outlet/>
        </>
    )

}