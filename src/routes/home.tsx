import { useNavigate } from "react-router";
import { auth } from "../firebase"

export default function Home() {
    const navigate = useNavigate();
    const Logout = () => {
        auth.signOut();
        navigate("/login");
    }
    return (
        <h1>
        <button onClick={Logout}>logout!!!</button>
        </h1>
    )

}