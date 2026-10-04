/* =========================================================
NAVIGATION
========================================================= */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
item.addEventListener("click", () => {
navItems.forEach(nav => nav.classList.remove("active"));
item.classList.add("active");
});
});

/* =========================================================
ACTIVE NAVIGATION WHILE SCROLLING
========================================================= */

const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
entries => {
entries.forEach(entry => {

        if (!entry.isIntersecting) {
            return;
        }

        const id =
            entry.target.dataset.nav ||
            entry.target.getAttribute("id");

        navItems.forEach(item => {

            item.classList.remove("active");

            if (item.getAttribute("href") === `#${id}`) {
                item.classList.add("active");
            }

        });

    });
},
{
    threshold: 0.35
}

);

sections.forEach(section => observer.observe(section));

/* =========================================================
MEMORY HEARTS
========================================================= */

const heartButtons = document.querySelectorAll(".memory-heart");

heartButtons.forEach(button => {

button.addEventListener("click", () => {

    button.classList.toggle("liked");

    button.textContent =
        button.classList.contains("liked")
            ? "♥"
            : "♡";

});

});

/* =========================================================
MUSIC
========================================================= */

const musicPlayer = document.getElementById("musicPlayer");
const musicText = document.getElementById("musicText");
const musicIcon = document.getElementById("musicIcon");
const birthdayMusic = document.getElementById("birthdayMusic");

if (musicPlayer && birthdayMusic) {

birthdayMusic.volume = 0.65;

musicPlayer.addEventListener("click", async () => {

    try {

        if (birthdayMusic.paused) {

            await birthdayMusic.play();

            musicPlayer.classList.add("playing");

            if (musicText) {
                musicText.textContent =
                    "Birthday Music Playing";
            }

            if (musicIcon) {
                musicIcon.textContent = "♫";
            }

        } else {

            birthdayMusic.pause();

            musicPlayer.classList.remove("playing");

            if (musicText) {
                musicText.textContent =
                    "Play Birthday Music";
            }

            if (musicIcon) {
                musicIcon.textContent = "♪";
            }

        }

    } catch (error) {

        console.error(
            "Music could not be played:",
            error
        );

    }

});


birthdayMusic.addEventListener("play", () => {

    musicPlayer.classList.add("playing");

    if (musicText) {
        musicText.textContent =
            "Birthday Music Playing";
    }

    if (musicIcon) {
        musicIcon.textContent = "♫";
    }

});


birthdayMusic.addEventListener("pause", () => {

    musicPlayer.classList.remove("playing");

    if (musicText) {
        musicText.textContent =
            "Play Birthday Music";
    }

    if (musicIcon) {
        musicIcon.textContent = "♪";
    }

});


birthdayMusic.addEventListener("ended", () => {

    musicPlayer.classList.remove("playing");

    if (musicText) {
        musicText.textContent =
            "Play Birthday Music";
    }

    if (musicIcon) {
        musicIcon.textContent = "♪";
    }

});

}

/* =========================================================
BIRTHDAY CAKE / MAKE A WISH
========================================================= */

const cakePage = document.getElementById("cake");
const birthdayCake = document.getElementById("birthdayCake");
const candleWrapper = document.querySelector(".candle-wrapper");
const candleFlame = document.getElementById("candleFlame");
const wishButton = document.getElementById("wishButton");
const wishMessage = document.getElementById("wishMessage");
const celebrationLayer =
document.getElementById("celebrationLayer");

let wishMade = false;

/* =========================================================
CELEBRATION SYMBOLS
========================================================= */

const celebrationSymbols = [
"🌸",
"🌷",
"🌺",
"✦",
"✧",
"✨",
"♡",
"♥",
"❀",
"✿",
"💗",
"🧸"
];

const celebrationColors = [
"#e85d99",
"#d44991",
"#e8a64b",
"#d69c38",
"#b879c8",
"#ef82ad",
"#e6b65b"
];

/* =========================================================
CREATE FALLING DECORATION
========================================================= */

function createFallingDecoration(
layer = celebrationLayer
) {

if (!layer) {
    return;
}

const item = document.createElement("span");

item.className = "falling-decoration";

item.textContent =
    celebrationSymbols[
        Math.floor(
            Math.random() *
            celebrationSymbols.length
        )
    ];

const left =
    Math.random() * 100;

const size =
    13 + Math.random() * 13;

const duration =
    4.8 + Math.random() * 3.2;

const drift =
    -80 + Math.random() * 160;

const rotation =
    180 + Math.random() * 500;

const delay =
    Math.random() * 0.25;

item.style.left =
    `${left}%`;

item.style.fontSize =
    `${size}px`;

item.style.color =
    celebrationColors[
        Math.floor(
            Math.random() *
            celebrationColors.length
        )
    ];

item.style.setProperty(
    "--fall-duration",
    `${duration}s`
);

item.style.setProperty(
    "--drift",
    `${drift}px`
);

item.style.setProperty(
    "--rotation",
    `${rotation}deg`
);

item.style.animationDelay =
    `${delay}s`;

layer.appendChild(item);

setTimeout(
    () => item.remove(),
    (duration + delay) * 1000 + 500
);

}

/* =========================================================
CONTINUOUS CELEBRATION - CAKE
========================================================= */

let celebrationInterval = null;

function startCelebration() {

if (!celebrationLayer) {
    return;
}

if (celebrationInterval) {
    return;
}

for (let i = 0; i < 8; i++) {

    setTimeout(
        () =>
            createFallingDecoration(
                celebrationLayer
            ),
        i * 90
    );

}

celebrationInterval =
    setInterval(
        () =>
            createFallingDecoration(
                celebrationLayer
            ),
        500
    );

}

/* =========================================================
MAKE A WISH
========================================================= */

if (
wishButton &&
cakePage &&
candleWrapper
) {

wishButton.addEventListener(
    "click",
    () => {

        if (wishMade) {
            return;
        }

        wishMade = true;

        candleWrapper.classList.add(
            "candle-blown"
        );

        cakePage.classList.add(
            "celebrating"
        );

        wishButton.innerHTML = `
            <span class="wish-sparkle">✨</span>
            <span>Wish Made ♡</span>
            <span class="wish-heart">♥</span>
        `;

        wishButton.style.pointerEvents =
            "none";

        if (wishMessage) {

            setTimeout(
                () =>
                    wishMessage.classList.add(
                        "show"
                    ),
                350
            );

        }

        startCelebration();

        setTimeout(
            () =>
                cakePage.classList.remove(
                    "celebrating"
                ),
            1200
        );

    }
);

}

/* =========================================================
SURPRISE CELEBRATION
========================================================= */

const surpriseCelebrationLayer =
document.getElementById(
"surpriseCelebrationLayer"
);

let surpriseCelebrationInterval = null;

function startSurpriseCelebration() {

if (!surpriseCelebrationLayer) {
    return;
}

if (surpriseCelebrationInterval) {
    return;
}

for (let i = 0; i < 8; i++) {

    setTimeout(
        () =>
            createFallingDecoration(
                surpriseCelebrationLayer
            ),
        i * 90
    );

}

surpriseCelebrationInterval =
    setInterval(
        () =>
            createFallingDecoration(
                surpriseCelebrationLayer
            ),
        500
    );

}

/* =========================================================
OPEN SURPRISE
========================================================= */

const openSurpriseButton =
document.getElementById(
"openSurpriseButton"
);

const surpriseOpening =
document.getElementById(
"surpriseOpening"
);

const surpriseFinal =
document.getElementById(
"surpriseFinal"
);

let surpriseOpened = false;

if (
openSurpriseButton &&
surpriseOpening &&
surpriseFinal
) {

openSurpriseButton.addEventListener(
    "click",
    () => {

        if (surpriseOpened) {
            return;
        }

        surpriseOpened = true;

        openSurpriseButton.disabled =
            true;

        surpriseOpening.classList.add(
            "opening"
        );

        setTimeout(
            () => {

                surpriseOpening.classList.add(
                    "opened"
                );

                surpriseFinal.classList.add(
                    "show"
                );

                startSurpriseCelebration();

            },
            500
        );

        setTimeout(
            () => {

                surpriseOpening.style.display =
                    "none";

            },
            1450
        );

    }
);

}

/* =========================================================
SURPRISE NAVIGATION SUPPORT
========================================================= */

const surpriseNav =
document.querySelector(
'.nav-item[href="#surprise"]'
);

if (surpriseNav) {

surpriseNav.addEventListener(
    "click",
    () => {

        if (
            surpriseOpened &&
            surpriseFinal
        ) {

            surpriseFinal.classList.add(
                "show"
            );

        }

    }
);

}

/* =========================================================
DOWNLOAD BIRTHDAY CARD
PNG / JPG
========================================================= */

const downloadCardButton =
document.getElementById(
"downloadCardButton"
);

const birthdayCard =
document.getElementById(
"birthdayCard"
);

const formatChips =
document.querySelectorAll(
".format-chip"
);

let selectedFormat = "png";

/* =========================================================
FORMAT SELECTOR
========================================================= */

formatChips.forEach(chip => {

chip.addEventListener(
    "click",
    () => {

        formatChips.forEach(c =>
            c.classList.remove(
                "active"
            )
        );

        chip.classList.add(
            "active"
        );

        selectedFormat =
            chip.dataset.format;

    }
);

});

/* =========================================================
GET TEXT FROM CARD
========================================================= */

function cardText(selector) {

if (!birthdayCard) {
    return "";
}

const el =
    birthdayCard.querySelector(
        selector
    );

if (!el) {
    return "";
}

return el.textContent
    .replace(/\s+/g, " ")
    .trim();

}

/* =========================================================
ROUNDED RECTANGLE
========================================================= */

function roundedRect(
ctx,
x,
y,
w,
h,
r
) {

ctx.beginPath();

ctx.moveTo(
    x + r,
    y
);

ctx.arcTo(
    x + w,
    y,
    x + w,
    y + h,
    r
);

ctx.arcTo(
    x + w,
    y + h,
    x,
    y + h,
    r
);

ctx.arcTo(
    x,
    y + h,
    x,
    y,
    r
);

ctx.arcTo(
    x,
    y,
    x + w,
    y,
    r
);

ctx.closePath();

}

/* =========================================================
LOAD IMAGE PROPERLY
========================================================= */

function loadCardImage(src) {

return new Promise(
    (resolve, reject) => {

        if (!src) {

            reject(
                new Error(
                    "No image source found."
                )
            );

            return;
        }

        const img =
            new Image();

        img.crossOrigin =
            "anonymous";

        img.onload = () => {

            resolve(img);

        };

        img.onerror = () => {

            reject(
                new Error(
                    "Could not load birthday image: " +
                    src
                )
            );

        };

        img.src = src;

    }
);

}

/* =========================================================
WAIT FOR ORIGINAL IMAGE
========================================================= */

function waitForImage(image) {

return new Promise(
    (resolve, reject) => {

        if (!image) {

            reject(
                new Error(
                    "Birthday card image element not found."
                )
            );

            return;
        }

        if (
            image.complete &&
            image.naturalWidth > 0
        ) {

            resolve();

            return;
        }

        image.onload = () => resolve();

        image.onerror = () =>
            reject(
                new Error(
                    "The image in the birthday card could not load."
                )
            );

    }
);

}

/* =========================================================
DRAW WRAPPED TEXT
========================================================= */

function drawWrappedText(
ctx,
text,
x,
y,
maxWidth,
lineHeight,
maxLines = 3
) {

if (!text) {
    return;
}

const words =
    text.split(" ");

let line = "";
const lines = [];

for (
    let i = 0;
    i < words.length;
    i++
) {

    const testLine =
        line
            ? `${line} ${words[i]}`
            : words[i];

    const width =
        ctx.measureText(
            testLine
        ).width;

    if (
        width > maxWidth &&
        line
    ) {

        lines.push(line);

        line = words[i];

    }

    else {

        line = testLine;

    }

}

if (line) {
    lines.push(line);
}

const visibleLines =
    lines.slice(
        0,
        maxLines
    );

if (
    lines.length > maxLines
) {

    let last =
        visibleLines[
            maxLines - 1
        ];

    last =
        last.replace(
            /[.,!?;:]*$/,
            ""
        );

    visibleLines[
        maxLines - 1
    ] = last + "...";

}

const totalHeight =
    (visibleLines.length - 1) *
    lineHeight;

visibleLines.forEach(
    (line, index) => {

        ctx.fillText(
            line,
            x,
            y -
                totalHeight / 2 +
                index * lineHeight
        );

    }
);

}

/* =========================================================
DRAW BIRTHDAY CARD
========================================================= */

async function drawBirthdayCard() {

const W = 340;
const H = 590;
const S = 3;

const EMOJI =
    '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

const SOFT =
    "#ffe3f0";

try {

    await Promise.all([

        document.fonts.load(
            '24px "Great Vibes"'
        ),

        document.fonts.load(
            '700 30px "Playfair Display"'
        ),

        document.fonts.load(
            '600 12px "DM Sans"'
        )

    ]);

}

catch (fontError) {

    console.log(
        "Some fonts could not be loaded:",
        fontError
    );

}


const photoElement =
    birthdayCard
        ? birthdayCard.querySelector(
            ".bc-photo img"
        )
        : null;

if (!photoElement) {

    throw new Error(
        "Could not find .bc-photo img"
    );

}


await waitForImage(
    photoElement
);


const canvas =
    document.createElement(
        "canvas"
    );

canvas.width =
    W * S;

canvas.height =
    H * S;

const ctx =
    canvas.getContext(
        "2d"
    );

if (!ctx) {

    throw new Error(
        "Canvas is not supported."
    );

}

ctx.scale(
    S,
    S
);

ctx.textAlign =
    "center";

ctx.textBaseline =
    "middle";


if (
    selectedFormat === "jpg"
) {

    ctx.fillStyle =
        "#fff7fa";

    ctx.fillRect(
        0,
        0,
        W,
        H
    );

}


const angle =
    160 * Math.PI / 180;

const dx =
    Math.sin(angle);

const dy =
    -Math.cos(angle);

const half =
    (
        Math.abs(W * dx) +
        Math.abs(H * dy)
    ) / 2;

const gradient =
    ctx.createLinearGradient(
        W / 2 - dx * half,
        H / 2 - dy * half,
        W / 2 + dx * half,
        H / 2 + dy * half
    );

gradient.addColorStop(
    0,
    "#cf4590"
);

gradient.addColorStop(
    0.45,
    "#c0387f"
);

gradient.addColorStop(
    1,
    "#96205f"
);


roundedRect(
    ctx,
    0,
    0,
    W,
    H,
    26
);

ctx.fillStyle =
    gradient;

ctx.fill();


ctx.save();

roundedRect(
    ctx,
    0,
    0,
    W,
    H,
    26
);

ctx.clip();


ctx.globalAlpha =
    0.28;

ctx.font =
    `20px ${EMOJI}`;

ctx.fillText(
    "🌸",
    38,
    80
);

ctx.fillText(
    "🌸",
    W - 38,
    H - 160
);

ctx.fillText(
    "🌸",
    50,
    H - 80
);

ctx.font =
    `16px ${EMOJI}`;

ctx.fillText(
    "🌸",
    68,
    113
);

ctx.globalAlpha =
    1;


ctx.fillStyle =
    "#ffffff";

ctx.font =
    `22px ${EMOJI}`;

ctx.fillText(
    "🌸 ✦ 🌸",
    W / 2,
    52
);


ctx.fillStyle =
    SOFT;

ctx.font =
    '24px "Great Vibes", cursive';

ctx.fillText(
    cardText(".bc-date"),
    W / 2,
    94
);


const photoX =
    (W - 160) / 2;

const photoY =
    136;

const photoSize =
    160;


roundedRect(
    ctx,
    photoX,
    photoY,
    photoSize,
    photoSize,
    22
);

ctx.fillStyle =
    "rgba(255,255,255,.16)";

ctx.fill();


let img;

try {

    const imageSource =
        photoElement.currentSrc ||
        photoElement.src;

    img =
        await loadCardImage(
            imageSource
        );

}

catch (imageError) {

    console.error(
        "Birthday photo failed:",
        imageError
    );

    ctx.fillStyle =
        "#fff";

    ctx.font =
        `34px ${EMOJI}`;

    ctx.fillText(
        "📷",
        W / 2,
        photoY + 68
    );

    ctx.fillStyle =
        SOFT;

    ctx.font =
        '10px "DM Sans", sans-serif';

    ctx.fillText(
        "Photo could not be loaded",
        W / 2,
        photoY + 108
    );

}


if (img) {

    ctx.save();

    roundedRect(
        ctx,
        photoX,
        photoY,
        photoSize,
        photoSize,
        22
    );

    ctx.clip();

    const scale =
        Math.max(
            photoSize / img.width,
            photoSize / img.height
        );

    const imageWidth =
        img.width * scale;

    const imageHeight =
        img.height * scale;

    const imageX =
        photoX +
        (photoSize - imageWidth) / 2;

    const imageY =
        photoY +
        (photoSize - imageHeight) / 2;

    ctx.drawImage(
        img,
        imageX,
        imageY,
        imageWidth,
        imageHeight
    );

    ctx.restore();

}


roundedRect(
    ctx,
    photoX,
    photoY,
    photoSize,
    photoSize,
    22
);

ctx.strokeStyle =
    "rgba(255,255,255,.35)";

ctx.lineWidth =
    1;

ctx.stroke();


const name =
    cardText(
        ".bc-name"
    );

let nameSize =
    30;

ctx.fillStyle =
    "#ffffff";

do {

    ctx.font =
        `700 ${nameSize}px "Playfair Display", serif`;

    nameSize--;

}

while (
    ctx.measureText(name).width >
        W - 60 &&
    nameSize > 14
);

ctx.fillText(
    name,
    W / 2,
    346
);


ctx.fillStyle =
    SOFT;

ctx.font =
    '30px "Great Vibes", cursive';

ctx.fillText(
    cardText(".bc-wish"),
    W / 2,
    388
);


ctx.font =
    `48px ${EMOJI}`;

ctx.fillText(
    cardText(".bc-cake"),
    W / 2,
    462
);


ctx.fillStyle =
    SOFT;

ctx.font =
    '11px "DM Sans", sans-serif';

drawWrappedText(
    ctx,
    cardText(".bc-note"),
    W / 2,
    506,
    W - 70,
    16,
    3
);


ctx.fillStyle =
    "#ffffff";

ctx.font =
    '14px "DM Sans", sans-serif';

ctx.fillText(
    cardText(".bc-bottom"),
    W / 2,
    560
);


ctx.restore();

return canvas;

}

/* =========================================================
SAVE CANVAS
========================================================= */

function saveCanvas(
canvas,
format
) {

return new Promise(
    (resolve, reject) => {

        const isJpg =
            format === "jpg";

        const mime =
            isJpg
                ? "image/jpeg"
                : "image/png";

        const filename =
            isJpg
                ? "birthday-card.jpg"
                : "birthday-card.png";


        canvas.toBlob(
            blob => {

                if (!blob) {

                    reject(
                        new Error(
                            "Could not create image file."
                        )
                    );

                    return;

                }


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );

                link.href =
                    url;

                link.download =
                    filename;

                link.style.display =
                    "none";


                document.body.appendChild(
                    link
                );

                link.click();

                link.remove();


                setTimeout(
                    () => {

                        URL.revokeObjectURL(
                            url
                        );

                        resolve();

                    },
                    1500
                );

            },
            mime,
            0.95
        );

    }
);

}

/* =========================================================
DOWNLOAD BUTTON
========================================================= */

if (
downloadCardButton &&
birthdayCard
) {

downloadCardButton.addEventListener(
    "click",
    async () => {

        const originalHTML =
            downloadCardButton.innerHTML;


        downloadCardButton.disabled =
            true;

        downloadCardButton.textContent =
            "Preparing your card...";


        try {

            const photo =
                birthdayCard.querySelector(
                    ".bc-photo img"
                );


            if (!photo) {

                throw new Error(
                    "Birthday photo element was not found."
                );

            }


            await waitForImage(
                photo
            );


            const canvas =
                await drawBirthdayCard();


            await saveCanvas(
                canvas,
                selectedFormat
            );

        }

        catch (error) {

            console.error(
                "Card download failed:",
                error
            );


            alert(
                "Sorry, the birthday card could not be downloaded.\n\n" +
                "Please make sure your website is running through " +
                "VS Code Live Server and that images/img1.jpg exists."
            );

        }

        finally {

            downloadCardButton.disabled =
                false;

            downloadCardButton.innerHTML =
                originalHTML;

        }

    }
);

}

/* =========================================================
CLEANUP
========================================================= */

window.addEventListener(
"beforeunload",
() => {

    if (celebrationInterval) {

        clearInterval(
            celebrationInterval
        );

    }

    if (
        surpriseCelebrationInterval
    ) {

        clearInterval(
            surpriseCelebrationInterval
        );

    }

    if (birthdayMusic) {
        birthdayMusic.pause();
    }

}

);