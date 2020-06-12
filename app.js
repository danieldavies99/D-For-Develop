//
// Copyright © 2020 Daniel Davies 
// All Rights Reserved
//

//
//pixiJS initialization
//

var fontLoader = new FontLoader( ["Hack"], {
  "fontLoaded": function (font) {
    // One of the fonts was loaded
    console.log("font loaded: " + font.family);
  },
  "complete": function (error) {
    if (error !== null) {
      // Reached the timeout but not all fonts were loaded
      console.log(error.message);
      console.log(error.notLoadedFonts);
    } else {
      // All fonts were loaded
      console.log("all fonts were loaded");
      fontsLoaded = true;
    }
  }
}, 3000);

fontLoader.loadFonts();

let fontsLoaded = false;

let canvasContainer = document.getElementById("pixi-container");
canvasContainer.style.webkitAnimationPlayState = "paused";

let mainContentContainer = document.getElementById("main-content");
mainContentContainer.style.webkitAnimationPlayState = "paused";


let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

//Create a Pixi Application
let app = new PIXI.Application({
  width: 256, // default: 800
  height: 256, // default: 600
  antialias: true, // default: false
  transparent: false, // default: false
  resolution: 1 // default: 1
});

app.view = document.getElementById("myCanvas");
//Add the canvas that Pixi automatically created for you to the HTML document
canvasContainer.appendChild(app.view);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

let backgroundColor = 0x254653;
let textColor = 0xe76f51;
//let backgroundColor = 0xf1faee;
//let textColor = 0xe63946;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let textStartX = 0;
let textStartY = 0;
let backgroundGraphics = new PIXI.Graphics;
backgroundGraphics.beginFill(backgroundColor)
backgroundGraphics.drawRect(0, 0, WIDTH, HEIGHT);
app.stage.addChild(backgroundGraphics);



let textGraphics = {
  solidTextContainer: new PIXI.Container,
  textContainer: new PIXI.Container,
  lineWidth: 5,
  coverGraphics: new PIXI.Graphics,
  lineGraphics: new PIXI.Graphics,
  StencilTopLine: function (x, gap, y1, y2, y3) {
    this.lineGraphics.beginFill(textColor);
    this.lineGraphics.drawRect(x, 0, this.lineWidth, textStartY + y1);
    this.lineGraphics.drawRect(x + this.lineWidth + gap, 0, this.lineWidth, textStartY + y3);
    this.lineGraphics.beginFill(backgroundColor);
    this.lineGraphics.drawRect(x + this.lineWidth, 0, gap, textStartY + y2);
  },
  StencilBottomLine: function (x, gap, y1, y2, y3) {
    this.lineGraphics.beginFill(textColor);
    this.lineGraphics.drawRect(x, textStartY + y1, this.lineWidth, HEIGHT - textStartY + y1);
    this.lineGraphics.drawRect(x + this.lineWidth + gap, textStartY + y3, this.lineWidth, HEIGHT - textStartY + y3);
    this.lineGraphics.beginFill(backgroundColor);
    this.lineGraphics.drawRect(x + this.lineWidth, textStartY + y2, gap, HEIGHT - textStartY + y2);
  },
  drawNameLines: function () {
    this.lineGraphics.clear();

    //D
    this.StencilTopLine(textStartX + 40, 12, 22, 30, 24);
    this.StencilBottomLine(textStartX + 40, 12, 134, 126, 132);
    //A
    this.StencilTopLine(textStartX + 144, 12, 24, 30, 24);
    this.StencilBottomLine(textStartX + 144, 12, 106, 95, 106);
    //N
    this.StencilTopLine(textStartX + 250, 12, 36, 75, 76);
    this.StencilBottomLine(textStartX + 250, 12, 79, 70, 120);
    //I
    this.StencilTopLine(textStartX + 354, 15, 22, 30, 22);
    this.StencilBottomLine(textStartX + 354, 15, 134, 126, 132);
    //E
    this.StencilTopLine(textStartX + 465, 12, 21, 26, 21);
    this.StencilBottomLine(textStartX + 465, 12, 134, 126, 132);
    //L
    this.StencilTopLine(textStartX + 575, 12, 118, 125, 118);
    this.StencilBottomLine(textStartX + 575, 12, 134, 126, 132);

    //D
    this.StencilTopLine(textStartX + 776, 12, 22, 30, 24);
    this.StencilBottomLine(textStartX + 776, 12, 134, 126, 132);
    //A
    this.StencilTopLine(textStartX + 882, 11,  24, 30, 24);
    this.StencilBottomLine(textStartX + 882, 11, 106, 95, 106);
    //V
    this.StencilTopLine(textStartX + 985, 15, 71, 100, 71);
    this.StencilBottomLine(textStartX + 985, 15, 135, 95, 135);
    //I
    this.StencilTopLine(textStartX + 1091, 15, 22, 30, 22);
    this.StencilBottomLine(textStartX + 1091, 15, 134, 126, 132);
    //E
    this.StencilTopLine(textStartX + 1200, 12, 21, 26, 21);
    this.StencilBottomLine(textStartX + 1200, 12, 134, 126, 132);
    //S
    this.StencilTopLine(textStartX + 1301, 12, 22, 30, 20);
    this.StencilBottomLine(textStartX + 1301, 12, 134, 126, 134);
  },
  drawBrandLines: function () {
    this.lineGraphics.clear();
    //D
    this.StencilTopLine(textStartX + 40, 12, 22, 30, 24);
    this.StencilBottomLine(textStartX + 40, 12, 134, 126, 132);

    //F
    this.StencilTopLine(textStartX + 260, 12, 21, 26, 21);
    this.StencilBottomLine(textStartX + 260, 12, 84, 75, 84);
    //O
    this.StencilTopLine(textStartX + 356, 12, 21, 26, 21);
    this.StencilBottomLine(textStartX + 356, 12, 134, 126, 132);
    //R
    this.StencilTopLine(textStartX + 464, 12, 22, 30, 24);
    this.StencilBottomLine(textStartX + 464, 12, 88, 75, 101);

    //D
    this.StencilTopLine(textStartX + 672, 12, 22, 30, 24);
    this.StencilBottomLine(textStartX + 672, 12, 134, 120, 132);
    //E
    this.StencilTopLine(textStartX + 776, 12, 21, 26, 21);
    this.StencilBottomLine(textStartX + 776, 12, 134, 126, 132);
    //V
    this.StencilTopLine(textStartX + 880, 15, 71, 100, 71);
    this.StencilBottomLine(textStartX + 880, 15, 135, 95, 135);
    //E
    this.StencilTopLine(textStartX + 987, 14, 21, 26, 21);
    this.StencilBottomLine(textStartX + 987, 14, 134, 126, 132);
    //L
    this.StencilTopLine(textStartX + 1104, 15, 118, 125, 118);
    this.StencilBottomLine(textStartX + 1104, 15, 134, 126, 132);
    //O
    this.StencilTopLine(textStartX + 1200, 12, 21, 26, 21);
    this.StencilBottomLine(textStartX + 1200, 12, 134, 126, 132);
    //P
    this.StencilTopLine(textStartX + 1312, 12, 22, 30, 24);
    this.StencilBottomLine(textStartX + 1312, 12, 92, 84, 88);
  },
  drawNameCovers: function (posY) {
    this.coverGraphics.clear();
    this.coverGraphics.beginFill(backgroundColor);
    //DANIEL
    this.coverGraphics.drawRect(textStartX, posY[0], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 101, posY[1], 108, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 216, posY[2], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 318, posY[3], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 420, posY[4], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 530, posY[5], 96, HEIGHT);
    //DAVIES
    this.coverGraphics.drawRect(textStartX + 738, posY[7], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 839, posY[8], 107, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 946, posY[9], 107, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 1059, posY[10], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 1162, posY[11], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 1262, posY[12], 96, HEIGHT);
  },
  drawBrandCovers: function (posY) {
    this.coverGraphics.clear();
    this.coverGraphics.beginFill(backgroundColor);
    //D
    this.coverGraphics.drawRect(textStartX, posY[0], 96, HEIGHT);
    //FOR
    this.coverGraphics.drawRect(textStartX + 200, posY[2], 108, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 318, posY[3], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 430, posY[4], 96, HEIGHT);
    //DEVELOP
    this.coverGraphics.drawRect(textStartX + 633, posY[6], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 743, posY[7], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 840, posY[8], 110, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 955, posY[9], 107, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 1065, posY[10], 94, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 1160, posY[11], 96, HEIGHT);
    this.coverGraphics.drawRect(textStartX + 1267, posY[12], 96, HEIGHT);
  },
  drawTextOutline(text) {
    this.textContainer.removeChildren();
    let outlineText = new PIXI.Text(text, {
      fontFamily: "Hack",
      fontSize: 150,
      fill: backgroundColor,
      align: 'center',
      stroke: textColor,
      strokeThickness: 10,
      letterSpacing: 15
    });

    outlineText.x = (WIDTH / 2) - (outlineText.width / 2);
    textStartX = outlineText.x;
    outlineText.y = (HEIGHT / 2) - (outlineText.height / 2);
    textStartY = outlineText.y;
    this.textContainer.addChild(outlineText);
  },
  drawTextSolid(text) {
    let solidText = new PIXI.Text(text, {
      fontFamily: 'Hack',
      fontSize: 150,
      fill: textColor,
      align: 'center',
      stroke: textColor,
      strokeThickness: 10,
      letterSpacing: 15
    });

    solidText.x = (WIDTH / 2) - (solidText.width / 2);
    textStartX = solidText.x;
    solidText.y = (HEIGHT / 2) - (solidText.height / 2);
    textStartY = solidText.y;

    this.solidTextContainer.addChild(solidText);

  },
  addGraphics: function () {
    app.stage.addChild(this.textContainer);
    app.stage.addChild(this.lineGraphics);
    app.stage.addChild(this.solidTextContainer);
    app.stage.addChild(this.coverGraphics);


  }
}

let started = false;
var main = function () {
  started = true;
  let quitTimer;
  const speed = 0.0007;
  let solidTextDrawn = false;
  let posY = [];
  let delays = [];

  for (let i = 0; i < 13; i++) {
    delays.push(i * 200);
    posY.push(0);
  }


  var lastUpdate = Date.now();
  var myInterval = setInterval(onTick, 0);

  textGraphics.drawTextOutline("D FOR DEVELOP");
  textGraphics.drawBrandLines();
  textGraphics.drawBrandCovers(posY);

  textGraphics.addGraphics();

  let timeline = 0;

  var startDate = Date.now();

  let quit = false;

  function onTick() {
    if (!quit) {
      var now = Date.now();
      var elapsed = now - startDate;
      var dt = now - lastUpdate;
      lastUpdate = now;

      if (timeline === 0) // uncovers D FOR DEVELOP
      {
        for (let i = 0; i < 13; i++) {
          if (delays[i] < elapsed) {
            posY[i] += (speed * HEIGHT * dt);
          }
        }
        textGraphics.drawBrandCovers(posY);
        if (posY[12] > HEIGHT) {
          timeline = 1;
          for (let i = 0; i < 13; i++) {
            delays[i] = elapsed + (i * 200);
            posY[i] = -HEIGHT;
          }
        }
      } else if (timeline === 1) //covers D FOR DEVELOP
      {
        for (let i = 0; i < 13; i++) {
          if (delays[i] < elapsed) {
            if (posY[i] < 0) {
              posY[i] += (speed * HEIGHT * dt);
              if (posY[i] > 0) {
                posY[i] = 0;
              }
            }
          }
        }
        textGraphics.drawBrandCovers(posY);
        if (posY[12] === 0) {
          for (let i = 0; i < 13; i++) {
            delays[i] = elapsed + (i * 200);
          }

          textGraphics.drawTextOutline("DANIEL DAVIES");
          textGraphics.drawNameLines();
          timeline = 2;
          textGraphics.drawNameCovers(posY);
        }

      } else if (timeline === 2) //uncovers DANIEL DAVIES
      {
        for (let i = 0; i < 13; i++) {
          if (delays[i] < elapsed) {
            posY[i] += (speed * HEIGHT * dt);
          }
        }

        if (posY[12] > HEIGHT * 1.2) {
          timeline = 3;
        }
        textGraphics.drawNameCovers(posY);

      } else if (timeline === 3) // strobes DANIEL DAVIES
      {
        textGraphics.drawTextSolid("DANIEL DAVIES");
        timeline = 4;
        quitTimer = now;

      } else if (timeline === 4) // strobes DANIEL DAVIES
      {

        if (now > quitTimer + 400) {
          canvasContainer.style.webkitAnimationPlayState = "running";
        }
        if (now > quitTimer + 600) {
          mainContentContainer.style.webkitAnimationPlayState = "running";
        }
        if (now > quitTimer + 700) {
          canvasContainer.style.zIndex = -1;
          mainContentContainer.style.zIndex = 1;
          quit = true;
        }

      }
    }
  }
}

function checkLoaded() {
    if (!fontsLoaded) {
        setTimeout("checkLoaded();", 1000);
        return;
    } else {
        // menu_ready is true, so do what you need to do here.
      main();
    }
}

