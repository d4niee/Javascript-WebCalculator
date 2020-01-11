# WebCalculator
A Web calcualtor coded with HTML, Javascript, CSS
<div id="content-table">
            <h1 style="margin-bottom: 20px;">Inhalt</h1>
            <h3 style="margin-top: 10px;">Kaufm&auml;nische Funktionen</h3>
            <div style="margin-left: 50px;">
                <ul>
                    <li class="content-item"><a href="#sigma">Sigma</a><br></li>
                    <li class="content-item"><a href="#average">Durchschnitt</a><br></li>
                </ul>
            </div>
            <h3 style="margin-top: 10px;">Wissenschaftliche Funktionen</h3>
            <div style="margin-left: 50px;">
                <ul>
                    <li class="content-item"><a href="#quadrat">x² und x³</a><br></li>
                    <li class="content-item"><a href="#log">logarithmus</a><br></li>
                    <li class="content-item"><a href="#xy">x^y</a><br></li>
                    <li class="content-item"><a href="#convert">bin, hex, dec</a><br></li>
                    <li class="content-item"><a href="#sincostan">sin, cos, tan</a><br></li>
                </ul>
            </div>
            <h3 style="margin-top: 10px;">Allgemein</h3>
            <div style="margin-left: 50px;">
                <ul>
                    <li class="content-item"><a href="#memory">Memory</a><br></li>
                    <li class="content-item"><a href="#get"></a>get<br></li>
                    <li class="content-item"><a href="#clear">C</a><br></li>
                    <li class="content-item"><a href="#back">back</a><br></li>
                    <li class="content-item"><a href="#reset">reset</a><br></li>
                    <li class="content-item"><a href="#wurzel">wurzel</a><br></li>
                    <li class="content-item"><a href="#1dx">1/x</a><br></li>
                    <li class="content-item"><a href="#theme">theme</a><br></li>
                    <li class="content-item"><a href="#switch">Taschenrechner Wechseln</a><br></li>
                    <li class="content-item"><a href="#fact">Fakult&auml;t</a><br></li>
                </ul>
            </div>
        </div>

        <div class="chapters">

            <div class="chapter"></div>
                <h1 id="09">0-9 und A-F</h1>
                <p>
                    <br>0-9: Normale Zahlen. <br>
                    A-F: Hexadezimalzahlen, dienen nur zur Konvertierung.<br> 
                    Die Zahlen 0-1 k&ouml;nnen auch als Bin&auml;r (für Konvertierung) genutzt werden.
                </p>
            </div>
            <div class="chapter">
                <h1 id="sigma">Sigma</h1>
                <p>
                    <br>Es muss als erstes die Anzahl der Einzelwerte angegeben werden.<br>
                    Danach wird jeder wert eingegeben und die standardabweichung berechnet und ausgegeben.
                </p>
                <img src="../img/chapter_average_01.png" style="margin-top: 40px;">
                <img src="../img/chapter_sigma_01.png" style="margin-left: 80px; margin-top: 40px;">
            </div>
            <div class="chapter">
                <h1 id="average">Durchschnitt (Ø)</h1>
                <p><br>Es muss als erstes die Anzahl der Einzelwerte angegeben werden. <br>
                Danach gibt man dann die einzelnen Einzelwerte ein (alles in Form von prompts) 
                <br>Im Taschenrechner wird dann der Durschnitt aus diesen
                Werten ausgegeben.</p>
                <img src="../img/chapter_average_01.png" style="margin-top: 40px;">
                <img src="../img/chapter_average_02.png" style="margin-left: 80px; margin-top: 40px;">
            </div>
            <div class="chapter">
                <h1 id="quadrat">x² und x³</h1>
                <p>
                    <br>Berechnet aus dem Inhalt im Eingabefeld das Quadrat/Kubik.
                </p>
            </div>
            <div class="chapter">
                <h1 id="log">log (logarithmus)</h1>
                <p>
                    <br>Berechnet aus dem Inhalt im Eingabefeld den nat&uuml;rlichen Logarithmus
                </p>
            </div>
            <div class="chapter">
                <h1 id="xy">x^y</h1>
                <p>
                    <br>Berechnet die erste eingabe (x) hoch die Zweite (y)
                </p>
            </div>
            <div class="chapter">
                <h1 id="convert">Bin, Hex, Dec</h1>
                <p>
                    <br><b>Bin:</b> berechnet aus der aktuellen Eingabe den Bin&auml;ren Wert.
                    <br><b>Dec:</b> berechnet aus der aktuellen Eingabe den Dezimalen Wert.
                    <br><b>Hex:</b> berechnet aus der aktuellen Eingabe den Hexadezimalen Wert.
                </p>
            </div>
            <div class="chapter">
                <h1 id="sincostan">sin, cos, tan</h1>
                <p>
                    <br><b>sinus:</b> berechnet aus der aktuellen Eingabe den sinus
                    <br><b>cosinus:</b> berechnet aus der aktuellen Eingabe den cosinus
                    <br><b>tanges:</b> berechnet aus der aktuellen Eingabe den tangens
                </p>
            </div>
            <div class="chapter">
                <h1 id="memory">memory (mem)</h1>
                <p><br>Der Inhalt im Eingabefeld wird in den Zwischenspeicher gespeichert</p>
            </div>
            <div class="chapter">
                <h1 id="get">get</h1>
                <p><br>Der Inhalt im Zwischenspeicher wird an den Inhalt im Eingabefeld angeh&auml;ngt</p>
            </div>
            <div class="chapter">
                <h1 id="clear">C</h1>
                <p><br>L&ouml;scht nur den Inhalt im Eingabefeld</p>
            </div>
            <div class="chapter">
                <h1 id="back">back (&larr;)</h1>
                <p><br>L&ouml;scht das letzte eingegebene Zeichen</p>
            </div>
            <div class="chapter">
                <h1 id="reset">reset</h1>
                <p><br>L&ouml;scht das Eingabefeld und den Inhalt im Zwischenspeicher</p>
            </div>
            <div class="chapter">
                <h1 id="wurzel">Wurzel (&radic;)</h1>
                <p><br>Berechnet aus dem Inhalt im Eingabefeld die Wurzel</p>
            </div>
            <div class="chapter">
                <h1 id="1dx">1/x</h1>
                <p><br>Rechnet 1 durch die Eingabe</p>
            </div>
            <div class="chapter">
                <h1 id="theme">Farbthema &auml;ndern</h1>
                <p><br>Das Farbthema kann mit dem Button neben dem Hilfebutton<br>ver&auml;ndert werden</p>
                <img src="../img/theme_btn.png" style="margin-top: 30px;">
                <p><br>Der Button Schriftzug zeigt das aktuelle Thema an, <br>durch klicken kann hin und her gewechselt werden</p>
                <img src="../img/light_theme.png" style="margin-top: 30px;">
                <img src="../img/dark_theme.png"style="margin-top: 30px; margin-left: 20px;">
            </div>
            <div class="chapter">
                <h1 id="switch">Taschenrechner Wechseln</h1>
                <p>
                    <br>Um zwischen den Kaufm&auml;nischen und dem Wissenschaftlichen Rechner<br>
                    zu wechseln muss man einfach auf die &Uuml;berschrift klicken
                </p>
                <img>
            </div>
            <div class="chapter">
                <h1 id="fact">Fakult&auml;t (!)</h1>
                <p><br>Berechnet die Fakult&auml;t</p>
            </div>
        </div>
