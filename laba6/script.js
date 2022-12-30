
const cards = document.getElementById('cards');
const randomButton = document.getElementById('random-button');

function getDataFromApi(){
    const url = 'https://randomuser.me/api';
    fetch(url)
    .then(response => response.ok ? response.json() : alert('User not found'))
    .then((data) => {
        makeCard(data.results[0]);
    })
    .catch((error)=>{
        console.log(error);
    });
}

function makeCard(data){
    let card = document.createElement('div');
    card.className = 'card';
    cards.prepend(card);

    let img = document.createElement('img');        
    img.src = data.picture.large;
    img.className = 'photo-users';
    card.appendChild(img);

    let text = document.createElement('div');
    text.className = 'text';
    card.appendChild(text);

    let cell = document.createElement('p');        
    cell.innerHTML = `<span>Cell: </span>${data.cell}`;
    cell.className = 'cell';
    text.appendChild(cell);

    let city = document.createElement('p');        
    city.innerHTML = `<span>City: </span>${data.location.city}`;
    city.className = 'city';
    text.appendChild(city);

    let postcode = document.createElement('p');        
    postcode.innerHTML = `<span>Postcode: </span>${data.location.postcode}`;
    postcode.className = 'postcode';
    text.appendChild(postcode);

    let email = document.createElement('p');        
    email.innerHTML = `<span>Email: </span>${data.email}`;
    email.className = 'email';
    text.appendChild(email);  
}
randomButton.addEventListener('click', ()=>{
    getDataFromApi();
})
