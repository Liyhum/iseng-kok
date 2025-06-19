document.getElementById('surpriseButton').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('birthdayMessage').classList.remove('hidden');

    function fireExplosion() {
        const duration = 7 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 360, ticks: 60, zIndex: 0 };

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 80 * (timeLeft / duration);

            // Efek Confetti Standar
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: Math.random(), y: Math.random() < 0.3 ? Math.random() : Math.random() - 0.2 },
                colors: ['#ffdd00', '#ffaa00', '#ff8800', '#ff6600'], // Variasi warna oranye/emas
                shapes: ['circle', 'square'],
                gravity: 0.2,
                drift: randomInRange(-0.2, 0.2)
            }));

            // Efek "Api" dengan warna dan bentuk berbeda
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount / 2,
                origin: { x: Math.random(), y: Math.random() < 0.3 ? Math.random() : Math.random() - 0.2 },
                colors: ['#ff4d00', '#ff2e00', '#cc0000'], // Warna merah dan oranye gelap
                shapes: ['star', 'circle'],
                gravity: 0.5,
                scalar: randomInRange(0.5, 1.5), // Ukuran partikel bervariasi
                drift: randomInRange(-0.4, 0.4),
                startVelocity: randomInRange(20, 50)
            }));

            // Efek Balon (warna lebih cerah, bentuk bulat)
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount / 3,
                origin: { x: Math.random(), y: Math.random() < 0.3 ? Math.random() : Math.random() - 0.2 },
                colors: ['#00ccff', '#33ffcc', '#ccff33', '#ffcc00', '#ff66ff'], // Warna-warni balon
                shapes: ['circle'],
                gravity: -0.1, // Efek mengambang
                scalar: randomInRange(0.8, 1.2),
                drift: randomInRange(-0.1, 0.1),
                startVelocity: randomInRange(15, 25)
            }));

        }, 300);
    }

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    fireExplosion();
});