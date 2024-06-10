const search = document.getElementById('search');

search.addEventListener('input', (e) => {
    const word = e.target.value;
    // cards.innerHTML = '';
    // reset();
    // if (word === '' || word === null) {
    //      cards.innerHTML = '';
    //     createAllCards();
    // }
    getDataThen(word);
    // createAllCards();
});


// const getDataThen = () => {
//     fetch("https://pokeapi.co/api/v2/pokemon?limit=200")
//         .then((res) => {
//             if (!res.ok) {
//                 throw new Error("Network response was not ok");
//             } else {
//                 return res.json();
//             }
//         }).then((data) => console.log(data))
//         .catch((err) => console.log(err));
// }

const getDataThen = function getDataThen(word) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q={${word}}&limit={limit}&appid={1d4056c7d6125d67846bd37c39d0abab}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            } else {
                return res.json();
            }
        }).then((data) => console.log(data))
        .catch((err) => console.log(err));
}