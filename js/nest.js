var obstacles = [];
var loopDelay = 500;

var obstacle = {
    radius: 0,
    centerx: 0,
    centery: 0,
    speed: 0,
    active: 0,
};

var nest = {
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
    activeNest:0,
};

//Distances in pixels
var bird = {
    centerx : 100,
    centery : 100,
    radius: 10
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
    generateNest();
    detectCollision();
    updateBird();
    updateObstacle();
    gameState.timer++;
}

function generateNest() {
    //console.log("Generating asteroids");
    if (gameState.timer >= 1875) {

        var $nestMom = $("#gameBox");
        var $nest;
        $nest = $("<div>");
        $nest.attr("id", "nest");
        $nest.attr("class", "nest");
        $nest.css("top", nest.centery);
        $nest.css("left", nest.centerx);
        $nestMom.append($nest);
        /*
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
        var rockPosition;
        for (var ndx = 0; ndx < numRocks; ndx++) {
            $rock = $("<div>");
            $rock.attr("id", "rock" + ndx);
            $rock.attr("class", "rock");
            $rock.css("top", ndx * rockVerticalGap);
            rockPosition = $rock.position();
            newRock.centerx = rockPosition.left + newRock.radius;
            newRock.centery = rockPosition.top + newRock.radius;
            newRock.speed = Math.random() * 10 + 1;
            $rock.css("animation-duration",  newRock.speed + "s");
            $rockMom.append($rock);
            obstacles.push(newRock);
        }*/
    }
}

function generateAsteroids() {
    //console.log("Generating asteroids");
    if (gameState.timer % 300 === 0) {
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
        var rockPosition;
        for (var ndx = 0; ndx < numRocks; ndx++) {
            $rock = $("<div>");
            $rock.attr("id", "rock" + ndx);
            $rock.attr("class", "rock");
            $rock.css("top", ndx * rockVerticalGap);
            rockPosition = $rock.position();
            newRock.centerx = rockPosition.left + newRock.radius;
            newRock.centery = rockPosition.top + newRock.radius;
            newRock.speed = Math.random() * 10 + 1;
            $rock.css("animation-duration",  newRock.speed + "s");
            $rockMom.append($rock);
            obstacles.push(newRock);
        }
    }
}

function detectCollision() {
    console.log("Detecting collisions");
    $(".rock").each(doesRockOverlapBird);
}

function doesRockOverlapBird() {
    /*console.log("Checking rock vs bird.");*/
    var rockRadius = 25;
    var rockPos = $(this).position();
    var rockTop = rockPos.top;
    var rockLeft = rockPos.left;
    var rockCenterX = rockLeft + rockRadius;
    var rockCenterY = rockTop + rockRadius;
    var collide = overlap(bird.centerx, bird.centery, rockCenterX, rockCenterY, bird.radius, rockRadius);
    if (collide) {
        /*alert("Rock hit bird at " + rockCenterX + " by " + rockCenterY);*/
    }
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
    return distance < (radius1 + radius2);

}


