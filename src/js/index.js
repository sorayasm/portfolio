// Horizontal scroll

let page = document.getElementById("page");
let last_panel = page.getElementsByClassName("panel");
last_panel = last_panel[last_panel.length - 1];
let dummy_x = null;

window.onscroll = function() {
        // Horizontal Scroll.
        let y = document.body.getBoundingClientRect().top;
        page.scrollLeft = -y;

    }
    // Adjust the body height if the window resizes.
window.onresize = resize;
// Initial resize.
resize();

// Reset window-based vars
function resize() {
    let w = page.scrollWidth - window.innerWidth + window.innerHeight;
    document.body.style.height = w + "px";
}

// Background
var canvas = document.getElementById("canvas");
var altBG = document.getElementById("altBG");
var triangle = new TriangleBG({
    canvas : canvas,
    alternateElem : altBG,
    cellHeight : 120,
    cellWidth : 100,
    mouseLight : true,
    mouseLightRadius : 500,
    mouseLightIncrement : 10,
    resizeAdjustment : true,
    variance : 1.3,
    pattern : "x*y",
    baseColor1 : {
      baseHue : 120,
      baseSaturation : 60,
      baseLightness : 38
    },
    baseColor2 : {
      baseHue : 120,
      baseSaturation : 60,
      baseLightness : 40
    },
    colorDelta : {
      hue : 1,
      lightness : 0,
      saturation : 0
    }
});
