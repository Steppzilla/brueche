$(".menu").hide();

//bruchbild(1,3,  $("#BruchBild"));
function bruchbild(zähler, nenner, dort) {
    var radius = 24;
    var u = 2*Math.PI * radius;
    var anteilNenner = u / nenner;
    var positionI = 0;
    var kommazahl = Math.abs(zähler) / nenner; //absolut also betrag
    dort.empty();

    if (nenner != 0) {
        $("#BruchBild").clone().appendTo(dort);
        $(".bilderFeld").children().find("#BruchBild").removeAttr("id"); //wichtig! sonst kaputte Klone

        //  dort.children().first().show(); //erstes Element muss drin bleiben
        dort.children().first().css("opacity", "0.8");
        //var hier = dort.parent().chidren().eq(i);
        bruchteilebauen(radius, nenner, dort);
        //behälter leeren, nur 1 kreis beibehalten

        for (i = 0; i < nenner; i++) {              //blau färben, vor-Einteilung /Stückelung
            positionI = i * anteilNenner;

            var a = "4," + positionI + " , " + anteilNenner + " ,0";

            dort.children().first().find(".teil").eq(i).css("stroke-dasharray", a);
            //  dort.css("background-color","green");

            if (i % 2 === 0) {
                dort.children().first().find(".teil").eq(i).css("stroke", "#2E2E2E"); //steelblue
            } else {
                dort.children().first().find(".teil").eq(i).css("stroke", "#282828"); //#3366ff
            }
        }


        for (i = 1; i < (kommazahl); i++) {   // Vielfache klonen. automatisch schon richtige Einteilung

            dort.children().first().clone().appendTo(dort.children().first().parent()); //nur den Inhalt/Kreis kopieren in die box
        }


        for (f = 0; f < Math.abs(zähler); f++) {      //rot färben //muss unterschieden werden für größer 1
            if (f % 2 === 0) {
                //  dort.children().first().find(".teil").eq(f).css("stroke","#b30000");
                for (k = 0; k < (kommazahl); k++) {
                    if ((f >= k * nenner) && (f < (k + 1) * nenner)) {
                        dort.children().eq(k).find(".teil").eq(-f + k * nenner).css("stroke", "steelblue");
                        if (zähler < 0) {
                            dort.children().eq(k).find(".teil").eq(-f + k * nenner).css("stroke", "orange");
                        }
                    }
                }
            } else {
                for (k = 0; k < (kommazahl); k++) {
                    if ((f >= k * nenner) && (f < (k + 1) * nenner)) {
                        dort.children().eq(k).find(".teil").eq(-f + k * nenner).css("stroke", "#3366ff");
                        if (zähler < 0) {
                            dort.children().eq(k).find(".teil").eq(-f + k * nenner).css("stroke", "darkorange");
                        }
                    }
                }
            }

        }

    } else // wenn nenner 0 ist
    {
        dort.text("keine Darstellung möglich");
    }
}


function bruchteilebauen(radius, nenner, dort) {
    //alert(nenner + "   " + dort);
    for (j = 0; j < nenner; j++) {
        var svgNS = "http://www.w3.org/2000/svg";

        var circle = document.createElementNS(svgNS, "circle");
        circle.setAttributeNS(null, "class", "teil");
        circle.setAttributeNS(null, "cx", "55");
        circle.setAttributeNS(null, "cy", "55");
        circle.setAttributeNS(null, "r", ""+radius);
        circle.setAttributeNS(null, "stroke-width", "48");
        circle.setAttributeNS(null, "stroke-dasharray", "0,0,0,0");

        dort.children().first().append(circle);
    }

}
