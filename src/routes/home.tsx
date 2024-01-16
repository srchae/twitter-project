import PostTweetForm from "../components/post-tweet-form";
import { auth } from "../firebase"

export default function Home() {
import { useNavigate } from "react-router";
import { auth } from "../firebase"

export default function Home() {
    const navigate = useNavigate();
    const Logout = () => {
        auth.signOut();
        navigate("/login");
    }
    return (
        <>
                <PostTweetForm/>
        </>
    )

}