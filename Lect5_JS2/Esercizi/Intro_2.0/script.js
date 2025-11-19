document.addEventListener("DOMContentLoaded", function () {
    const generaBtn = document.getElementById("genera");
    const area = document.getElementById("areaMostri");

    const nomi = ["Gloop", "Zippy", "Munch", "Blobbo", "Narf", "Poff", "Spritz", "Foo"];

    function generaNome() {
        // Genera un numero intero casuale da 0 a nomi.length - 1.
        // Math.random() produce un numero decimale tra 0 e 1 (escluso).
        // Moltiplicandolo per nomi.length otteniamo un numero tra 0 e la lunghezza dell'array.
        // Math.floor(...) arrotonda per difetto, trasformandolo in un indice valido dell'array.
        const i = Math.floor(Math.random() * nomi.length);
        return nomi[i];
    }

    generaBtn.addEventListener("click", function () {

        // Crea il contenitore del mostro
        const mostro = document.createElement("div");
        mostro.classList.add("mostro");

        // Nome casuale
        const nome = document.createElement("p");
        nome.textContent = generaNome();
        mostro.appendChild(nome); // Aggiungiamo l'elemento come figlio del div "mostro"

        // Bottone Nutri
        const nutriBtn = document.createElement("button");
        nutriBtn.textContent = "Nutri";
        nutriBtn.addEventListener("click", function () {
            mostro.classList.add("felice");
        });
        mostro.appendChild(nutriBtn);

        // Bottone Libera
        const liberaBtn = document.createElement("button");
        liberaBtn.textContent = "Libera";
        liberaBtn.addEventListener("click", function () {
            area.removeChild(mostro);
        });
        mostro.appendChild(liberaBtn);

        // Aggiunta alla pagina
        area.appendChild(mostro); // Aggiungiamo il div con tutte le sue cose dentro
    });
});
