function einfachenBruchErstellen() {
    let nenner = Math.pow(2, rand(1, 3));
    while (nenner === aufgabenobjekt.brueche[0].nenner) {
        nenner = Math.pow(2, rand(1, 3));
    }
    return bruch(1, nenner);
}

function beliebigenEinfachenBruchErstellen() {
    let nenner = rand(2, 10)
    while (nenner === aufgabenobjekt.brueche[0].nenner) {
        nenner = rand(2, 10)
    }
    return bruch(1, nenner);
}

function beliebigenBruchErstellen() {
    let nenner = rand(2, 10)
    let zaehler = rand(1, nenner - 1);
    while (nenner === aufgabenobjekt.brueche[0].nenner && zaehler === aufgabenobjekt.brueche[0].zaehler) {
        nenner = rand(2, 10)
    }
    return bruch(zaehler, nenner);
}


function bruchAngebenTaskErstellen() {

    const level = Number($("#auswahl").val());

    //0 "echterBruch"
    //1 "unechterBruch" (zaehler >= nenner)
    //2 gemischten Bruch angeben (direkt aus bild)
    //3 aus gemischtem Bruch (zahl) den unechten Bruch angeben oder umgekehrt (Bild als hilfe/tipp?)
    let bruchzahl = bruch(1, 1);
    let aufgabentyp = "";

    //anzahl ganze muss durch nenner teilbar sein

    //hinweistext wenn Zaehler falsch ist, oder bei level 4-9 zb, wenn der nenner nicht korrekt ist und der zähler nicht 1 ist
    let tipp1 = " Wie viele Stückchen sind hervorgehoben?";
    //Hinweistext, wenn nenner falsch ist (wird nur angezeigt, wenn ersteres gekürzt korrekt ist)
    let tipp2 = " In wie viele Stücke ist der ganze Kreis aufgeteilt?";
    let tipp3 = "";
    let anzahlGanze = 0;

    if (level === 1) {
        bruchzahl = einfachenBruchErstellen();
        aufgabentyp = "bruchAusBild"
    }

    if (level === 2) {
        bruchzahl = beliebigenEinfachenBruchErstellen();
        aufgabentyp = "bruchAusBild"
    }

    if (level === 3) {
        bruchzahl = beliebigenBruchErstellen();
        aufgabentyp = "bruchAusBild"
    }

    if (level === 4) {
        bruchzahl = einfachenBruchErstellen();
        aufgabentyp = "bruchAusAnzahl"
        anzahlGanze = bruchzahl.nenner;

    }

    if (level === 5) {
        bruchzahl = beliebigenEinfachenBruchErstellen();
        aufgabentyp = "bruchAusAnzahl"
        anzahlGanze = bruchzahl.nenner * rand(1, 4);
    }

    if (level === 6) {
        bruchzahl = beliebigenBruchErstellen();
        aufgabentyp = "bruchAusAnzahl"
        if (bruchzahl.nenner < 5) {
            anzahlGanze = bruchzahl.nenner * rand(1, 10);
        } else {
            anzahlGanze = bruchzahl.nenner * rand(1, 4);
        }
    }

    if (level === 7) {
        bruchzahl = einfachenBruchErstellen();
        aufgabentyp = "anzahlAusMenge"
        anzahlGanze = bruchzahl.nenner;

    }

    if (level === 8) {
        bruchzahl = beliebigenEinfachenBruchErstellen();
        aufgabentyp = "anzahlAusMenge"
        anzahlGanze = bruchzahl.nenner * rand(1, 4);
    }

    if (level === 9) {
        bruchzahl = beliebigenBruchErstellen();
        aufgabentyp = "anzahlAusMenge"
        if (bruchzahl.nenner < 5) {
            anzahlGanze = bruchzahl.nenner * rand(1, 10);
        } else {
            anzahlGanze = bruchzahl.nenner * rand(1, 4);
        }
    }

    if (level === 10) {
        bruchzahl = beliebigenBruchErstellen();
        aufgabentyp = ""
        if (bruchzahl.nenner < 5) {
            anzahlGanze = bruchzahl.nenner * rand(1, 10);
        } else {
            anzahlGanze = bruchzahl.nenner * rand(1, 4);
        }
    }


    if (aufgabentyp === "") {
        tipp1 = "Die Lösung ist leider nicht korrekt";
        tipp2 = "Falls du mehr Tipps benötigst, übe nochmal Level 3, 6 und 9"
    }

    if (aufgabentyp === "bruchAusAnzahl") {
        //Die lösung 1/4 ist nicht sichtbar, es gibt 24 Felder, davon sind 6 ausgewählt
        tipp1 = " Nutze den Schieberegler über der Mengenanzeige, schiebe ihn so, dass du mit gefärbten Anteilen ganze Reihen füllst. Z.B. auf " + anzahlGanze * bruchzahl.zaehler / bruchzahl.nenner;
        tipp2 = " Zähle: Wie viele Reihen sind gefärbt (Zähler), viele Reihen hast du insgesamt (Nenner)?";
        tipp3 = " Zähle wie viele Teile dunkel gefärbt sind (Zähler) und wie viele es insgesamt gibt (Nenner)";
    }

    if (aufgabentyp === "anzahlAusMenge") {
        //Es steht z.B. 1/4 drin, es gibt 24 Felder 1. Schritt - Breite anpassen
        tipp1 = " Nutze den Schieberegler über der Mengenanzeige, schiebe ihn z.B. auf die Anzahl " + bruchzahl.nenner;
        tipp2 = " Wähle ganze Spalten aus - so viele, wie im Zähler gefordert sind: " + bruchzahl.zaehler;
        tipp3 = " Wähle die Anzahl der gefärbten Stücke aus (Zähler), wenn der Nenner bereits mit der Anzahl übereinstimmt";

    }

    let aufgabentext = "Gib den Bruch an.";


    //var aufgabenstring = [zählerA, nennerA, zählerB, nennerB, zählerLös, nennerLös, zeichen, auftrag, auftragszahl];
    aufgabenobjekt = {
        aufgabe: aufgabentext,
        tipps: [tipp1, tipp2, tipp3],
        typ: "angeben",
        brueche: [bruchzahl],
        loesung: [bruchzahl],
        anzahlGanze: anzahlGanze,
        typ: aufgabentyp
    }
}
