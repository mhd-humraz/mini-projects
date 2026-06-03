 // Generate a random number between 1 and 100
        let targetNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;

        function checkGuess() {
            const userGuess = parseInt(document.getElementById("guess").value);
            attempts++;

            if (userGuess < targetNumber) {
                document.getElementById("message").textContent = "Too low! Try again.";
                document.getElementById("message").style.color = "#ff5722"; // Red color for wrong guesses
            } else if (userGuess > targetNumber) {
                document.getElementById("message").textContent = "Too high! Try again.";
                document.getElementById("message").style.color = "#ff5722"; // Red color for wrong guesses
            } else {
                document.getElementById("message").textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
                document.getElementById("message").style.color = "#ffcc00"; // Gold for winning
            }
        }
