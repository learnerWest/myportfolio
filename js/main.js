// Main JavaScript for portfolio functionality

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.createCommandLines();
        this.initTypewriter();
        this.initScrollAnimations();
        this.initCursorEffect();
    }

    // ASCII Art for Technologies
    createKubernetesAscii() {
        const kubernetesAscii = `
    _         _                   
   | | _____| |__  _ __ ___  ___ 
   | |/ / _ \\ '_ \\| '__/ _ \\/ __|
   |   <  __/ |_) | | |  __/\\__ \\
   |_|\\_\\___|_.__/|_|  \\___||___/
        `;
        const asciiElement = document.getElementById('kubernetesAscii');
        if (asciiElement) {
            asciiElement.textContent = kubernetesAscii;
        }
    }

    // Animated Command Lines
    createCommandLines() {
        const commands = [
            'kubectl get pods --all-namespaces',
            'terraform apply -auto-approve',
            'docker-compose up --build',
            'az vm list --output table',
            'jenkins build job/ci-pipeline',
            'helm install my-app ./charts',
            'oci compute instance list',
            'bash deploy_script.sh',
            'git push origin main'
        ];

        const container = document.getElementById('commandLines');
        if (!container) return;

        commands.forEach((command) => {
            // Create left side commands
            const leftElement = document.createElement('div');
            leftElement.className = 'command left';
            leftElement.textContent = `$ ${command}`;
            
            // Create right side commands
            const rightElement = document.createElement('div');
            rightElement.className = 'command right';
            rightElement.textContent = `$ ${command}`;
            
            // Very slow timing for minimal distraction
            const leftDelay = Math.random() * 25;
            const leftDuration = 25 + Math.random() * 20;
            
            const rightDelay = Math.random() * 25;
            const rightDuration = 25 + Math.random() * 20;
            
            leftElement.style.animationDelay = `${leftDelay}s`;
            leftElement.style.animationDuration = `${leftDuration}s`;
            
            rightElement.style.animationDelay = `${rightDelay}s`;
            rightElement.style.animationDuration = `${rightDuration}s`;
            
            container.appendChild(leftElement);
            container.appendChild(rightElement);
        });
    }

    // Typewriter effect for sections
    initTypewriter() {
        const elements = document.querySelectorAll('.content-text');
        elements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            
            setTimeout(() => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                    }
                }, 15);
            }, index * 400 + 1000);
        });
    }

    // Scroll animations
    initScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Interactive cursor effect
    initCursorEffect() {
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.animation = 'none';
                setTimeout(() => {
                    cursor.style.animation = 'blink 1s infinite';
                }, 10);
            }
        });
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new Portfolio();
    portfolio.createKubernetesAscii();
});