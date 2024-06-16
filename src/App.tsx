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
}`;

export default function App() {
  const [isLoading, setLoading] = useState(true);

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
