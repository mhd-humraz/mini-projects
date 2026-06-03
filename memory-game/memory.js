document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.querySelector('.game-container');
  const customizationPanel = document.querySelector('.customization-panel');
  const gameArea = document.querySelector('.game-area');
  const gameBoard = document.querySelector('.game-board');
  const movesDisplay = document.getElementById('moves');
  const timerDisplay = document.getElementById('timer');
  const restartButton = document.getElementById('restart');
  const winMessage = document.querySelector('.win-message');
  const finalMoves = document.getElementById('final-moves');
  const finalTime = document.getElementById('final-time');
  const playAgainButton = document.getElementById('play-again');
  const startGameButton = document.getElementById('start-game');

  // Theme symbols
  const themes = {
   animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐮', '🐷', '🐸'],
    fruits: ['🍎', '🍌', '🍒', '🍓', '🍊', '🍋', '🍉', '🍇', '🍑', '🍍', '🥝', '🥥'],
    vehicles: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚚', '🚲', '✈️'],
    emoji: ['😀', '😂', '😍', '😎', '🤩', '😜', '🙃', '🧐', '🤪', '😇', '🤠', '🥳']
  };

  // Game variables
  let cards = [];
  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let timer = 0;
  let timerInterval;
  let totalPairs = 8; // Default medium difficulty
  let currentTheme = 'animals';
  let currentCardStyle = 'rounded';
  let currentAnimationSpeed = 'normal';

  // Initialize game with customization
  function initGame() {
    // Get customization options
    currentTheme = document.getElementById('theme').value;
    currentCardStyle = document.getElementById('card-style').value;
    currentAnimationSpeed = document.getElementById('animation-speed').value;
    
    // Set difficulty
    const difficulty = document.getElementById('difficulty').value;
    switch(difficulty) {
      case 'easy':
        totalPairs = 4;
        break;
      case 'hard':
        totalPairs = 12;
        break;
      default:
        totalPairs = 8;
    }
    
    // Hide customization, show game
    customizationPanel.classList.add('hidden');
    gameArea.classList.remove('hidden');
    
    // Clear the board
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = timer;
    
    // Stop any existing timer
    clearInterval(timerInterval);
    
    // Set theme class
    gameContainer.className = 'game-container';
    gameContainer.classList.add(`theme-${currentTheme}`);
    
    // Create card pairs from selected theme
    const cardSymbols = themes[currentTheme].slice(0, totalPairs);
    const cardPairs = [...cardSymbols, ...cardSymbols];
    
    // Shuffle cards
    shuffleArray(cardPairs);
    
    // Create card elements
    cards = cardPairs.map((symbol, index) => {
      const card = document.createElement('div');
      card.className = `card ${currentCardStyle} ${currentAnimationSpeed}`;
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      
      const cardInner = document.createElement('div');
      cardInner.className = 'card-inner';
      
      const cardFront = document.createElement('div');
      cardFront.className = 'card-front';
      
      const cardBack = document.createElement('div');
      cardBack.className = 'card-back';
      cardBack.textContent = symbol;
      
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      
      card.addEventListener('click', flipCard);
      
      return card;
    });
    
    // Adjust grid based on difficulty
    let columns;
    if (totalPairs <= 6) columns = 4;
    else if (totalPairs <= 10) columns = 5;
    else columns = 6;
    
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    
    // Add cards to the board
    cards.forEach(card => gameBoard.appendChild(card));
    
    // Hide win message
    winMessage.classList.add('hidden');
  }
  
  // Shuffle array using Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Flip card when clicked
  function flipCard() {
    // Don't allow flipping if already flipped or matched
    if (flippedCards.length >= 2 || this.classList.contains('flipped') || flippedCards.includes(this)) {
      return;
    }
    
    // Start timer on first move
    if (moves === 0) {
      startTimer();
    }
    
    // Flip the card
    this.classList.add('flipped');
    flippedCards.push(this);
    
    // Check for match when two cards are flipped
    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = moves;
      
      const [firstCard, secondCard] = flippedCards;
      
      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        // Match found
        matchedPairs++;
        
        // Disable matched cards
        setTimeout(() => {
          firstCard.removeEventListener('click', flipCard);
          secondCard.removeEventListener('click', flipCard);
          firstCard.classList.add('matched');
          secondCard.classList.add('matched');
          flippedCards = [];
          
          // Check for win
          if (matchedPairs === totalPairs) {
            endGame();
          }
        }, 500);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          firstCard.classList.remove('flipped');
          secondCard.classList.remove('flipped');
          flippedCards = [];
        }, 1000);
      }
    }
  }
  
  // Start game timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      timerDisplay.textContent = timer;
    }, 1000);
  }
  
  // End game when all pairs are matched
  function endGame() {
    clearInterval(timerInterval);
    finalMoves.textContent = moves;
    finalTime.textContent = timer;
    winMessage.classList.remove('hidden');
  }
  
  // Return to customization screen
  function returnToCustomization() {
    gameArea.classList.add('hidden');
    winMessage.classList.add('hidden');
    customizationPanel.classList.remove('hidden');
  }
  
  // Event listeners
  startGameButton.addEventListener('click', initGame);
  restartButton.addEventListener('click', initGame);
  playAgainButton.addEventListener('click', returnToCustomization);
});
