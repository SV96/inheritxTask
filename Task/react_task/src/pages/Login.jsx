import { useForm } from "@mantine/form"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TextInput } from "../Common/index"
import { setUserInfoAction } from "../redux/actions"
import { toast } from "sonner"

const Login = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const formFields = {
        email: "",
        password: "",
    }

    const formValidators = {
        email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        password: value =>
            value.length >= 8 ? null : "Password must be at least 8 characters",
    }

    const form = useForm({
        initialValues: formFields,
        validate: formValidators,
    })

    function convertToDisplayName(str) {
        return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
            return str.toUpperCase()
        })
    }

    const handleSubmit = async values => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}login`,
                values,
            )
            const {
                data: { token, user },
            } = response
            window.localStorage.setItem("token", token)
            window.localStorage.setItem("userDetails", JSON.stringify(user))
            navigate("/home")            
            dispatch(setUserInfoAction(user))
            form.reset()
        } catch (error) {
            toast.error("Invalid Credentails")
            console.log(error)
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                    {Object.keys(formFields).map(value => {
                        return (
                            <TextInput
                                key={value}
                                label={convertToDisplayName(value)}
                                error={form.values[value]}
                                {...form.getInputProps(value)}
                            />
                        )
                    })}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
