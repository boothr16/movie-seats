const container = document.querySelector('.container'); // selects a single node (the first one)
const seats = document.querySelectorAll('.row .seat:not(.occupied'); // returns a node list
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; // + sign casts ticketPrice to a Number/Integer

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); // node list of selected seats
    

    // Copy selected seats into array
    // Map through array
    // Return a new array indices
    const seatsIndex = [...selectedSeats].map(seat =>
        [...seats].indexOf(seat)); // ... copies elements from selectedSeats to seatsIndex. map() returns a new array

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // convert array to string

    const selectedSeatsCount = selectedSeats.length; // number of selected seats

    count.innerText = selectedSeatsCount; // update text to new count
    total.innerText = selectedSeatsCount * ticketPrice; // update text to new total price
}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // convert string to array

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => { // executes when changing movie choice
    ticketPrice = +e.target.value; // ticket price updates to match movie
    setMovieData(e.target.selectedIndex, e.target.value); // saves menu index and price to local storage
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected'); // add "selected" to seat's classList

        updateSelectedCount();
    }
})

// Initial count and total set
updateSelectedCount();