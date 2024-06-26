import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;

export const Input = styled.input`
  padding: 15px 5px;
  border-radius: 5px;
  color: white;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  background-color: transparent; /* 배경색을 투명으로 설정 */
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px, a {
    color: #1d9bf0;
  }
`;

export const InputButton = styled.input`
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
    background-color: #1d9bf0;
    color: white;
  }
`;

export const StyledLink = styled(Link)`
  color: #1d9bf0;
  text-decoration: none;
`;
