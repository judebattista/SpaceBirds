var obstacles = [];
var loopDelay = 16;
var rockRadius = 25;
var rockDamage = 1;
var baseFontSize = $("body").css("font-size");

var nest = { /* added from nest.js */
    radius: 10,
    speed: 0,
    active: 0,
};

var gameState =
{
    level: 5,
    timer: 0, /*loop iterations*/
    active: false,
    activeObst: 0,
    activeNest: 0, /* added from nest.js */
    levelEnd: 105,
};

//Distances in pixels
//Container for static bird information
var bird = {
    height: 0,
    radius: 0,
    width: 0,
    healthMax: 2,
    healthCurrent: 2,
}

$(document).ready(
    function () {
        var startBtn = "Start";
        var startText = "<div class=\"splashtext\">Use the arrow keys to steer the bird away from asteroids. Reach the bird's space ship to win!</div>";
        gamescreen(startBtn, startText);
    }
);

function gamescreen(buttontext, splashtext) {
    var $button = $("<div>");
    $button.attr("id", "startbutton");
    $button.attr("class", "startbutton");
    $button.html(buttontext);
    $button.on("click", function () {
        gameReset();
        $button.parent().css("display", "none");
        gameRun();
        $button.parent().remove();
    });
    /*var $img = $("<div>");*/
    var $startscreen = $("<div>");
    $startscreen.attr("id", "splashscreen");
    $startscreen.attr("class", "splashscreen");
    $startscreen.html(splashtext);
    $startscreen.append($button);
    $startscreen.appendTo($("#gameBox"));
}

function gameReset() {
    var $nest = $("#nest");
    if ($nest) {
        $nest.css("display", "none");
        $nest.remove();
    }
    var $bird = $("#bird");
    if ($bird) {
        $bird.css("display", "none");
    }
    var $rock = $(".rock");
    if ($rock.length > 0) {
        $rock.each(function () {
            $(this).css("display", "none");
            $(this).remove();
        });
    }
    bird.healthCurrent = bird.healthMax;
    gameState.timer = 0;
}

function gameRun() {
    var runLoop = setInterval(gameLoop, loopDelay);
    //make bird element
    var $birdMom = $("#gameBox");
    var $bird = $("#bird");
    if ($bird.length == 0) {
        $bird = $("<div>");
        $bird.attr("id", "bird");
        $bird.attr("class", "bird");
        $birdMom.append($bird);
    }

    $bird.css("top", $birdMom.position().top);
    $bird.css("left", $birdMom.position().left);
    $bird.css("display", "inline");
    //Set static bird information
    bird.height = $bird.height();
    bird.width = $bird.width();
    bird.radius = Math.min(bird.height, bird.width) / 2;

    //Add the galaxy backdrop
    var $backgroundMom = $("#gameBox");
    var $galaxyGraphics = $(".sliding-galaxies");
    if ($galaxyGraphics.length == 0) {
        $galaxyGraphics = $("<div>");
        $galaxyGraphics.attr("id", "sliding-galaxies");
        $galaxyGraphics.attr("class", "sliding-galaxies");

        $galaxyGraphics.appendTo($backgroundMom);
    }
    gameState.active = true;
}

function gameLose() {
    gameState.active = false;
    gameReset();
    var startBtn = "Retry";
    var startText = "<div class=\"splashtext\">You died :(</div>";
    gamescreen(startBtn, startText);
}

function gameLoop() {
    if (gameState.active) {
        //console.log("Game loop executing");
        generateAsteroids();
        generateNest(); /* added from nest.js */
        destroyInactiveAsteroids();
        detectCollision();
        updateBird();
        gameState.timer++;
    }
}

function generateNest() { /* added from nest.js */
    if (gameState.timer == gameState.levelEnd) {

        var $nestMom = $("#gameBox");
        var $nest;
        $nest = $("<div>");
        $nest.attr("id", "nest");
        $nest.attr("class", "nest");
        $nest.css("top", $nestMom.position().top + 5);
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
            $rock.css("animation-duration", Math.random() * 5 + 1 + "s");
            $rockMom.append($rock);
        }
    }
}

function detectCollision() {
    //console.log("Detecting collisions");
    $(".rock").each(doesRockOverlapBird);
    if (gameState.timer >= gameState.levelEnd) {
        hasBirdReachedNest();
    }
}

function doesRockOverlapBird() {
    //console.log("Checking rock vs bird.");
    var rockPos = $(this).position();
    var rockLeft = rockPos.left;

    var rockTop = rockPos.top;
    var rockCenterX = rockLeft + rockRadius;
    var rockCenterY = rockTop + rockRadius;
    var $bird = $("#bird");

    var birdLeft = $bird.position().left;
    var birdTop = $bird.position().top;
    var birdCenterX = birdLeft + bird.width / 2;
    var birdCenterY = birdTop + bird.height / 2;

    var collide = overlapRadial(birdCenterX, birdCenterY, rockCenterX, rockCenterY, bird.radius, rockRadius);
    //$thisBird = $("#bird");
    //var collide = overlapBox($thisBird, $this);
    if (collide) {
        $(this).remove();
        hitBird(rockDamage);
    }
}

function hasBirdReachedNest() {
    console.log("Bird has reached nest.");

    var $nest = $("#nest");
    var nestX = $nest.position().left;
    var nestWidth = $nest.width();
    var nestCenter = nestX + (nestWidth / 2);

    var $bird = $("#bird");
    var birdX = $bird.position().left;
    var birdWidth = $bird.width();
    var birdCenter = birdX + (birdWidth / 2);

    if (birdCenter >= nestCenter) {
        /* win */
        gameState.active = false;
        gameReset();
        var startBtn = "Play again (with more asteroids)";
        var startText = "<div class=\"splashtext\"> You didn't died :) </div>";
        gamescreen(startBtn, startText);
    }
}

function destroyInactiveAsteroids() {
    $(".rock").each(function () {
        $this = $(this);
        var rockPos = $this.position();
        var rockLeft = rockPos.left;
        if (rockLeft + rockRadius + rockRadius <= 0) {
            this.remove();
        }
    });
}

function updateBird() {
    if (bird.healthCurrent <= 0) {
        gameLose();
    }
}

function overlapRadial(x1, y1, x2, y2, radius1, radius2) {
    var xdist = x1 - x2;
    var ydist = y1 - y2;
    var xdistSquared = xdist * xdist;
    var ydistSquared = ydist * ydist;
    var distance = Math.sqrt(xdistSquared + ydistSquared);
    var sumRad = radius1 + radius2;
    //console.log("y1=" + y1 + " y2=" + y2 + " xdist=" + xdist + " ydist=" + ydist + " xSquared=" + xdistSquared + " ySquared=" + ydistSquared + " calculated distance: " + distance + " radius " + sumRad);

    if (distance < sumRad) {
        console.log("COLLISION! Distance: " + distance + " radius: " + sumRad);
    }

    return distance < sumRad;
}

function overlapBox($bird, $rock) {
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
        //console.log("collision!")
    }
    return collision;
}

function hitBird(damage) {
    bird.healthCurrent -= damage;
    var $bird = $("#bird");
    $bird.css("animation-name", "birdHit");
    window.setTimeout(function () {
        $bird.css("animation-name", "none");
    }, 1000);
}



