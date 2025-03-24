document.addEventListener("DOMContentLoaded", () => {
    console.log("Script cargado correctamente");

    // Seleccionar pantallas
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

    // Verificar que las pantallas se seleccionen correctamente
    screens.forEach((screen, index) => {
        if (!screen) console.error(`Pantalla ${index + 1} no encontrada`);
    });

    // Seleccionar elementos de cuenta regresiva
    const monthsDisplay = document.getElementById("months");
    const daysDisplay = document.getElementById("days");
    const hoursDisplay = document.getElementById("hours");
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const footerCountdown = document.getElementById("footer-countdown");

    if (!monthsDisplay || !daysDisplay || !hoursDisplay || !minutesDisplay || !secondsDisplay || !footerCountdown) {
        console.error("Uno o más elementos de cuenta regresiva no se encontraron");
        return;
    }

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

        // Actualizar pantallas individuales
        monthsDisplay.textContent = `${months} Meses`;
        daysDisplay.textContent = `${days} Días`;
        hoursDisplay.textContent = `${hours} Horas`;
        minutesDisplay.textContent = `${minutes} Minutos`;
        secondsDisplay.textContent = `${seconds} Segundos`;

        // Actualizar pie de página
        footerCountdown.textContent = `${months} Meses, ${days} Días, ${hours} Horas, ${minutes} Minutos, ${seconds} Segundos`;

        // Cambiar pantallas
        if (currentScreen < screens.length) {
            screens.forEach(screen => screen.classList.remove("active"));
            screens[currentScreen].classList.add("active");
            console.log("Mostrando pantalla:", currentScreen + 1);
            currentScreen++;
        }

        // Detener el intervalo al llegar a la pantalla 9
        if (currentScreen === screens.length) {
            console.log("Llegó a la pantalla del video, deteniendo intervalo");
            clearInterval(intervalId);
        }
    }

    // Iniciar la secuencia
    updateCountdown();
    intervalId = setInterval(updateCountdown, 3000);

    // Actualizar el pie de página en tiempo real en la pantalla del video
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