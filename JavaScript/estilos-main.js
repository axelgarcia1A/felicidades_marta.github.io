// Funci�n para agregar la clase 'visible' a las tarjetas al hacer scroll hacia ellas
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("visible");
        }, index * 500); // Aparece cada tarjeta con un retraso
    });
});
const cards = document.querySelectorAll('.card');
const options = {
    root: null, // El root ser� el viewport
    rootMargin: '0px',
    threshold: 0.5 // Queremos que la tarjeta sea visible al 50%
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Hacemos visible la tarjeta cuando se cruza
        }
    });
}, options);


// Funci�n para reiniciar la animaci�n de escritura cuando pasa el rat�n sobre la tarjeta
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const face2Text = this.querySelector('.face2 p');

        // Reseteamos la animaci�n de typing
        face2Text.style.animation = 'none';
        face2Text.offsetHeight; // Forzamos el reflujo (redibujar el elemento)
        face2Text.style.animation = ''; // Volvemos a aplicar la animaci�n
    });
});
