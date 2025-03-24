document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado correctamente");

    const screens = [
        document.getElementById("screen1"),
        document.getElementById("screen2"),
        document.getElementById("screen3"),
        document.getElementById("screen4"),
        document.getElementById("screen5"),
        document.getElementById("screen6"),
        document.getElementById("screen7"),
        document.getElementById("screen8"),
        document.getElementById("screen9")
    ];

    screens.forEach((screen, index) => {
        if (!screen) console.error(`Pantalla ${index + 1} no encontrada`);
    });

    const monthsDisplay = document.getElementById("months");
    const daysDisplay = document.getElementById("days");
    const hoursDisplay = document.getElementById("hours");
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const footerCountdown = document.getElementById("footer-countdown");
    const video = document.getElementById("video");
    const startButton = document.getElementById("start-button");
    const backgroundMusic = document.getElementById("background-music");

    if (!monthsDisplay || !daysDisplay || !hoursDisplay || !minutesDisplay || !secondsDisplay || !footerCountdown || !video || !startButton || !backgroundMusic) {
        console.error("Uno o más elementos no se encontraron");
        return;
    }

    console.log("Botón encontrado:", startButton);

    const targetDate = new Date("July 12, 2025 18:00:00").getTime();
    let currentScreen = 0;
    let intervalId;

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        console.log("Diferencia en milisegundos:", diff);

        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(totalDays / 30);
        const days = totalDays % 30;
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        monthsDisplay.textContent = `${months} Meses`;
        daysDisplay.textContent = `${days} Días`;
        hoursDisplay.textContent = `${hours} Horas`;
        minutesDisplay.textContent = `${minutes} Minutos`;
        secondsDisplay.textContent = `${seconds} Segundos`;
        footerCountdown.textContent = `${months} Meses, ${days} Días, ${hours} Horas, ${minutes} Minutos, ${seconds} Segundos`;

        if (currentScreen < screens.length) {
            screens.forEach(screen => screen.classList.remove("active"));
            screens[currentScreen].classList.add("active");
            console.log("Mostrando pantalla:", currentScreen + 1);

            // Controlar la música de fondo
            if (currentScreen === 0) { // Pantalla 1: Iniciar música
                backgroundMusic.play().then(() => {
                    console.log("Música de fondo reproduciéndose");
                }).catch(error => {
                    console.error("Error al reproducir la música:", error);
                });
            } else if (currentScreen === 8) { // Pantalla 9: Detener música y reproducir video
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0; // Reiniciar música
                console.log("Música pausada");
                video.play().then(() => {
                    console.log("Video reproduciéndose con audio");
                }).catch(error => {
                    console.error("Error al reproducir el video:", error);
                });
            }

            currentScreen++;
        }

        if (currentScreen === screens.length) {
            console.log("Llegó a la pantalla del video, deteniendo intervalo");
            clearInterval(intervalId);
        }
    }

    startButton.addEventListener("click", () => {
        console.log("Botón clicado, iniciando secuencia");
        startButton.style.display = "none";
        updateCountdown();
        intervalId = setInterval(updateCountdown, 3000);
    });

    startButton.onclick = () => {
        console.log("Botón clicado (onclick), iniciando secuencia");
        startButton.style.display = "none";
        updateCountdown();
        intervalId = setInterval(updateCountdown, 3000);
    };

    console.log("Evento asignado al botón");

    setInterval(() => {
        if (currentScreen === screens.length) {
            const now = new Date().getTime();
            const diff = targetDate - now;
            const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
            const months = Math.floor(totalDays / 30);
            const days = totalDays % 30;
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            footerCountdown.textContent = `${months} Meses, ${days} Días, ${hours} Horas, ${minutes} Minutos, ${seconds} Segundos`;
        }
    }, 1000);
});