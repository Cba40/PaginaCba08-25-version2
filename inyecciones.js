window.onload = function() {
    // Cargar header
    fetch('/plantillas/header.html')
        .then(response => {
            if (!response.ok) throw new Error('Error en la carga del header');
            return response.text();
        })
        .then(data => {
            document.getElementById('header-container').innerHTML = data;

            // Menú hamburguesa
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const links = document.querySelectorAll('.nav-links li');

            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('nav-active');
                    links.forEach((link, index) => {
                        link.style.animation = link.style.animation
                            ? ''
                            : `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    });
                    hamburger.classList.toggle('toggle');
                });
            }

            // Navegación suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    // Cerrar menú hamburguesa al hacer clic en un enlace
                    if (navLinks.classList.contains('nav-active')) {
                        navLinks.classList.remove('nav-active');
                        hamburger.classList.remove('toggle');
                        links.forEach(link => link.style.animation = '');
                    }
                });
            });

            // Cargar footer
            return fetch('/plantillas/footer.html');
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la carga del footer');
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Hubo un problema con la carga:', error);
        });
};