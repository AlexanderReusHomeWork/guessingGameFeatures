class GuessingApp {
  #usedNumbers = [];
  #numberRange;
  #randomNumber;
  #numberOfTries;
  #attempts = 1;
  #formGuessNumber = document.querySelector(".form-guess-number");
  #guessNumberInput = document.querySelector("#guess");
  #formMaxNumber = document.querySelector(".form-max-number");
  #maxNumberInput = document.querySelector("#max");
  #usedNumbersElem = document.querySelector(".used-numbers");
  #message = document.querySelector(".msg");
  #maxBtn = document.getElementById("max-btn");
  #guessBtn = document.getElementById("guess-btn");
  #startGameBtn = document.getElementById("start-game-btn");
  #restartBtn = document.getElementById("restart-game-btn");
  #tryAgainBtn = document.getElementById("again-game-btn");
  #startGameErr = document.getElementById("start-game-err");
  #numberContainer = document.querySelector(".number-container");
  #numberOfAttempts = document.querySelector(".number-of-attempts");
  constructor() {
    this.#formMaxNumber.addEventListener("submit", this.getMaximumNumber);
    this.#formGuessNumber.addEventListener("submit", this.getUserGuess);
    this.#startGameBtn.addEventListener("click", this.startGame);
    this.#restartBtn.addEventListener("click", this.restartHandler);
    this.#tryAgainBtn.addEventListener("click", this.restartHandler);
  }
  getUserGuess = (e) => {
    e.preventDefault();
    const num = +this.#guessNumberInput.value;
    this.checkUserGuess(num);
    console.log(num);
    if (!isNaN(num)) {
      if (num <= 0) return;
      if (num > this.#numberRange) return;
      this.displayNumberOfAttempts();
    }
  };

  getMaximumNumber = (e) => {
    e.preventDefault();
    let num = +this.#maxNumberInput.value;
    this.checkMaximumNumber(num);

    console.log(this.#numberRange);
    console.log(this.#numberOfTries);
    console.log(this.#randomNumber);
  };

  startGame = () => {
    if (!this.#numberRange) {
      this.#startGameErr.classList.remove("display-none");
      setTimeout(() => {
        this.#startGameErr.classList.add("display-none");
      }, 2000);
    } else {
      this.#guessBtn.classList.remove("display-none");
      this.#guessNumberInput.classList.remove("display-none");
      this.#startGameBtn.classList.add("display-none");
      this.#restartBtn.classList.remove("display-none");
    }
  };

  checkMaximumNumber = (num) => {
    if (num > 200) {
      this.#formMaxNumber.insertAdjacentHTML(
        "beforeend",
        `
  <p style="color:red;margin-top:10px;">Pick a number less than 200.</p>
  `
      );
      this.#maxNumberInput.value = "";
      setTimeout(() => {
        this.#formMaxNumber.removeChild(this.#formMaxNumber.children[3]);
      }, 2000);
    } else if (num === 0) {
      this.#formMaxNumber.insertAdjacentHTML(
        "beforeend",
        `
  <p style="color:red;margin-top:10px;">Pick a number greater than 0.</p>
  `
      );
      this.#maxNumberInput.value = "";
      setTimeout(() => {
        this.#formMaxNumber.removeChild(this.#formMaxNumber.children[3]);
      }, 2000);
    } else if (isNaN(num)) {
      this.#formMaxNumber.insertAdjacentHTML(
        "beforeend",
        `
  <p style="color:red;margin-top:10px;">Please enter a number.</p>
  `
      );
      this.#maxNumberInput.value = "";
      setTimeout(() => {
        this.#formMaxNumber.removeChild(this.#formMaxNumber.children[3]);
      }, 2000);
    } else {
      this.#numberRange = +num;
      this.#randomNumber = Math.ceil(Math.random() * this.#numberRange);
      const numOfTry = Math.ceil(this.#numberRange * 0.25);
      this.#numberOfTries =
        numOfTry < 3 ? 3 : Math.ceil(this.#numberRange * 0.25);
      this.#maxNumberInput.classList.add("display-none");
      this.#maxBtn.classList.add("display-none");
      this.#formMaxNumber.insertAdjacentHTML(
        "beforeend",
        `
      <p style="color:#0cfaa0;margin-top:10px;">You picket your number, now you can start the game.</p>
      `
      );
      this.#maxNumberInput.value = "";
    }
  };

  checkUserGuess = (num) => {
    if (isNaN(num)) {
      this.#message.textContent = "Please enter a number!";
      this.#message.classList.remove("display-none");
      setTimeout(() => {
        this.#message.classList.remove("display-none");
        this.#message.textContent = "";
      }, 2000);
      this.#guessNumberInput.value = "";
    } else if (num > this.#numberRange || num === 0) {
      this.#message.textContent = `Please enter a number in range from 1 to ${
        this.#numberRange
      }`;
      this.#message.classList.remove("display-none");
      setTimeout(() => {
        this.#message.classList.remove("display-none");
        this.#message.textContent = "";
      }, 2000);
      this.#guessNumberInput.value = "";
    } else {
      this.#usedNumbers.push(num);
      this.#guessNumberInput.value = "";
      this.renderUsedNumbers();
      this.renderMessage();
    }
  };

  renderUsedNumbers = () => {
    const usedNumbersHTML = this.#usedNumbers.map((num) => {
      return `
    <span>${num}</span>
    `;
    });
    this.#usedNumbersElem.innerHTML = "";
    this.#usedNumbersElem.insertAdjacentHTML(
      "beforeend",
      usedNumbersHTML.join("")
    );
  };

  displayNumberOfAttempts = () => {
    this.#numberOfAttempts.children[0].textContent = this.#attempts++;
  };

  renderMessage = () => {
    this.#numberOfTries--;
    if (
      this.#numberOfTries === 0 &&
      this.#usedNumbers.at(-1) !== this.#randomNumber
    ) {
      this.loseHandler();
      return;
    }
    if (this.#usedNumbers.at(-1) < this.#randomNumber) {
      this.#message.textContent = `The ${this.#usedNumbers.at(
        -1
      )} is less than ? number, you have ${this.#numberOfTries} more attempt/s`;
    } else if (this.#usedNumbers.at(-1) > this.#randomNumber) {
      this.#message.textContent = `The ${this.#usedNumbers.at(
        -1
      )} is greater than ? number, you have ${
        this.#numberOfTries
      } more attempt/s`;
    } else {
      this.#message.textContent = "You WON! Press restart button to go again.";
      this.winHandler();
    }
  };

  winHandler = () => {
    this.#guessBtn.classList.add("display-none");
    this.#guessNumberInput.classList.add("display-none");
    this.#numberContainer.style.backgroundColor = "green";
    this.#numberContainer.textContent = "";
    this.#numberContainer.textContent = this.#usedNumbers.at(-1);
  };
  loseHandler = () => {
    this.#guessBtn.classList.add("display-none");
    this.#guessNumberInput.classList.add("display-none");
    this.#numberContainer.textContent = "";
    this.#numberContainer.textContent = this.#randomNumber;
    this.#message.textContent = "";
    this.#message.textContent = "You lost, want to try again?";
    this.#restartBtn.classList.add("display-none");
    this.#tryAgainBtn.classList.remove("display-none");
    this.#numberContainer.style.backgroundColor = "red";
  };
  restartHandler = () => {
    this.#guessBtn.classList.add("display-none");
    this.#guessNumberInput.classList.add("display-none");
    this.#guessNumberInput.value = "";
    this.#startGameBtn.classList.remove("display-none");
    this.#restartBtn.classList.add("display-none");
    this.#tryAgainBtn.classList.add("display-none");
    this.#numberContainer.style.backgroundColor = "#163489";
    this.#usedNumbers = [];
    this.#numberRange = null;
    this.#randomNumber = null;
    this.#numberOfTries = null;
    this.#attempts = 1;
    this.#numberOfAttempts.children[0].textContent = "0";
    this.#maxNumberInput.classList.remove("display-none");
    this.#maxBtn.classList.remove("display-none");
    this.#formMaxNumber.removeChild(this.#formMaxNumber.children[3]);
    this.#usedNumbersElem.innerHTML = "";
    this.#message.innerHTML = "";
    this.#numberContainer.textContent = "?";
  };
}

const guess = new GuessingApp();
