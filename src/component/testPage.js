import React from "react"
import { Link } from "react-router-dom"

export default function TestPage() {
    return (
        <div id="testPage">
            <h1>나는 생각한다 고로 나는 존재한다</h1>
            <Link to="/">
                <div className="btn">
                    Home
                </div>
            </Link>
        </div>
    )
}