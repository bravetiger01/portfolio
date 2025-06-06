const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');
const video4 = document.getElementById('projectVideo4');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')


const hoverSign = document.querySelector('.hover-sign');

const videoList =[video1, video2, video3, video4];

videoList.forEach (function(video){
    video.addEventListener("mouseover", function(){
        video.play()
        hoverSign.classList.add("active")
    })
    video.addEventListener("mouseout", function(){
    video.pause();
    hoverSign.classList.remove("active")
})
})

// Sidebar elements //
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
});

closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    
})


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const submitBtn = document.getElementById('submitBtn');
        const formStatus = document.getElementById('formStatus');

        // Validate name
        nameInput.addEventListener('blur', function() {
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('error');
                nameError.textContent = 'Name is required';
            } else {
                nameInput.classList.remove('error');
                nameError.textContent = '';
            }
        });

        // Validate email
        emailInput.addEventListener('blur', function() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailInput.classList.add('error');
                emailError.textContent = 'Email is required';
            } else if (!emailPattern.test(emailInput.value)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email address';
            } else {
                emailInput.classList.remove('error');
                emailError.textContent = '';
            }
        });

        // Validate message
        messageInput.addEventListener('blur', function() {
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('error');
                messageError.textContent = 'Message is required';
            } else if (messageInput.value.trim().length < 10) {
                messageInput.classList.add('error');
                messageError.textContent = 'Message must be at least 10 characters';
            } else {
                messageInput.classList.remove('error');
                messageError.textContent = '';
            }
        });

        // Form submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate all fields before submission
            let isValid = true;

            if (nameInput.value.trim() === '') {
                nameInput.classList.add('error');
                nameError.textContent = 'Name is required';
                isValid = false;
            } else {
                nameInput.classList.remove('error');
                nameError.textContent = '';
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailInput.classList.add('error');
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!emailPattern.test(emailInput.value)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email address';
                isValid = false;
            } else {
                emailInput.classList.remove('error');
                emailError.textContent = '';
            }

            if (messageInput.value.trim() === '') {
                messageInput.classList.add('error');
                messageError.textContent = 'Message is required';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageInput.classList.add('error');
                messageError.textContent = 'Message must be at least 10 characters';
                isValid = false;
            } else {
                messageInput.classList.remove('error');
                messageError.textContent = '';
            }

            if (!isValid) {
                return;
            }

            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            formStatus.innerHTML = '';

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    signal: AbortSignal.timeout(10000) // 10-second timeout
                });
                const data = await response.json();

                if (data.success) {
                    formStatus.innerHTML = '<div class="success">Message sent successfully! I\'ll get back to you soon.</div>';
                    contactForm.reset();
                    nameInput.classList.remove('error');
                    emailInput.classList.remove('error');
                    messageInput.classList.remove('error');
                    nameError.textContent = '';
                    emailError.textContent = '';
                    messageError.textContent = '';
                } else {
                    formStatus.innerHTML = `<div class="error">${data.message || 'Failed to send message. Please try again.'}</div>`;
                }
            } catch (error) {
                formStatus.innerHTML = '<div class="error">An error occurred. Please try again later or contact me directly via email.</div>';
                console.error('Error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
            }
        });
    }
});