/* =========================
   PARTICLES CŨ
========================= */

const particles = document.getElementById("particles");

const symbols = ["♡", "♥", "🌸", "🌷", "✿", "❀", "✧"];

for (let i = 0; i < 28; i++) {
    const item = document.createElement("div");

    item.className = "particle";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    item.style.setProperty("--x", Math.random() * 100 + "%");
    item.style.setProperty("--size", (12 + Math.random() * 17) + "px");
    item.style.setProperty("--duration", (13 + Math.random() * 16) + "s");
    item.style.setProperty("--delay", (-Math.random() * 25) + "s");
    item.style.setProperty("--drift", (-100 + Math.random() * 200) + "px");
    item.style.setProperty("--alpha", 0.25 + Math.random() * 0.5);

    const colors = ["#e878a1", "#f4a2bd", "#ffffff", "#d78b9e", "#c88baf"];

    item.style.color = colors[Math.floor(Math.random() * colors.length)];

    particles.appendChild(item);
}


/* =========================
   HẠT SÁNG
========================= */

for (let i = 0; i < 35; i++) {
    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 4 + "s";
    sparkle.style.animationDuration = (2 + Math.random() * 4) + "s";

    particles.appendChild(sparkle);
}


/* =========================
   CÁNH HOA RƠI
========================= */

const fallingPetals = document.getElementById("falling-petals");

if (fallingPetals) {
    for (let i = 0; i < 22; i++) {
        const petal = document.createElement("div");

        petal.className = "falling-petal";

        petal.style.setProperty("--x", Math.random() * 100 + "%");
        petal.style.setProperty("--size", (8 + Math.random() * 12) + "px");
        petal.style.setProperty("--duration", (9 + Math.random() * 12) + "s");
        petal.style.setProperty("--delay", (-Math.random() * 20) + "s");
        petal.style.setProperty("--sway", (-100 + Math.random() * 200) + "px");

        fallingPetals.appendChild(petal);
    }
}


/* =========================
   NHẠC NỀN
========================= */

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const volumeControl = document.getElementById("volumeControl");

music.volume = 0.35;

let musicPlaying = false;

function playMusic() {
    music.play().then(() => {
        musicPlaying = true;
        musicButton.textContent = "♫";
    }).catch(() => {
        musicPlaying = false;
        musicButton.textContent = "♪";
    });
}

musicButton.addEventListener("click", () => {
    if (musicPlaying) {
        music.pause();
        musicPlaying = false;
        musicButton.textContent = "♪";
    } else {
        playMusic();
    }
});

volumeControl.addEventListener("input", () => {
    music.volume = Number(volumeControl.value);
});


/* =========================
   LẤY CÁC PHẦN TỬ
========================= */

const intro = document.getElementById("intro");
const flowerButton = document.getElementById("flowerButton");
const mailScreen = document.getElementById("mailScreen");
const envelope = document.getElementById("envelope");
const mailHint = document.querySelector(".mail-hint");
const letterScreen = document.getElementById("letterScreen");
const restart = document.getElementById("restart");


/* =========================
   BƯỚC 1: CHẠM BÔNG HOA
========================= */

let flowerClicked = false;

flowerButton.addEventListener("click", showEnvelope);

function showEnvelope() {
    if (flowerClicked) return;

    flowerClicked = true;

    // Bắt đầu nhạc sau tương tác đầu tiên
    if (!musicPlaying) {
        playMusic();
    }

    intro.style.opacity = "0";
    intro.style.transform = "scale(1.15)";

    setTimeout(() => {
        intro.style.display = "none";

        mailScreen.classList.add("active");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                envelope.classList.add("show");
            });
        });

    }, 850);
}


/* =========================
   BƯỚC 2: MỞ PHONG THƯ
========================= */

let envelopeOpened = false;

envelope.addEventListener("click", openEnvelope);

function openEnvelope() {
    if (envelopeOpened) return;

    envelopeOpened = true;

    envelope.classList.add("open");
    mailHint.style.opacity = "0";

    setTimeout(() => {
        mailScreen.style.opacity = "0";

        setTimeout(() => {
            mailScreen.style.display = "none";
            letterScreen.classList.add("active");
        }, 850);

    }, 1500);
}


/* =========================
   BƯỚC 3: ALBUM ẢNH
========================= */

const albumOpen = document.getElementById("albumOpen");
const albumClose = document.getElementById("albumClose");
const albumOverlay = document.getElementById("albumOverlay");

albumOpen.addEventListener("click", () => {
    albumOverlay.classList.add("active");
});

albumClose.addEventListener("click", () => {
    albumOverlay.classList.remove("active");
});

// Nhấn bên ngoài album để đóng
albumOverlay.addEventListener("click", (e) => {
    if (e.target === albumOverlay) {
        albumOverlay.classList.remove("active");
    }
});


/* =========================
   HIỂN THỊ ẢNH
========================= */

const photoImages = document.querySelectorAll(".photo-frame img");

photoImages.forEach((img) => {
    img.addEventListener("load", () => {
        img.style.display = "block";
        img.nextElementSibling.style.display = "none";
    });

    img.addEventListener("error", () => {
        img.style.display = "none";
        img.nextElementSibling.style.display = "flex";
    });

    // Phòng trường hợp ảnh đã được tải trước khi gắn sự kiện
    if (img.complete && img.naturalWidth > 0) {
        img.style.display = "block";
        img.nextElementSibling.style.display = "none";
    }
});


/* =========================
   PHÓNG TO ẢNH
========================= */

const photoLightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

photoImages.forEach((img) => {
    img.addEventListener("click", () => {
        if (img.naturalWidth > 0) {
            lightboxImage.src = img.src;
            photoLightbox.classList.add("active");
        }
    });
});

function closeLightbox() {
    photoLightbox.classList.remove("active");
}

lightboxClose.addEventListener("click", closeLightbox);

photoLightbox.addEventListener("click", (e) => {
    if (e.target === photoLightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        albumOverlay.classList.remove("active");
        closeLightbox();
    }
});


/* =========================
   TRỞ VỀ BAN ĐẦU
========================= */

restart.addEventListener("click", () => {
    location.reload();
});


