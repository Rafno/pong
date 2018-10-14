// A generic constructor which accepts an arbitrary descriptor object
function Line(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}


// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.
Line.prototype.lineOfBlocks = [];
Line.prototype.halfWidth = 50;
Line.prototype.halfHeight = 10;
Line.prototype.create = function (yValue, size, hp) {
    for (let i = 0; i < size; i++) {
        let block = new Block({
            cx: 30 + i * 65,
            cy: yValue,
            health: hp
        });
        this.lineOfBlocks.push(block);
    }
};
// Moves the line down
Line.prototype.move = function (pauseButton) {
    if(!pauseButton){
    this.lineOfBlocks.forEach(block => {
        block.cy += 20;
        if(block.cy == g_paddle1.cy){
            gameOver();
        }
    });
}
};

Line.prototype.render = function (ctx) {
    this.lineOfBlocks.forEach(block => block.render(ctx));
};


Line.prototype.collidesWith = function (prevY, prevX,
    nextY, nextX,
    r) {
    let response = false;
    this.lineOfBlocks.forEach(block => {
        if (block.collidesWith(prevY, prevX, nextY, nextX, r)) {
            response = true;
        }
    });
    return response;
};