import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import {
  AttachFileButton,
  AttachFileInput,
  Form,
  SubmitBtn,
  TextArea,
} from "./styled/tweet-form-styled";

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
  const [file, setFile] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    console.log(user);
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;
    try {
      setLoading(true);
      // addDoc : Firebase SDK에 포함된 document 생성 함수
      // collection 함수의 파라미터에는 firebase 인스턴스와 collection 네임을 필요로 함
      // 추가하고자 하는 데이터를 넣어줌

      /* 1. Document 생성 */
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || "Anonymous",
        userId: user.uid,
      });

      // file이 들어왔는지..
      // ref 내 인자를 firebase.tsx에서 불러온 storage 객체와 업로드되는 파일을 저장할 URL 선택
      /* 2. 이미지 첨부 시 해당 경로로 저장 */
      if (file) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(locationRef, file);
        // 업로드한 사진의 URL
        // getDownloadURL은 string을 return하는 promise 함수
        const url = getDownloadURL(result.ref);

        // 해당 url을 document에 업데이트
        await updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        onChange={onChange}
        value={tweet}
        maxLength={180}
        rows={5}
        required
        placeholder="What Is Happening?"
      />
      {/* FileBtn의 htmlFor와 FileInput의 id를 연결할 것임 */}
      <AttachFileButton htmlFor="file">
        {file ? "Photo added ✔" : "Add Photo"}
      </AttachFileButton>
      {/* 해당 input이 이미지면 확장자 상관없음 */}
      <AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      ></AttachFileInput>
      <SubmitBtn
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
