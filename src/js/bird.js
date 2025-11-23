window.birdImg = new Image();
birdImg.src = "src/assets/images/bird.png";

window.bird = {
    x: 0,
    y: 0,
    width: 48,
    height: 48,
    velocity: 0
};

window.drawBird = function(ctx) {
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

window.resetBird = function(canvas) {
    bird.x = canvas.width * 0.2;
    bird.y = canvas.height * 0.4;
    bird.velocity = 0;
}
