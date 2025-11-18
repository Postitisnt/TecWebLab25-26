/*
Questo esempio mostra due versioni della stessa funzione "onclick_fn".
Entrambe fanno la stessa cosa: disabilitano un pulsante per 10 secondi,
aggiornando a schermo un contatore che parte da 0 e arriva a 10.

- Nella prima versione vengono usate variabili dichiarate con "var".
   Funziona, ma non è la pratica consigliata, perché "var" ha uno scope
   di funzione (non di blocco) e può causare errori in codice più complesso.

- Nella seconda versione si usano invece "const" e "let", che sono
   le dichiarazioni moderne e più sicure:
   * "const" viene usato per valori o riferimenti che non cambiano,
     come gli elementi del DOM o la costante max_sec.
   * "let" viene usato per variabili che cambiano nel tempo,
     come "sec", che diminuisce ad ogni secondo del timer.

In generale, meglio usare sempre "const" di default, e "let" solo se il valore
deve cambiare. Evitare "var" nei progetti moderni sarebbe buona cosa.
*/

function onclick_fn() {
    var button = document.getElementsByTagName("button")[0];
    var para = document.getElementById("para1");
    button.disabled = true;
    var max_sec = sec = 10;
    para.textContent = 0;
    var timer = setInterval(function(){
        console.log("________________________");
        console.log("SEC (prima del decremento):", sec);
        para.textContent = max_sec - (--sec); 
        console.log("MAX SEC:", max_sec);
        console.log("SEC (dopo il decremento):", sec);
        console.log("COUNT [MAX_SEC - SEC]:", max_sec - sec);
        if (sec <=0){
            console.log("*************************")
            clearInterval(timer);
            button.disabled = false;
        }
    }, 1000);
};

/*
para = 0 -> 1 -> 2
max_sec=10
sec=10-1=9-1=8
10 - (9)
10 - (8)

/*
function onclick_fn() {
    const button = document.getElementsByTagName("button")[0];
    const para = document.getElementById("para1");
    button.disabled = true;

    let sec = 10;
    const max_sec = sec; // max_sec non cambia mai, quindi const
    para.textContent = 0;

    const timer = setInterval(function() {
        para.textContent = max_sec - (--sec);
        if (sec <= 0) {
            clearInterval(timer);
            button.disabled = false;
        }
    }, 1000);
}
*/