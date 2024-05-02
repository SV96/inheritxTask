export const TextInput = ({ label, error, ...rest }) => {

    let type= 'text' 

    if(label === 'Mobile Number') type ='number'
    else if(['Password','Confirm Password'].includes(label)) type = 'password'

    return (
        <div className="mb-4">
            <label
                htmlFor={label}
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                {label}
            </label>
            <input
                type={type}
                id="firstName"
                {...rest}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onInput={e => {
                    if (label === "Mobile Number") {
                        const maxLength = 10
                        const allowedFirstDigits = ["9", "8", "7", "6"]
                        if (
                            allowedFirstDigits.includes(e.target.value[0]) &&
                            e.target.value.length > maxLength
                        ) {
                            e.target.value = e.target.value.slice(0, maxLength)
                        } else if (
                            !allowedFirstDigits.includes(e.target.value[0])
                        ) {
                            e.target.value = ""
                        }
                        if (
                            label === "Mobile Number" &&
                            e.target.value.length > Number(10)
                        ) {
                            e.target.value = e.target.value.slice(0, 10)
                        }
                    } 
                   
                }}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    )
}
