$(".menu").hide();
let clickCount = 0;
let gewaehlteAnzahl = 0;
const shadow = "  drop-shadow(-0px -0px 2px var(--dunkler-schatten))";


function helleFarbeErgaenzen(svg, i) {
    let neuesSVG = svg.clone();
    neuesSVG.addClass("reformatierbar");
    neuesSVG.css("stroke", metallFarbe(i, false));

    return neuesSVG;
}

function erstelleSlider(anzahlGanze, sliderValue) {
    return `
    <p>
        <label for="breite-slider">
            Anzahl pro Reihe:
            <span class="slider-wert">${sliderValue}</span>
        </label>
        <input
            type="range"
            id="breite-slider"
            class="breite-slider"
            min="1"
            max="${anzahlGanze}"
            value="${sliderValue}"
        >
    </p>
    `;
}


function ggT(a, b) {
    while (b !== 0) {
        let rest = a % b;
        a = b;
        b = rest;
    }

    return a;
}

function optimalenNennerBestimmen(anzahlGanze, nenner) {
    return Math.abs(anzahlGanze * nenner) / ggT(anzahlGanze, nenner);
}

///Anteil mehrerer Objekte
function bruchAlsAnteil(bruchbildbox, anzahlGanze) {

    let zaehler = aufgabenobjekt.brueche[0].zaehler;
    let nenner = aufgabenobjekt.brueche[0].nenner;

    const radius = 24;

    bruchbildbox.empty();

    // --------------------------------------------------
    // SLIDER
    // --------------------------------------------------
    let sliderValue = anzahlGanze;
    if (anzahlGanze > 6) {
        sliderValue = 6;
    }

    bruchbildbox.append(erstelleSlider(anzahlGanze, sliderValue));

    const slider = bruchbildbox.find(".breite-slider");
    const sliderWert = bruchbildbox.find(".slider-wert");

    // --------------------------------------------------
    // CONTAINER FÜR DIE BRUCHBILDER
    // --------------------------------------------------

    bruchbildbox.append(`
        <div class="reformatier-container"></div>
    `);

    const container = bruchbildbox.find(".reformatier-container");


    // --------------------------------------------------
    // NENNER = 0
    // --------------------------------------------------

    if (nenner === 0) {

        bruchbildbox.text("keine Darstellung möglich");
        return;
    }

    // --------------------------------------------------
    // ERSTES SVG
    // --------------------------------------------------

    container.append(`
        <svg class="kreisDiagramm reformatierbar"
             viewBox="0 0 110 110"
             xmlns="http://www.w3.org/2000/svg">
            ${pattern}
        </svg>
    `);

    let svg = container.find(".kreisDiagramm").first();

    svg.css("filter", "drop-shadow(-1px -1px 1px  var(--weisser-schatten)) drop-shadow(1px 1px 1px  var(--dunkler-schatten))");
    svg.css("stroke", "url(#metall1)");

    //der wievielete ist geteilt - wenn die Aufgabe nicht aufgeht, z.b. 4/6 von 8 Teilen?
   /* if (anzahlGanze % nenner !== 0) {// dOOF doof DOOF
        //groesse eines bruchstuecks
        let anteilGroesse = anzahlGanze / nenner;
        //wie viele Ganze sind enthalten?
        let ganzeStuecke = Math.floor(anteilGroesse * zaehler);
        let xTesElementIstBruch = ganzeStuecke + 1;
        //optimalen nenner  bestimmen
        let neuerNEnner = optimalenNennerBestimmen(anzahlGanze, nenner);
        let darzustellenderBruchteilImXtenElement = anteilGroesse*zaehler - ganzeStuecke;

    }*/

    // --------------------------------------------------
    // ersten KREIS ERZEUGEN
    // --------------------------------------------------
    bruchteilebauen(radius, 1, container);

    // --------------------------------------------------
    // WEITERE GANZE ERZEUGEN
    // --------------------------------------------------

    for (let i = 1; i < anzahlGanze; i++) {
        container.append(helleFarbeErgaenzen(svg, i));
    }

    // --------------------------------------------------
    // GESUCHTEN ANTEIL FÄRBEN
    // --------------------------------------------------

    const anteilBruchstueck = anzahlGanze / nenner;

    const anzahlStueckeGefaerbt =
        anteilBruchstueck * zaehler;

    for (let f = 0; f < anzahlStueckeGefaerbt; f++) {
        let teil = container
            .find(".reformatierbar")
            .eq(f)
            .find(".teil")
            .eq(0);

        teil.css("filter", shadow);

        teil.css("stroke", metallFarbe(f, true));
    }

    // --------------------------------------------------
    // SLIDER
    // --------------------------------------------------
    slider.on("input", function () {

        layoutAktualisieren(slider, container, sliderWert, anzahlGanze);

    });

    slider.on("change", function () {
        sliderBreiteAktualisieren(slider);
    });
    // --------------------------------------------------
    // START
    // -------------------------------------------------
    layoutAktualisieren(slider, container, sliderWert, anzahlGanze);
    sliderBreiteAktualisieren(slider);
    bruchbildbox.show();


}


//typ 3
function inputAlsAnteil(bruchbildbox) {

    let nenner = aufgabenobjekt.brueche[0].nenner;
    let anzahlGanze = aufgabenobjekt.anzahlGanze;
    let radius = 24;

    bruchbildbox.empty();

    // --------------------------------------------------
    // BILDSCHIRMBREITE / CONTAINERBREITE
    // --------------------------------------------------
    const bildschirmBreite = window.innerWidth;
    const containerBreite = bildschirmBreite * 0.8;

    // --------------------------------------------------
    // SLIDER
    // --------------------------------------------------
    let sliderValue = anzahlGanze;
    if (anzahlGanze > 6) {
        sliderValue = 6;
    }

    bruchbildbox.append(erstelleSlider(anzahlGanze, sliderValue));

    // JETZT existieren die Elemente
    const slider = bruchbildbox.find(".breite-slider");
    const sliderWert = bruchbildbox.find(".slider-wert");

    slider.css("width", containerBreite + "px");

    // --------------------------------------------------
    // SLIDER-EVENT
    // --------------------------------------------------
    slider.on("input", function () {

        layoutAktualisieren(
            slider,
            container,
            sliderWert,
            anzahlGanze
        );

    });

    slider.on("change", function () {
        sliderBreiteAktualisieren(slider);
    });


    // --------------------------------------------------
    // CONTAINER FÜR DIE BRUCHBILDER
    // --------------------------------------------------
    bruchbildbox.append(`
        <div class="reformatier-container"></div>
    `);

    const container = bruchbildbox.find(".reformatier-container");
    // --------------------------------------------------
    // NENNER = 0
    // --------------------------------------------------
    if (nenner === 0) {

        bruchbildbox.text("keine Darstellung möglich");
        return;
    }

    // --------------------------------------------------
    // ERSTES SVG
    // --------------------------------------------------
    container.append(`
        <svg class="kreisDiagramm reformatierbar"
             viewBox="0 0 110 110"
             xmlns="http://www.w3.org/2000/svg">
            ${pattern}
        </svg>
    `);

    let svg = container.find(".kreisDiagramm").first();

    // --------------------------------------------------
    // KREIS ERZEUGEN
    // --------------------------------------------------
    bruchteilebauen(radius, 1, container);

    // --------------------------------------------------
    // WEITERE GANZE ERZEUGEN
    // --------------------------------------------------
    svg.css("filter", "drop-shadow(-1px -1px 1px  var(--weisser-schatten)) drop-shadow(1px 1px 1px  var(--dunkler-schatten))");
    svg.css("stroke", "url(#metall1)");

    for (let i = 1; i < anzahlGanze; i++) {
        container.append(helleFarbeErgaenzen(svg, i));
    }

    // --------------------------------------------------
    // geklickte Elemente FÄRBEN
    // --------------------------------------------------
    container
        .find(".reformatierbar")
        .on("click", function () {
            clickCount++;

            faerbeTeil(this);
        });

    // --------------------------------------------------
    // SLIDER
    // --------------------------------------------------
    slider.on("input", function () {

        layoutAktualisieren(slider, container, sliderWert, anzahlGanze);

    });

    slider.on("change", function () {
        sliderBreiteAktualisieren(slider);
    });

    // --------------------------------------------------
    // START
    // --------------------------------------------------
    layoutAktualisieren(slider, container, sliderWert, anzahlGanze);
    sliderBreiteAktualisieren(slider);

    bruchbildbox.show();
    bruchbildbox.append(`
        <button class="auswerten-button">
            prüfen
        </button>
    `);


}

function faerbeTeil(element) {

    const teil = $(element).find(".teil").first();

    const aktuellerStroke = teil.css("stroke");

    let farbe;

    // Bereits dunkle/farbige Variante -> normale Variante
    if (aktuellerStroke.includes("metall4")) {
        farbe = "#metall1";
        gewaehlteAnzahl--;

    } else if (aktuellerStroke.includes("metall5")) {
        farbe = "#metall2";
        gewaehlteAnzahl--;

    } else if (aktuellerStroke.includes("metall6")) {
        farbe = "#metall3";
        gewaehlteAnzahl--;

        // Noch keine metall4/5/6 -> wie bisher auswählen
    } else {
        gewaehlteAnzahl++;
        farbe = clickCount % 2 === 0
            ? "#metall5"
            : "#metall6";

        if (clickCount % 3 === 0) {
            farbe = "#metall4";
        }
    }

    teil.css("stroke", "url(" + farbe + ")");
}


// --------------------------------------------------
// LAYOUT AKTUALISIEREN
// --------------------------------------------------


function layoutAktualisieren(
    slider,
    container,
    sliderWert,
    anzahlGanze
) {
    const wert = Number(slider.val());

    // Nur Kreise aktualisieren
    sliderWert.text(wert);

    const kreisBreite = Math.min(
        56,
        window.innerWidth * 0.12
    );

    const rasterBreite =
        wert * kreisBreite + (wert - 1);

    container.css({
        "display": "grid",
        "grid-template-columns":
            `repeat(${wert}, ${kreisBreite}px)`,
        "gap": "1px",
        "width": rasterBreite + "px",
        "margin": "0 auto"
    });

    container.children().css({
        "width": kreisBreite + "px",
        "height": kreisBreite + "px"
    });

}

function sliderBreiteAktualisieren(slider) {

    const wert = Number(slider.val());
    const kreisBreite = Math.min(
        56,
        window.innerWidth * 0.12
    );
    // ---------------------------------------
    // SLIDER
    // ---------------------------------------
    const sliderBreite =
        Math.max(wert, 4) * kreisBreite;

    slider.css({
        "width": sliderBreite + "px",
        "margin": "0 auto"
    });
}

//farben
function metallFarbe(index, dunkel = false) {
    const farben = dunkel
        ? ["metall5", "metall4", "metall6"]
        : ["metall2", "metall3", "metall1"];

    return `url(#${farben[index % 3]})`;
}

//Farb-pattern
const pattern = `<defs>
    <pattern id="metall1"
             width="18" height="18"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(45)">
        <rect width="18" height="18" fill="var(--metall1-bg)"/>
        <rect width="1" height="18"
              fill="var(--metall3-line)" opacity="var(--metall1-highlight-opacity)"/>
    </pattern>

    <pattern id="metall2"
             width="12" height="12"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(25)">
        <rect width="12" height="12"
              fill="var(--metall2-bg)"/>

        <rect width="1" height="12"
              fill="var(--metall3-line)"
              opacity="var(--metall1-highlight-opacity"/>
    </pattern>

    <pattern id="metall3"
             width="14" height="14"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(-20)">
        <rect width="14" height="14"
              fill="var(--metall3-bg)"/>

        <rect width="2" height="14"
              fill="var(--metall3-line)"
              opacity="var(--metall1-highlight-opacity)"/>
    </pattern>


    <pattern id="metall4"
             width="20" height="20"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(335)">
        <rect width="20" height="20"
              fill="var(--metall4-bg)"/>

        <rect width="1" height="20"
              fill="var(--metall4-line)"
              opacity="var(--metall4-line-opacity)"/>

        <rect x="9" width="1" height="20"
              fill="var(--metall4-dark-line)"
              opacity="var(--metall4-dark-line-opacity)"/>
    </pattern>


    <pattern id="metall5"
             width="16" height="16"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(30)">
        <rect width="16" height="16"
              fill="var(--metall5-bg)"/>
        <rect width="1" height="16"
              fill="var(--metall5-line)"
              opacity="var(--metall5-line-opacity)"/>
    </pattern>

    <pattern id="metall6"
             width="28" height="28"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(70)">
        <rect width="28" height="28"
              fill="var(--metall6-bg)"/>

        <rect width="2" height="28"
              fill="var(--metall6-line)"
              opacity="var(--metall6-line-opacity)"/>

        <rect x="12" width="1" height="28"
              fill="var(--metall6-dark-line)"
              opacity="var(--metall6-dark-line-opacity)"/>
    </pattern>
</defs>`;