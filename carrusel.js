document.addEventListener("DOMContentLoaded", () => {
    const rows = [
        { row: document.querySelector('.portfolio-row'), prev: document.querySelector('.portfolio-row-wrapper .prev'), next: document.querySelector('.portfolio-row-wrapper .next') },
        { row: document.querySelector('.servicios-row'), prev: document.querySelector('.servicios-row-wrapper .prev'), next: document.querySelector('.servicios-row-wrapper .next') }
    ];

    rows.forEach(({ row, prev, next }) => {
        const cards = Array.from(row.children);
        const gap = 16; // Espacio entre tarjetas en píxeles
        let index = 0;

        function updateButtons() {
            const visibleCards = Math.floor(row.parentElement.offsetWidth / (cards[0].offsetWidth + gap));
            
            prev.disabled = index === 0;
            next.disabled = index >= cards.length - visibleCards;
        }

        function moveRow() {
            const visibleWidth = row.parentElement.offsetWidth - 120; // Restar el padding lateral (60px por lado)
            const totalWidth = cards.length * (cards[0].offsetWidth + gap) - gap;
            const maxOffset = Math.max(0, totalWidth - visibleWidth);
            
            // Si hay menos tarjetas que las visibles, ajusta el desplazamiento
            if (cards.length <= Math.floor(visibleWidth / (cards[0].offsetWidth + gap))) {
                row.style.transform = 'translateX(0)';
            } else {
                row.style.transform = `translateX(${-Math.min(index * (cards[0].offsetWidth + gap), maxOffset)}px)`;
            }
            
            updateButtons();
        }

        next.addEventListener('click', () => {
            const visibleCards = Math.floor(row.parentElement.offsetWidth / (cards[0].offsetWidth + gap));
            if (index < cards.length - visibleCards) {
                index++;
                moveRow();
            }
        });

        prev.addEventListener('click', () => {
            if (index > 0) {
                index--;
                moveRow();
            }
        });

        window.addEventListener('resize', () => {
            moveRow();
        });

        moveRow(); // Estado inicial
    });
});