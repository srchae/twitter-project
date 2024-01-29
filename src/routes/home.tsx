import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

export default function Home() {
    const Wrapper = styled.div`
        display: grid;
        gap: 50px;
        overflow-y: scroll;
        grid-template-rows: 1fr 5fr;
    `;

    return (
        <Wrapper>
            <PostTweetForm/>
            <Timeline/>
        </Wrapper>
    )

}