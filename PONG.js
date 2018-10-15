// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// PADDLE STUFF
// ============

// PADDLE 1

var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);

var g_paddle1 = new Paddle({
    cx : 100,
    cy : 350,
    
    GO_RIGHT   : KEY_D,
    GO_LEFT : KEY_A
});
// Line creates a line of blocks, and then moves them every 5 seconds.
let line = new Line();
line.create(50,6,3);
line.create(100,6,2);
line.create(150,6,1);

// Sets up a timer to move the line, pauses if pause is on. 
setInterval(function(){ line.move(g_isUpdatePaused) }, 1000);



// ============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    powerUp.update(du);
    g_ball.update(du);
    g_paddle1.update(du);
}

// Pause the game and disconnect the pause, ending the game.
function gameOver(){
    endGame = true;
    KEY_PAUSE = "YOU GET NOTHING";
    g_isUpdatePaused = true;
    if(confirm("Game over! Try again?")){
        line.destroy();
        line.create(50,6,3);
        line.create(100,6,2);
        line.create(150,6,1);
        g_ball.reset();
        endGame = false;
        KEY_PAUSE = 'P'.charCodeAt(0);
        g_isUpdatePaused = false;
    }
}

// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {
    g_ball.render(ctx);
    g_paddle1.render(ctx);
    powerUp.render(ctx);
    line.render(ctx);
}

// Kick it off
g_main.init();