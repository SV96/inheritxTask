import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import "./styles/tailwind.css"
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "./redux/reducer"
import { MantineProvider } from "@mantine/core"

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <MantineProvider>
                <RouterProvider
                    router={router}
                    fallbackElement={<h1>Loading...</h1>}
                />
            </MantineProvider>
        </Provider>
    </React.StrictMode>,
)
