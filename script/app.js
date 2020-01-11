/**
    Copyright 15.05.2019 Daniel Lambrecht

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */


const result = document.formular.result;                    //eingabe bzw. ergebnisfeld
const memory = document.formular.save;                      //zwischenspeicherfeld
const history  = document.getElementById('history');        //p tag der den verlauf der rechnungen enthält 
const history_btn = document.getElementById('hist-btn');    //button um den verlauf zu löschen
const calcbox_shadow = document.getElementById('calc-box'); //schatten des Taschenrechners (bzw das ganze Div element)

var errorcode = "Ungueltige Eingabe :/";                    //wird bei fehlerhaften eingaben ausgegeben
var divByZero = "Division durch 0 :/";                      //wird bei einer division durch 0 ausgegeben

var bin_pattern = '[^0-1]';                                 //beschreibt das inhaltsmuster von binärzahlen
var hex_pattern = '[^0-9a-fA-F]';                           //beschreibt das inhaltsmuster von Hexzahlen
var dec_pattern = '[^0-9]';                                 //beschreibt das inhaltsmuster von Dezimalzahlen

var hist_c = 0;                                             //zähler für den inhalt im Verlauf (max 20 inhalte)
var theme = 0;                                              //modulo wert um zwischen hell und Dunkel zu wechseln
var xy = false;                                             //gibt an ob gerade eine x zahl hoch y gerechnet wird

/**
 * fügt dem Ergebnis-Textfeld ein Zeichen hinzu
 * @param {String} content übergebenes zeichen 
 */
function insert(content) {
    //wenn im feld ein errorcode vorhanden ist wird automatisch gelöscht und dann eingegeben
    if(result.value == errorcode || result.value == divByZero) {
        result.value = "";
    }
    //einsetzen des neuen wertes
    result.value += content;

}
/**
 * rechnet das ergebnis aus
 */
function calculate() {
    //wenn keine rechnung vorhanden ist abbrechen
    if(result.value == ""){glow(); return;}  
    //versuche das ergebnis auszurechnen
    try {
        if(xy) {
            var res = result.value.split('^');
            result.value = Math.pow(eval(parseFloat(res[0])), eval(parseFloat(res[1]))).toString();
            xy = false;
            addToHistory(`<br>${res[0]}^${res[1]} = ${result.value}`)
            return;
        }   
        var res = eval(result.value);                 //res übernimmt den wert des ergebnisses
        addToHistory(`<br>${result.value} = ${res}`); //rechnung wird in der history ausgegeben
        result.value = res;                           //das Ergebnisfeld bekommt den ausgerechneten Wert
        if(result.value == "Infinity")                //wenn das ergebnis Infinity ist 
            result.value = divByZero;                 //fehlermeldung(n/0) ausgeben
     //wenn fehlerhafte eingabe (try statement gescheitert), dann Fehlermeldung und aufleuchtender Hintergrund des div-elements
    } catch(e) {    
        result.value = errorcode;                             //fehlermeldung
        glow();
    }
}
/**
 * rechnet aus der eingabe die Wurzel
 */
function root() {
    var x = result.value;         //x übernimmt den wert des eingabefelds
    if(x == ""){glow(); return;}            //wenn keine werte vorhanden sind abbrechen
    result.value = (Math.sqrt(parseFloat(eval(result.value)))); //ergebnis ausrechnen und ausgeben
    addToHistory(`<br>&radic;${x} = ${result.value}`);    //berechnung zum Verlauf hinzufügen
}
/**
 * Berechnet aus einer Zahl o. Rechnung das Quadrat
 */
function square() {
    var x = result.value;                           //x übernimmt den wert des eingabefelds
    if(x == ""){ glow(); return;}                   //wenn keine werte vorhanden sind abbrechen
    result.value = eval(x) * eval(x);               //quadrat berechnen und ausgeben
    addToHistory(`<br>(${x})² = ${result.value}`);  //zum Verlauf hinzufügen
}
/**
 * Berechnet Kubik aus einer Zahl o. einer Rechnung
 */
function kubic() {
    var x = result.value;                           //übernahme der Eingabe 
    if(x == ""){glow(); return;}                    //wenn keine eingabe dann abbrechen
    result.value = eval(x) * eval(x) * eval(x);     //ausrechnen 
    addToHistory(`<br>(${x})³ = ${result.value}`);  //zum Verlauf hinzufügen
}
/**
 * Berechnet aus der eingegeben Zahl o. Rechnung die 
 * Funktion 1/n (n = eingegebener wert)
 */
function one_div_n() {
    var x = result.value;                           //übernahme der Eingabe 
    if(x == ""){glow(); return;}                    //wenn keine Eingabe abbrechen
    result.value = parseFloat(1/eval(x));           //ausrechnen
    addToHistory(`<br>1/${x} = ${result.value}`);   //zum Verlauf hinzufügen
}
/**
 * Konvertiert die Aktuelle Zahl im eingabefeld
 * Mit der funktion isDecimal . . .; wird überprüft ob die 
 * eingegebene zahl einem bestimmten komplement angehört
 * zu einer Binären zahl
 */
function convert_to_Bin() {
    if(result.value == ""){glow(); return;}                         //wenn keine eingabe abbrechen
    var myBin = result.value;                                       //myBin übernimmt den wert der Eingabe
    if(isDecimal(myBin.toString())) {                               //wenn die Eingabe Eine Dezimalzahl ist 
        result.value = parseInt(myBin).toString(2);                 //Dezimal zu Binär Konvertieren
        addToHistory(`<br>${myBin}(10) = ${result.value}(2)`);      //zum Verlauf hinzufügen
    } else if(isHex(myBin.toString())) {                            //wenn die eingabe eine HexZahl ist 
        result.value = parseInt(myBin, 16).toString(2);             //Hex zu binär konvertieren
        addToHistory(`<br>${myBin}(16) = ${result.value}(2)`);      //zum Verlauf hinzufügen
    }
}
/**
 * Convertiert das Aktuelle ergebnis im eingabefeld
 * zu einer Hexadezimalen zahl
 */
function convert_to_Hex() {
    if(result.value == ""){glow(); return;}
    var myHex = result.value;
    if(isBinary(result.value.toString())) {
        result.value = parseInt(myHex, 2).toString(16);
        addToHistory(`<br>${myHex}(2) = ${result.value}(16)`);
    } else if(isDecimal(result.value.toString())) {
        result.value = parseInt(myHex).toString(16);
        addToHistory(`<br>${myHex}(10) = ${result.value}(16)`);
    }
}
/**
 * Convertiert das Aktuelle ergebnis im eingabefeld
 * zu einer Dezimalen zahl
 */
function convert_to_Dec() {
    if(result.value == ""){glow(); return;}
    var myDec = result.value;
    if(isBinary(result.value.toString())) {
        result.value = parseInt(myDec, 2);
        addToHistory(`<br>${myDec}(2) = ${result.value}(10)`);
    } else if(isHex(result.value.toString())) {
        result.value = parseInt(myDec, 16);
        addToHistory(`<br>${myDec}(16) = ${result.value}(10)`);
    }
}
/**
 * berechnet aus einer Zahl o. Rechnung den natürlichen
 * Logarithmus
 */
function log() {
    var x = result.value;                               //übernahme der Eingabe
    if(x == ""){glow(); return;}                        //wenn keine Eingabe abbrechen
    result.value = Math.log10(eval(x));                 //logarithmus berechnen
    addToHistory(`<br>log(${x}) = ${result.value}`);    //zum Verlauf hinzufügen
}
/**
 * berechnet durch eine for-schleife die fakultät des 
 * Ergebnisses . der Zahl aus dem Eingabefeld
 */
function faculty() {
    var res = 1;                                      //ergebnis wird am anfang auf eins gesetzt
    var x = result.value;                             //übernahme der eingabe in die variable x
    if(x == ""){glow(); return;}
    for(i = 2; i<= eval(x); i++) {                    //schleife ab 2 beginnen und wiederholen solange i < das ergebnis
        res *= i;                                     //auf das ergebnis das ergebnis * i hinzuaddieren
    }
    result.value = res;                               //ergebnis ausgeben
    addToHistory(`<br>fact(${x}) = ${result.value}`); //zum verlauf hinzufügen
}
/**
 * Überprüft ob es sich um eine Binäre Zahl handelt dabei wird
 * ein pattern/muster durchgegangen wenn dieses Pattern erkennt das eine Binäre 
 * Zahl vorhanden ist wird ein true zurückgegeben
 * @param {Integer} content zu überprüfende Zahl 
 */
function isBinary(content) {
    var pattern = new RegExp(bin_pattern);
    return !pattern.test(content);
}
/**
 * Überprüft ob es sich um eine Dezimale Zahl handelt dabei wird
 * ein pattern/muster durchgegangen wenn dieses Pattern erkennt das eine Dezimale
 * Zahl vorhanden ist wird ein true zurückgegeben
 * @param {Integer} content zu überprüfende Zahl
 */
function isDecimal(content) {
    var pattern = new RegExp(dec_pattern);
    return !pattern.test(content);
}
/**
 * Überprüft ob es sich um eine Hexadezimale Zahl handelt dabei wird
 * ein pattern/muster durchgegangen wenn dieses Pattern erkennt das eine Hexzahl 
 * vorhanden ist wird ein true zurückgegeben
 * @param {Integer} content zu überprüfende Zahl
 */
function isHex(content) {
    var pattern = new RegExp(hex_pattern);
    return !pattern.test(content);
}
/**
 * Diese Funktion errechnet aus dem ergebnis aus
 * dem Textfeld den sin, cos oder tan
 * @param {String} type sin, cos oder tan 
 */
function sin_cos_tan(type) {
    var x = result.value;
    if(x == ""){glow(); return;}
    switch(type.toLowerCase()) {
        case 'sin': 
            result.value = Math.sin(eval(x)); 
            addToHistory(`<br>sin(${x}) = ${result.value}`);break;
        case 'cos': 
            result.value = Math.cos(eval(x)); 
            addToHistory(`<br>cos(${x}) = ${result.value}`);break;
        case 'tan': 
            result.value = Math.tan(eval(x)); 
            addToHistory(`<br>tan(${x}) = ${result.value}`);break;
    }
}

function average() {

    var numbers = [];
    var average = 0;
    var val = parseInt(prompt('Geben sie Anzahl der Einzelwerte an'));
    for(i = 0; i < val; i++) 
        numbers[i] = parseFloat(prompt(`${i+1}. Wert Eingeben:`));
    for(j = 0; j < val; j++)
        average += numbers[j];
    var res = (average / val);
    result.value = `Ø → ${res.toString()}`;
    addToHistory(`<br>Ø(${numbers}) = ${res}`);
}

function sigma() {

    var numbers = [];
    var value = 0;
    var average = 0;
    var s1 = 0, s2 = 0;
    var default_deviation = 0;

    var rows = parseInt(prompt('Geben sie Anzahl der Einzelwerte an'));
    for(i = 0; i < rows; i++) 
        numbers[i] = parseFloat(prompt(`${i+1}. Wert Eingeben:`));

    for(j in numbers)                               //mittelwert berechnen
        value += numbers[j];

    average = value / rows;
    for(k = 0; k < numbers.length; k++)                               //varianz berechnen
        s1 += (numbers[k] - average) * (numbers[k] - average); 

    s2 = s1 / rows;
    default_deviation = Math.sqrt(s2);                              //standardabweichung berechnen
    result.value = `sigma: ${default_deviation}`;
    addToHistory(`<br>sigma(${numbers}) = ${default_deviation}`);
}
/**
 * der Button AC löscht nur das Eingabefeld 
 */
function del() {
    result.value = "";    //löschen des eingabefeldes
}
/**
 * löscht den Verlauf bzw. setzt ihn zurück
 */
function clear_history() {
    history.innerHTML = "";                 //löschen des Verlaufes
    hist_c = 0;                             //verlaufinhalts-zähler wieder auf 0 setzen
}
/**
 * Reset löscht das eingabefeld und den Zwischenspeicher
 */
function reset() {
    result.value = "";    //löschen des eingabefeldes
    memory.value = "";    //löschen des memorie feldes
}

function pow_xy() {
    result.value += '^';
    xy = true;
}
/**
 * speichert den aktuellen wert im eingabefeld
 * ins speicherfeld
 */
function mem() {
    memory.value = result.value;    //speichern
}
function back() {
    result.value = "" + result.value + memory.value;  //den Inhalt im ergebnisfeld um 1 verringern
}
/**
 * Löscht die letzte eingegebene Zahl
 */
function one_back() {
    result.value = result.value.substring(0, result.value.length-1);
}
/**
 * Fügt dem Verlauf inhalte hinzu und prüft wieviele Inhalte 
 * vorhanden sind 
 * @param {String} content inhalt der im Verlauf ausgegeben werden soll 
 */
function addToHistory(content) {
    if(hist_c < 25) {           //wenn weniger als 20 inhalte vorhanden sind 
        history.innerHTML += content;   //den inhalt hinzufügen
        hist_c++;       //zähler um 1 (einen Inhalt) erhöhen
    }
    else {                      //wenn gleich oder mehr als 20 inhalte vorhanden sind 
        //keine weiteren inhalte hinzufügen
        return;
    }
}
/**
 * wird abgerufen wenn die Maus sich über einem Button befindet
 * @param {Integer} index index des buttons im formular 
 * @param {Boolean} kauf wenn wahr handelt es sich um den kaufmänischen rechner,
 * es müssen sonderregeln beim = button eingehalten werden
 */
function onOver(index, kauf) {
    if(check_theme()) {    //wenn das dark theme aktiv ist dunklere effekte einfügen
        if(index == 41 ||  kauf) document.formular[index].style.background = "linear-gradient(rgb(145, 44, 91), rgb(77, 24, 55))";
        else document.formular[index].style.background = "#1c1b1b";
    } else {                //wenn das light theme aktiv ist hellere effekte einfügen
        if(index == 41 ||  kauf) document.formular[index].style.background = "linear-gradient(#15967c, #25a159)";
        else document.formular[index].style.background = "#e2e2e2";
    }
}
/**
 * wird abgerufen wenn die Maus den Button verlässt
 * @param {Integer} index index des buttons im formular 
 * @param {Boolean} kauf wenn wahr handelt es sich um den kaufmänischen rechner, 
 * es müssen sonderregeln beim = button eingehalten werden
 */
function onDown(index, kauf) {
    if(check_theme()) {    //wenn das dark theme aktiv ist dunklere effekte einfügen
        if(index == 41 || kauf) document.formular[index].style.background = "linear-gradient(#B33771, #6D214F)"
        else document.formular[index].style.background = "#282828";
    } else {                //wenn das light theme aktiv ist hellere effekte einfügen
        if(index == 41 || kauf) document.formular[index].style.background = "linear-gradient(#1abc9c, #2ecc71)"
        else document.formular[index].style.background = "#f1f7f8";
    }
}
/**
 * diese Funktion verändert das Aussehen des Taschenrechners 
 * @param {Integer} rows beschreibt die anzahl an Zeilen des Rechners
 * @param {Integer} datas beschreibt die Anzahl an Inhalten(buttons) pro Zeile
 */
function changeTheme(rows, datas) {

    var themebtn = document.getElementById('theme-btn');        //button zum verändern des Aussehens
    //mit modulo hin und her schalten
    if(!check_theme()) {            //wenn dark theme aktiviert wird

        themebtn.value = "🌙 dark theme"        //inhalt des theme-buttons verändern
        themebtn.style.color = "white";         //inhaltfarbe des theme-buttons verändern
        themebtn.style.background = "#34495e";  //farbe des theme-buttons verändern
        result.style.background = "linear-gradient(to right, #B33771, #6D214F)";  //ergebnis-Textfeld farbe dunkel gestalten
        memory.style.background = "linear-gradient(to right, #B33771, #6D214F)";  //speicher-Textfeld farbe dunkel gestalten
        document.getElementById('calc-box').style.background = "#282828";           //div-element farbe dunkel gestalten

        for(i = 0; i < rows; i++) {     //for schleife um alle zeilen (rows) durchzugehen
            for(j = 0; j < datas; j++) {//for schleife um alle buttons der jeweiligen zeile durchzugehen
                try {       //versuch die farbe zu verändern
                document.getElementsByClassName('row')[i].getElementsByClassName('btn')[j].style.background = "#282828";  //farbe dunkel setzen
                document.getElementsByClassName('row')[i].getElementsByClassName('btn')[j].style.color = "#bdc3c7";       //schrift hell setzen
                } catch(e) {    //wenn ein fehler auftritt muss es sich um den = button handeln -> 
                    document.getElementsByClassName('row')[i].getElementsByClassName('equal')[0].style.background = "linear-gradient(to right, #B33771, #6D214F)";    //seperate farbe setzen
                }
            }
        }
        theme++;
    //bei else wird das selbe durchgeführt (mit dem unterschied das die standardfarben (light) wiederhergestellt werden)
    } else {
        themebtn.value = "☀️ light theme"
        themebtn.style.color = "black";
        themebtn.style.background = "white";
        result.style.background = "linear-gradient(to left, #1abc9c, #2ecc71)";
        memory.style.background = "linear-gradient(to left, #1abc9c, #2ecc71)";
        document.getElementById('calc-box').style.background = "#f1f7f8";
        for(i = 0; i < rows; i++) {
            for(j = 0; j < datas; j++) {
                try { 
                    document.getElementsByClassName('row')[i].getElementsByClassName('btn')[j].style.background = "#f1f7f8";
                    document.getElementsByClassName('row')[i].getElementsByClassName('btn')[j].style.color = "black";
                } catch(e) {
                    document.getElementsByClassName('row')[i].getElementsByClassName('equal')[0].style.background = "linear-gradient(#1abc9c, #2ecc71)";
                }
            }
        }
        theme++;
    }
}
function glow() {
    calcbox_shadow.style.boxShadow = "0 0 30px #c0392b";    //box-shadow rot setzen
        setTimeout(function() {                                 //1000ms (1sec) warten
            calcbox_shadow.style.boxShadow = "0 0 30px #b2b5b8";//box-shadow wieder normal setzen
    }, 1000);
}
function check_theme() {
    if(theme % 2 != 0) return true;
    else return false;
}
