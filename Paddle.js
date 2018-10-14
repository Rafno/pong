// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Paddle.prototype.halfWidth = 50;
Paddle.prototype.halfHeight = 10;

Paddle.prototype.update = function (du) {
    if (g_keys[this.GO_LEFT] && this.cx > this.halfWidth) {
      	this.cx -= 5 * du;
    } else if (g_keys[this.GO_RIGHT] && this.cx < g_canvas.width - this.halfWidth){
        this.cx += 5 * du;
    }
};

Paddle.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
};

Paddle.prototype.powerUp = function (type){
    if(type === "Length"){
        this.halfWidth = 100;
    }
    setTimeout(function() {
        this.halfWidth = 50;
    }, 3000);
}

Paddle.prototype.collidesWith = function (prevY, prevX, 
                                          nextY, nextX, 
                                          r) {
    var paddleEdge = this.cy;
    // Check X coords
    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        // Check Y coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};