import { useNavigate } from "react-router";
import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";
import { auth } from "../firebase";

export default function Home() {
    const Wrapper = styled.div`
        display: grid;
        gap: 50px;
        overflow-y: scroll;
        grid-template-rows: 1fr 5fr;
    `;

    const navigate = useNavigate();
    const Logout = () => {
        auth.signOut();
        navigate("/login");
    }
    return (
        <Wrapper>
            <PostTweetForm/>
            <Timeline/>
        </Wrapper>
        <h1>
        <button onClick={Logout}>logout!!!</button>
        </h1>
    )

}