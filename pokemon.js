// Espera a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos todas las tarjetas y el fondo
    const todasLasCartas = document.querySelectorAll('.tarjeta-pokemon');
    const paginaBody = document.body;

    // 1. Efecto Halo en el Fondo
    paginaBody.addEventListener('mousemove', (evento) => {
        const x = (evento.clientX / window.innerWidth) * 100;
        const y = (evento.clientY / window.innerHeight) * 100;
        paginaBody.style.setProperty('--raton-x-fondo', `${x}%`);
        paginaBody.style.setProperty('--raton-y-fondo', `${y}%`);
    });

    // 2. Efecto Parallax y Brillo en cada tarjeta
    todasLasCartas.forEach(tarjeta => {
        const brilloHolo = tarjeta.querySelector('.brillo-holografico');
        const ilustracion = tarjeta.querySelector('.arte-pokemon');

        let ratonEncima = false;

        const aplicarParallax = (xNorm, yNorm) => {
            const rotarX = -yNorm * 8; // Aumentamos la rotación
            const rotarY = xNorm * 8;

            brilloHolo.style.setProperty('--raton-x', `${(xNorm + 0.5) * 100}%`);
            brilloHolo.style.setProperty('--raton-y', `${(yNorm + 0.5) * 100}%`);

            // Aplicamos el scale() del HOVER aquí
            tarjeta.style.transform = `scale(1.05) translateY(-10px) rotateX(${rotarX}deg) rotateY(${rotarY}deg)`;

            // Mover la ilustración en dirección opuesta
            ilustracion.style.transform = `translateX(${-xNorm * 5}px) translateY(${-yNorm * 5}px) scale(1.05)`;
        };

        tarjeta.addEventListener('mousemove', (evento) => {
            if (!ratonEncima) return;

            const rectTarjeta = tarjeta.getBoundingClientRect();
            const xNorm = (evento.clientX - rectTarjeta.left) / rectTarjeta.width - 0.5;
            const yNorm = (evento.clientY - rectTarjeta.top) / rectTarjeta.height - 0.5;

            tarjeta.style.transition = 'none';
            ilustracion.style.transition = 'none';

            aplicarParallax(xNorm, yNorm);
        });

        tarjeta.addEventListener('mouseleave', () => {
            ratonEncima = false;
            tarjeta.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
            ilustracion.style.transition = 'transform 0.5s ease-out';

            // Volvemos a la posición inicial (sin scale)
            tarjeta.style.transform = 'rotateX(0deg) rotateY(0deg)';
            ilustracion.style.transform = 'translateX(0) translateY(0) scale(1)';
        });

        tarjeta.addEventListener('mouseenter', () => {
            ratonEncima = true;
            // La transición base del hover
            tarjeta.style.transition = 'transform 0.3s ease-out, box-shadow 0.3s ease-out';
        });
    });
});