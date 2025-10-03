document.addEventListener('DOMContentLoaded', () => {
    const initialScreen = document.getElementById('initialScreen');
    const surpriseButton = document.getElementById('surpriseButton');
    const gameContainer = document.getElementById('gameContainer');
    const cardArea = document.getElementById('cardArea');
    const gameMessage = document.getElementById('gameMessage');
    const birthdayMessage = document.getElementById('birthdayMessage');

    let isFlipping = false;

    // --- DEFINISI BENTUK HATI UNTUK CONFETTI ---
    const heartPath = 'M0 200 v-200 h200 a100 100 90 0 1 0 200 a100 100 90 0 1 -200 0 z';
    const heartShape = confetti.shapeFromPath({ path: heartPath });

    // --- PATH GAMBAR UNTUK KARTU ---
    // GANTI INI DENGAN NAMA FILE FOTO ANDA!
    const WRONG_CARD_IMAGE = 'wrong_card.jpeg'; // Contoh: 'my_sad_face.png'


    // Event listener untuk tombol mulai
    surpriseButton.addEventListener('click', function() {
        initialScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startGame();
    });

    // Fungsi untuk memulai atau mengulang permainan
    function startGame() {
        isFlipping = false;
        cardArea.innerHTML = '';
        gameMessage.textContent = '';

        // Data kartu: satu hati (emoji), dua salah (foto)
        const cardsData = [
            { type: 'heart', content: '❤️' },
            { type: 'wrong', content: WRONG_CARD_IMAGE },
            { type: 'wrong', content: WRONG_CARD_IMAGE }
        ];
        cardsData.sort(() => Math.random() - 0.5); // Acak kartu

        cardsData.forEach(cardData => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            if (cardData.type === 'heart') {
                card.dataset.winner = 'true';
            }

            // --- PERUBAHAN UTAMA DI SINI ---
            // Kita buat logika untuk membedakan tampilan kartu benar dan salah
            let backFaceHTML;
            if (cardData.type === 'heart') {
                // Jika kartu benar, isinya adalah emoji
                backFaceHTML = `<div class="card-face back">${cardData.content}</div>`;
            } else {
                // Jika kartu salah, isinya adalah foto (sebagai background)
                backFaceHTML = `<div class="card-face back" style="background-image: url('${cardData.content}'); background-size: cover; background-position: center;"></div>`;
            }

            // Gabungkan bagian depan dan belakang kartu
            card.innerHTML = `
                <div class="card-face front">?</div>
                ${backFaceHTML}
            `;

            card.addEventListener('click', () => handleCardClick(card));
            cardArea.appendChild(card);
        });
    }

    // Fungsi yang dijalankan saat kartu diklik
    function handleCardClick(clickedCard) {
        if (isFlipping) return; 
        isFlipping = true;

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => card.classList.add('flipped'));

        if (clickedCard.dataset.winner === 'true') {
            // Jika menang
            setTimeout(() => {
                clickedCard.querySelector('.back').classList.add('correct');
                gameMessage.textContent = 'Benar! Kamu Hebat! ❤️';
                
                setTimeout(() => {
                    gameContainer.classList.add('hidden');
                    birthdayMessage.classList.remove('hidden');
                    fireHearts(); 
                }, 2000);

            }, 800);

        } else {
            // Jika kalah
            setTimeout(() => {
                clickedCard.querySelector('.back').classList.add('wrong');
                document.querySelector('[data-winner="true"] .back').classList.add('correct');
                gameMessage.textContent = 'Yah, salah... Coba lagi ya!';

                setTimeout(() => {
                    startGame();
                }, 2500);

            }, 800);
        }
    }

    // Fungsi efek hati (tidak ada perubahan)
    function fireHearts() {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(interval);
            }
            const particleCount = 50 * (timeLeft / duration);
            const heartDefaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, particleCount: particleCount, shapes: [heartShape], scalar: 1, gravity: 0.5, colors: ['#ff0000', '#ff6666', '#ff9999', '#ff4d4d'] };
            confetti(Object.assign({}, heartDefaults, { origin: { x: 0.1, y: 0.8 }, drift: randomInRange(0.1, 0.5) }));
            confetti(Object.assign({}, heartDefaults, { origin: { x: 0.9, y: 0.8 }, drift: randomInRange(-0.5, -0.1) }));
        }, 250);
    }

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
});
