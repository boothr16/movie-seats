const container = document.querySelector('.container'); // selects a single node (the first one)
const seats = document.querySelectorAll('.row .seat:not(.occupied'); // returns a node list
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

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

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected'); // add "selected" to seat's classList

        updateSelectedCount();
    }
})