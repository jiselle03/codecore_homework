document.addEventListener("DOMContentLoaded", function(event) { 
    const letters = document.querySelectorAll(".letter");
    const names = ["HANNAH ABBOTT", "KATIE BELL", "LAVENDER BROWN", "SUSAN BONES", "TERRY BOOT", "MANDY BROCKLEHURST", "MILLICENT BULSTRODE", "CHO CHANG", "PENELOPE CLEARWATER", "MICHAEL CORNER", "COLIN CREEVEY", "VINCENT CRABBE", "DENNIS CREEVEY", "ROGER DAVIES", "TRACEY DAVIS", "CEDRIC DIGGORY", "MARIETTA EDGECOMBE", "SEAMUS FINNEGAN", "MARCUS FLINT", "GREGORY GOYLE", "HERMIONE GRANGER", "DAPHNE GREENGRASS", "ANGELINA JOHNSON", "LEE JORDAN", "NEVILLE LONGBOTTOM", "LUNA LOVEGOOD", "ERNIE MACMILLAN", "DRACO MALFOY", "PANSY PARKINSON", "PADMA PATIL", "PARVATI PATIL", "HARRY POTTER", "ZACHARIAS SMITH", "ALICIA SPINNET", "DEAN THOMAS", "LISA TURPIN", "FRED WEASLEY", "GEORGE WEASLEY", "GINNY WEASLEY", "PERCY WEASLEY", "RONALD WEASLEY", "OLIVER WOOD", "BLAISE ZABINI"]
    const guessFirst = document.querySelector(".guess-first");
    const guessLast = document.querySelector(".guess-last");
    const reset = document.querySelector(".reset");
    const wrongGuesses = [];
    const name = names[Math.ceil(Math.random() * names.length -1)];
    const fullName = name.split(" ");
    const firstName = fullName[0].split("");
    const lastName = fullName[1].split("");
    const winSound = () => new Audio("./assets/Win.wav");
    const loseSound = () => new Audio("./assets/Lose.wav");

    firstName.forEach(l => {
        guessFirst.innerHTML += `<div class="letter-space"><small class="letter-guess" style="visibility: hidden;" name="${l}-guess">${l}</small></div>&nbsp;`
    });
    lastName.forEach(l => {
        guessLast.innerHTML += `<div class="letter-space"><small class="letter-guess" style="visibility: hidden;" name="${l}-guess">${l}</small></div>&nbsp;`
    });

    letters.forEach(letter => {
        letter.addEventListener("click", event => {
            event.currentTarget.classList.add("selected");
            checkAnswer(event.currentTarget.innerText);
        });
    });

    reset.addEventListener("click", event => {
        location.reload();
    });

    function checkAnswer(answer) {
        if (firstName.includes(answer) || lastName.includes(answer)) {
            firstName.forEach(l => {
                if (answer === l) {
                    document.querySelectorAll(`small[name="${l}-guess"]`).forEach(occurrence => {
                        occurrence.style.visibility = "visible";
                    });
                };
            });
            lastName.forEach(l => {
                if (answer === l) {
                    document.querySelectorAll(`small[name="${l}-guess"]`).forEach(occurrence => {
                        occurrence.style.visibility = "visible";
                    });
                };
            });
            checkWin();
        } else {
            wrongGuesses.push(answer);
            if (wrongGuesses.length === 6) {
                document.querySelector("img").outerHTML = `<img src="./assets/gallows${wrongGuesses.length}.jpg"></img>`;
                setTimeout(function() {
                    loseSound().play();
                }, 0);
                setTimeout(function(){ 
                    alert("Sorry! Better luck next time..."); 
                }, 100);
            } else {
                document.querySelector("img").outerHTML = `<img src="./assets/gallows${wrongGuesses.length}.jpg"></img>`;
            };
        };
    };

    function checkWin() {
        const answers = document.querySelectorAll(".letter-guess");
        let count = 0;
        answers.forEach(answer => {
            if (answer.style.visibility === "hidden") {
                count += 1;
            }
        });
        if (count === 0) {
            setTimeout(function() {
                winSound().play();
            }, 0); 
            setTimeout(function(){ 
                alert("Congratulations! You win!");
                location.reload();
            }, 100);
        };
    };

    document.addEventListener("keydown", event => {
        const { keyCode } = event;
        const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        for (let i = 65; i <= 90; i++) {
            if (keyCode === i) {
                for (let j = 0; j < 26; j++) {
                    if (j === keyCode - 65) {
                        checkAnswer(LETTERS[j]);
                        document.querySelector(`#${LETTERS[j]}`).classList.add("selected");
                    };
                };
            };
        };
    });
});
