import GoodsCard from '../GoodsCard/GoodsCard';
import './jsonProduct.css'
import React, { useEffect, useState } from 'react';
// import fruits from "./fruits.json";

const JsonProduct = () => {
    const [fruits, setFruit] = useState([]);

    useEffect(() => {
        setFruit(require('./fruits.json').fruits)
    }, []);

    return (
        <div className='card-group container mt-5'>
            {fruits.map((fruit) => (
                <GoodsCard key={fruit.id} props={fruit} />
            ))}
        </div>
    );
};

export default JsonProduct;