// Typewriter Effect
let text = new Array(
    "Mi nombre es Soraya Sacaan M.",
    "Soy Front End Developer Junior y Periodista Digital."
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
      sContents += text[iRow++] + '<br />';
     }
     destination.innerHTML = sContents + text[iIndex].substring(0, iTextPos) + "_";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != text.length ) {
       iArrLength = text[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    typewriter();

    