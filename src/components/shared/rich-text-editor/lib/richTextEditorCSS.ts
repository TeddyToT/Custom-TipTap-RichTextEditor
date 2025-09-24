export const richTextEditorCSS = `
.ProseMirror p::before {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

.prose ol {
  list-style-type: decimal;
  padding-left: 1.25rem;
}


.prose blockquote {
  border-left: 4px solid #4b4949;
  padding-left: 1rem;
  color: #555;
  margin: 0.5rem 0;
}
.prose .node-wrapper.float-left {
  float: left;
  margin: 0 15px 15px 0;
}

.prose .node-wrapper.float-right {
  float: right;
  margin: 0 0 15px 15px;
}

.prose .node-wrapper.float-none {
  float: none;
  margin: 0;
}


.prose ul[data-bullet-symbol] {
  list-style: none;
  padding-left: 1.25rem;
}

.prose ul[data-bullet-symbol] li {
  position: relative;
}

.prose ul[data-bullet-symbol] li p {
  display: inline;
  margin: 0;
}

.prose ul[data-bullet-symbol] li::before {
  content: "";
  position: absolute;
  left: -1.25rem;
  top: 0;
  width: 1rem;
  text-align: center;
  font-weight: bold;
  color: inherit;
  line-height: inherit;
}

.prose ul[data-bullet-symbol="2022"] li::before { content: "•"; }      /* Bullet */
.prose ul[data-bullet-symbol="2023"] li::before { content: "‣"; }      /* Triangular Bullet */
.prose ul[data-bullet-symbol="25e6"] li::before { content: "◦"; }      /* White Bullet */
.prose ul[data-bullet-symbol="2043"] li::before { content: "⁃"; }      /* Hyphen Bullet */
.prose ul[data-bullet-symbol="204c"] li::before { content: "⁌"; }      /* Black Leftwards Bullet */
.prose ul[data-bullet-symbol="204d"] li::before { content: "⁍"; }      /* Black Rightwards Bullet */
.prose ul[data-bullet-symbol="2219"] li::before { content: "∙"; }      /* Bullet Operator */
.prose ul[data-bullet-symbol="00b7"] li::before { content: "·"; }      /* Middle Dot */
.prose ul[data-bullet-symbol="00a4"] li::before { content: "¤"; }      /* Generic Currency Symbol */
.prose ul[data-bullet-symbol="2024"] li::before { content: "․"; }      /* One Dot Leader */

.prose ul[data-bullet-symbol="2192"] li::before { content: "→"; }      /* Rightwards Arrow */
.prose ul[data-bullet-symbol="2190"] li::before { content: "←"; }      /* Leftwards Arrow */
.prose ul[data-bullet-symbol="2193"] li::before { content: "↓"; }      /* Downwards Arrow */
.prose ul[data-bullet-symbol="2191"] li::before { content: "↑"; }      /* Upwards Arrow */
.prose ul[data-bullet-symbol="21d2"] li::before { content: "⇒"; }      /* Rightwards Double Arrow */
.prose ul[data-bullet-symbol="21d0"] li::before { content: "⇐"; }      /* Leftwards Double Arrow */
.prose ul[data-bullet-symbol="21d3"] li::before { content: "⇓"; }      /* Downwards Double Arrow */
.prose ul[data-bullet-symbol="21d1"] li::before { content: "⇑"; }      /* Upwards Double Arrow */
.prose ul[data-bullet-symbol="27a4"] li::before { content: "➤"; }      /* Black Rightwards Arrowhead */
.prose ul[data-bullet-symbol="2794"] li::before { content: "➔"; }      /* Heavy Wide-Headed Rightwards Arrow */
.prose ul[data-bullet-symbol="279c"] li::before { content: "➜"; }      /* Heavy Round-Tipped Rightwards Arrow */
.prose ul[data-bullet-symbol="279e"] li::before { content: "➞"; }      /* Heavy Triangle-Headed Rightwards Arrow */
.prose ul[data-bullet-symbol="25b6"] li::before { content: "▶"; }      /* Black Right-Pointing Triangle */
.prose ul[data-bullet-symbol="25c0"] li::before { content: "◀"; }      /* Black Left-Pointing Triangle */

.prose ul[data-bullet-symbol="25a0"] li::before { content: "■"; }      /* Black Square */
.prose ul[data-bullet-symbol="25a1"] li::before { content: "□"; }      /* White Square */
.prose ul[data-bullet-symbol="25b2"] li::before { content: "▲"; }      /* Black Up-pointing Triangle */
.prose ul[data-bullet-symbol="25b3"] li::before { content: "△"; }      /* White Up-pointing Triangle */
.prose ul[data-bullet-symbol="25bc"] li::before { content: "▼"; }      /* Black Down-pointing Triangle */
.prose ul[data-bullet-symbol="25bd"] li::before { content: "▽"; }      /* White Down-pointing Triangle */
.prose ul[data-bullet-symbol="25cf"] li::before { content: "●"; }      /* Black Circle */
.prose ul[data-bullet-symbol="25cb"] li::before { content: "○"; }      /* White Circle */
.prose ul[data-bullet-symbol="25c6"] li::before { content: "◆"; }      /* Black Diamond */
.prose ul[data-bullet-symbol="25c7"] li::before { content: "◇"; }      /* White Diamond */
.prose ul[data-bullet-symbol="25aa"] li::before { content: "▪"; }      /* Black Small Square */
.prose ul[data-bullet-symbol="25ab"] li::before { content: "▫"; }      /* White Small Square */
.prose ul[data-bullet-symbol="25ae"] li::before { content: "▮"; }      /* Black Vertical Rectangle */
.prose ul[data-bullet-symbol="25af"] li::before { content: "▯"; }      /* White Vertical Rectangle */

.prose ul[data-bullet-symbol="2605"] li::before { content: "★"; }      /* Black Star */
.prose ul[data-bullet-symbol="2606"] li::before { content: "☆"; }      /* White Star */
.prose ul[data-bullet-symbol="2665"] li::before { content: "♥"; }      /* Black Heart */
.prose ul[data-bullet-symbol="2661"] li::before { content: "♡"; }      /* White Heart */
.prose ul[data-bullet-symbol="2660"] li::before { content: "♠"; }      /* Black Spade */
.prose ul[data-bullet-symbol="2663"] li::before { content: "♣"; }      /* Black Club */
.prose ul[data-bullet-symbol="2666"] li::before { content: "♦"; }      /* Black Diamond Suit */
.prose ul[data-bullet-symbol="2662"] li::before { content: "♢"; }      /* White Diamond Suit */
.prose ul[data-bullet-symbol="2698"] li::before { content: "⚘"; }      /* Flower */
.prose ul[data-bullet-symbol="269b"] li::before { content: "⚛"; }      /* Atom Symbol */
.prose ul[data-bullet-symbol="269c"] li::before { content: "⚜"; }      /* Fleur-de-lis */
.prose ul[data-bullet-symbol="26ab"] li::before { content: "⚫"; }      /* Medium Black Circle */
.prose ul[data-bullet-symbol="2740"] li::before { content: "❀"; }      /* White Florette */
.prose ul[data-bullet-symbol="2741"] li::before { content: "❁"; }      /* Eight Petalled Outlined Black Florette */

.prose ul[data-bullet-symbol="25c8"] li::before { content: "◈"; }      /* White Circle with Black Dot */
.prose ul[data-bullet-symbol="25c9"] li::before { content: "◉"; }      /* Fisheye */
.prose ul[data-bullet-symbol="25ca"] li::before { content: "◊"; }      /* Lozenge */
.prose ul[data-bullet-symbol="25ce"] li::before { content: "◎"; }      /* Bullseye */
.prose ul[data-bullet-symbol="25d0"] li::before { content: "◐"; }      /* Circle with Left Half Black */
.prose ul[data-bullet-symbol="25d1"] li::before { content: "◑"; }      /* Circle with Right Half Black */
.prose ul[data-bullet-symbol="25d2"] li::before { content: "◒"; }      /* Circle with Lower Half Black */
.prose ul[data-bullet-symbol="25d3"] li::before { content: "◓"; }      /* Circle with Upper Half Black */
.prose ul[data-bullet-symbol="25e0"] li::before { content: "◠"; }      /* Upper Half Circle */
.prose ul[data-bullet-symbol="25e1"] li::before { content: "◡"; }      /* Lower Half Circle */
.prose ul[data-bullet-symbol="25e2"] li::before { content: "◢"; }      /* Black Lower Right Triangle */
.prose ul[data-bullet-symbol="25e3"] li::before { content: "◣"; }      /* Black Lower Left Triangle */

.prose ul[data-bullet-symbol="2713"] li::before { content: "✓"; }      /* Check Mark */
.prose ul[data-bullet-symbol="2714"] li::before { content: "✔"; }      /* Heavy Check Mark */
.prose ul[data-bullet-symbol="2715"] li::before { content: "✕"; }      /* Multiplication X */
.prose ul[data-bullet-symbol="2716"] li::before { content: "✖"; }      /* Heavy Multiplication X */
.prose ul[data-bullet-symbol="2717"] li::before { content: "✗"; }      /* Ballot X */
.prose ul[data-bullet-symbol="2718"] li::before { content: "✘"; }      /* Heavy Ballot X */
.prose ul[data-bullet-symbol="2610"] li::before { content: "☐"; }      /* Ballot Box */
.prose ul[data-bullet-symbol="2611"] li::before { content: "☑"; }      /* Ballot Box with Check */
.prose ul[data-bullet-symbol="2612"] li::before { content: "☒"; }      /* Ballot Box with X */
.prose ul[data-bullet-symbol="2620"] li::before { content: "☠"; }      /* Skull and Crossbones */

.prose ul[data-bullet-symbol="2212"] li::before { content: "−"; }      /* Minus Sign */
.prose ul[data-bullet-symbol="00d7"] li::before { content: "×"; }      /* Multiplication Sign */
.prose ul[data-bullet-symbol="00f7"] li::before { content: "÷"; }      /* Division Sign */
.prose ul[data-bullet-symbol="00b1"] li::before { content: "±"; }      /* Plus-Minus Sign */
.prose ul[data-bullet-symbol="2260"] li::before { content: "≠"; }      /* Not Equal To */
.prose ul[data-bullet-symbol="2264"] li::before { content: "≤"; }      /* Less-Than or Equal To */
.prose ul[data-bullet-symbol="2265"] li::before { content: "≥"; }      /* Greater-Than or Equal To */
.prose ul[data-bullet-symbol="221e"] li::before { content: "∞"; }      /* Infinity */
.prose ul[data-bullet-symbol="2211"] li::before { content: "∑"; }      /* N-Ary Summation */
.prose ul[data-bullet-symbol="220f"] li::before { content: "∏"; }      /* N-Ary Product */


`