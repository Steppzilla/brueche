
linkeSeiteschreiben();

$("#Aufgabenübersicht").find("p").click(function () {
    aufgabeDarstellen($(this).index())
}); //ende click links

function linkeSeiteschreiben() {
    aufgabeDarstellen(0)
    for (i = 0; i < iconString.length; i++) {
        if (iconString[i] != undefined) {
            var überschrift = "<p class='menüicon pic'>" + iconString[i] + "</p>"; //frowning face
        } else {
            var überschrift = "<p class='menüicon pic'>" + '<img class=images src="https://img.icons8.com/wired/64/000000/question-mark.png">' + "</p>";
        }
        $("#Aufgabenübersicht").append(überschrift);
    }
}

function aufgabeDarstellen(zahl){
    $("#Hinweistexte").empty();
    $("#Aufgabentext").children().eq(0).children().eq(0).html("Aufgabe");//überschrift

    var div1 = "<div class='bruchBox'></div>";
    /* var div2 = "<div class='operatorBox'> <p class='operator'> + </p> </div>";
     var div3 = "<div class='bruchBox'></div>";
     var div4 = "<div class='gleichBox'><p class='operator'> = </p> </div>";
     var div5 = "<div class='bruchBox'></div>";
     var div6 = "<div class='operatorBox'> <p class='operator'> + </p> </div>";
     var div7 = "<div class='bruchBox'></div>";
     var div8 = "<div class='gleichBox'><p class='operator'> = </p> </div>";
     var div9 = "<div class='bruchBox'></div>";*/

    $("#aufgabenFeld").children().eq(0).html("")
        .append(div1);

    var zählerdiv = "<p class='zählerböxchen' ></p>";
    var nennerdiv = "<p class='nennerböxchen' ></p>";

    $(".bruchBox").append(zählerdiv)
        .append(nennerdiv);

    //svg kopieren/Kreis erstellen:
    $(".bilderFeld").empty();

    object = additionsaufgabe("angeben");
    $("#Aufgabentext").children().eq(1).text(object.aufgabe);

    $(".bilderFeld").append("<div class='bruchbildboexchen'> </div>");  // Bild vom ersten Bruch erschaffen
    $(".bilderFeld").css("height", "100%");
    //Bild 1 erstellen:
    var ort1 = $(".bilderFeld").children().eq(0);
    var ort2 = $(".bilderFeld").children().eq(1);

    bruchbild(object.brueche[0].zaehler, object.brueche[0].nenner, ort1, 24);
    // bruchbild(aufgabe[2], aufgabe[3], ort2);

    //clickfunktion für lösungen

    $(".bruchBox").find(".zählerböxchen ,.nennerböxchen").click(function () {
        inputMachen($(this), object);
    });
}

function inputMachen(objekt, aufgabe) {
    //Input-Fenster löschen: (führt nicht zum error, selbst beim ersten klick,obwohl noch keins vorhanden ist... mh=?...
    $("input").remove();
    // Wähle die geklickte Box der Grid-Tabelle aus:
    var boxWähler = objekt;
    // Box leeren:
    var inhaltsspeicher = boxWähler.children();
    boxWähler.empty();
    //leeres Eingabefeld erzeugen und einfügen:
    var text1 = "<input type='text' class='input' id='inputFeld'>";
    boxWähler.append(text1);
    boxWähler.children().eq(0).focus();
    $("#inputFeld").keydown(
        function (e) {
            if (e.key=== "Enter" || e.key === "/") {
                e.preventDefault();
                var textUser = boxWähler.children().eq(0).val().replace("/", "");    // Der Value, also der eingegebene Text wird ausgelesen aus der Zelle und in textUser gespeichert.
                boxWähler.empty();
                var newUserElement = "<span style='font-size:inherit' >".concat(textUser, "</span>");

                if (textUser === "") {
                    boxWähler.append(inhaltsspeicher);
                } else {
                    boxWähler.append(newUserElement);

                    ergebnischeck(aufgabe);//alles wird als bruch gemalt und ggf hintergrund markiert
                    //Feedback:
                }
                inputMachen($(objekt).next(), aufgabe)
            } //enter oder slash
        }
    );
    $("#inputFeld").blur(
        function (e) {
            var textUser = boxWähler.children().eq(0).val();    // Der Value, also der eingegebene Text wird ausgelesen aus der Zelle und in textUser gespeichert.
            boxWähler.empty();
            var newUserElement = "<span style='font-size:inherit' >".concat(textUser, "</span>");

            if (textUser === "") {
                boxWähler.append(inhaltsspeicher);
            } else {
                boxWähler.append(newUserElement);

                ergebnischeck(aufgabe);//allles wird als bruch gemalt und ggf hintergrund markiert
                //Feedback:
            }
        }
    );
}

function ergebnischeck(aufgabe) {
    var zaehler1 = $(".zählerböxchen").children().eq(0).text();
    var nenner1 = $(".nennerböxchen").children().eq(0).text();

    //erster Bruch
    if ((isNaN(zaehler1)) || (isNaN(nenner1)) || (zaehler1 === "") || (nenner1 === "")) {
    } else {
        //var ergebnis = aufgabe.loesung.zaehler / aufgabe.loesung.nenner;
        var a1 = aufgabe.brueche[0].zaehler / aufgabe.brueche[0].nenner;
        var l1 = zaehler1 / nenner1;
        var ort2 = $("#Lösungstext").children().find(".bruchbildboexchen"); //der 2. ist immer der unsichtbare

        if (ort2.length === 0) {
            $("#Lösungstext").children().find('.bruchBox').parent().prepend("<div class='bruchbildboexchen'> </div>");  // Bild vom weiteren Bruch erschaffen
            ort2 = $("#Lösungstext").children().find(".bruchbildboexchen");
        }
        bruchbild(zaehler1, nenner1, ort2, 24);

        if (a1 === l1) {
            $(".zählerböxchen").parent().eq(0).css("background-color", "#2E7D32");//gruen?
            $("#Hinweistexte").empty();
            $("#Hinweistexte").append("<p> SUPER! Für eine neue Aufgabe klicke oben links auf das Auge</p>");
            ort2.empty();
            //STOPPE AUFGABE und EINGABEMöglichkeit??

        } else {
            $(".zählerböxchen").parent().eq(0).css("background-color", "#6A1B9A");//lilA
            $("#Hinweistexte").empty();
            let hinweisText1Vorhanden = zaehler1 != aufgabe.brueche[0].zaehler;
            console.log(hinweisText1Vorhanden);
            console.log(zaehler1);
            console.log(aufgabe.brueche[0].zaehler);

            if (hinweisText1Vorhanden) {
                $("#Hinweistexte").append("<p> *" + aufgabe.tipps[0] + " </p>");
                $(".zählerböxchen").append("<sup> * </sup>");
            }
            let hinweisText2Vorhanden = nenner1 != aufgabe.brueche[0].nenner;
            if (hinweisText2Vorhanden && !hinweisText1Vorhanden) {
                $("#Hinweistexte").append("<p> *" + aufgabe.tipps[1] + " </p>");
                $(".nennerböxchen").append("<sup> * </sup>");

                //im challlenge-modus hier auch stoppen und Fehler zählen.
            }
        }
    }

}


