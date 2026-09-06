function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bruch(a, b) {
    return {
        zaehler: a,
        nenner: b
    };
}

function bruchDarstellen(zielBox, radius, zaehler, nenner) {

    let u = 2 * Math.PI * radius;
    let anteilNenner = u / nenner;
    let positionI = 0;
    zielBox.empty();

    if (nenner !== 0) {
        zielBox.append(`
    <svg class="kreisDiagramm"
         viewBox="0 0 110 110"
         xmlns="http://www.w3.org/2000/svg">
        ${pattern}
    </svg>
    `);
        let anzahlGanze = Math.ceil(zaehler / nenner);
        zielBox.show();
        let svg = zielBox.find(".kreisDiagramm").first();

        bruchteilebauen(radius, nenner, zielBox);
        //behälter leeren, nur 1 kreis beibehalten
        for (let i = 0; i < nenner; i++) {              //blau färben, vor-Einteilung /Stückelung
            positionI = i * anteilNenner;
            let a = "4," + positionI + " , " + anteilNenner + " ,0";
            svg.find(".teil").eq(i).css("stroke-dasharray", a);
            svg.find(".teil").eq(i).css("stroke", metallFarbe(i, false));
        }

        //Fuer mehrfache Ganze ein weiteres bruchstück hinzufügen
        for (let i = 1; i < (anzahlGanze); i++) {   // Vielfache klonen. automatisch schon richtige Einteilung
            svg.clone().appendTo(zielBox); //nur den Inhalt/Kreis kopieren in die box
        }

        // gesuchter Anteil / Stuecke dunkel faerben
        for (let f = 0; f < Math.abs(zaehler); f++) {
            let gegenzaehler = Math.abs(zaehler) - 1 - f;
            let indexFuerGanze = Math.floor(f / nenner);
            let teilIndex = nenner - gegenzaehler % nenner - 1;
            let teil = zielBox.children().eq(indexFuerGanze).find(".teil").eq(teilIndex);

            if (f === 0 && anzahlGanze === 1 || (indexFuerGanze + 1 === anzahlGanze && f % nenner === 0)) {
                teil.css("filter", shadow);
            }

            teil.css("stroke", metallFarbe(f, true));
        }
    } else // wenn nenner 0 ist
    {
        zielBox.text("keine Darstellung möglich");
    }
}

function bruchteilebauen(radius, nenner, dort) {
    //alert(nenner + "   " + dort);
    for (let j = 0; j < nenner; j++) {
        const svg = dort.find(".kreisDiagramm").first();

        const svgNS = "http://www.w3.org/2000/svg";
        const mittelpunktAbstand = 55;//2 * radius + 7;
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttributeNS(null, "class", "teil");
        circle.setAttributeNS(null, "cx", "" + mittelpunktAbstand);
        circle.setAttributeNS(null, "cy", "" + mittelpunktAbstand);
        circle.setAttributeNS(null, "r", "" + radius);
        circle.setAttributeNS(null, "stroke-width", radius * 2 + "");
        circle.setAttributeNS(null, "fill", "none");
        //circle.setAttributeNS(null, "stroke-dasharray", "0,2,0,0");
        svg.append(circle);
    }
}