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
