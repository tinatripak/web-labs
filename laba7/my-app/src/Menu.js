import React from "react"
import "./menu.css"

function Menu() {
    return (
        <div className="menu">
            <a className="menu-href" href="/home">My bio</a>
            <a className="menu-href" href="/products">Products</a>
        </div>
    )
}

export default Menu
