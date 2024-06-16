import { signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useState } from "react";
import { useNavigate } from "react-router";
import GithubButton, { Logo } from "../components/github-btn";
import {
  Error,
  Form,
  Input,
  InputButton,
  StyledLink,
  Switcher,
  Title,
  Wrapper,
} from "../components/styled/common";
import { auth } from "../firebase";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    await signInWithEmailAndPassword(auth, email, password);
    if (isLoading || email === "" || password === "") return;

    try {
      setLoading(true);

      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Logo src="twitter-x-white.svg" />
        <Title>지금 로그인하세요.</Title>
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
        <InputButton type="submit" value={isLoading ? "Loading..." : "Login"} />
      </Form>
      {error !== "" ? (
        <Error>Firebase: Error (auth/email-already-in-use).</Error>
      ) : null}
      <Switcher>
        계정이 없으신가요?&nbsp;
        <StyledLink to="/create-account">생성하기</StyledLink>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
