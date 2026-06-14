function additionsaufgabe(zeichen) {
    var zählerA = rand(1, 10);
    var nennerA = rand(2, 10);
    var zählerB = rand(1, 10);
    var nennerB = rand(2, 10);

    if (zählerA > nennerA) {
        var speicher = zählerA;
        zählerA = nennerA;
        nennerA = speicher;
    }

    if (zählerB > nennerB) {
        var speicher = zählerB;
        zählerB = nennerB;
        nennerB = speicher;
    }

    var auftragszahl = [];
    var auftrag = [];

    if (zeichen == "+") {
        var zählerLös = zählerA * nennerB + zählerB * nennerA;
        var nennerLös = nennerA * nennerB;
    } else if (zeichen == "-") {
        var zählerLös = zählerA * nennerB - zählerB * nennerA;
        var nennerLös = nennerA * nennerB;
    } else if (zeichen == "*") {
        var zählerLös = zählerA * zählerB;
        var nennerLös = nennerA * nennerB;
    } else if (zeichen == ":") {
        var zählerLös = zählerA * nennerB;
        var nennerLös = nennerA * zählerB;
    } else if (zeichen == "erweitern") {
        zählerA = zählerB;
        var zählerLös = zählerA;
        var nennerLös = nennerA;
        var randöm0 = rand(2, 5);
        var randöm1 = rand(2, 10);
        var auftrag0 = "Erweitere den Bruch mit " + randöm0 * randöm1;
        var auftrag1 = ", kürze dann mit " + randöm0;
        var auftrag2 = " und kürze anschließend mit " + randöm1 + ".";
        auftrag = [auftrag0, auftrag1, auftrag2];
        auftragszahl = [randöm0 * randöm1, randöm0, randöm1];
    } else if (zeichen == "angeben") {
        if (zählerA == nennerA) {
            if (zählerA > 1) {
                zählerA = zählerA - 1;
            } else {
                nennerA = nennerA + 1;
            }
        }

        zählerB =null;
        nennerB =null;
        var zählerLös = zählerA;
        var nennerLös = nennerA;

        auftrag = ["Gib den Bruch an."];
        var tipp1 = "obere Zahl (Zähler): Zähl einfach wie viele Stückchen du siehst";
        var tipp2 = "untere Zahl (Nenner): Zähl in wie viele gleichgroße Stückchen der Kreis insgesamt unterteilt ist";
    }

    var aufgabenstring = [zählerA, nennerA, zählerB, nennerB, zählerLös, nennerLös, zeichen, auftrag, auftragszahl];
    return aufgabenstring;
}

function bruch(a, b) {
    var bruch = {
        zähler: a,
        nenner: b
    };
    return bruch;
}


var bay = bruch(5, 99);

var icon1 = '<img class="images" src="https://img.icons8.com/wired/64/000000/plus-math.png">';
var icon2 = '<img class="images" src="https://img.icons8.com/wired/64/000000/minus-math.png">';
var icon3 = '<img class="images" src="https://img.icons8.com/wired/64/000000/multiply.png">';
var icon4 = '<img class="images" src="https://img.icons8.com/wired/64/000000/divide.png">';
var icon5 = '<img class="images" src="https://img.icons8.com/wired/64/000000/zoom-to-extents.png">';
//var icon6 = '<img class="images" src="https://img.icons8.com/wired/64/000000/variation.png">';
var icon6 = '<img class="images" src="https://img.icons8.com/?size=100&id=7tg2iJatDNzj&format=png&color=000000">';


var iconString = [icon6, icon1, icon2, icon3, icon4, icon5];


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
