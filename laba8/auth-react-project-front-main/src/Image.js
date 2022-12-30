import React from 'react';
import love from './lovely.png'
import './image.css'


const Image = () => {
    return (
        <div className='left-block col-7'>
            <div className='vertically-center-block'>
                <img className='photo' src={love} alt="Birds"/>
                <h5 className='text-center'>Love.Life.Flowers</h5>
                <p className='text-center text-birds'>Open the bloom of your heart and become a gift of beauty to the world</p>
            </div>
        </div>
    );
};

export default Image;