import { signInWithEmailAndPassword } from "@firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
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

const InputStyle = styled.input`
    background-color: #1d9bf0;
`;

const Error = styled.span`
font-weight: 600;
color: tomato;
`;

const Switcher = styled.span`
    margin-top: 20px,
    a {
        color : #1d9bf0;
    }
`;



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
            <Input type="submit" value={isLoading ? "Loading..." : "Submit"}/>
        </Form>
        {error !== "" ? <Error>Firebase: Error (auth/email-already-in-use).</Error> : null}
        <Switcher>
            Don't have an account?<Link to="/create-account">Create One&rarr;</Link>
        </Switcher>
    </Wrapper>
}