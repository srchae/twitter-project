import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { AttachFileButton, AttachFileInput, Form, SubmitBtn, TextArea } from "./styled/tweet-form-styled";

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
            
            {/* FileBtn의 htmlFor와 FileInput의 id를 연결할 것임 */}
            <AttachFileButton htmlFor="files">Add Photo</AttachFileButton>
            {/* 해당 input이 이미지면 확장자 상관없음 */}
            <AttachFileInput id="files" accept="image/*"></AttachFileInput>
            <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>         
        </Form>
    )
}