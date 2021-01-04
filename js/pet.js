/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

//variabele l opslaan
var l;
//canvas grootte en breedte opslaan
var canvasW = 400;
var canvasH = 330;
/* Verwijzing naar het element canvas en mypet variabelen aangemaaakt om 2D rendering context op te slaan. */
var canvas = document.getElementById('myCanvas');
var myPet = canvas.getContext('2d');
// Positie van het dier opslaan
var petX = 310;
var petY = 200;
// Hoogte & breedte opslaan van het dier
var petWidth = 150;
var petHeight = 250;

// Gegevens van de pijltoetsen opslaan bij het indrukken
var rightPressed, leftPressed, upPressed, downPressed = false;

// De juiste resolutie weergeven van het canvas
// bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
function pixelCanvas() {
    // Set display size (css pixels).
    canvas.style.width = canvasW + "px";
    canvas.style.height = canvasH + "px";
    // Set actual size in memory (scaled to account for extra pixel density).
    var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    canvas.width = canvasW * scale;
    canvas.height = canvasH * scale;
}
pixelCanvas();

// spel informatie tonen
function petInfo(naam, spelNaam) {
    var spelgegevens = "Game: " + spelNaam + ", " + naam + " heeft er zin in! Beweeg bambo met de pijltoetsen"; // punt komma vergetn!
    var element = document.createElement('p');
    element.innerHTML = spelgegevens; // gelijk aan string
    var containerDiv = document.getElementById('container');
    containerDiv.appendChild(element);
}
petInfo('Bambo', 'Pet');

/*Twee event listeners aangemaakt om de interactie tussen de gebruiker met de toetsenboard te krijgen */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/* Functie keyDownHandler: het uitvoeren van de toetsen weergeven, wanneer ze ingedrukt zijn */
function keyDownHandler(events) {
    switch (events.keyCode) {
        case 37:
            leftPressed = true;
            break;
        case 39:
            rightPressed = true;
            break;
        case 38:
            upPressed = true;
            break;
        case 40:
            downPressed = true;
            break;
    }
}
/* Functie keyUpHandler: het uitvoeren van de toetsen weergeven, wanneer ze NIET ingedrukt zijn */
function keyUpHandler(events) {
    if (events.keyCode == 37) {
        leftPressed = false;
    } else if (events.keyCode == 39) {
        rightPressed = false;
    } else if (events.keyCode == 38) {
        upPressed = false;
    } else if (events.keyCode == 40) {
        downPressed = false;
    }
}
// functie aanmaken voor het creëren van het dier
function nicePet() {
    var pandaImage = document.getElementById('image1');
    myPet.drawImage(pandaImage, petX, petY, petWidth, petHeight);
}




// buttons gegevens meegeven en de achtergrond van 'myCanvas' veranderen
function canvasAbove() {
    /* verschillende array's aangemaakt om gegevens opslaan en mee geven aan de buttons */
    var plaatjes = ["url('img/achtergrond1_bos.jpg')", "url('img/huis.png')", "url('img/zwemmen.png')", "lightyellow", "img/pandaSm-1.png", "img/panda-1.png"];

    var buttonText = ['Park', 'Huis', 'Zwembad', 'Rustgevend', 'pandaSmile ', 'Panda'];

    var lijstButton = document.querySelectorAll('button');


    for (l = 0; l < lijstButton.length; l++) {
        lijstButton[l].innerHTML = buttonText[l];
        lijstButton[l].classList = "style_button";
    }

    document.getElementById('b1').addEventListener = function changeImage() {
        document.getElementById('myCanvas').style.backgroundImage = plaatjes[0];
    };
    document.getElementById('b2').onclick = function changeImage() {
        document.getElementById('myCanvas').style.background = plaatjes[1];
    };
    document.getElementById('b3').onclick = function changeImage() {
        document.getElementById('myCanvas').style.background = plaatjes[2];
    };
    document.getElementById('b4').onclick = function changeColor() {
        document.getElementById('myCanvas').style.background = plaatjes[3];
    };
    document.getElementById('b5').onclick = function changePanda() {
        document.getElementById('image1').src = plaatjes[4];
    };
    document.getElementById('b6').onclick = function changePanda() {
        document.getElementById('image1').src = plaatjes[5];
    };
}
canvasAbove();


/* Het dier weergeven op de canvas en de beweging van de image bepalen. Maar ook ervoor zorgen dat de image in de canvas blijft */
function tonenCanvas() {
    // toont 1 image, bij het gebruik van de toetsenboard
    myPet.clearRect(0, 0, canvas.width, canvas.height);

    nicePet(); //aanroepen functie

    // object blijft op de canvas bewegen door keyPress.
    if (rightPressed && petX < canvas.width - petWidth) {
        petX += 5;
    } else if (leftPressed && petX > 0) {
        petX -= 5;
    } else if (upPressed && petY > 0) {
        petY -= 5;
    } else if (downPressed && petY < canvas.height - petHeight) {
        petY += 5;
    }
}
setInterval(tonenCanvas, 10); // herhaalt de uitvoering van de functie continu.
