let eightElement = document.getElementById('eighth-element');
let ninthElement = document.querySelector('#ninth-element');
let photos = document.getElementById('photos');
let images = document.getElementById('images');
let counter = 2;
let addElement =  document.querySelectorAll(`.Add`);
let increseElement = document.querySelectorAll(`.Increase`);
let decreseElement = document.querySelectorAll(`.Decrease`);
let deleteElement = document.querySelectorAll(`.Delete`);

eightElement.addEventListener('click', () => {changeBackground(eightElement)});
ninthElement.addEventListener('click', () => {changeBackground(ninthElement)});

function changeBackground(el){
    el.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    el.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
}

function createFirstPhotoWithButtons(idName, imgSrc){
    let div = document.createElement('div');
    div.setAttribute('id', idName);
    div.classList.add("block-image");
    document.body.appendChild(div);

    let img = document.createElement('img');
    img.style.width = '400px';
    img.src = imgSrc;
    div.appendChild(img);

    createDiv(div);
    addEventToAddButton(idName);
    addEventToIncreaseButton(idName, img);
    addEventToDecreaseButton(idName, img);
    addEventToDeleteButton(idName, div);
}

function createDiv(parent){
    let divElement = document.createElement('div');
    divElement.classList.add("buttons");
    parent.appendChild(divElement);
}

function addButtons(action, block){
    let divButton = document.querySelector(`#${block} .buttons`);
    var elem = document.createElement('button');
    elem.classList.add("button", action);
    elem.innerHTML = action;
    divButton.appendChild(elem);
}

createFirstPhotoWithButtons('block1', 'images/lakes.jpg',);

function addImage(){
    addElement = document.querySelectorAll(`.Add`);

    for (let i = 0; i < addElement.length; i++) {
        addElement[i].style.display = "none";
    }

    createFirstPhotoWithButtons(`block${counter}`, `images/lakes.jpg`);
    counter++;

}
function increaseImage(image){
    image.style.width = `${image.width*1.3}px`;
}

function decreaseImage(image){
    image.style.width = `${image.width*0.7}px`;
}

function deleteImage(div){
    div.style.display = "none";
}

function addEventToAddButton(idName){
    addButtons('Add', idName);
    addElement = document.querySelectorAll(`.Add`);
    let lastadded = addElement[addElement.length- 1];
    lastadded.addEventListener('click', () => { addImage()});
}

function addEventToIncreaseButton(idName, img){
    addButtons('Increase', idName);
    increseElement = document.querySelectorAll(`.Increase`);
    let lastincreased = increseElement[increseElement.length- 1];
    lastincreased.addEventListener('click', () => { increaseImage(img)});
}

function addEventToDecreaseButton(idName, img){
    addButtons('Decrease', idName);
    decreseElement = document.querySelectorAll(`.Decrease`);
    let lastdecreased = decreseElement[decreseElement.length- 1];
    lastdecreased.addEventListener('click', () => { decreaseImage(img)});
}

function addEventToDeleteButton(idName, div){
    addButtons('Delete',  idName);
    deleteElement = document.querySelectorAll(`.Delete`);
    let lastdeleted = deleteElement[deleteElement.length- 1];
    lastdeleted.addEventListener('click', () => { deleteImage(div)});
}
