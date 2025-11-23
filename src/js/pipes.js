let pipes = [];
let pipeSpeed = 4;


// Function to add pipe in canvas randomly
function addPipe(canvas) {
    let gap = 180;
    let topHeight = Math.random() * (canvas.height * 0.45);
    let bottomHeight = canvas.height - (topHeight + gap);

    pipes.push({
        x: canvas.width,
        topHeight,
        bottomHeight,
        scored: false
    });
}

// Function to update pipes
function updatePipes(bird, canvas, onScore, onHit) {
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

        if (!pipe.scored && pipe.x + 90 < bird.x) {
            pipe.scored = true;
            onScore();
        }

        if (
            bird.x + bird.width > pipe.x &&
            bird.x < pipe.x + 90 &&
            (
                bird.y < pipe.topHeight ||
                bird.y + bird.height > canvas.height - pipe.bottomHeight
            )
        ) {
            onHit();
        }
    });

    pipes = pipes.filter(p => p.x > -200);
}

// Function to draw pipes on canvas
function drawPipes(ctx, canvas) {
    pipes.forEach(pipe => {
        drawSinglePipe(ctx, pipe.x, 0, pipe.topHeight);
        drawSinglePipe(ctx, pipe.x, canvas.height - pipe.bottomHeight, pipe.bottomHeight, true);
    });
}

function drawSinglePipe(ctx, x, y, height, isBottom = false) {
    const pipeWidth = 90;
    const radius = 12;

    let grd = ctx.createLinearGradient(x, y, x + pipeWidth, y);
    grd.addColorStop(0, "#2E8B57");
    grd.addColorStop(1, "#3CB371");

    ctx.fillStyle = grd;
    ctx.strokeStyle = "#145A32";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + pipeWidth - radius, y);
    ctx.quadraticCurveTo(x + pipeWidth, y, x + pipeWidth, y + radius);
    ctx.lineTo(x + pipeWidth, y + height - radius);
    ctx.quadraticCurveTo(x + pipeWidth, y + height, x + pipeWidth - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#228B22";
    ctx.fillRect(x - 4, isBottom ? y - 20 : y + height, pipeWidth + 8, 20);
}
