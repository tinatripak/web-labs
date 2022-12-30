import React from "react"
import "./image.css"
import lake from "./lakes.jpg"

function Image() {

    let counter = 1;
    const addImage = () =>{
        const root = document.getElementById('root');
        const divImage = document.createElement('div');
        divImage.id = counter;
        root.append(divImage)
        
        const img = document.createElement('img');
        img.src = lake;
        img.className = 'lake-image'
        img.style.width="400px"
        divImage.append(img)

        const divButton = document.createElement('div');
        divButton.className="buttons";
        divImage.append(divButton);

        const buttonAdd = document.createElement('button');
        buttonAdd.className='button Add'
        buttonAdd.addEventListener('click', addImage)
        buttonAdd.innerHTML='Add';
        divButton.append(buttonAdd);

        const buttonIncrease = document.createElement('button');
        buttonIncrease.className='button Increase'
        buttonIncrease.addEventListener('click', () =>{
            img.style.width = `${img.width*1.3}px`;
        })
        buttonIncrease.innerHTML='Increase';
        divButton.append(buttonIncrease);

        const buttonDecrease = document.createElement('button');
        buttonDecrease.className='button Decrease'
        buttonDecrease.addEventListener('click', () =>{
            img.style.width = `${img.width*0.7}px`;
        })
        buttonDecrease.innerHTML='Decrease';
        divButton.append(buttonDecrease);

        const buttonDelete = document.createElement('button');
        buttonDelete.className='button Delete'
        buttonDelete.addEventListener('click', () =>{
            divImage.style.display = "none";
        })
        buttonDelete.innerHTML='Delete';
        divButton.append(buttonDelete);

    }

    const increaseImage = () =>{
        let image = document.querySelectorAll('.lake-image')[0];
        image.style.width = `${image.width*1.3}px`;
    }

    const decreaseImage = () =>{
        let image = document.querySelectorAll('.lake-image')[0];
        image.style.width = `${image.width*0.7}px`;
    }

    const deleteImage = () =>{
        let div = document.querySelectorAll('.block-image')[0];
        div.style.display = "none";
    }

    return (
        <div className="block1 block-image">
            <img className="lake-image" src={lake} width="400px"/>
            <div className="buttons">
                <button className="button Add" onClick={addImage}>Add</button>
                <button className="button Increase" onClick={increaseImage}>Increase</button>
                <button className="button Decrease" onClick={decreaseImage}>Decrease</button>
                <button className="button Delete" onClick={deleteImage}>Delete</button>
            </div>
        </div>
    )
}

export default Image
