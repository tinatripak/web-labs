import React from 'react';
import GoodsCard from '../GoodsCard/GoodsCard';
import './jsonProduct.css'
import fruits from "./fruits.json";

const JsonProduct = () => {
    return (
        <div className='card-group container mt-5'>
            {fruits.fruits.map((fruit) => (
                <GoodsCard key={fruit.id} props={fruit} />
            ))}
        </div>
    );
};

export default JsonProduct;