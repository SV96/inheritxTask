import { useForm } from "@mantine/form"
import axios from "axios"
import { TextInput } from "../Common/index"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"
const SignUp = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    // if there is different types of form input we can create a different obejct where type of key will be also defind
    // as of now all keys are of same type then only simple object is used
    const formFields = {
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const isCurrPathHome = currentPath === "/home"
    const userProfileDate = useSelector(state => state.user)

    if (isCurrPathHome) {
        delete formFields.password
        delete formFields.confirmPassword
    }

    const formValidators = {
        firstName: value =>
            value.trim() !== "" ? null : "First name is required",
        lastName: value =>
            value.trim() !== "" ? null : "Last name is required",
        mobileNumber: value =>
            /^\d{10}$/.test(value) ? null : "Invalid mobile number",
        email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        password: value => {
            if (!isCurrPathHome) {
                if (!value) {
                    return "Please enter a Password"
                } else if (value.length <= 8) {
                    return "Password must be at least 8 characters"
                }
                return undefined
            }
        },
        confirmPassword: (value, values) => {
            if (!isCurrPathHome) {
                if (!value) {
                    return "Please enter a Confirm Password"
                } else if (value !== values.password) {
                    return "Passwords do not match"
                }
                return undefined
            }
        },
    }

    const form = useForm({
        initialValues: formFields,
        validate: formValidators,
    })

    function convertToDisplayName(str) {
        let strCpy = str
        return strCpy.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
            return str.toUpperCase()
        })
    }

    const handleSubmit = async data => {
        const values = {...data}
        if (values.password !== values.confirmPassword) {
            alert("Password and confirm password do not match!")
            return
        } else {
            delete values.confirmPassword
        }
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}signup`, values)
            navigate("/login")
            form.reset()
        } catch (error) {
            alert(JSON.parse(error.request.response).message)
            console.log(JSON.parse(error.request.response).message)
        }
    }

    useEffect(() => {
        if (isCurrPathHome) {
            form.setValues(userProfileDate)
        } else {
            window.localStorage.clear()
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-lg w-full sm:w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {isCurrPathHome ? 'Profile': 'Sign Up'}
                </h2>
                <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
                    {Object.keys(formFields).map(value => {
                        const error = form.values[value]
                        return (
                            <TextInput
                                key={value}
                                error={error}
                                label={convertToDisplayName(value)}
                                {...form.getInputProps(value)}
                            />
                        )
                    })}
                    {!isCurrPathHome ? (
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Sign Up
                        </button>
                    ) : null}
                </form>
            </div>
        </div>
    )
}

export default SignUp
