let playerScore = 0;
let computerScore = 0;
let isPlaying = false; // This is the anti-lag guard

// The dictionaries translated exactly from your Python code
const youdict = { "r": 1, "p": -1, "s": 0 };
const reversedict = { 1: "rock", "-1": "paper", 0: "scissors" };

// Emojis mapping for the display
const emojis = { "rock": "✊", "paper": "✋", "scissors": "✌️" };

function playGame(youstr) {
    // If the animation is currently running, ignore extra clicks
    if (isPlaying) return;
    isPlaying = true;

    // Grab elements from the HTML
    const playerHand = document.getElementById('player-hand');
    const computerHand = document.getElementById('computer-hand');
    const resultText = document.getElementById('result-text');
    const buttons = document.querySelectorAll('.choice-btn');

    // Disable all buttons to stop spam clicking
    buttons.forEach(btn => btn.disabled = true);

    // Reset hands to closed fists and update text
    playerHand.textContent = "✊";
    computerHand.textContent = "✊";
    resultText.textContent = "Waiting...";

    // Trigger the CSS shaking animations
    playerHand.classList.add('shake-player');
    computerHand.classList.add('shake-computer');

    // Wait exactly 1.2 seconds (matching the CSS animation) before calculating the result
    setTimeout(() => {
        // Stop the shaking animation
        playerHand.classList.remove('shake-player');
        computerHand.classList.remove('shake-computer');

        // Computer random choice logic
        const choices = [-1, 0, 1];
        const computer = choices[Math.floor(Math.random() * choices.length)];
        const you = youdict[youstr];

        // Change hands to show final choices
        playerHand.textContent = emojis[reversedict[you]];
        computerHand.textContent = emojis[reversedict[computer]];

        // Your exact Python if/elif/else logic!
        if (computer === you) {
            resultText.textContent = "It's a Draw!";
        } else {
            if (computer === -1 && you === 1) { // Paper vs Rock
                resultText.textContent = "You lose...";
                computerScore++;
            } else if (computer === 0 && you === 1) { // Scissors vs Rock
                resultText.textContent = "You win!!";
                playerScore++;
            } else if (computer === 1 && you === -1) { // Rock vs Paper
                resultText.textContent = "You win!!";
                playerScore++;
            } else if (computer === 0 && you === -1) { // Scissors vs Paper
                resultText.textContent = "You lose...";
                computerScore++;
            } else if (computer === 1 && you === 0) { // Rock vs Scissors
                resultText.textContent = "You lose...";
                computerScore++;
            } else if (computer === -1 && you === 0) { // Paper vs Scissors
                resultText.textContent = "You win!!";
                playerScore++;
            } else {
                resultText.textContent = "Something went wrong";
            }
        }

        // Update the scoreboard on screen
        document.getElementById('player-score').textContent = playerScore;
        document.getElementById('computer-score').textContent = computerScore;

        // Unlock the game and re-enable buttons for the next round
        isPlaying = false;
        buttons.forEach(btn => btn.disabled = false);

    }, 1200); // 1200 milliseconds = 1.2 seconds
}