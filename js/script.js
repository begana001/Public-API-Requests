//global variables

const gellary = document.querySelector('#gallery');
const body = document.querySelector('body');

let personInfo;




//----------------------------------------------------
//  FETCH FUNCTIONS
//----------------------------------------------------

//check status and if it's ok resolve the promise and if it's not, reject.

const checkStatus = ( response ) => {
    if( response.ok ){
        return Promise.resolve( response )
    } else {
        return Promise.reject( new Error( response.statusText ))
    }
}


//function for fetching data 

const fetchData = (url) => {
    return fetch(url)
            .then( checkStatus )
            .then( res => res.json())
            .catch( err => console.log( err ))
}


// fetch data with given url and use the data to generate card 
// and save the data to a global variable "personInfo" to use the data for generating modal

Promise.all([ fetchData('https://randomuser.me/api/?results=12') ])
    .then( data => {
        generateCards(data[0].results)
        personInfo = data[0].results;
        
    })

//----------------------------------------------------
// HELPING FUNCTIONS
//----------------------------------------------------

// generate cards to display random 12 users with given data by fetching above

const generateCards = (data) => {

    const employees = data.map( employee => `
    <div class="card">
    <div class="card-img-container">
        <img class="card-img" src="${employee.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
        <p class="card-text">${employee.email}</p>
        <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
    </div>
    `).join('')

    gellary.innerHTML = employees;

    const cards = gellary.querySelectorAll('.card');


    // generate card modal by adding event handler on each cards
    // when a card is clicked, a modal pops up
    // when a card is clicked, get information object of certain index from "personInfo" variable
    // and update information in the modal

    for( let i = 0; i < cards.length; i ++ ){
        cards[i].addEventListener('click', () => {

            const modal = 
            `<div class="modal-container">
            <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${personInfo[i].picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${personInfo[i].name.first} ${personInfo[i].name.last}</h3>
                    <p class="modal-text">${personInfo[i].email}</p>
                    <p class="modal-text cap">${personInfo[i].location.city}</p>
                    <hr>
                    <p class="modal-text">${personInfo[i].cell}</p>
                    <p class="modal-text">
                    ${personInfo[i].location.street.number} ${personInfo[i].location.street.name}., ${personInfo[i].location.country} ${personInfo[i].location.postcode}
                    </p>
                    <p class="modal-text">Birthday: ${personInfo[i].dob.date.slice(0,10)}</p>
                </div>
            </div>
            </div>`

            body.insertAdjacentHTML('beforeend', modal)
            
            const modalContainer = document.querySelector('.modal-container');
            const closeButton = document.querySelector('#modal-close-btn');

            closeButton.addEventListener('click', () => {
            modalContainer.style.display = 'none';
            body.removeChild(modalContainer)
            });
        })
    }

}


