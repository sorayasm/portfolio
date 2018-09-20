// Typewriter Effect
let text = new Array(
    "Soraya Sacaan M.","Front End Developer"
    );
    let iSpeed = 100; 
    let iIndex = 0; 
    let iArrLength = text[0].length; 
    let iScrollAt = 20; 
     
    let iTextPos = 0;
    let sContents = '';
    let iRow; 
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
    const destination = document.getElementById("text");
     
     while ( iRow < iIndex ) {
      sContents += text[iRow++] + "<br/>";
     }
     destination.innerHTML = sContents + text[iIndex].substring(0, iTextPos) + '<span aria-hidden="true"></span>';
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != text.length ) {
       iArrLength = text[iIndex].length;
       setTimeout("typewriter()", 300);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    typewriter();


//Background
function background() {
    let url = (`https://api.nasa.gov/planetary/apod?api_key=Nc6bWvHOQZKE8C4Et3nmMd4yTZf4tkW4TJUOcQ2N`);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const link = data.url;
            const title = data.title;
            const copyright = data.copyright;
            document.body.style.backgroundImage = "url('" + link + "')"; 
            const nasa = document.getElementById("nasadata");
            const p = document.createElement("p");
            p.innerHTML = `<p>Fotografía de fondo: Imagen del día de la Nasa. Título: ` + title + ". Copyright: " + copyright +`.</p>`;
            nasa.appendChild(p);


        })
} background()
