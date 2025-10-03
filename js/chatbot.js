// Smart AI Chatbot with Free Working API
class SmartChatbot {
    constructor() {
        this.terminalState = 'idle';
        this.contactData = {};
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.addMessage("Hello! I'm Pathum's AI assistant. I can help you learn about his TechOps expertise or facilitate contact. How can I assist you today?", 'ai');
    }

    bindEvents() {
        const terminalInput = document.getElementById('terminalInput');
        if (terminalInput) {
            terminalInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.processInput();
                }
            });
        }
    }

    // Terminal Functions
    toggleTerminal() {
        const terminal = document.getElementById('contactTerminal');
        terminal.classList.toggle('minimized');
    }

    minimizeTerminal() {
        const terminal = document.getElementById('contactTerminal');
        terminal.classList.add('minimized');
    }

    closeTerminal() {
        const terminal = document.getElementById('contactTerminal');
        terminal.style.display = 'none';
    }

    addMessage(message, type) {
        const messagesContainer = document.getElementById('terminalMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        
        // Format message with line breaks
        messageElement.innerHTML = message.replace(/\n/g, '<br>');
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add to conversation history (keep last 6 messages)
        if (type === 'user' || type === 'ai') {
            this.conversationHistory.push({ type, message });
            if (this.conversationHistory.length > 6) {
                this.conversationHistory.shift();
            }
        }
    }

    async processInput() {
        const input = document.getElementById('terminalInput');
        const userInput = input.value.trim();
        
        if (!userInput) return;

        this.addMessage(userInput, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Use timeout to simulate AI thinking
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateSmartResponse(userInput);
            this.addMessage(response, 'ai');
            this.handleSmartState(userInput, response);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    generateSmartResponse(userInput) {
        const input = userInput.toLowerCase();
        
        // Check if we're in contact flow first
        if (this.terminalState !== 'idle') {
            return this.handleContactFlow(input, userInput);
        }

        // Contact-related queries
        if (input.match(/(contact|email|reach|message|get in touch|connect|talk to|speak with)/)) {
            this.terminalState = 'contact_init';
            return "I'd be happy to help you contact Pathum! Could you please tell me your name?";
        }
        
        // Skills and experience
        if (input.match(/(skill|experience|tech|what can you do|expertise|background|qualification)/)) {
            return "Pathum specializes in:\n• Cloud Infrastructure: Azure, AWS, OCI\n• Container Orchestration: Kubernetes, Docker\n• CI/CD Automation: Jenkins, Azure Pipelines\n• Infrastructure as Code: Terraform\n• Monitoring: Prometheus, Grafana\n• Linux Administration & Bash Scripting\n\nHe has 2+ years of experience in TechOps and DevOps roles. What specific area interests you?";
        }
        
        // Projects
        if (input.match(/(project|work on|build|create|deploy|implement)/)) {
            return "Pathum has worked on:\n• Kubernetes cluster deployments with Helm\n• CI/CD pipeline automation\n• Cloud migration projects (OCI)\n• Containerized application deployments\n• Infrastructure automation with Terraform\n• Monitoring system implementations\n\nInterested in any particular project type?";
        }
        
        // Specific technologies
        if (input.match(/(kubernetes|k8s|container|orchastration)/)) {
            return "Pathum has extensive Kubernetes experience:\n• Cluster management and operations\n• Helm chart packaging\n• Ingress configuration with TLS\n• Kubernetes Secrets management\n• Minikube for local development\n• Production workload deployment";
        }
        
        if (input.match(/(azure|microsoft|cloud)/)) {
            return "Pathum's Azure expertise includes:\n• Azure VM and service management\n• Azure Pipelines for CI/CD\n• Cloud infrastructure design\n• Currently pursuing AZ-104 certification\n• Resource monitoring and optimization";
        }
        
        if (input.match(/(aws|amazon)/)) {
            return "Pathum has experience with AWS services:\n• EC2 instance management\n• S3 storage solutions\n• Cloud infrastructure deployment\n• AWS security best practices\n• Multi-service integration";
        }
        
        if (input.match(/(jenkins|ci.cd|pipeline|automation)/)) {
            return "Pathum's CI/CD experience:\n• Jenkins pipeline development\n• Docker image automation\n• GitHub integration\n• Zero-downtime deployments\n• Build and deployment automation\n• Pipeline monitoring and optimization";
        }
        
        if (input.match(/(terraform|iac|infrastructure as code)/)) {
            return "Pathum works with Terraform for:\n• Infrastructure provisioning\n• Multi-cloud deployments\n• State management\n• Module development\n• Automation scripts\n• Best practices implementation";
        }
        
        if (input.match(/(docker|container)/)) {
            return "Pathum's Docker expertise:\n• Container image creation\n• Docker Compose setups\n• Container orchestration\n• Image optimization\n• Security scanning\n• Production deployment";
        }
        
        // Greetings
        if (input.match(/(hello|hi|hey|greetings|good morning|good afternoon|good evening)/)) {
            return "Hello! I'm Pathum's AI assistant. I can help you learn about his TechOps expertise or facilitate contact. What would you like to know?";
        }
        
        // About the assistant
        if (input.match(/(who are you|what are you|your purpose|what can you do)/)) {
            return "I'm an AI assistant helping visitors connect with Pathum Sandaruwan, a skilled TechOps Engineer. I can answer questions about his cloud infrastructure skills, DevOps experience, or help you send him a message directly!";
        }
        
        // Availability
        if (input.match(/(available|hire|work with|collaborate)/)) {
            return "Pathum is available for new opportunities and collaborations! You can contact him to discuss:\n• Full-time positions\n• Contract work\n• Project collaborations\n• Technical consultations\n\nWould you like to send him a message?";
        }
        
        // Location
        if (input.match(/(where|location|based|sri lanka|colombo)/)) {
            return "Pathum is based in Maharagama, Colombo, Sri Lanka. He works with clients and teams globally, including UAE and Europe.";
        }
        
        // Certifications
        if (input.match(/(certification|certificate|certified|qualification)/)) {
            return "Pathum is currently pursuing:\n• Microsoft Azure Administrator (AZ-104)\n• Oracle Cloud Infrastructure Architect Associate\n\nHe has completed:\n• Kubernetes for the Absolute Beginners - KodeKloud";
        }
        
        // Help
        if (input.match(/(help|what can i ask|options)/)) {
            return "I can help you with:\n• Pathum's technical skills and experience\n• Project information\n• Contacting Pathum\n• Availability and opportunities\n• Specific technology questions\n\nJust ask me anything!";
        }
        
        // Default intelligent response
        return "That's interesting! I can tell you more about Pathum's cloud infrastructure expertise or help you get in touch with him. What would you like to know specifically?";
    }

    handleContactFlow(input, originalInput) {
        switch(this.terminalState) {
            case 'contact_init':
                if (input.match(/(no|nope|not now|later|maybe later)/)) {
                    this.terminalState = 'idle';
                    return "No problem! Feel free to ask me about Pathum's skills or reach out anytime you're ready to connect.";
                } else {
                    this.contactData.name = originalInput;
                    this.terminalState = 'getting_email';
                    return `Nice to meet you, ${originalInput}! What's your email address?`;
                }
                
            case 'getting_email':
                if (this.isValidEmail(originalInput)) {
                    this.contactData.email = originalInput;
                    this.terminalState = 'getting_phone_choice';
                    return "Thank you! Would you like to share your phone number? (optional)";
                } else {
                    return "That doesn't look like a valid email address. Could you please check and enter it again?";
                }
                
            case 'getting_phone_choice':
                if (input.match(/(yes|sure|ok|yeah|yep|please)/)) {
                    this.terminalState = 'getting_phone';
                    return "What's your phone number?";
                } else {
                    this.contactData.phone = 'Not provided';
                    setTimeout(() => this.showContactForm(), 500);
                    return "Got it! Now please write your message to Pathum in the form below:";
                }
                
            case 'getting_phone':
                this.contactData.phone = originalInput;
                setTimeout(() => this.showContactForm(), 500);
                return "Perfect! Now please write your message to Pathum in the form below:";
                
            default:
                this.terminalState = 'idle';
                return "How else can I help you today?";
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showContactForm() {
        document.getElementById('contactForm').style.display = 'block';
        document.querySelector('.terminal-input-container').style.display = 'none';
        // Pre-fill the form with collected data
        document.getElementById('userName').value = this.contactData.name || '';
        document.getElementById('userEmail').value = this.contactData.email || '';
        document.getElementById('userPhone').value = this.contactData.phone || '';
        
        // Scroll to show the form
        const terminalBody = document.getElementById('terminalBody');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('terminalMessages');
        const typingElement = document.createElement('div');
        typingElement.className = 'message ai typing';
        typingElement.id = 'typingIndicator';
        typingElement.innerHTML = 'AI is thinking... ▋';
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    resetTerminal() {
        this.terminalState = 'idle';
        this.contactData = {};
        this.conversationHistory = [];
        document.getElementById('contactForm').style.display = 'none';
        document.querySelector('.terminal-input-container').style.display = 'flex';
        document.getElementById('terminalMessages').innerHTML = '';
        document.getElementById('formMessage').textContent = '';
        
        // Clear form fields
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        document.getElementById('userPhone').value = '';
        document.getElementById('userMessage').value = '';
        
        const submitButton = document.querySelector('.submit-button');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message to Pathum';
        }
        
        // Restart conversation
        this.addMessage("Hello! I'm Pathum's AI assistant. How can I help you today?", 'ai');
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.Chatbot = new SmartChatbot();
});