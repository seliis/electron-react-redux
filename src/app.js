// react
import React from "react"
import { Link } from "react-router-dom"

// redux
import { useSelector, useDispatch } from "react-redux"
import { setComm, setData } from "./store/storeApp"

// electron
const { ipcRenderer } = window.require("electron")

// application
export default function App() {
    const cntComm = useSelector(
        (state) => state.app.cntComm
    )

    const cntData = useSelector(
        (state) => state.app.cntData
    )

    const dispatch = useDispatch()

    function SetComm() {
        const resp = ipcRenderer.sendSync("setComm", "ping")
        console.log(resp + ": " + parseInt(cntComm)+1)
        dispatch(setComm(cntComm+1))
    }

    function SetData() {
        const resp = ipcRenderer.sendSync("setData", cntComm)
        console.log("database value: " + resp)
        dispatch(setData(cntComm))
    }

    return (
        <div id="app">
            <h1>The Quick Brown Fox Jumps Over Lazy Dog</h1>
            <h1>추운 겨울에는 따뜻한 커피와 티를 마셔야지요</h1>
            <h1>0123456789</h1>
            <div className="btn-wrap">
                <div className="btn" onClick={() => SetComm()}>
                    Comm
                </div>
                <div className="btn" onClick={() => SetData()}>
                    SQL
                </div>
                <Link to="/testPage">
                    <div className="btn">
                        Route
                    </div>
                </Link>
            </div>
            <div className="resp-wrap">
                <div className="resp">
                    IPC 통신시험이 {cntComm}번 실행되었어요
                </div>
                <div className="resp">
                    데이터베이스에는 {cntData}(이)가 저장되어있어요
                </div>
            </div>
        </div>
    )
}