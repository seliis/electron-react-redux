// react
import React from "react"
import ReactDom from "react-dom"
import { HashRouter, Routes, Route } from "react-router-dom"

// redux
import { Provider } from "react-redux"
import { Store, Persistor } from "./store/storeIndex"
import { PersistGate } from "redux-persist/integration/react"

// component
import TestPage from "./component/testPage"

// root
import "./index.scss"
import App from "./app"

// render
ReactDom.render(
    <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/testPage" element={<TestPage/>}/>
                </Routes>
            </HashRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
)