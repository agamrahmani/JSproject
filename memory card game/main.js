const imagesArray = [
    "./images/bee.png",
    "./images/cow.png",
    "./images/dog.png",
    "./images/fox.png",
    "./images/lion.png",
    "./images/turtle.png",
    "./images/bee.png",
    "./images/cow.png",
    "./images/dog.png",
    "./images/fox.png",
    "./images/lion.png",
    "./images/turtle.png"];

let divs = [];
let newArray = [];
let cards;
let cardsArray = [];

let numberClick = 1;
let count = 0;
let compare = [];
let same = 0;
let isFirstGame = true;



function createBoard(imagesArray) {
    for (i = 0; i < imagesArray.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('card');
        const imageElem = document.createElement('img');
        imageElem.src = imagesArray[i];
        imageElem.classList.add('imageElem');
        imageElem.classList.add('notSee');
        newDiv.appendChild(imageElem);
        document.getElementById('board').appendChild(newDiv);
    }
    return document.querySelectorAll("#board>.card");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        return array;
    }
}

function clearBoard() {
    divs.forEach(div => {
        div.removeChild(document.querySelector('.imageElem'));
        div.remove();
    });
    count = 0;
    same = 0;
}

function rotate(elem) {
    numberClick += 1;
    elem.classList.add('rotate');
    setTimeout(() => {
        elem.querySelector('.imageElem').style.display = "block";
    }, 250);

    setTimeout(() => {
        elem.classList.remove('rotate');
        elem.querySelector('.imageElem').style.display = "none";
    }, 1000);

    setTimeout(() => {
        if (numberClick = 3) {
            numberClick = 1;
        }
    }, 2000);

    elem.querySelector('.imageElem');
    compare.push(elem.querySelector('.imageElem'));
    if (count == 1) {
        if (compare[0].src == compare[1].src) {
            same += 1;
            cardsArray.forEach(card => {
                if (card.querySelector('.imageElem').src == compare[0].src) {
                    setTimeout(() => {
                        card.style.transform = 'translateX(100vw)';
                        card.style.opacity = '0';
                    }, 500);
                }
            });
        }
        compare.splice(0, 2);
        count = 0;
        if (same == 6) {
            gameover();
        }
    }
    else {
        count += 1;
    }
}

function gameover() {
    setTimeout(() => {
        const winnerMessage = document.createElement('div');
        winnerMessage.classList.add('message');
        winnerMessage.textContent = 'כל הכבוד הצלחתם לנחש הכל!';
        document.body.appendChild(winnerMessage);
        setTimeout(() => {
            winnerMessage.classList.add('visible');
        }, 0);;
    }, 1000);
    setTimeout(() => {
        let msg = document.querySelector('.message');
        msg.remove();
        isFirstGame = false;
        newGame();
    }, 2000);
}


function newGame() {
    if (isFirstGame) {
        newArray = shuffleArray(imagesArray);
        divs = createBoard(newArray);
    }
    else {
        clearBoard();
        newArray = shuffleArray(imagesArray);
        divs = createBoard(newArray);
    }

    numberClick = 1;
    cards = document.querySelectorAll('.card');
    cardsArray = Array.from(cards);
    cardsArray.forEach(card => {
        card.addEventListener('click', (e) => {
            if (numberClick < 3) {
                rotate(e.target);
            }
        });
    });


}