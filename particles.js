function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--x', Math.random() * 100 + 'vw');
        particle.style.setProperty('--y', Math.random() * 100 + 'vh');
        particle.style.setProperty('--duration', 5 + Math.random() * 10 + 's');
        particle.style.setProperty('--delay', -Math.random() * 5 + 's');
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles); 