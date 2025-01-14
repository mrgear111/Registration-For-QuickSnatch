// Calculate a date that's 4 days, 5 hours, and 3 minutes from now
const now = new Date();
const targetDate = new Date(now.getTime() + (4 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (3 * 60 * 1000));
const eventDate = targetDate.getTime();
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

// Add this function to create interactive particles
function createParticleEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.5';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;

    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Create particles on mouse move
        for(let i = 0; i < 2; i++) {
            particles.push(createParticle(mouseX, mouseY));
        }
    });

    function createParticle(x, y) {
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            color: Math.random() > 0.5 ? '#0ff' : '#f0f'
        };
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles = particles.filter(p => p.life > 0);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.01;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            
            // Add connecting lines between nearby particles
            particles.forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if(dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = (100 - dist) / 100 * p.life * 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener('DOMContentLoaded', function() {
    
    const statusElement = document.createElement('p');
    statusElement.className = 'event-status';
    statusElement.textContent = 'Event starts on January 19th, 2025 at 9:00 AM';
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

    // Add this to your existing DOMContentLoaded event listener
    createParticleEffect();
}); 