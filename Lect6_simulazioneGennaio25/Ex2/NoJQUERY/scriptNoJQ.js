// Esegui il codice dopo che il DOM è stato caricato
document.addEventListener('DOMContentLoaded', () => {
    // Stato iniziale del punteggio
    const scores = { win: 0, lose: 0, draw: 0 }; // Anche se i punteggi cambiano, la variabile scores resta la stessa. 
                                                // se avessimo voluto modificarla avremmo dovuto usare "let" e non "const"
  
    // Funzione per ottenere una mossa casuale del computer
    function computerMove() {
      const moves = ['Sasso', 'Carta', 'Forbici'];
      return moves[Math.floor(Math.random() * 3)]; // Quì stiamo facendo le seguenti:
                                                    // 1. Math.random() -> tira fuori un numero casuale tra 0 e 1 -> risultaato A
                                                    // 2. il *3 moltiplica il numero per 3 -> Risultato B = 3*A
                                                    // 3. Math.floor() -> arrotonda il numero all'intero più basso -> C = Math.floor(B)
                                                    // 4. C avrà valore o 0, o 1, o 2
                                                    // 5. estraiamo da "moves" l'elemento con indice corrispondente a C -> moves[C]
    }
  
    // Funzione per decidere l'esito del round
    function decide(player, comp) {
      if (player === comp) return 'Pareggio!';
      if (
        (player === 'Sasso' && comp === 'Forbici') ||
        (player === 'Carta' && comp === 'Sasso') ||
        (player === 'Forbici' && comp === 'Carta')
      ) return 'Hai vinto!';
      return 'Hai perso!';
    }
  
    // Seleziona tutti i bottoni con attributo data-move
    const buttons = document.querySelectorAll('button[data-move]'); 
    //console.log(buttons)
    //se avessimo usato invece una classe avremmo scritto: const buttons = document.querySelectorAll('button.move');
    // avremmo dovuto definire 2 classi per ogni button nell'html -> class="move sasso" ; class="move carta" ; class="move forbici"
    /* 
    sotto avremmo poi messo (per ottenere il valore della variabile "player"): 

    button.addEventListener('click', () => {
        let player;
        if (button.classList.contains('sasso')) player = 'Sasso';
        else if (button.classList.contains('carta')) player = 'Carta';
        else if (button.classList.contains('forbici')) player = 'Forbici';
    });
    */
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Blocca il gioco se qualcuno ha vinto
        if (scores.win === 3 || scores.lose === 3) return;
  
        const player = button.getAttribute('data-move'); // Ritorna una stringa con il valore dell'attributo
        const comp = computerMove();
        const outcome = decide(player, comp);
  
        // Mostra risultato (utilizzando innerHTML che interpreta il tag <br>, a diffferenza di textContent che lo scriverebbe come stringa)
        document.getElementById('result').innerHTML = `Tu: ${player} - PC: ${comp}<br>${outcome}`; // in alternativa puoi concatenare: "Tu: " + player + " - PC: " + comp;
        //console.log(scores)
        // Aggiorna punteggio
        if (outcome === 'Hai vinto!') scores.win++;
        else if (outcome === 'Hai perso!') scores.lose++;
        else scores.draw++;
        //console.log(scores)
        // Aggiorna visualizzazione
        document.getElementById('win').textContent = scores.win;
        document.getElementById('lose').textContent = scores.lose;
        document.getElementById('draw').textContent = scores.draw;
  
        // Messaggio finale
        if (scores.win === 3 || scores.lose === 3) {
          document.getElementById('final').textContent =
            scores.win === 3
              ? 'Complimenti, hai vinto la partita!'
              : 'Mi dispiace, ha vinto il computer.';
              // Operatore ternario -> condizione ? valoreSeVero : valoreSeFalso
                /* Equivale a:
                    if (scores.win === 3) {
                        document.getElementById('final').textContent = 'Complimenti, hai vinto la partita!';
                    } else {
                        document.getElementById('final').textContent = 'Mi dispiace, ha vinto il computer.';
                    }
                */
        }
      });
    });
  }); 