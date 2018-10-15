// ==========
// BALL STUFF
// ==========

// BALL STUFF
function random (max){
    return Math.floor(Math.random() * Math.floor(max));
} 


var powerUp = {
    cx: random(400),
    cy: 0,
    radius: 10,
    yVel: 1,
    xVel: 0,
    caught : false,
};
function selectPowerUp(random){
    switch (random) {
    case 0:
        return "Length";
        break;
    case 1:
        return "Size";
        break;
    case 2:
        return "Half";
        break;
    }
}
powerUp.update = function (du) {
    // Remember my previous position
    var prevY = this.cy;
    var prevX = this.cx;
    // Compute my provisional new position (barring collisions)

    var nextY = prevY + this.yVel * du;
    var nextX = prevX + this.xVel * du;
    // Bounce off the paddles
    if (g_paddle1.collidesWith(prevY, prevX, nextY, nextX, this.radius))
    {
        this.cy = -10;
        let rng = random(3);
        g_paddle1.powerUp(selectPowerUp(rng));
    }
    this.cy += this.yVel * du;
    var margin = 4 * this.radius;
    if (nextY > g_canvas.width + margin) {
        this.reset();
    }
};

powerUp.reset = function () { 
    this.cx = random(400);
    this.cy = 0;
    this.yVel = 1;
};

powerUp.render = function (ctx) {
    ctx.fillStyle = "ORANGE";
    fillCircle(ctx, this.cx, this.cy, this.radius);
};