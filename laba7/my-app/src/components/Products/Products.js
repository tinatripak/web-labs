import React from "react"
import "./products.css"
import JsonProduct from "./JsonProduct"

function Products() {
    return (
        <div>
            <div className="name">
                <h2>Products</h2>
                <a className="menu-href" href="/home">My bio</a>
            </div>
            <JsonProduct/>
        </div>
    )
}

export default Products
