gsap.registerPlugin(Flip);

const thumbs = gsap.utils.toArray(".item");
const modal = document.querySelector(".modal");
const toggle = document.querySelector("button");
const modalImage = modal.querySelector(".modal-image");
const wrapper = document.querySelector(".grid-wrapper");
const modalInfo = document.querySelector(".modal-info");
let activeThumb;

// FLIP al modal
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    activeThumb = thumb;
    thumb.classList.add("active-thumb");
    thumb.dataset.flipId = "img";
    gsap.set(thumb, { opacity: 0 });

    // Estado de animación para Flip.js
    const state = Flip.getState([thumb, modalImage], {
      props: "borderRadius, aspectRatio, boxShadow"
    });

    // Configurar imagen del modal
    modalImage.querySelector("img").setAttribute("src", thumb.dataset.url);

    // Configurar contenido dinámico para el mini-div
    const description = thumb.dataset.description || "Descripción no disponible";
    modalInfo.innerHTML = `<p>${description}</p>`;


    // Activar el modal
    modal.classList.add("active");
    modalImage.style.display = "block";

    Flip.from(state, {
      duration: 0.25,
      ease: "sine.inOut"
    });
  });
});

// FLIP fuera del modal
modal.addEventListener("click", () => {
  activeThumb.dataset.flipId = "img";
  gsap.set(activeThumb, { opacity: 1 });

  const state = Flip.getState([modalImage, activeThumb], {
    props: "borderRadius, aspectRatio, boxShadow"
  });

  modal.classList.remove("active");

  Flip.from(state, {
    duration: 0.25,
    absolute: true,
    ease: "sine.inOut",
    onComplete: () => {
      modalImage.querySelector("img").setAttribute("src", "");
      activeThumb.classList.remove("active-thumb");
      activeThumb.dataset.flipId = "img";
    }
  });
});

// Cambiar vista con FLIP
toggle.addEventListener("click", () => {
  toggle.classList.toggle("grid-view-on");
  const state = Flip.getState(".grid-wrapper, .item-wrapper");
  wrapper.classList.toggle("stack");

  Flip.from(state, {
    absolute: true,
    duration: 0.5,
    stagger: -0.0125,
    ease: "sine"
  });
});
