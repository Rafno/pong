// A generic constructor which accepts an arbitrary descriptor object
function Line(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Line.prototype.halfWidth = 50;
Line.prototype.halfHeight = 10;
let blockTest = new Block({
    cx : 100,
    cy : 50,
    isHit : false
});
Line.prototype.create = function () {
    let blockTest = new Block({
        cx : 100,
        cy : 50,
        isHit : false
 });
};

Line.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    blockTest.render(ctx);
};

Line.prototype.collidesWith = function (prevY, prevX, 
                                          nextY, nextX, 
                                          r) {
     blockTest.collidesWith(prevY, prevX, nextY, nextX, this.radius)
};