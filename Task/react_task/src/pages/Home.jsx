import { useEffect } from "react"
import SignUp from "./Signup"
import { useNavigate } from "react-router-dom"

export default function App() {
    const navigate = useNavigate()
    const handleLogout = () => {
        window.localStorage.clear()
        navigate("/login")
    }

    useEffect(() => {
        if (window.localStorage.getItem("token") === null) handleLogout()
    }, [])
    return (
        <>
            <header className="bg-gray-800 text-white flex justify-between items-center p-4">
                <div></div>
                <div>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </button>
                </div>
            </header>
            <SignUp />
        </>
    )
}
