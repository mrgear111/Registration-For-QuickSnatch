// event - date timer
const eventDate = new Date('2025-01-18T00:00:00').getTime();
let timer;

function animateValue(element, start, end, duration) {
    element.classList.add('changing');
    element.setAttribute('data-value', element.textContent);
    
    let iterations = 0;
    const maxIterations = 5;
    const chars = '0123456789';
    
    const glitchEffect = setInterval(() => {
        if (iterations >= maxIterations) {
            clearInterval(glitchEffect);
            element.textContent = String(Math.abs(Math.floor(end))).padStart(2, '0');
            element.setAttribute('data-value', element.textContent);
            
            setTimeout(() => {
                element.classList.remove('changing');
            }, 100);
            return;
        }
        
        // Create matrix-like random number effect
        let randomNum = '';
        for (let i = 0; i < 2; i++) {
            randomNum += chars[Math.floor(Math.random() * chars.length)];
        }
        element.textContent = randomNum;
        element.setAttribute('data-value', randomNum);
        
        iterations++;
    }, 60);
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