import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";
import ProtectedRoutes from "./components/protected-routes";
import { auth } from "./firebase";
import CreateAccount from "./routes/create-account";
import Home from "./routes/home";
import Login from "./routes/login";
import Profile from "./routes/profile";

// Layout이 먼저 렌더된 후 Home이 render
// ProtectedRoutes의 children은 <Home/>과 <Profile/>이 될 수 있음
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  // 접근성 제한을 위해 layout과 독립적으로 분리 (비로그인 시 보여지는 화면)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  // justify-content : Wrapper로 감싸진 영역 전체가 center로 이동
  justify-content: center;
`;

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: 'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

  `;

function App() {
  const [isLoading, setLoading] = useState(true);

  // 파이어베이스가 준비될 때까지 기다림
  const init = async () => {
    await auth.authStateReady();
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
