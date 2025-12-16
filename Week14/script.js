// Mock Data for Carousel
const featuredGames = [
    {
        title: "Cyber Adventure 2077",
        price: "NT$ 1,599",
        tags: ["開放世界", "角色扮演"],
        mainImg: "https://picsum.photos/id/15/800/450",
        screenshots: [16, 17, 18, 19]
    },
    {
        title: "Stellar Strategy",
        price: "NT$ 890",
        tags: ["策略", "太空", "多人"],
        mainImg: "https://picsum.photos/id/25/800/450",
        screenshots: [26, 27, 28, 29]
    },
    {
        title: "Mystery of the Forest",
        price: "NT$ 450",
        tags: ["冒險", "解謎", "獨立"],
        mainImg: "https://picsum.photos/id/35/800/450",
        screenshots: [36, 37, 38, 39]
    }
];

let currentIndex = 0;

function updateCarousel() {
    const game = featuredGames[currentIndex];

    // Animate transition (simple opacity)
    const container = document.querySelector('.featured-item');
    container.style.opacity = '0';

    setTimeout(() => {
        // Update DOM
        container.querySelector('.main-image').style.backgroundImage = `url('${game.mainImg}')`;
        container.querySelector('.game-title').textContent = game.title;
        container.querySelector('.game-price').textContent = game.price;

        // Update tags
        const tagContainer = container.querySelector('.tag-list');
        tagContainer.innerHTML = game.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Update screenshots
        const screens = container.querySelectorAll('.mini-screenshot');
        screens.forEach((el, index) => {
            if (game.screenshots[index]) {
                el.style.backgroundImage = `url('https://picsum.photos/id/${game.screenshots[index]}/200/120')`;
            }
        });

        // Fade back in
        container.style.opacity = '1';
    }, 200);
}

// Auto rotate every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % featuredGames.length;
    updateCarousel();
}, 5000);

// Basic Tab Interaction (Visual Only)
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        // In a real app, this would filter the list below
    });
});

console.log("Steam Clone Script Loaded");
