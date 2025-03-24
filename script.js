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

    if (!monthsDisplay || !daysDisplay || !hoursDisplay || !minutesDisplay || !secondsDisplay || !footerCountdown || !video || !startButton) {
        console.error("Uno o más elementos no se encontraron");
        return;
    }

    console.log("Botón encontrado:", startButton); // Verificar que el botón se detecte

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

            if (currentScreen === 8) { // Pantalla 9
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

    // Alternativa 1: Usar addEventListener con más depuración
    startButton.addEventListener("click", () => {
        console.log("Botón clicado, iniciando secuencia");
        startButton.style.display = "none";
        updateCountdown();
        intervalId = setInterval(updateCountdown, 3000);
    });

    // Alternativa 2: Usar onclick como respaldo
    startButton.onclick = () => {
        console.log("Botón clicado (onclick), iniciando secuencia");
        startButton.style.display = "none";
        updateCountdown();
        intervalId = setInterval(updateCountdown, 3000);
    };

    console.log("Evento asignado al botón");

    // Actualizar pie de página en tiempo real
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