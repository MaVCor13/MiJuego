document.addEventListener("DOMContentLoaded", () => {
    const ROCK = "rock";
    const PAPER = "paper";
    const SCISSORS = "scissors";

    const TIE = 0;
    const WIN = 1;
    const LOST = 2;

    let isPlaying = false;

    const rockBtn = document.getElementById("rock");
    const paperBtn = document.getElementById("paper");
    const scissorsBtn = document.getElementById("scissors");
    const resultText = document.getElementById("start-text");
    const userImg = document.getElementById("user-img");
    const machineImg = document.getElementById("machine-img");
    

    let playerWins = 0;
    let computerWins = 0;

    rockBtn.addEventListener("click", () => {
        play(ROCK);
    });
    paperBtn.addEventListener("click", () => {
        play(PAPER);
    });
    scissorsBtn.addEventListener("click", () => {
        play(SCISSORS);
    });

    function play(userOption) {
        if (isPlaying) return;

        isPlaying = true;

        userImg.src = "img/" + userOption + ".svg";

        resultText.innerHTML = "Jugando!";

        const interval = setInterval(function () {
            const machineOption = calcMachineOption();
            machineImg.src = "img/" + machineOption + ".svg";
        }, 200);

        setTimeout(function () {

            clearInterval(interval);

            const machineOption = calcMachineOption();
            const result = calcResult(userOption, machineOption);

            machineImg.src = "img/" + machineOption + ".svg";

            switch (result) {
                case TIE:
                    resultText.innerHTML = "Empate!";
                    break;
                case WIN:
                    resultText.innerHTML = "Ganaste!";
                    playerWins++;
                    break;
                case LOST:
                    resultText.innerHTML = "Perdiste!";
                    computerWins++;
                    break;
            }

            updateScores();

            if (playerWins === 3 || computerWins === 3) {
                showFinalResult();
            }

            isPlaying = false;
        }, 2000);
    }
    
    function updateScores() {
        document.getElementById("player-score").textContent = `Tu Puntaje: ${playerWins}`;
        document.getElementById("computer-score").textContent = `Puntaje PC: ${computerWins}`;
    }

    function showFinalResult() {
        let finalResult = "";
        if (playerWins > computerWins) {
            finalResult = "¡Felicidades! Ganaste al mejor de 5.";
        } else if (playerWins < computerWins) {
            finalResult = "¡Lo siento, perdiste al mejor de 5.";
        } else {
            finalResult = "¡La partida terminó en empate al mejor de 5!";
        }
        resultText.innerHTML = finalResult;
        rockBtn.style.display = "none";
        paperBtn.style.display = "none";
        scissorsBtn.style.display = "none";
    }

    function calcMachineOption() {
        const number = Math.floor(Math.random() * 3);
        switch (number) {
            case 0:
                return ROCK;
            case 1:
                return PAPER;
            case 2:
                return SCISSORS;
        }
    }

    function calcResult(userOption, machineOption) {
        if (userOption === machineOption) {
            return TIE;

        } else if (userOption === ROCK) {

            if (machineOption === PAPER) return LOST;
            if (machineOption === SCISSORS) return WIN;

        } else if (userOption === PAPER) {

            if (machineOption === SCISSORS) return LOST;
            if (machineOption === ROCK) return WIN;

        } else if (userOption === SCISSORS) {

            if (machineOption === ROCK) return LOST;
            if (machineOption === PAPER) return WIN;

        }
        return -1; // Manejo de caso inválido
    }
});
