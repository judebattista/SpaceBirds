var gameState =
{
    level:10,
};

$(document).ready(
    function () {
        //Add the galaxy backdrop
        var $backgroundMom = $("#gameBox");
        var $galaxyGraphics = $("<div>");
        $galaxyGraphics.attr("class", "sliding-galaxies");
        $galaxyGraphics.appendTo($backgroundMom);

        //The number of rocks is determined by the level
        var numRocks = gameState.level;
        var $rockMom =  $("#gameBox");
        var $rock;
        var portHeight = $rockMom.height();
        var rockVerticalGap = portHeight / numRocks;
        for (var ndx = 0; ndx < numRocks; ndx++) {
            $rock = $("<div>");
            $rock.attr("id", "rock" + ndx);
            $rock.attr("class", "rock");
            $rock.css("top", ndx*rockVerticalGap);
            $rock.css("animation-duration", Math.random() * 10 + 1 + "s");
            $rockMom.append($rock);
        }
    }
);



