/*
sources: 
https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-move-an-element-using-left-right-up-and-down-arrow-keys
https://jeremyckahn.github.io/keydrown/

*/

kd.DOWN.down = function () {
    $(".bird").finish().animate({
        top: "+=9"
    });
};

kd.UP.down = function () {
    $(".bird").finish().animate({
        top: "-=9"
    });
};

kd.LEFT.down = function () {
    $(".bird").finish().animate({
        left: "-=9"
    });
};

kd.RIGHT.down = function () {
    $(".bird").finish().animate({
        left: "+=9"
    });
};

kd.run(function () {
    kd.tick();
});
