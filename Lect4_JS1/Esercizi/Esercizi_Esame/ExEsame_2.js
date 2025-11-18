document.addEventListener('DOMContentLoaded', (event) => {
    function raccogliEManipolaElementi() {
        // Raccoglie tutti gli elementi con classe "C1" e "C2"
        var c1elements = document.getElementsByClassName("C1");
        var c2elements = document.getElementsByClassName("C2");

        // Primo array associativo per conservare i contenuti
        var array_1 = {};
        // Secondo array associativo per conservare i contenuti modificati
        var array_2 = {};

        // Funzione ausiliaria per popolare l'array associativo
        function popolaArray(daElementi, array, indiceBase = 0) {
            for (var i = 0; i < daElementi.length; i++) {
                console.log("ITERAZIONE", i, "_____________________");
                // Creazione di una chiave univoca per ogni elemento con un indice incrementale basato su indiceBase
                var chiave = 'key_' + (i + indiceBase) + '_'; // 'key_0_'
                // Aggiunta del contenuto dell'elemento all'array associativo
                console.log("CHIAVE:", chiave);
                array[chiave] = daElementi[i].textContent;
                console.log("ARRAY:", array);
                console.log("_____________________");
            }
        }

        // Popola array_1 con gli elementi di C1
        popolaArray(c1elements, array_1);

        // Calcola l'indice di base per gli elementi C2, che è uguale al numero di elementi C1
        var indiceBaseC2 = c1elements.length; // Indice di base per gli elementi di C2
        popolaArray(c2elements, array_1, indiceBaseC2);

        // Creazione di array_2 con le stesse chiavi di array_1 ma terminanti in "placeholder"
        for (var key in array_1) {
            console.log("************************")
            console.log("ITERAZIONE CHIAVE:", key);
            console.log("ARRAY_1[CHIAVE]:", array_1[key]);
            var chiaveModificata = key + "placeholder"; // "key_0_" + "placeholder" = "key_0_placeholder"
            console.log("NUOVA CHIAVE:", chiaveModificata);
            array_2[chiaveModificata] = array_1[key];
            console.log("ARRAY_2:", array_2)
        }

        // Ritorna entrambi gli array associativi
        return [array_1, array_2];
    }

    // Esempio di come chiamare la funzione e visualizzare il risultato
    var risultati = raccogliEManipolaElementi();
    console.log("Array 1:", risultati[0]);
    console.log("Array 2:", risultati[1]);
});

/*
Versione aggiornata con "let" e "const" al posto di "var".
La logica del codice resta identica, ma l’uso di let/const rende lo scope
delle variabili più sicuro e il codice conforme agli standard moderni (ES6+):
- "const" per riferimenti o valori che non vengono riassegnati
- "let" per variabili che cambiano nel ciclo o durante l’esecuzione
*/

/*
document.addEventListener('DOMContentLoaded', (event) => {
    function raccogliEManipolaElementi() {
        // Raccoglie tutti gli elementi con classe "C1" e "C2"
        const c1elements = document.getElementsByClassName("C1");
        const c2elements = document.getElementsByClassName("C2");

        // Primo oggetto per conservare i contenuti
        const array_1 = {};
        // Secondo oggetto per conservare i contenuti modificati
        const array_2 = {};

        // Funzione ausiliaria per popolare l'oggetto associativo
        function popolaArray(daElementi, array, indiceBase = 0) {
            // i cambia ad ogni iterazione > let
            for (let i = 0; i < daElementi.length; i++) {
                // chiave e valore cambiano per ogni elemento > let
                const chiave = 'key_' + (i + indiceBase) + '_';
                array[chiave] = daElementi[i].textContent;
            }
        }

        // Popola array_1 con gli elementi di C1
        popolaArray(c1elements, array_1);

        // Calcola l'indice di base per gli elementi C2 (non cambia > const)
        const indiceBaseC2 = c1elements.length;
        popolaArray(c2elements, array_1, indiceBaseC2);

        // Creazione di array_2 con le stesse chiavi di array_1 ma terminanti in "placeholder"
        for (const key in array_1) {
            const chiaveModificata = key + "placeholder";
            array_2[chiaveModificata] = array_1[key];
        }

        // Ritorna entrambi gli oggetti
        return [array_1, array_2];
    }

    // Esempio di come chiamare la funzione e visualizzare il risultato
    const risultati = raccogliEManipolaElementi();
    console.log("Array 1:", risultati[0]);
    console.log("Array 2:", risultati[1]);
});
*/