var obstacles = [];
var loopDelay = 8;
var rockRadius = 25;

var obstacle = {
    radius: 0,
    centerx: 0,
    centery: 0,
    speed: 0,
    active: 0,
};

var gameState =
{
    level: 5,
    timer: 0, /*loop iterations*/
    activeObst: 0,
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
    console.log("Game loop executing");
    generateAsteroids();
    destroyInactiveAsteroids();
    detectCollision();
    updateBird();
    updateObstacle();
    gameState.timer++;
}

function generateAsteroids() {
    //console.log("Generating asteroids");
    if (gameState.timer % 3000 === 0) {
        var numRocks = gameState.level;
        var $rockMom = $("#gameBox");
        var $rock;
        var portHeight = $rockMom.height();
        var rockVerticalGap = portHeight / numRocks;
        var newRock = {
            radius: 25,
            centerx: 0,
            centery: 0,
            speed: 0,
            active: true,
        };
        for (var ndx = 0; ndx < numRocks; ndx++) {
            $rock = $("<div>");
            $rock.attr("id", "rock" + ndx);
            $rock.attr("class", "rock");
            $rock.css("top", ndx * rockVerticalGap);
            $rock.css("animation-duration",  Math.random() * 5 + 1 + "s");
            $rockMom.append($rock);
        }
    }
}

function detectCollision() {
    console.log("Detecting collisions");
    $(".rock").each(doesRockOverlapBird);
}

function doesRockOverlapBird() {
    console.log("Checking rock vs bird.");
    var rockPos = $(this).position();
    var rockTop = rockPos.top;
    var rockLeft = rockPos.left;
    var rockCenterX = rockLeft + rockRadius;
    var rockCenterY = rockTop + rockRadius;
    var collide = overlap(bird.centerx, bird.centery, rockCenterX, rockCenterY, bird.radius, rockRadius);
    if (collide) {
        //alert("Rock hit bird at " + rockCenterX + " by " + rockCenterY);
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

function updateObstacle() {
    //console.log("Updating obstacle");
}

function overlap(x1, y1, x2, y2, radius1, radius2) {
    var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    var sumRad = radius1 + radius2;
    console.log("calculated distance: " + distance + " radius " + sumRad);
    if (distance < sumRad) {
        console.log("COLLISION! Distance: " + distance + " radius: " + sumRad);
    }
    return distance < sumRad;

}


