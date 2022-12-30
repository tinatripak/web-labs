import "./goodsCard.css"

import React from "react"

function GoodsCard({ props}) {

    return (
        <div className="card mx-2 border">
            <img className="card-img-top mt-0"
                src={ require('../Products/' + props.image)}
            />

            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">Price: {props.price}</p>
            </div>
        </div>
    );
}
export default GoodsCard;