
/* =========================
   TẠO CÁNH HOA VÀ TRÁI TIM BAY
========================= */

const particles = document.getElementById("particles");

const symbols = [
    "♡", "♥", "🌸", "🌷", "✿", "❀", "✧"
];

// Tạo các vật thể bay
for (let i = 0; i < 28; i++) {

    const item = document.createElement("div");

    item.className = "particle";

    item.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    item.style.setProperty(
        "--x",
        Math.random() * 100 + "%"
    );

    item.style.setProperty(
        "--size",
        (12 + Math.random() * 17) + "px"
    );

    item.style.setProperty(
        "--duration",
        (13 + Math.random() * 16) + "s"
    );

    item.style.setProperty(
        "--delay",
        (-Math.random() * 25) + "s"
    );

    item.style.setProperty(
        "--drift",
        (-100 + Math.random() * 200) + "px"
    );

    item.style.setProperty(
        "--alpha",
        (0.25 + Math.random() * 0.5)
    );

    // Màu sắc ngẫu nhiên
    const colors = [
        "#e878a1",
        "#f4a2bd",
        "#ffffff",
        "#d78b9e",
        "#c88baf"
    ];

    item.style.color =
        colors[Math.floor(Math.random() * colors.length)];

    particles.appendChild(item);
}


/* =========================
   TẠO HẠT SÁNG
========================= */

for (let i = 0; i < 35; i++) {

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left =
        Math.random() * 100 + "%";

    sparkle.style.top =
        Math.random() * 100 + "%";

    sparkle.style.animationDelay =
        Math.random() * 4 + "s";

    sparkle.style.animationDuration =
        (2 + Math.random() * 4) + "s";

    particles.appendChild(sparkle);
}


/* =========================
   LẤY CÁC PHẦN TỬ
========================= */

const intro = document.getElementById("intro");

const flowerButton =
    document.getElementById("flowerButton");

const mailScreen =
    document.getElementById("mailScreen");

const envelope =
    document.getElementById("envelope");

const mailHint =
    document.querySelector(".mail-hint");

const letterScreen =
    document.getElementById("letterScreen");

const restart =
    document.getElementById("restart");


/* =========================
   BƯỚC 1: CHẠM BÔNG HOA
========================= */

let flowerClicked = false;

flowerButton.addEventListener("click", showEnvelope);

function showEnvelope() {

    if (flowerClicked) return;

    flowerClicked = true;

    // Hoa thu nhỏ và biến mất
    intro.style.opacity = "0";
    intro.style.transform = "scale(1.15)";

    setTimeout(() => {

        intro.style.display = "none";

        mailScreen.classList.add("active");

        // Đợi trình duyệt cập nhật trạng thái
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

    // Mở nắp thư
    envelope.classList.add("open");

    mailHint.style.opacity = "0";

    // Đợi giấy trượt lên
    setTimeout(() => {

        mailScreen.style.opacity = "0";

        setTimeout(() => {

            mailScreen.style.display = "none";

            letterScreen.classList.add("active");

        }, 850);

    }, 1500);
}


/* =========================
   BƯỚC 3: TRỞ VỀ BAN ĐẦU
========================= */

restart.addEventListener("click", () => {

    location.reload();

});
