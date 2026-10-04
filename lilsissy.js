document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           SURPRISE BUTTON
        ================================================== */

        const surpriseButton =
            document.getElementById(
                "sissySurpriseButton"
            );


        const clickMessage =
            document.getElementById(
                "sissyClickMessage"
            );


        if (surpriseButton) {

            surpriseButton.addEventListener(
                "click",
                () => {



                    surpriseButton.classList.add(
                        "sissy-button-clicked"
                    );


                    if (clickMessage) {

                        clickMessage.classList.add(
                            "show"
                        );

                    }



                    setTimeout(
                        () => {

                            window.location.href =
                                "lilsissy.html";

                        },
                        550
                    );

                }
            );

        }


        /* =================================================
           EXTRA CANDLE INTERACTION
        ================================================== */

        const candles =
            document.querySelectorAll(
                ".sissy-candle"
            );


        candles.forEach(
            (candle, index) => {

                candle.addEventListener(
                    "mouseenter",
                    () => {

                        const flame =
                            candle.querySelector(
                                ".sissy-flame"
                            );


                        if (flame) {

                            flame.style.animationDuration =
                                "0.25s";

                        }

                    }
                );


                candle.addEventListener(
                    "mouseleave",
                    () => {

                        const flame =
                            candle.querySelector(
                                ".sissy-flame"
                            );


                        if (flame) {

                            flame.style.animationDuration =
                                ".7s";

                        }

                    }
                );

            }
        );


        /* =================================================
           RANDOM DECORATION DELAYS
        ================================================== */

   

        const decorations =
            document.querySelectorAll(
                ".sissy-flower, .sissy-star, .sissy-heart"
            );


        decorations.forEach(
            decoration => {

                const randomDelay =
                    Math.random() * 2.5;


                decoration.style.animationDelay =
                    `-${randomDelay}s`;

            }
        );


        /* =================================================
           CAKE SPARKLE RANDOMIZATION
        ================================================== */

        const cakeSparkles =
            document.querySelectorAll(
                ".sissy-cake-sparkle"
            );


        cakeSparkles.forEach(
            sparkle => {

                const randomDuration =
                    1.6 +
                    Math.random() * 1.4;


                sparkle.style.animationDuration =
                    `${randomDuration}s`;

            }
        );




        const mainHeart =
            document.querySelector(
                ".sissy-main-heart"
            );


        if (mainHeart) {

            mainHeart.addEventListener(
                "click",
                () => {

                    /*
                     * Creates a quick extra pulse
                     * when the heart is clicked.
                     */

                    mainHeart.style.animation =
                        "none";


                    void mainHeart.offsetWidth;


                    mainHeart.style.animation =
                        "sissyBigHeart .45s ease-in-out";


                    setTimeout(
                        () => {

                            mainHeart.style.animation =
                                "";

                        },
                        500
                    );

                }
            );

        }


        /* =================================================
           CAKE CLICK
        ================================================== */

        const cake =
            document.querySelector(
                ".sissy-cake"
            );


        if (cake) {

            cake.addEventListener(
                "click",
                () => {

                    cake.style.animation =
                        "sissyCakePop .55s ease-in-out";


                    setTimeout(
                        () => {

                            cake.style.animation =
                                "";

                        },
                        600
                    );

                }
            );

        }


    }
);


/* =========================================================
   EXTRA CAKE POP ANIMATION
========================================================= */

const cakePopStyle =
    document.createElement("style");


cakePopStyle.textContent = `

@keyframes sissyCakePop {

    0% {

        transform:
            translateX(-50%)
            scale(1);

    }

    35% {

        transform:
            translateX(-50%)
            scale(1.07)
            rotate(-1deg);

    }

    65% {

        transform:
            translateX(-50%)
            scale(1.03)
            rotate(1deg);

    }

    100% {

        transform:
            translateX(-50%)
            scale(1);

    }

}

`;


document.head.appendChild(
    cakePopStyle
);
