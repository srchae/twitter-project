import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

export default function Home() {
  const Wrapper = styled.div`
    display: grid;
    gap: 50px;
    /** overflow-y : scroll => tweet 양식은 고정된 채, tweets 스크롤 */
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
    &::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline />
    </Wrapper>
  );
}
