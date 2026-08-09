$(".menu").hide();

//bruchbild(1,3,  $("#BruchBild"));
function bruchbild(zähler, nenner, dort, radius) {

    var u = 2 * Math.PI * radius;
    var anteilNenner = u / nenner;
    var positionI = 0;
    dort.empty();

    if (nenner !== 0) {
        dort.append(`
    <svg class="kreisDiagramm"
         height="110pt"
         viewBox="0 0 110 110"
         xmlns="http://www.w3.org/2000/svg">
        <defs>
    <!-- 1: Dunkelblau, feine diagonale Bürstung -->
    <pattern id="metall1"
             width="18" height="18"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(35)">
        <rect width="18" height="18" fill="#202F55"/>
        <rect width="1" height="18"
              fill="#FFFFFF" opacity="0.10"/>
    </pattern>

    <!-- 2: Mittelblau, sehr feine Bürstung -->
    <pattern id="metall2"
             width="12" height="12"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(25)">
        <rect width="12" height="12" fill="#32466F"/>
        <rect width="1" height="12"
              fill="#FFFFFF" opacity="0.14"/>
    </pattern>
    
    <!-- 3: Dunkelblau, leicht stärkere Bürstung -->
<pattern id="metall3"
         width="14" height="14"
         patternUnits="userSpaceOnUse"
         patternTransform="rotate(-20)">
    <rect width="14" height="14" fill="#273858"/>
    <rect width="2" height="14"
          fill="#FFFFFF" opacity="0.12"/>
</pattern>

<!-- 4: Mittelblau, feine doppelte Bürstung -->
<pattern id="metall4"
         width="20" height="20"
         patternUnits="userSpaceOnUse"
         patternTransform="rotate(35)">
    <rect width="20" height="20" fill="#426F9F"/>
    <rect width="1" height="20"
          fill="#FFFFFF" opacity="0.14"/>
    <rect x="9" width="1" height="20"
          fill="#182640" opacity="0.10"/>
</pattern>

    <!-- 5: helles Blau, feine helle Linien -->
    <pattern id="metall5"
             width="16" height="16"
             patternUnits="userSpaceOnUse"
             patternTransform="rotate(40)">
        <rect width="16" height="16" fill="#477EB2"/>
        <rect width="1" height="16"
              fill="#FFFFFF" opacity="0.16"/>
    </pattern>

    <!-- 6: kräftiges Blau, stärkere Struktur -->
<!-- 6: gedecktes Blau, stärkere Struktur -->
<pattern id="metall6"
         width="28" height="28"
         patternUnits="userSpaceOnUse"
         patternTransform="rotate(50)">
    <rect width="28" height="28" fill="#3A5FA8"/>
    <rect width="2" height="28"
          fill="#FFFFFF" opacity="0.11"/>
    <rect x="12" width="1" height="28"
          fill="#101A30" opacity="0.12"/>
</pattern>
</defs>
</svg>
`);

        let shadow = "  drop-shadow(0px 0px 7px black) drop-shadow(0px 0px 8px rgba(70, 70, 70, 0.0))";
        let anzahlGanze = Math.ceil(zähler / nenner); // flachengroesse: 0, 1/4=0 2/4 =  0  3/4=0

        /// let shadow = "  drop-shadow(1px 1px 1px darkgrey)   drop-shadow(-1px -1px 1px darkgrey) drop-shadow(1px -1px 1px darkgrey)   drop-shadow(+1px -1px 1px darkgrey)";
        dort.show(); //erstes Element muss drin bleiben
        let erstesKind = dort.children().first();

        erstesKind.css("opacity", "0.9");
        //var hier = dort.parent().chidren().eq(i);
        bruchteilebauen(radius, nenner, dort);
        //behälter leeren, nur 1 kreis beibehalten

        for (let i = 0; i < nenner; i++) {              //blau färben, vor-Einteilung /Stückelung
            positionI = i * anteilNenner;
            var a = "4," + positionI + " , " + anteilNenner + " ,0";
            erstesKind.find(".teil").eq(i).css("stroke-dasharray", a);
            //  dort.css("background-color","green");
            if (i % 3 === 0) {
                erstesKind.find(".teil").eq(i).css("stroke", "url(#metall2)");
                // erstesKind.find(".teil").eq(i).css("stroke", "#202F55"); //helligkeit 46 #2E2E2E--- //blaue dunkle  424875, schwarz: 323232
            } else   if (i % 3 === 1) {
                erstesKind.find(".teil").eq(i).css("stroke", "url(#metall3)");
                // erstesKind.find(".teil").eq(i).css("stroke", "#202F55"); //helligkeit 46 #2E2E2E--- //blaue dunkle  424875, schwarz: 323232
            }
            else {
                erstesKind.find(".teil").eq(i).css("stroke", "url(#metall1)");
                //   erstesKind.find(".teil").eq(i).css("stroke", "#293A63"); //#3366ff helligkeit 40     //blau dunkel 363e80, schwarz: 282828
            }
        }

        //Fuer mehrfache Ganze ein weiteres bruchstück hinzufügen
        for (let i = 1; i < (anzahlGanze); i++) {   // Vielfache klonen. automatisch schon richtige Einteilung
            erstesKind.clone().appendTo(dort.children().first().parent()); //nur den Inhalt/Kreis kopieren in die box
        }


        for (let f = 0; f < Math.abs(zähler); f++) {

            //Bsp zähler=5 nenner=2 :
            /// 0,1,2,3,4
            let gegenzaehler = Math.abs(zähler) - 1 - f; // 4,3,2,1,0
            let indexFuerGanze = Math.floor(f / nenner); // 0/2 = 0, 1/2 = 0 , 2/2 = 1, 3/2 = 1, 2 (0,0,1,1,2)
            let teilIndex = nenner - gegenzaehler % nenner - 1;  // 2 - 4 -1
            let teil = dort.children().eq(indexFuerGanze).find(".teil").eq(teilIndex);
            console.log("F" + f)
            console.log(f%nenner)
            if (f === 0 && anzahlGanze === 1 || (indexFuerGanze+1 === anzahlGanze&&f%nenner === 0)) {
                teil.css("filter", shadow);
            }
            if (f % 3 === 0) {
                console.log(f)
                teil.css("stroke", "url(#metall5)");
                // teil.css("stroke", "steelblue");
                if (zähler < 0) {
                    teil.css("stroke", "orange");
                }
            } else if (f % 3 === 1){
                teil.css("stroke", "url(#metall4)");
                if (zähler < 0) {
                    teil.css("stroke", "red");
                }
            }
            else {
                teil.css("stroke", "url(#metall6)");
                //teil.css("stroke", "white");
                if (zähler < 0) {
                    teil.css("stroke", "darkorange");
                }
            }
        }
        //Shadow an erstes kind machen:

        // dort.children().eq(0).find(".teil").eq(0).css("stroke", "darkorange");


    } else // wenn nenner 0 ist
    {
        dort.text("keine Darstellung möglich");
    }
}

function bruchteilebauen(radius, nenner, dort) {
    //alert(nenner + "   " + dort);
    for (let j = 0; j < nenner; j++) {
        const svg = dort.children().first();

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
