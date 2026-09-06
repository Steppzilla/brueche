let aufgabenobjekt = {brueche: [{zaehler: 0, nenner: 1}]};


$("#auswahl, #taskauswahl").on("change", function () {
    aufgabeDarstellen()
});
$("#neueTaskButton").on("click", function () {
    aufgabeDarstellen()
});
$(document).on("click", ".auswerten-button", function () {
    pruefeAnzahl();
});

// --------------------------------------------------
// AUSWERTUNG
function punkteHochzaehlen() {
    richtigeAntworten++;
    $("#punkte").text(richtigeAntworten);
}

// --------------------------------------------------


function erstelleVerschiedeneAufgabenTypen(radius) {

    let aufgabenBox = $("#Aufgabentext");
    let loesungsBox = $("#aufgabenFeld");

    // let bilderFeld = $(".bilderFeld"); war in aufgabenbox

    // alte Inhalte löschen
    aufgabenBox.empty();
    loesungsBox.empty();

    // Bild-Box erstellen
    let bilderFeld = $(
        "<div class='bilderFeld'>" +
        "<div class='bruchbildboexchen'></div>" +
        "</div>"
    );
    let bruchbildbox = bilderFeld.find(".bruchbildboexchen");

    // Antwort-Box erstellen
    let bruchBox = $("<div class = 'bruchBox'></div>");

    // ab hier Aufgabentyp bestimmen

    let zaehler = aufgabenobjekt.brueche[0].zaehler;
    let nenner = aufgabenobjekt.brueche[0].nenner;
    let aufgabentyp = aufgabenobjekt.typ;
//bruchAusAnzahl"anzahlAusMenge  bruchAusBild

    let randomtyp = rand(1, 3);

    if (aufgabentyp === "") {
        if (randomtyp === 1) aufgabentyp = "bruchAusBild";
        if (randomtyp === 2) aufgabentyp = "bruchAusAnzahl";
        if (randomtyp === 3) aufgabentyp = "anzahlAusMenge";
    }

    var zaehlerdiv = "<p class='zählerböxchen' ></p>";
    var nennerdiv = "<p class='nennerböxchen' ></p>";

    if (aufgabentyp === "bruchAusBild") {

        bruchDarstellen(bruchbildbox, radius, zaehler, nenner);
        bruchBox.append(zaehlerdiv)
            .append(nennerdiv);
        aufgabenBox.append(bilderFeld);
        loesungsBox.append(bruchBox);
        inputMachen(bruchBox.find(".zählerböxchen"));

    } else if (aufgabentyp === "bruchAusAnzahl") {

        let anzahlGanze = aufgabenobjekt.anzahlGanze;
        bruchAlsAnteil(bruchbildbox, anzahlGanze);
        inputMachen(bruchBox.find(".zählerböxchen"));
        bruchBox.append(zaehlerdiv)
            .append(nennerdiv);
        aufgabenBox.append(bilderFeld);
        loesungsBox.append(bruchBox);

    } else if (aufgabentyp === "anzahlAusMenge") {
        zaehlerdiv = "<p class='zählerböxchen' >" + zaehler + "</p>";
        nennerdiv = "<p class='nennerböxchen' >" + nenner + "</p>";
        inputAlsAnteil(bruchbildbox.parent());
        bruchBox.append(zaehlerdiv)
            .append(nennerdiv);

        aufgabenBox.append(bruchBox);
        loesungsBox.append(bilderFeld);


    }

    if (aufgabentyp === "bruchAusBild" || aufgabentyp === "bruchAusAnzahl") {
        bruchBox.find(".zählerböxchen, .nennerböxchen").click(function () {
            inputMachen($(this));
        });
    }
}

function aufgabeDarstellen() {

    let aufgabenText = $("#Aufgabentext");
    $("#Hinweistexte").empty();
    aufgabenText.children().eq(0).children().eq(0).html("Aufgabe");//überschrift

    //svg kopieren/Kreis erstellen:

    bruchAngebenTaskErstellen();
    aufgabenText.children().eq(1).text(aufgabenobjekt.aufgabe);
    //Bild 1 erstellen:
    erstelleVerschiedeneAufgabenTypen(24);
}


