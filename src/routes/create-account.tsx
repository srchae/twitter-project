import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/styled';
import { auth } from "../firebase";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 40px;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
    cursor: pointer;
    &:hover {
    opacity: 0.8;
    }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

const Switcher = styled.span`
    margin-top: 20px,
    a {
        color: #1d9bf0;
    }
`;

import GithubButton from "../components/github-btn";
import { InputButton, StyledLink } from '../components/styled';

export default function CreateAccount() {
  // 계정 생성을 시작할 때 상태값을 f -> t로 바꿀 것임
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 매개변수로 선언된 e에서 target을 구조분해할당
    // target에서 name과 value를 추출
    const {
      target: { name, value },
    } = e;
    console.log(e);
    // name과 "name"이 같다면 name을 value로 지정
    // input의 value를 통해 set의 값을 바꿔주기 위해 name으로 구분점을 두어 조건문 활용
    // input의 값이 변경되었을 때 어떤 input이 바뀌었는지 name을 통해 알 수 있음(className 느낌)
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // onSubmit 할 때 작동되는 이동 혹은 새로고침 막는 동작
    e.preventDefault();
    setError("");
    // 로딩 중이거나 혹은 필수값(name, email, password)이 빈 값일 경우에는 해당 함수를 일찍 종료
    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setLoading(true);
      /*  
                1. 계정 생성
                2. 사용자의 이름 설정
                3. 홈페이지 리다이렉션
            */
      // firebase의 createUserWithEmailAndPassword에 자격증명 기능이 내장되어 있음 (이를 변수로 치환)
      // ==> 유효성 검증 !!

      //1. 계정 생성
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. 사용자 프로필 업데이트
      // displayName은 name의 별칭으로 사용해줌 여기서 name은 useState에서 선언해준 name임
      await updateProfile(credential.user, { displayName: name });

      // 해당 코드를 실행 후 사용자를 home 화면으로 이동시키기 위해 Navigate 함수 사용
      // 즉, 모든 인자와 객체가 유효한 값을 띄고 있을 때 try에서 navigate(home)로 진입 후 try-catch문 종료 !
      navigate("/");
    } catch (e) {
      // 에러 처리를 위해 남겨둔 부분입니둥
      // FirebaseError: Firebase: Error (auth/email-already-in-use).
      // console.log(e)
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
    // console.log(name, email, password);
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Title>Join to X</Title>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
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
      {error !== "" ? (
        <Error>Firebase: Error (auth/email-already-in-use).</Error>
      ) : null}
      <Switcher>
        Already have an account?&nbsp;
        <StyledLink to="/login">Login to&rarr;</StyledLink>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
