document.addEventListener('DOMContentLoaded', () => {
    const emojisArray = [
        '😀', '😀', '😄', '😄', 
        '😊', '😊', '😎', '😎', 
        '😍', '😍', '😂', '😂', 
        '🥰', '🥰', '😇', '😇'
    ];
    let gameBoard = document.getElementById('game-board');
    let resetButton = document.getElementById('reset-game');
    let shuffledEmojis = shuffle(emojisArray);
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    shuffledEmojis.forEach(emoji => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = emoji;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    resetButton.addEventListener('click', resetGame);

    function resetGame() {
        lockBoard = false;
        shuffledEmojis = shuffle(emojisArray);
        gameBoard.innerHTML = '';
        shuffledEmojis.forEach(emoji => {
            let cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = emoji;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
        firstCard = null;
        secondCard = null;
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.value;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }
});
