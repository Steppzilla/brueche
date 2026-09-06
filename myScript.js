let richtigeAntworten = 0;

aufgabeDarstellen()

function inputVerarbeiten(boxWaehler, inhaltsspeicher) {
    let textUser = boxWaehler.children().eq(0).val().replace("/", "");    // Der Value, also der eingegebene Text wird ausgelesen aus der Zelle und in textUser gespeichert.
    boxWaehler.empty();
    let newUserElement = "<span style='font-size:inherit' >".concat(textUser, "</span>");

    if (textUser === "") {
        boxWaehler.append(inhaltsspeicher);
    } else {
        boxWaehler.append(newUserElement);
        ergebnischeck();//alles wird als bruch gemalt und ggf hintergrund markiert
        //Feedback:
    }
}

function inputMachen(boxWaehler) {

    let inputFeld = $("#inputFeld");
    //Input-Fenster löschen: (führt nicht zum error, selbst beim ersten klick,obwohl noch keins vorhanden ist... mh=?...
    inputFeld.remove();
    let inhaltsspeicher = boxWaehler.children();
    boxWaehler.empty();
    //leeres Eingabefeld erzeugen und einfügen:
    let text1 = "<input type='text' class='input' id='inputFeld'>";
    boxWaehler.append(text1);

    const feld = boxWaehler.children().eq(0);

    feld.focus();
    feld.attr({
        type: "text",
        inputmode: "numeric",
        pattern: "[0-9]*"
    });
    feld.keydown(
        function (e) {
            if (e.key === "Enter" || e.key === "/") {
                e.preventDefault();
                inputVerarbeiten(boxWaehler, inhaltsspeicher);
                inputMachen($(boxWaehler).next())
            } //enter oder slash
        }
    );
    feld.blur(
        function (e) {
            inputVerarbeiten(boxWaehler, inhaltsspeicher);
        }
    );
}

function ergebnischeck() {
    let aufgabe = aufgabenobjekt;
    let hinweisBox = $("#Hinweistexte");
    let loesungsText = $("#Lösungstext");
    let zaehlerBox = $(".zählerböxchen");
    let nennerBox = $(".nennerböxchen");

    let zaehler1 = zaehlerBox.children().eq(0).text();
    let nenner1 = nennerBox.children().eq(0).text();

    //erster Bruch
    if ((isNaN(zaehler1)) || (isNaN(nenner1)) || (zaehler1 === "") || (nenner1 === "")) {

    } else {
        //var ergebnis = aufgabe.loesung.zaehler / aufgabe.loesung.nenner;
        let a1 = aufgabe.brueche[0].zaehler / aufgabe.brueche[0].nenner;
        let l1 = zaehler1 / nenner1;
        let ort2 = loesungsText.children().find(".bruchbildboexchen"); //der 2. ist immer der unsichtbare

        if (ort2.length === 0) {
            loesungsText.children().find('.bruchBox').prepend("<div class='bruchbildboexchen'> </div>");  // Bild vom weiteren Bruch erschaffen
            ort2 = loesungsText.children().find(".bruchbildboexchen");
        }
        bruchDarstellen(ort2, 24, zaehler1, nenner1);
        let hinweis = "";
        console.log(aufgabe)
        console.log(zaehler1)
        console.log(nenner1)

        if (a1 === l1) {
            zaehlerBox.parent().eq(0).css("background-color", "var(--richtig)");//gruen?
            hinweisBox.empty();
            hinweis = "SUPER!";
            if (richtigeAntworten === 10) {
                hinweis = "SUPER! Für schwerere Aufgaben erhöhe selbst dein Level.";
            }
            ort2.empty();
            punkteHochzaehlen();
            setTimeout(aufgabeDarstellen, 2000);


        } else {
            let aufgabentyp = aufgabenobjekt.typ;

            zaehlerBox.parent().eq(0).css("background-color", "var(--falsch)");//lilA
            hinweisBox.empty();
            if (aufgabentyp === "bruchAusBild") {
                let hinweisText1Vorhanden = zaehler1 !== String(aufgabe.brueche[0].zaehler);
                if (hinweisText1Vorhanden) {
                    hinweis = aufgabe.tipps[0];
                    zaehlerBox.append("<sup> * </sup>");
                }
                let hinweisText2Vorhanden = nenner1 !== String(aufgabe.brueche[0].nenner);
                if (hinweisText2Vorhanden && !hinweisText1Vorhanden) {
                    hinweis = aufgabe.tipps[1];
                    nennerBox.append("<sup> * </sup>");
                }
            } else if (aufgabentyp === "bruchAusAnzahl") {

                let bruchbildbox = $(".bilderFeld").find(".bruchbildboexchen");
                const sliderWert = bruchbildbox.find(".slider-wert").text();
                let anzahlGewaehlte = String(aufgabe.anzahlGanze * aufgabe.brueche[0].zaehler / aufgabe.brueche[0].nenner);

                if (sliderWert === anzahlGewaehlte
                    || sliderWert === anzahlGewaehlte / 2
                    || sliderWert === anzahlGewaehlte * 2) {
                    hinweis = aufgabe.tipps[1];
                } else {
                    hinweis = aufgabe.tipps[0];
                }
                if(aufgabe.anzahlGanze/aufgabe.brueche[0].nenner<=1){
                    hinweis = aufgabe.tipps[2];
                }
            } else {
                hinweis = aufgabe.tipps[0];
                anzahlRAndomAufgabenFalsch++;
                if (anzahlRAndomAufgabenFalsch % 10 === 0) {
                    hinweis = aufgabe.tipps[1];
                }
            }


        }
        hinweisBox.append("<p> " + hinweis + "</p>");
        setTimeout(function () {
            hinweisBox.empty();
        }, 2000);
    }


}

let anzahlRAndomAufgabenFalsch = 0;

function pruefeAnzahl() {
    //fuer aufgabentyp  === "anzahlAusMenge", nur dann existiert der button der diese funktion auslöst
    let zaehler = aufgabenobjekt.brueche[0].zaehler;
    let nenner = aufgabenobjekt.brueche[0].nenner;
    let anzahlGanze = aufgabenobjekt.anzahlGanze;

    const anteilBruchstueck = anzahlGanze / nenner;
    const anzahlStueckeGefaerbtSoll = anteilBruchstueck * zaehler;

    const sliderWert = $("#aufgabenFeld").find(".slider-wert").text();

    let hinweis = "!";
    let hinweisBox = $("#Hinweistexte");

    console.log(gewaehlteAnzahl)
    console.log(anzahlStueckeGefaerbtSoll)
    console.log(sliderWert)
    console.log(nenner)

    if (gewaehlteAnzahl === anzahlStueckeGefaerbtSoll) {
        hinweis = "Klasse!";
        setTimeout(function () {
            hinweisBox.empty();
            aufgabeDarstellen();
            punkteHochzaehlen();
            gewaehlteAnzahl = 0;

        }, 2000);

    } else if (sliderWert === String(nenner)
        || sliderWert === String(nenner / 2)
        || sliderWert === String(nenner * 2)) {
        if(aufgabenobjekt.anzahlGanze/nenner>1) {
            hinweis = aufgabenobjekt.tipps[1];
        }else{
            hinweis = aufgabenobjekt.tipps[2];
        }
    } else {
        hinweis = aufgabenobjekt.tipps[0];
    }
    //fuer falsche antworten bei level 10 auchk hinweistext anzeigen
    if(aufgabenobjekt.typ==="" &&gewaehlteAnzahl !== anzahlStueckeGefaerbtSoll){
        hinweis = aufgabenobjekt.tipps[0];
        anzahlRAndomAufgabenFalsch++;
        if (anzahlRAndomAufgabenFalsch % 10 === 0) {
            hinweis = aufgabenobjekt.tipps[1];
        }
    }

    hinweisBox.append("<p>" + hinweis + "</p>");
    setTimeout(function () {
        hinweisBox.empty();
    }, 2000);


}




