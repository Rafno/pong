// A generic constructor which accepts an arbitrary descriptor object
function Block(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Block.prototype.halfWidth = 50;
Block.prototype.halfHeight = 10;

Block.prototype.update = function (du) {
    
};

Block.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing

    if(!this.isHit){
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
                }
};

Block.prototype.collidesWith = function (prevY, prevX, 
                                          nextY, nextX, 
                                          r) {
    if(this.isHit) return false;    // no colliding if the object has been hit before.
    var paddleEdge = this.cy;
    // Check X coords
    if ((nextY - r < paddleEdge && prevY - r >= paddleEdge) ||
        (nextY + r > paddleEdge && prevY + r <= paddleEdge)) {
        // Check Y coords
        if (nextX + r >= this.cx - this.halfWidth &&
            nextX - r <= this.cx + this.halfWidth) {
            // It's a hit!
            this.isHit = true;
            return true;
        }
    
    }
    // It's a miss!
    return false;
};