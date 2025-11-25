$(function() {
    // Inizializza il punteggio del giocatore
    let scores = { win: 0, lose: 0, draw: 0 };
  
    // Funzione per scegliere una mossa casuale del computer
    function computerMove() {
      const moves = ['Sasso', 'Carta', 'Forbici'];
      return moves[Math.floor(Math.random() * 3)];
    }
  
    // Funzione che decide il risultato di un round
    function decide(player, comp) {
      if (player === comp) return 'Pareggio!';
      if (
        (player === 'Sasso' && comp === 'Forbici') ||
        (player === 'Carta' && comp === 'Sasso') ||
        (player === 'Forbici' && comp === 'Carta')
      ) return 'Hai vinto!';
      return 'Hai perso!';
    }
  
    // Event handler per il click sui pulsanti delle mosse
    $('button[data-move]').click(function() {
      // Blocca il gioco se qualcuno ha già vinto 3 volte
      if (scores.win === 3 || scores.lose === 3) return;
  
      // Prendi la mossa del giocatore dal bottone cliccato
      const player = $(this).data('move');
  
      // Genera la mossa del computer e valuta l'esito
      const comp = computerMove();
      const outcome = decide(player, comp);
  
      // Mostra il risultato del round
      $('#result').html(`Tu: ${player} - PC: ${comp}<br>${outcome}`);
  
      // Aggiorna i punteggi
      if (outcome === 'Hai vinto!') scores.win++;
      else if (outcome === 'Hai perso!') scores.lose++;
      else scores.draw++;
  
      // Aggiorna la visualizzazione dei punteggi
      $('#win').text(scores.win);
      $('#lose').text(scores.lose);
      $('#draw').text(scores.draw);
  
      // Se qualcuno arriva a 3 vittorie, mostra il messaggio finale
      if (scores.win === 3 || scores.lose === 3) {
        $('#final').text(
          scores.win === 3
            ? 'Complimenti, hai vinto la partita!'
            : 'Mi dispiace, ha vinto il computer.'
        );
      }
    });
  });
  