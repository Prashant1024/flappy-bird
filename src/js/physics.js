let gravity = 0.4;
let jumpForce = -7;

function applyPhysics(bird) {
    bird.velocity += gravity;
    bird.y += bird.velocity;
}

function jump(bird) {
    flapSound.play();
    bird.velocity = jumpForce;
}
