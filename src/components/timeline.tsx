import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";

export interface ITweet {
  // 해당 필드는 데이터베이스를 참고
  photo: string;
  tweet: string;
  userId: string;
  username: string;
  createAt: number;
}

const Wrapper = styled.div``;
export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>();
  const fetchTweets = async () => {
    // collection을 대상으로 query(firebase 내장 함수) 생성
    const tweetsQuery = query(
      collection(db, "tweets"),
      orderBy("createAt", "desc")
    );

    // 문서 생성하기 (document)
    const snapshot = await getDocs(tweetsQuery);

    // ITweet을 만족하는 모든 데이터 추출
    const tweets = snapshot.docs.map((doc) => console.log(doc.data()));
  };
  useEffect(() => {
    fetchTweets();
  }, []);
  return <Wrapper>{JSON.stringify(tweets)}</Wrapper>;
}
