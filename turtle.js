var canvas = document.getElementById("turtleCanvas");
var context = canvas.getContext("2d");
var cmdField = document.getElementById("command");

var minX = 0;
var maxX = 800;
var minY = 0;
var maxY = 500;

var posX = 0; //Current X coordinate of turtle.
var posY = 0; //Current Y coordinate of turtle.

var angle = 0; //Angle (in degrees).
var isPenUp = false;

//This function moves (0,0) to left bottom corner of Canvas.
var translateCoordinates = function () {
    context.translate(0, 500);
    context.scale(1, -1);
};

//This function initializes turtle.
var initTurtle = function () {
    posX = 400;
    posY = 0;
    angle = 0;
    context.moveTo(posX, posY);
};

var checkCoordinates = function (x, y) {
    if (x > maxX || x < minX || y > maxY || y < minY) {
        return false;
    } else {
        return true;
    }
};


//Comands of turtle
var fd = function (value) {
    var radians = angle *  Math.PI / 180;
    var dx = value * Math.sin(radians);
    var dy = value * Math.cos(radians);

    posX += dx;
    posY += dy;

    if (!checkCoordinates(posX, posY)) {
        posX -= dx;
        posY -= dy;
        return;
    }

    if (isPenUp) {
        context.moveTo(posX, posY);
    } else {
        context.lineTo(posX, posY);
        context.stroke();
    }
};

var bk = function (value) {
    var radians = angle *  Math.PI / 180;
    var dx = value * Math.sin(radians);
    var dy = value * Math.cos(radians);

    posX += dx;
    posY += dy;

    if (!checkCoordinates(posX, posY)) {
        posX -= dx;
        posY -= dy;
        return;
    }
    context.moveTo(posX, posY);
};

var lt = function (value) {
    angle = (angle - value) % 360;
};

var rt = function (value) {
    angle = (angle + value) % 360;
};

var arc = function (angle, radius) {
    
};

var arc2 = function (angle, radius) {

};

var pu = function () {
    isPenUp = true;
};

var pd = function () {
    isPenUp = false;
};


var exexuteOrder = function (cmd) {
    var value;

    switch (cmd[0]) {
        case "fd":
            value = parseInt(cmd[1]);
            fd(value);
            break;
        case "bk":
            value = parseInt(cmd[1]);
            bk(value);
            break;
        case "rt":
            value = parseInt(cmd[1]);
            rt(value);
            break;
        case "lt":
            value = parseInt(cmd[1]);
            lt(value);
            break;
        case "pu":
            pu();
            break;
        case "pd":
            pd();
            break;
        default:
            break;
    }

};

//This function parses cmdField typed by user.
function parseCommand () {
    var input;
    var cmd;
    var value;
    var i;

    input = cmdField.value;
    cmdField.value = "";

    input = input.split(";");

    for (i = 0; i < input.length; i++) {
        cmd = input[i];
        cmd = cmd.toLowerCase();
        cmd = cmd.split(" ");

        if (cmd[0] === "repeat") {
            var loopStart = i + 1;
            var j, k;

            value = parseInt(cmd[1]);
            for (j = 0; j < value; j++) {
                k = loopStart;
                cmd = input[k];
                while (cmd[0] !== "end") {
                    cmd = input[k];
                    cmd = cmd.split(" ");
                    exexuteOrder(cmd);
                    k++;
                }
            }
        } else {
            exexuteOrder(cmd);
        }
    }



}

var execute = function () {
    parseCommand();
};

translateCoordinates();
initTurtle();











