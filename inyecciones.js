window.onload = function() {
    // Cargar el contenido de header.html
    fetch('plantillas/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del header');
            }
            return response.text();
        })
        .then(data => {
            // Insertar el contenido del header en el contenedor
            document.getElementById('header-container').innerHTML = data;

            // Agregar la funcionalidad del menú hamburguesa
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const links = document.querySelectorAll('.nav-links li');

            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    // Alternar la clase nav-active en el menú
                    navLinks.classList.toggle('nav-active');

                    // Animar los enlaces
                    links.forEach((link, index) => {
                        if (link.style.animation) {
                            link.style.animation = '';
                        } else {
                            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                        }
                    });

                    // Animar el hamburger
                    hamburger.classList.toggle('toggle');
                });
            }

            // Marcar como activo el item del menú correspondiente
            const currentPath = window.location.pathname;
            const navItems = document.querySelectorAll('.nav-item');

            navItems.forEach(item => {
                if (item.getAttribute('href') === currentPath) {
                    item.classList.add('active');
                }
            });

            // Cargar el contenido de footer.html
            return fetch('plantillas/footer.html');
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del footer');
            }
            return response.text();
        })
        .then(data => {
            // Insertar el contenido del footer en el contenedor
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Hubo un problema con la carga:', error);
        });
};