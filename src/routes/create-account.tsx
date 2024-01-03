import { useState } from "react";
import styled from "styled-components";

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
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
`;

const Title = styled.h1`
font-size: 42px;
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


export default function CreateAccount() {
    // 계정 생성을 시작할 때 상태값을 f -> t로 바꿀 것임
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        // 매개변수로 선언된 e에서 target을 구조분해할당
        // const {target : {name, value}} = e; -- 여기서부터 시작,,, 
    }
    return <Wrapper>
        <Form>
            <Input name="name" value={name} placeholder="name" type="text" required/>
            <Input name="email" value={email} placeholder="email" type="email" required/>
            <Input name="password" value={password} placeholder="password" type="password" required/>
            <Input type="submit" value="Create Account"/>
        </Form>
    </Wrapper>
}