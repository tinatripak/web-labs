import React from "react"
import "./myPage.css"

import Header from "./components/Header/Header"
import Content from "./components/Content/Content"
import Image from "./components/Image/Image"

function Home() {
    return (
        <div>
            <Header />
            <Content />
            <Image />
        </div>
    )
}

export default Home
