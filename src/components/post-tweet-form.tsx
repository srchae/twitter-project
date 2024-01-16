import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: pretendard, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  /* font-weight: 600; */
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  }

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180 ) return;
    try {
      setLoading(true);
      // const doc = await addDoc(collection(db, "tweets"), {
      //   tweet,
      //   createdAt: Date.now(),
      //   userName: user.displayName || "Anonymous"
      // })
    }
    catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
    return (
        <Form onSubmit={onSubmit}>
            <TextArea onChange={onChange} value={tweet} maxLength={180} rows={5} required placeholder="What Is Happening?"/>
            <AttachFileButton htmlFor="files">Add Photo</AttachFileButton>
            {/* 해당 input이 이미지면 확장자 상관없음 */}
            <AttachFileInput id="files" accept="image/*"></AttachFileInput>
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>         
        </Form>
    )
}