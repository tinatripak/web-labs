import React from "react"

function GoodsCard({ props}) {
    return (
        <div className="card mx-1 border">
            <img className="card-img-top mt-0" alt={props.image}
                src={props.image}
            />

            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">Price: {props.price}</p>
            </div>
        </div>
    );
}
export default GoodsCard;