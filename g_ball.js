// ==========
// BALL STUFF
// ==========

// BALL STUFF

var g_ball = {
    cx: 50,
    cy: 200,
    radius: 10,

    xVel: 5,
    yVel: 4
};

g_ball.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_paddle1.collidesWith(prevY, prevX, nextY, nextX, this.radius))
    {
        this.yVel *= -1;
    }
    if (blockTest.collidesWith(prevY, prevX, nextY, nextX, this.radius))
    {
        this.yVel *= -1;
    }

    
    // Bounce off left, right and top edges
    if (nextX < 0 ||                             // right edge
        nextX > g_canvas.width) {               // left edge
        this.xVel *= -1;
    }
    if(nextY < 0) {
        this.yVel *= -1;            // Top edge
    }

    // Reset if we fall off the bottom edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;
    if (nextY > g_canvas.width + margin) {
        this.reset();
    }
    

    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;
};

g_ball.reset = function () {
    this.cx = 300;
    this.cy = 100;
    this.xVel = -5;
    this.yVel = 4;
};

g_ball.render = function (ctx) {
    fillCircle(ctx, this.cx, this.cy, this.radius);
};