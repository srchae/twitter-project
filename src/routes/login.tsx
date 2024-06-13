import { useState } from "react";
import { FirebaseError } from "@firebase/util";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../firebase";
import { Error, Form, Input, InputButton, Switcher, Title, Wrapper, StyledLink } from "../components/styled/styled";
import GithubButton from "../components/github-btn";


export default function Login() {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target : { name, value }} = e;
        if (name === "email") {
            setEmail(value); 
        } else if (name === "password") {
            setPassword(value);
        }

    }
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        await signInWithEmailAndPassword(auth, email, password);
        if (isLoading || email === "" || password === "") return;
        
        try {
            setLoading(true);
            
            navigate("/");

        } catch (e) {
            if(e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }
    return <Wrapper>
        <Form onSubmit={onSubmit}>
            <Title>Login to X</Title>
            <Input onChange={onChange} name="email" value={email} placeholder="email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="password" type="password" required/>
            <InputButton type="submit" value={isLoading ? "Loading..." : "Login"}/>
        </Form>
        {error !== "" ? <Error>Firebase: Error (auth/email-already-in-use).</Error> : null}
        <Switcher>
            Don't have an account?&nbsp;<StyledLink to="/create-account">Create One&rarr;</StyledLink>
        </Switcher>
        <GithubButton/>
    </Wrapper>
}