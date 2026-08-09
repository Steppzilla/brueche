function additionsaufgabe(zeichen) {
    var zählerA = rand(1, 10);
    var nennerA = rand(2, 10);

    if (zählerA > nennerA) {
        var speicher = zählerA;
        zählerA = nennerA;
        nennerA = speicher;
    }

    if (zählerA == nennerA) {
        if (zählerA > 1) {
            zählerA = zählerA - 1;
        } else {
            nennerA = nennerA + 1;
        }
    }

    zählerB = null;
    nennerB = null;
    var zählerLös = zählerA;
    var nennerLös = nennerA;

    var aufgabentext = "Gib den Bruch an.";
    var tipp1 = " Wie viele Stückchen sind hervorgehoben?";
    var tipp2 = " In wie viele Stücke ist der ganze Kreis aufgeteilt?";


    //var aufgabenstring = [zählerA, nennerA, zählerB, nennerB, zählerLös, nennerLös, zeichen, auftrag, auftragszahl];
    var loesungsObjekt = {
        aufgabe: aufgabentext,
        tipps: [tipp1, tipp2],
        operator: zeichen,
        brueche: [bruch(zählerA, nennerA)],
        loesung: [bruch(zählerLös, nennerLös)]
    }

    return loesungsObjekt;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function bruch(a, b) {
    var bruch = {
        zaehler: a,
        nenner: b
    };
    return bruch;
}



var icon1 = '<img class="images" src="https://img.icons8.com/wired/64/000000/plus-math.png">';
var icon2 = '<img class="images" src="https://img.icons8.com/wired/64/000000/minus-math.png">';
var icon3 = '<img class="images" src="https://img.icons8.com/wired/64/000000/multiply.png">';
var icon4 = '<img class="images" src="https://img.icons8.com/wired/64/000000/divide.png">';
var icon5 = '<img class="images" src="https://img.icons8.com/wired/64/000000/zoom-to-extents.png">';
//var icon6 = '<img class="images" src="https://img.icons8.com/wired/64/000000/variation.png">';
var icon6 = '<img class="images" src="https://img.icons8.com/?size=100&id=7tg2iJatDNzj&format=png&color=000000">';


var iconString = [icon6];

