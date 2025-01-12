// event - date timer
const eventDate = new Date('2025-01-18T09:00:00').getTime();
let timer;

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); 
    let current = start;
    
    const animate = () => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = String(Math.abs(Math.floor(end))).padStart(2, '0');
            return;
        }
        element.textContent = String(Math.abs(Math.floor(current))).padStart(2, '0');
        requestAnimationFrame(animate);
    };
    
    animate();
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    
    const currentDays = parseInt(document.getElementById('days').textContent) || 0;
    const currentHours = parseInt(document.getElementById('hours').textContent) || 0;
    const currentMinutes = parseInt(document.getElementById('minutes').textContent) || 0;
    const currentSeconds = parseInt(document.getElementById('seconds').textContent) || 0;

    
    if (currentDays !== days) {
        animateValue(document.getElementById('days'), currentDays, days, 500);
    }
    if (currentHours !== hours) {
        animateValue(document.getElementById('hours'), currentHours, hours, 500);
    }
    if (currentMinutes !== minutes) {
        animateValue(document.getElementById('minutes'), currentMinutes, minutes, 500);
    }
    if (currentSeconds !== seconds) {
        animateValue(document.getElementById('seconds'), currentSeconds, seconds, 500);
    }

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector('.event-status').textContent = 'Event has started!';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    
    const statusElement = document.createElement('p');
    statusElement.className = 'event-status';
    statusElement.textContent = 'Event starts on January 18th, 2025 at 9:00 AM';
    const countdown = document.getElementById('countdown');
    countdown.parentNode.insertBefore(statusElement, countdown);

    
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);

    
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(new FormData(form)).toString()
        })
        .then(() => {
            successMessage.style.display = 'block';
            form.reset();
        })
        .catch((error) => alert(error));
    });
}); 