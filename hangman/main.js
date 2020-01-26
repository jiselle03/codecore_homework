const letters = document.querySelectorAll(".letter");
const names = ["HANNAH ABBOTT", "KATIE BELL", "SUSAN BONES", "TERRY BOOT", "CHO CHANG", "PENELOPE CLEARWATER", "MICHAEL CORNER", "COLIN CREEVEY", "VINCENT CRABBE", "DENNIS CREEVEY", "ROGER DAVIES", "TRACEY DAVIS", "CEDRIC DIGGORY", "SEAMUS FINNEGAN", "MARCUS FLINT", "GREGORY GOYLE", "HERMIONE GRANGER", "DAPHNE GREENGRASS", "ANGELINA JOHNSON", "LEE JORDAN", "NEVILLE LONGBOTTOM", "LUNA LOVEGOOD", "ERNIE MACMILLAN", "DRACO MALFOY", "PANSY PARKINSON", "PADMA PATIL", "PARVATI PATIL", "HARRY POTTER", "ZACHARIAS SMITH", "ALICIA SPINNET", "DEAN THOMAS", "LISA TURPIN", "FRED WEASLEY", "GEORGE WEASLEY", "GINNY WEASLEY", "PERCY WEASLEY", "RONALD WEASLEY", "OLIVER WOOD", "BLAISE ZABINI"]
const hangman = document.querySelectorAll(".hangman");
const guessFirst = document.querySelector(".guess-first");
const guessLast = document.querySelector(".guess-last");
const reset = document.querySelector(".reset");

function checkWin() {
    const answers = document.querySelectorAll(".letter-guess");
    let count = 0;
    answers.forEach(answer => {
        if (answer.style.visibility === "hidden") {
            count += 1;
        }
    });
    if (count === 0) alert("Congratulations! You win!");
};

document.addEventListener("DOMContentLoaded", function(event) { 
    const wrongGuesses = [];
    const name = names[Math.ceil(Math.random() * names.length -1)];
    const fullName = name.split(" ");
    const firstName = fullName[0].split("");
    const lastName = fullName[1].split("");
    firstName.forEach(l => {
        guessFirst.innerHTML += `<div class="letter-space"><small class="letter-guess" style="visibility: hidden;" name="${l}-guess">${l}</small></div>&nbsp;`
    });
    lastName.forEach(l => {
        guessLast.innerHTML += `<div class="letter-space"><small class="letter-guess" style="visibility: hidden;" name="${l}-guess">${l}</small></div>&nbsp;`
    });

    letters.forEach(letter => {
        letter.addEventListener("click", event => {
            document.querySelectorAll(".letter").forEach(letter => {
                letter.classList.remove("selected");
            });
            event.currentTarget.classList.add("selected");

            if (firstName.includes(letter.innerText) || lastName.includes(letter.innerText)) {
                firstName.forEach(l => {
                    if (letter.innerText === l) {
                        document.querySelectorAll(`small[name="${l}-guess"]`).forEach(occurrence => {
                            occurrence.style.visibility = "visible";
                        });
                    };
                });
                lastName.forEach(l => {
                    if (letter.innerText === l) {
                        document.querySelectorAll(`small[name="${l}-guess"]`).forEach(occurrence => {
                            occurrence.style.visibility = "visible";
                        });
                    };
                });
                checkWin();
            } else {
                if (wrongGuesses.includes(letter.innerText)) {
                    alert("You've already selected that letter!");
                } else {
                    wrongGuesses.push(letter.innerText);
                    if (wrongGuesses.length === 6) {
                        document.querySelector("img").outerHTML = `<img src="./assets/gallows${wrongGuesses.length}.jpg"></img>`;
                        alert("Sorry! Better luck next time...");
                    } else {
                        document.querySelector("img").outerHTML = `<img src="./assets/gallows${wrongGuesses.length}.jpg"></img>`;
                    };
                };
            };
        });
    });

    reset.addEventListener("click", event => {
        location.reload();
    })


});

