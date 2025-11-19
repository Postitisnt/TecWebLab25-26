// Aspetto che il DOM sia pronto, dato che lo script è nel head
document.addEventListener("DOMContentLoaded", function () {
    const p1 = document.getElementsByClassName("testo")[0];
    const p2 = document.getElementsByClassName("testo")[2];
    const btn = document.getElementById("cambia");

    btn.addEventListener("click", function () {
        p1.textContent = "Il testo è stato cambiato!";
        p1.style.color = "red";
        p1.classList.add("bold");
        p2.style.color = "blue";
        p2.classList.add("bold");
        // senza la classe bold, avremmo potuto utilizzare:
        //  p1.style.fontWeight = p2.style.fontWeight = "bold";
    });
});
