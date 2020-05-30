var texto = window.document.getElementById('texto')
texto.style.display ="none"

var textoautodestruir = window.document.getElementById('textoautodestruir')
textoautodestruir.style.display ="none"

var videofinal = window.document.getElementById('videofinal')
videofinal.style.display ="none"

var quadro1 = window.document.getElementById('quadro1')
var quadro2 = window.document.getElementById('quadro2')
var quadro3 = window.document.getElementById('quadro3')
var quadro4 = window.document.getElementById('quadro4')

setTimeout(() => { 
    texto.style.display ="block"
    const titulo = document.querySelector('.titulo-principal');
    typeWrite(titulo);
 }, 5000);

 setTimeout(() => { 
    textoautodestruir.style.display ="block"
    const msg = document.querySelector('.msg');
    typeWrite(msg);
 }, 45000);

 setTimeout(() => { 
    explodir();
 }, 55000);

 function typeWrite(elemento){
    const textoArray = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    textoArray.forEach(function(letra, i){   
      
    setTimeout(function(){
        elemento.innerHTML += letra;
    }, 75 * i)
  });
}

function explodir(){
    texto.style.display ="none"
    textoautodestruir.style.display ="none"
    quadro1.style.display ="none"
    quadro2.style.display ="none"
    quadro3.style.display ="none"
    quadro4.style.display ="none"
    videofinal.style.display ="block"
}