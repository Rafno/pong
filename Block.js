// A generic constructor which accepts an arbitrary descriptor object
function Block(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Block.prototype.halfWidth = 20;
Block.prototype.halfHeight = 10;

Block.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    switch (this.health) {
        case 3:
            ctx.fillStyle = "#8D220B";
            break;
        case 2:
            ctx.fillStyle = "#CF7B69";
            break;
        case 1:
            ctx.fillStyle = "#FE947D";
            break;
    }
    if (this.health > 0) {
        ctx.fillRect(this.cx - this.halfWidth,
            this.cy - this.halfHeight,
            this.halfWidth * 2,
            this.halfHeight * 2);
    }
    ctx.fillStyle = "BLACK";
};

Block.prototype.collidesWith = function (prevY, prevX,
    nextY, nextX,
    r) {
    if (this.health < 1) return false;    // no colliding if the object has been hit before.
    var paddleEdge = this.cy;
    // Check Y coords
    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        // Check X coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            // It's a hit!
            this.health--;
            this.cy = 500
            return true;
        }

    }
    // It's a miss!
    return false;
};