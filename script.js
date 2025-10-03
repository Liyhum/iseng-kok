document.addEventListener('DOMContentLoaded', () => {
    const initialScreen = document.getElementById('initialScreen');
    const surpriseButton = document.getElementById('surpriseButton');
    const gameContainer = document.getElementById('gameContainer');
    const cardArea = document.getElementById('cardArea');
    const gameMessage = document.getElementById('gameMessage');
    const birthdayMessage = document.getElementById('birthdayMessage');

    let isFlipping = false; // Mencegah klik ganda saat kartu sedang dibalik

    // Event listener untuk tombol mulai
    surpriseButton.addEventListener('click', function() {
        initialScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startGame();
    });

    // Fungsi untuk memulai atau mengulang permainan
    function startGame() {
        isFlipping = false;
        cardArea.innerHTML = ''; // Kosongkan area kartu
        gameMessage.textContent = ''; // Kosongkan pesan

        const cardsContent = ['❤️', '😢', '😢'];
        // Acak posisi kartu pemenang
        cardsContent.sort(() => Math.random() - 0.5);

        cardsContent.forEach(content => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            // Tentukan apakah ini kartu pemenang
            if (content === '❤️') {
                card.dataset.winner = 'true';
            }

            card.innerHTML = `
                <div class="card-face front">?</div>
                <div class="card-face back">${content}</div>
            `;

            card.addEventListener('click', () => handleCardClick(card));
            cardArea.appendChild(card);
        });
    }

    // Fungsi yang dijalankan saat kartu diklik
    function handleCardClick(clickedCard) {
        if (isFlipping) return; // Jika kartu sedang dibalik, jangan lakukan apa-apa
        isFlipping = true;

        // Balik semua kartu
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flipped'));

        // Cek apakah kartu yang diklik adalah pemenang
        if (clickedCard.dataset.winner === 'true') {
            // Jika menang
            setTimeout(() => {
                clickedCard.querySelector('.back').classList.add('correct');
                gameMessage.textContent = 'Benar! Kamu Hebat! ❤️';
                
                // Tunggu sebentar lalu tampilkan pesan kejutan
                setTimeout(() => {
                    gameContainer.classList.add('hidden');
                    birthdayMessage.classList.remove('hidden');
                    fireExplosion(); // Panggil efek confetti!
                }, 2000);

            }, 800); // Waktu tunggu setelah kartu dibalik

        } else {
            // Jika kalah
            setTimeout(() => {
                clickedCard.querySelector('.back').classList.add('wrong');
                // Tunjukkan juga kartu yang benar
                document.querySelector('[data-winner="true"] .back').classList.add('correct');
                gameMessage.textContent = 'Yah, salah. Coba lagi ya!';

                // Tunggu sebentar lalu mulai ulang game
                setTimeout(() => {
                    startGame();
                }, 2500);

            }, 800);
        }
    }


    // --- FUNGSI CONFETTI (TETAP SAMA SEPERTI ASLINYA) ---
    function fireExplosion() {
        const duration = 7 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 360, ticks: 60, zIndex: 0 };

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 80 * (timeLeft / duration);
            
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() < 0.3 ? Math.random() : Math.random() - 0.2 }, colors: ['#ffdd00', '#ffaa00', '#ff8800', '#ff6600'], shapes: ['circle', 'square'], gravity: 0.2, drift: randomInRange(-0.2, 0.2) }));
            confetti(Object.assign({}, defaults, { particleCount: particleCount / 2, origin: { x: Math.random(), y: Math.random() < 0.3 ? Math.random() : Math.random() - 0.2 }, colors: ['#ff4d00', '#ff2e00', '#cc0000'], shapes: ['star', 'circle'], gravity: 0.5, scalar: randomInRange(0.5, 1.5), drift: randomInRange(-0.4, 0.4), startVelocity: randomInRange(20, 50) }));
            confetti(Object.assign({}, defaults, { particleCount: particleCount / 3, origin: { x: Math.random(), y: Math.random() < 0.3 ? Math.random() : Math.random() - 0.2 }, colors: ['#00ccff', '#33ffcc', '#ccff33', '#ffcc00', '#ff66ff'], shapes: ['circle'], gravity: -0.1, scalar: randomInRange(0.8, 1.2), drift: randomInRange(-0.1, 0.1), startVelocity: randomInRange(15, 25) }));
        }, 300);
    }

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
});
