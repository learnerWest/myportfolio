// Email service functionality
class EmailService {
    constructor() {
        // Initialize EmailJS with your public key
        // emailjs.init("YOUR_PUBLIC_KEY_HERE");
    }

    static submitContactForm() {
        const form = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            phone: document.getElementById('userPhone').value,
            message: document.getElementById('userMessage').value,
            timestamp: new Date().toLocaleString()
        };

        const submitButton = document.querySelector('.submit-button');
        const formMessage = document.getElementById('formMessage');

        // Validate form
        if (!form.name || !form.email || !form.message) {
            formMessage.className = 'error-message';
            formMessage.textContent = 'Please fill in all required fields.';
            return;
        }

        if (!this.isValidEmail(form.email)) {
            formMessage.className = 'error-message';
            formMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        // Disable button and show loading
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Method 1: EmailJS (Recommended)
        this.sendWithEmailJS(form, submitButton, formMessage);
        
        // Method 2: Formspree (Alternative)
        // this.sendWithFormspree(form, submitButton, formMessage);
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static sendWithEmailJS(form, submitButton, formMessage) {
        // Replace with your actual EmailJS service ID and template ID
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
            .then(function(response) {
                formMessage.className = 'success-message';
                formMessage.textContent = 'Message sent successfully! Pathum will get back to you soon.';
                submitButton.textContent = 'Message Sent!';
                
                // Reset form after success
                setTimeout(() => {
                    if (window.Chatbot) {
                        window.Chatbot.resetTerminal();
                    }
                }, 3000);
            }, function(error) {
                formMessage.className = 'error-message';
                formMessage.textContent = 'Failed to send message. Please try again or email directly.';
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message to Pathum';
                
                // Fallback: Show direct email option
                setTimeout(() => {
                    formMessage.innerHTML += '<br><br>You can also email directly to: <a href="mailto:pathumsandruwan.work@gmail.com" style="color: var(--terminal-cyan);">pathumsandruwan.work@gmail.com</a>';
                }, 1000);
            });
    }

    static sendWithFormspree(form, submitButton, formMessage) {
        // Alternative method using Formspree
        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });

        fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formMessage.className = 'success-message';
                formMessage.textContent = 'Message sent successfully! Pathum will get back to you soon.';
                submitButton.textContent = 'Message Sent!';
                
                setTimeout(() => {
                 if (window.Chatbot && window.Chatbot.resetTerminal) {
                     window.Chatbot.resetTerminal();
                    }
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            formMessage.className = 'error-message';
            formMessage.textContent = 'Failed to send message. Please try again or email directly.';
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message to Pathum';
        });
    }
}

// Make EmailService available globally
window.EmailService = EmailService;