// jatek logika
const WORD_LIST = ["CAT", "DOG", "RUN", "SUN", "CAR", "RED", "FUN", "MAN", "SEE", "ZOO", "all", "and", "are", "big", "but", "bye", "can", "for", "get", "her", "his", "let", "man", "may", "new", "not", "now", "one", "out", "run", "saw", "she", "two", "was", "you" ]
let TARGET_WORD = ""; // a kitalálandó szó

const boxes = document.querySelectorAll('.letter-box');// az összes betű mező
const messageElement = document.getElementById('message');// üzenet megjelenítő
const resetButton = document.getElementById('restart-button');// új játék gomb
const timerElement = document.getElementById('timer'); 

// game state
let isGameOver = false; // játék vége állapot
let timeCounter = 0; //ido szamlalo masodpercben bunteto idovel
let timer ;

// esemenyfigyelok beallitasa 
boxes.forEach(box => {// vegigmegy az osszes betu mezon
    box.addEventListener('input', handleInput);// bemenet esemeny kezelese


    // kulonleges eset: backspace kezelese
    box.addEventListener('keydown', (event) => { // billentyű lenyomás esemény kezelése
        // let index = parseInt(box.getAttribute('data-index'));

        if (event.key === 'Backspace') { // ha backspacet nyomnak és a mező üres
            event.preventDefault();
        }
    });
});

// új játék gomb eseménykezelő
resetButton.addEventListener('click', initializeGame);

initializeGame(); // a jatek elso elinditasa a betoltés után

function initializeGame() {
    // véletlenszerűen kiválaszt egy szót a listából
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);// véletlenszerű index
    TARGET_WORD = WORD_LIST[randomIndex];// kiválasztott szó

    isGameOver = false;// játék újraindítása
    messageElement.textContent = "Start typing!";// kezdo üzenet
    resetButton.disabled = true;// új játék gomb letiltása

    boxes.forEach(box => { // mezők alaphelyzetbe állítása
        box.value = "";
        box.classList.remove('correct'); //zold háttér eltávolítása
        box.disabled = false; // mezők engedélyezése
    });
    boxes[0].focus(); // fókusz az első mezőre

    timeCounter = 0;
    timerElement.textContent = timeCounter;
    timer = setInterval(() => {
        timeCounter++; 
        timerElement.textContent = timeCounter;
        
    }, 1000);
}


function handleInput(event) {// bemenet esemenykezelo fugveny
    if (isGameOver) return; // ha a játék véget ért, ne csináljon semmit

    let input = event.target;// az aktuális mező
    let index = parseInt(input.getAttribute('data-index'));// mező indexe

    // 
    let letter = input.value.toUpperCase().charAt(0);// csak az első karakter, nagybetűsítve
    input.value = letter; // mező értékének beállítása
    
    // ha a betű helyes ellenőrzése
    if (letter) {
        checkLetter(index, letter);

    }
}


// ellenőrzi, hogy a megadott betű helyes-e a cél szóban
function checkLetter(index, letter) {
    const targetLetter = TARGET_WORD[index].toUpperCase(); // a cél szó betűje az adott indexen
    const currentBox = boxes[index]; // az aktuális mező

    if (letter === targetLetter) {// ha a betű helyes
        currentBox.classList.add('correct'); // zöld háttér
        messageElement.textContent = "Good job!";

        // ha van egy következő mező, arra lép
        if (index < TARGET_WORD.length - 1) {// ha nem az utolsó mező
            boxes[index + 1].focus(); // fókusz a következő mezőre
        } else {
            // ha ez volt az utolsó mező, elenorizd a játék végét
            gameOver();
        }
    } else {// ha a betű helytelen
        currentBox.value = ''; // torli a helytelen betűt
        messageElement.textContent = 'Try again!';

        // fókusz vissza az aktuális mezőre

        currentBox.focus();// focusz a jelenlegi mezőre
        timeCounter += 1; 
        timerElement.textContent = timeCounter;
    }
}

// ellenőrzi, hogy a teljes szó helyes-e
function gameOver() {
    isGameOver = true; // játék vége
    messageElement.textContent = 'You won! Good job!'; // győzelmi üzenet
    resetButton.disabled = false; // // új játék gomb engedélyezése
    clearInterval(timer);
}




