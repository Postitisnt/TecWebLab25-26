// esercizio2.js

document.addEventListener('DOMContentLoaded', function() {
    // URL del servizio web
    const url = 'http://diiorio.nws.cs.unibo.it/twe/15.09.2022/api/index.php';

    // Crea un nuovo oggetto XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Configura la richiesta GET
    xhr.open('GET', url, true); // quel "true" alla fine serve a specificare se in modalità asincrona o meno (false)

    // Imposta la funzione di callback per gestire la risposta
    xhr.onload = function() { // l'onload è sostanzialmente attivo nel momento in cui la risposta arriva
        if (xhr.status === 200) {
            // Converte la risposta JSON in un oggetto JavaScript
            const data = JSON.parse(xhr.responseText);
            console.log("Data: ", data)

            // Filtra le piante con 'evidenza' true e 'n_piante' >= 1
            const pianteFiltrate = data.filter(function(pianta) {
                return pianta.evidenza === true && Number(pianta.n_piante) >= 1;
            });
            console.log("Filtered data: ", pianteFiltrate)

            // Seleziona l'elemento <section> all'interno di <main>
            const sezione = document.querySelector('main section');

            // Svuota il contenuto della sezione
            sezione.innerHTML = '';

            // Itera attraverso le piante filtrate e crea gli elementi HTML
            pianteFiltrate.forEach(function(pianta) {
                // Crea l'elemento <article>
                const articolo = document.createElement('article');

                // Crea il div per il bottone e il messaggio
                const divButton = document.createElement('div');
                divButton.classList.add('div-button'); // Aggiungi una classe per il CSS

                // Crea il pulsante 'Acquista'
                const bottone = document.createElement('button');
                bottone.textContent = 'Acquista';
                divButton.appendChild(bottone);

                // Se 'n_piante' è uguale a 1, aggiungi il messaggio in rosso
                if (Number(pianta.n_piante) === 1) {
                    const avviso = document.createElement('p');
                    avviso.textContent = 'Solo 1 in magazzino!';
                    divButton.appendChild(avviso);
                }

                // Aggiungi il divButton all'articolo
                articolo.appendChild(divButton);

                // Crea il primo div con il link e la descrizione
                const div1 = document.createElement('div');
                const link = document.createElement('a');
                link.href = pianta.id + '.html'; // Calcola il link dalla proprietà 'id'
                link.textContent = pianta.nome;
                const descrizione = document.createElement('p');
                descrizione.textContent = pianta.spiegazione;
                div1.appendChild(link);
                div1.appendChild(descrizione);
                articolo.appendChild(div1);

                // Crea il secondo div con temperatura minima e altezza massima
                const div2 = document.createElement('div');
                const span1 = document.createElement('span');
                const tempMinLabel = document.createElement('p');
                tempMinLabel.textContent = 'Temperatura minima: ';
                const tempMinValue = document.createElement('p');
                tempMinValue.textContent = pianta.temp_min + ' Celsius';
                span1.appendChild(tempMinLabel);
                span1.appendChild(tempMinValue);

                const span2 = document.createElement('span');
                const altezzaMaxLabel = document.createElement('p');
                altezzaMaxLabel.textContent = 'Altezza massima: ';
                const altezzaMaxValue = document.createElement('p');
                altezzaMaxValue.textContent = pianta.altezza_cm + 'cm';
                span2.appendChild(altezzaMaxLabel);
                span2.appendChild(altezzaMaxValue);

                div2.appendChild(span1);
                div2.appendChild(span2);
                articolo.appendChild(div2);

                // Crea il terzo div con le origini
                const div3 = document.createElement('div');
                const origini = document.createElement('p');
                origini.textContent = 'Origini ' + pianta.origini;
                div3.appendChild(origini);
                articolo.appendChild(div3);

                // Aggiunge l'articolo alla sezione
                sezione.appendChild(articolo);
            });
        } else {
            console.error('Errore durante il recupero dei dati:', xhr.statusText);
        }
    };

    // Gestisce eventuali errori nella richiesta
    xhr.onerror = function() {
        console.error('Errore di rete o di connessione.');
    };

    // Invia la richiesta
    xhr.send();
});
