let currentPage = 0;
const pages = ['countdownPage', 'cakePage', 'giftsPage'];
let photos = [];
let letter = '';
let youtubeId = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    createAnimations();
    loadData();
    playBackgroundMusic();
});

// Background Music
function playBackgroundMusic() {
    const audio = document.getElementById('bgMusic');
    audio.volume = 0.3;
    audio.play().catch(() => {
        console.log('Music autoplay blocked. User interaction needed.');
    });
}

// Animated Background
function createAnimations() {
    const balloonContainer = document.querySelector('.balloons');
    const flowerContainer = document.querySelector('.flowers');
    const heartContainer = document.querySelector('.hearts');

    // Create balloons
    for (let i = 0; i < 8; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        const colors = ['#FF1744', '#FFD700', '#00B0FF', '#D500F9', '#00E676'];
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.width = '30px';
        balloon.style.height = '40px';
        balloon.style.animationDelay = Math.random() * 2 + 's';
        balloonContainer.appendChild(balloon);
    }

    // Create flowers
    const flowers = ['🌹', '🌸', '🌼', '🌻', '🌷'];
    for (let i = 0; i < 6; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.top = Math.random() * 50 + '%';
        flower.style.animationDelay = Math.random() * 4 + 's';
        flowerContainer.appendChild(flower);
    }

    // Create hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = -50 + 'px';
        heart.style.animationDelay = Math.random() * 3 + 's';
        heartContainer.appendChild(heart);
    }
}

// Countdown Timer
function startCountdown() {
    const targetDate = new Date('2026-07-12').getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<h2>🎉 HAPPY BIRTHDAY! 🎉</h2>';
        }
    }, 1000);
}

// Cake Customizer
function updateCake() {
    const candleCount = document.getElementById('candles').value;
    document.getElementById('candleCount').textContent = candleCount + ' candles';

    const toppingsCheckboxes = document.querySelectorAll('.topping-options input[type="checkbox"]:checked');
    const toppings = Array.from(toppingsCheckboxes).map(cb => cb.value);

    const toppingsContainer = document.getElementById('toppings');
    toppingsContainer.innerHTML = '';

    toppings.forEach(topping => {
        const topping_el = document.createElement('div');
        topping_el.className = 'sprinkle';
        if (topping === 'sprinkles') topping_el.textContent = '✨';
        else if (topping === 'chocolateChips') topping_el.textContent = '🍫';
        else if (topping === 'fruits') topping_el.textContent = '🍓';
        else if (topping === 'nuts') topping_el.textContent = '🥜';
        else if (topping === 'whipped') topping_el.textContent = '☁️';
        toppingsContainer.appendChild(topping_el);
    });

    updateCandles(candleCount);
}

function setFrosting(color) {
    document.getElementById('frosting').style.background = color;
}

function updateCandles(count) {
    const candlesContainer = document.getElementById('candles');
    candlesContainer.innerHTML = '';

    for (let i = 0; i < count; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.innerHTML = '<div class="flame"></div>';
        candlesContainer.appendChild(candle);
    }
}

// Page Navigation
function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
}

function updatePage() {
    pages.forEach((page, index) => {
        const pageElement = document.getElementById(page);
        if (index === currentPage) {
            pageElement.classList.add('active');
        } else {
            pageElement.classList.remove('active');
        }
    });

    if (currentPage === 1) {
        updateCake();
    }
}

// Gift Opening
function openGift(giftNumber) {
    if (giftNumber === 1) {
        showModal('letterModal');
    } else if (giftNumber === 2) {
        showModal('galleryModal');
    } else if (giftNumber === 3) {
        showModal('youtubeModal');
    }
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('show');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

// Letter Functions
function saveLetter() {
    letter = document.getElementById('letterText').value;
    localStorage.setItem('birthdayLetter', letter);
    alert('Letter saved! 💌');
}

// Gallery Functions
function addPhoto() {
    const url = document.getElementById('photoUrl').value.trim();
    if (url) {
        photos.push(url);
        document.getElementById('photoUrl').value = '';
        renderGallery();
        saveData();
    }
}

function renderGallery() {
    const gallery = document.getElementById('gallery');
    
    if (photos.length === 0) {
        gallery.innerHTML = '<p class="empty-text">Add your favorite photos! 🎀</p>';
        return;
    }

    gallery.innerHTML = photos.map((photo, index) => `
        <div class="gallery-item">
            <img src="${photo}" alt="Birthday photo ${index + 1}" onerror="this.src='https://via.placeholder.com/120?text=Photo+Error'">
            <button class="delete-photo" onclick="deletePhoto(${index})">✕</button>
        </div>
    `).join('');
}

function deletePhoto(index) {
    photos.splice(index, 1);
    renderGallery();
    saveData();
}

// YouTube Functions
function loadYouTube() {
    let youtubeInput = document.getElementById('youtubeUrl').value.trim();
    
    if (!youtubeInput) return;

    // Extract video ID from different formats
    let videoId;
    if (youtubeInput.includes('youtube.com/watch?v=')) {
        videoId = youtubeInput.split('v=')[1]?.split('&')[0];
    } else if (youtubeInput.includes('youtu.be/')) {
        videoId = youtubeInput.split('youtu.be/')[1]?.split('?')[0];
    } else if (youtubeInput.length === 11) {
        videoId = youtubeInput;
    }

    if (videoId) {
        youtubeId = videoId;
        document.getElementById('youtubePlayer').innerHTML = `
            <iframe src="https://www.youtube.com/embed/${videoId}" 
                    allowfullscreen="" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            </iframe>
        `;
        document.getElementById('youtubeUrl').value = '';
        saveData();
    } else {
        alert('Please enter a valid YouTube URL or video ID');
    }
}

// Local Storage Functions
function saveData() {
    localStorage.setItem('birthdayPhotos', JSON.stringify(photos));
    localStorage.setItem('birthdayYouTubeId', youtubeId);
}

function loadData() {
    const savedPhotos = localStorage.getItem('birthdayPhotos');
    const savedLetter = localStorage.getItem('birthdayLetter');
    const savedYouTubeId = localStorage.getItem('birthdayYouTubeId');

    if (savedPhotos) {
        photos = JSON.parse(savedPhotos);
        renderGallery();
    }

    if (savedLetter) {
        document.getElementById('letterText').value = savedLetter;
    }

    if (savedYouTubeId) {
        youtubeId = savedYouTubeId;
        document.getElementById('youtubePlayer').innerHTML = `
            <iframe src="https://www.youtube.com/embed/${savedYouTubeId}" 
                    allowfullscreen="" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
            </iframe>
        `;
    }
}

// Allow modal to close on outside click
window.onclick = (event) => {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
};