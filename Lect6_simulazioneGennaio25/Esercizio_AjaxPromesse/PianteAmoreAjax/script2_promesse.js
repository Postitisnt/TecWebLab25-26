/*
Le Promesse in JavaScript sono oggetti che rappresentano il risultato di un'operazione asincrona, 
che può essere completata con successo (risolta) o con un errore (rifiutata). 
Le promesse aiutano a gestire il codice asincrono in modo più leggibile rispetto alle tradizionali callback.

**Stati delle Promesse:**
- *Pending (In attesa)*: stato iniziale, non ancora risolta o rifiutata.
- *Fulfilled (Risolta)*: l'operazione asincrona è completata con successo.
- *Rejected (Rifiutata)*: l'operazione asincrona è fallita.

**Metodi principali:**
- `.then(onFulfilled, onRejected)`: gestisce il caso in cui la promessa è risolta con successo (`onFulfilled`) o rifiutata (`onRejected`).
- `.catch(onRejected)`: gestisce solo il caso in cui la promessa è rifiutata.
- `.finally(onFinally)`: esegue una funzione indipendentemente dal risultato della promessa.

**Fetch API:**
La Fetch API fornisce un'interfaccia JavaScript per accedere e manipolare parti del canale HTTP, come richieste e risposte. 
È basata sulle promesse e sostituisce l'uso di `XMLHttpRequest` per le operazioni asincrone.

**Esempio di utilizzo:**

    fetch('https://api.esempio.com/dati')
        .then(function(response) {
            // Controlla se la risposta è ok (status code 200-299)
            if (!response.ok) {
                throw new Error('Errore nella risposta: ' + response.statusText);
            }
            return response.json(); // Estrae i dati in formato JSON
        })
        .then(function(data) {
            // Gestisci i dati ricevuti
            console.log(data);
        })
        .catch(function(error) {
            // Gestisci gli errori
            console.error('Si è verificato un errore:', error);
        });

In questo esempio:

    1. fetch effettua una richiesta HTTP e restituisce una promessa.
    2. Il primo then gestisce la risposta HTTP; se la risposta non è ok, genera un errore.
    3. response.json() estrae il corpo della risposta in formato JSON e restituisce una promessa.
    4. Il secondo then riceve i dati JSON e li utilizza.
    5. catch intercetta eventuali errori avvenuti in precedenza. 
*/

// EsPianteConPromesse

document.addEventListener('DOMContentLoaded', function() {
    // Questa funzione viene eseguita quando il DOM è stato completamente caricato

    // URL del servizio web da cui ottenere i dati delle piante
    const url = 'http://diiorio.nws.cs.unibo.it/twe/15.09.2022/api/index.php';

    // Effettua una richiesta GET al servizio web utilizzando la Fetch API
    fetch(url) // il metodo di default per fetch() è il GET. Specificando 'method' si possono utilizzare altri metodi, 
    // tipo: fetch('/api/users', {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: "Luca" })});
        .then(function(response) { // Questo blocco viene eseguito quando la promessa restituita da fetch viene risolta
            // Verifica se la risposta HTTP è andata a buon fine (status code 200-299)
            if (!response.ok) {
                // Se la risposta non è ok, genera un errore che verrà catturato nel blocco catch
                throw new Error('Errore nella risposta del network: ' + response.statusText);
            }
            // Altrimenti, estrae i dati JSON dalla risposta e restituisce una nuova promessa
            return response.json();
        })
        .then(function(data) { // Questo blocco viene eseguito quando la promessa restituita da response.json() [-> cioe sopra] viene risolta
            // Filtra le piante che hanno 'evidenza' uguale a true e 'n_piante' maggiore o uguale a 1
            const pianteFiltrate = data.filter(function(pianta) {
                // Converte 'n_piante' in numero per assicurare un confronto corretto
                return pianta.evidenza === true && Number(pianta.n_piante) >= 1;
            });

            // Seleziona l'elemento <section> all'interno di <main> dove verranno inseriti gli articoli
            const sezione = document.querySelector('main section'); // Questo metodo consente di selezionare un elemento HTML dalla pagina, utilizzando un selettore CSS.

            // Svuota il contenuto della sezione per evitare duplicazioni
            sezione.innerHTML = '';

            // Itera attraverso le piante filtrate e crea gli elementi HTML per ciascuna
            pianteFiltrate.forEach(function(pianta) {
                // Crea l'elemento <article> che conterrà le informazioni della pianta
                const articolo = document.createElement('article');

                // Crea un div per contenere il pulsante 'Acquista' e il messaggio opzionale
                const divButton = document.createElement('div');
                divButton.classList.add('div-button'); // Aggiunge la classe per il CSS

                // Crea il pulsante 'Acquista' e lo aggiunge al divButton
                const bottone = document.createElement('button');
                bottone.textContent = 'Acquista';
                divButton.appendChild(bottone);

                // Se 'n_piante' è uguale a 1, aggiunge un messaggio in rosso sotto il pulsante
                if (Number(pianta.n_piante) === 1) {
                    const avviso = document.createElement('p');
                    avviso.textContent = 'Solo 1 in magazzino!';
                    divButton.appendChild(avviso);
                }

                // Aggiunge il divButton all'articolo
                articolo.appendChild(divButton);

                // Crea il primo div che contiene il link alla pianta e la sua descrizione
                const div1 = document.createElement('div');

                // Crea un link che porta alla pagina specifica della pianta utilizzando l'ID
                const link = document.createElement('a');
                link.href = pianta.id + '.html'; // Esempio: '1.html'
                link.textContent = pianta.nome;   // Nome della pianta

                // Crea un paragrafo con la spiegazione della pianta
                const descrizione = document.createElement('p');
                descrizione.textContent = pianta.spiegazione;

                // Aggiunge il link e la descrizione al div1
                div1.appendChild(link);
                div1.appendChild(descrizione);

                // Aggiunge il div1 all'articolo
                articolo.appendChild(div1);

                // Crea il secondo div che contiene informazioni sulla temperatura e l'altezza
                const div2 = document.createElement('div');

                // Crea uno span per la temperatura minima
                const span1 = document.createElement('span');
                const tempMinLabel = document.createElement('p');
                tempMinLabel.textContent = 'Temperatura minima: ';
                const tempMinValue = document.createElement('p');
                tempMinValue.textContent = pianta.temp_min + ' Celsius';
                span1.appendChild(tempMinLabel);
                span1.appendChild(tempMinValue);

                // Crea uno span per l'altezza massima
                const span2 = document.createElement('span');
                const altezzaMaxLabel = document.createElement('p');
                altezzaMaxLabel.textContent = 'Altezza massima: ';
                const altezzaMaxValue = document.createElement('p');
                altezzaMaxValue.textContent = pianta.altezza_cm + 'cm';
                span2.appendChild(altezzaMaxLabel);
                span2.appendChild(altezzaMaxValue);

                // Aggiunge gli span al div2
                div2.appendChild(span1);
                div2.appendChild(span2);

                // Aggiunge il div2 all'articolo
                articolo.appendChild(div2);

                // Crea il terzo div che contiene le origini della pianta
                const div3 = document.createElement('div');
                const origini = document.createElement('p');
                origini.textContent = 'Origini ' + pianta.origini;
                div3.appendChild(origini);

                // Aggiunge il div3 all'articolo
                articolo.appendChild(div3);

                // Aggiunge l'articolo completo alla sezione nel DOM
                sezione.appendChild(articolo);
            });
        })
        .catch(function(error) {
            // Questo blocco viene eseguito se si verifica un errore in uno qualsiasi dei then precedenti
            console.error('Errore durante il recupero dei dati:', error);
        });
});
