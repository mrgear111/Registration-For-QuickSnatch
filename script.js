// Set the event date to January 18th, 2024 at 9:00 AM
const eventDate = new Date('2024-01-18T09:00:00').getTime();

// Update countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        document.getElementById('seconds').innerHTML = '00';
        document.querySelector('.event-status').textContent = 'Event has started!';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = String(days).padStart(2, '0');
    document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');
}

// Create and add status element when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.createElement('p');
    statusElement.className = 'event-status';
    statusElement.textContent = 'Event starts on January 18th at 9:00 AM';
    const countdown = document.getElementById('countdown');
    countdown.parentNode.insertBefore(statusElement, countdown);
    
    // Call updateCountdown immediately
    updateCountdown();
    
    // Then start the interval
    setInterval(updateCountdown, 1000);
});

// Form submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        teamName: document.getElementById('teamName').value,
        members: [
            {
                name: document.getElementById('member1').value,
                email: document.getElementById('email1').value
            },
            {
                name: document.getElementById('member2').value,
                email: document.getElementById('email2').value
            },
            {
                name: document.getElementById('member3').value,
                email: document.getElementById('email3').value
            },
            {
                name: document.getElementById('member4').value,
                email: document.getElementById('email4').value
            }
        ]
    };

    // Here you would typically send the data to your server
    console.log('Form submitted:', formData);
    alert('Registration successful! We will contact you shortly.');
    this.reset();
}); 