var obstacles = [];
var loopDelay = 16;
var rockRadius = 25;

var obstacle = {
    radius: 0,
    centerx: 0,
    centery: 0,
    speed: 0,
    active: 0,
};

var nest = { /* added from nest.js */
    radius: 10,
    centerx : 200,
    centery : 200,
    speed: 0,
    active: 0,
};

var gameState =
{
    level: 5,
    timer: 0, /*loop iterations*/
    activeObst: 0,
    activeNest:0, /* added from nest.js */
};

//Distances in pixels
var bird = {
    centerx : 100,
    centery : 100,
    radius: 25
}

$(document).ready(
    function () {
        var runLoop = setInterval(gameLoop, loopDelay);
        //make dummy bird
        var $birdMom = $("#gameBox");
        $bird = $("<div>");
        $bird.attr("id", "bird");
        $bird.attr("class", "bird");
        $bird.css("top", bird.centery);
        $bird.css("left", bird.centerx);
        $birdMom.append($bird);

        //Add the galaxy backdrop
        var $backgroundMom = $("#gameBox");
        var $galaxyGraphics = $("<div>");
        $galaxyGraphics.attr("class", "sliding-galaxies");
        $galaxyGraphics.appendTo($backgroundMom);

        //The number of rocks is determined by the level
    }
);

function gameLoop() {
    //onsole.log("Game loop executing");
    generateAsteroids();
    generateNest(); /* added from nest.js */
    destroyInactiveAsteroids();
    detectCollision();
    updateBird();
    gameState.timer++;
}

function generateNest() { /* added from nest.js */
    if (gameState.timer == 1875) {
        
        var $nestMom = $("#gameBox");
        var $nest;
        $nest = $("<div>");
        $nest.attr("id", "nest");
        $nest.attr("class", "nest");
        $nest.css("top", nest.centery);
        $nest.css("left", nest.centerx);
        $nestMom.append($nest);
    }
}

function generateAsteroids() {
    //console.log("Generating asteroids");
    if (gameState.timer % 600 === 0) {
        var numRocks = gameState.level;
        var $rockMom = $("#gameBox");
        var $rock;
        var portHeight = $rockMom.height();
        var portTop = $rockMom.position().top;
        var rockVerticalGap = portHeight / numRocks;
        for (var ndx = 0; ndx < numRocks; ndx++) {
            $rock = $("<div>");
            $rock.attr("id", "rock" + ndx);
            $rock.attr("class", "rock");
            $rock.css("top", ndx * rockVerticalGap + portTop);
            $rock.css("animation-duration",  Math.random() * 5 + 1 + "s");
            $rockMom.append($rock);
        }
    }
}

function detectCollision() {
    //console.log("Detecting collisions");
    $(".rock").each(doesRockOverlapBird);
}

function doesRockOverlapBird() {
    //console.log("Checking rock vs bird.");
    var $this = $(this);
    var rockPos = $this.position();
    //var rockTop = rockPos.top;
    var rockLeft = rockPos.left;
    // var rockCenterX = rockLeft + rockRadius;
    //var rockCenterY = rockTop + rockRadius;
    //var collide = overlap(bird.centerx, bird.centery, rockCenterX, rockCenterY, bird.radius, rockRadius);
    
    $thisBird = $(".bird");
    var collide = overlapBox($thisBird, $this);
    if (collide) {
        $this.css("animation-name", "none");
        $this.css("left", rockLeft);
    }
}

function destroyInactiveAsteroids() {
    $(".rock").each( function() {
        $this = $(this);
        var rockPos = $this.position();
        var rockLeft = rockPos.left;
        if (rockLeft + rockRadius + rockRadius <= 0) {
            this.remove();
        }
    });
}

function updateBird() {
    //console.log("Updating bird");
}

function overlap(x1, y1, x2, y2, radius1, radius2) {
    var xdist = x1 - x2;
    var ydist = y1 - y2;
    var xdistSquared = xdist * xdist;
    var ydistSquared = ydist * ydist;
    var distance = Math.sqrt(xdistSquared + ydistSquared);
    var sumRad = radius1 + radius2;
    //console.log("calculated distance: " + distance + " radius " + sumRad);
    if (distance < sumRad) {
        //console.log("COLLISION! Distance: " + distance + " radius: " + sumRad);
    }
    return distance < sumRad;
}

function overlapBox ($bird, $rock ) {
    //Check to see if 1 hit the bottom of 2
    birdTop = $bird.position().top;
    birdBottom = birdTop + $bird.height();
    birdLeft = $bird.position().left;
    birdRight = birdLeft + $bird.width();

    rockTop = $rock.position().top;
    rockBottom = rockTop + $rock.height();
    rockLeft = $rock.position().left;
    rockRight = rockLeft + $rock.width();

    var collision = true;
    if ((birdBottom < rockTop) || 
        (birdTop > rockBottom) || 
        (birdLeft > rockRight) || 
        (birdLeft < rockLeft)) {
        collision = false;
    } else {
        //console.log("crash!")
    }
    return collision;


}


