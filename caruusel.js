//carrusel
const wrapper = document.querySelector('.portfolio-row-wrapper');
const row = wrapper.querySelector('.portfolio-row');
const prev = wrapper.querySelector('.prev');
const next = wrapper.querySelector('.next');

next.addEventListener('click', () => {
    row.scrollBy({ left: 340, behavior: 'smooth' }); // ajusta según el ancho de la tarjeta + gap
});

prev.addEventListener('click', () => {
    row.scrollBy({ left: -340, behavior: 'smooth' });
});