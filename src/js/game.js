const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameRunning = false;
let score = 0;

/* Initialize bird position */
resetBird(canvas);

/* INPUT */
document.addEventListener("keydown", e => {
    console.log(e);
    if (e.code === "Enter" && !gameRunning) startGame();
    if (e.code === "Space" && gameRunning) jump(bird);
});

/* START GAME */
function startGame() {
    console.log("Game running");
    document.getElementById("startMessage").style.display = "none";
    gameRunning = true;
    resetGame();
    loop();
}

function resetGame() {
    pipes = [];
    score = 0;
    resetBird(canvas);
}

/* PIPE GENERATION TIMER */
setInterval(() => {
    if (gameRunning) addPipe(canvas);
}, 1700);

/* DRAW */
function drawBackground() {
    let grd = ctx.createLinearGradient(0,0,0,canvas.height);
    grd.addColorStop(0, "#87CEEB");
    grd.addColorStop(1, "#B0E0E6");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = "#fff";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "left";
    ctx.fillText(score, 50, 80);
}

/* GAME LOOP */
function loop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();

    applyPhysics(bird);
    drawBird(ctx);
    drawPipes(ctx, canvas);

    updatePipes(
        bird,
        canvas,
        () => {
            score++;
            pointSound.play();
        },
        () => gameOver()
    );

    drawScore();

    if (bird.y <= 0 || bird.y + bird.height >= canvas.height) {
        gameOver();
    }

    requestAnimationFrame(loop);
}

/* GAME OVER */
function gameOver() {
    hitSound.play();
    gameRunning = false;

    setTimeout(() => {
        let sm = document.getElementById("startMessage");
        sm.innerHTML = `GAME OVER<br>Score: ${score}<br><span id="subtext">(Press ENTER to Restart)</span>`;
        sm.style.display = "block";
    }, 500);
}
