import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useState } from "react";
import { useNavigate } from "react-router";
import GithubButton, { Logo } from "../components/github-btn";
import {
  Form,
  Input,
  InputButton,
  StyledLink,
  Switcher,
  Title,
  Wrapper,
} from "../components/styled/common";
import { auth } from "../firebase";

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    /** 로딩 중이거나 혹은 필수값(name, email, password)이 빈 값일 경우에는 해당 함수를 조기 종료 */
    if (isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      /** 
        1. 계정 생성
        2. 사용자의 이름 설정
        3. 홈페이지 리다이렉션
      */
      /** firebase의 createUserWithEmailAndPassword에 자격증명 기능이 내장되어 있음 (이를 변수로 치환) */

      /** 1. 계정 생성 */
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      /** 2. 사용자 프로필 업데이트 */
      await updateProfile(credential.user, { displayName: name });

      navigate("/");
    } catch (e) {
      console.log(e);
      if (e instanceof FirebaseError) {
        setError(e.message);
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Logo src="twitter-x-white.svg" />
        <Title>계정을 생성하세요.</Title>
        <Input
          onChange={handleChange}
          name="name"
          value={name}
          placeholder="name"
          type="text"
          required
        />
        <Input
          onChange={handleChange}
          name="email"
          value={email}
          placeholder="email"
          type="email"
          required
        />
        <Input
          onChange={handleChange}
          name="password"
          value={password}
          placeholder="password"
          type="password"
          required
        />
        <InputButton
          type="submit"
          value={isLoading ? "Loading..." : "Submit"}
        />
      </Form>
      {/* {error !== "" ? (
        <Error>Firebase: Error (auth/email-already-in-use).</Error>
      ) : null} */}
      <Switcher>
        이미 가입된 계정이 있습니까?&nbsp;
        <StyledLink to="/login">로그인</StyledLink>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
