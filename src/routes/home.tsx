import { auth } from "../firebase"

export default function Home() {
    const Logout = () => {
        auth.signOut();
    }
    return (
        <h1>
        <button onClick={Logout}>logout!!!</button>
        </h1>
    )

}