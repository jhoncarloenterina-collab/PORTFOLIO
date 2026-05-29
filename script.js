// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      this.blur();
    }
  });
});

// Scroll to section function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Interactive name highlight effect
const nameElement = document.getElementById('name');
if (nameElement) {
  nameElement.addEventListener('click', function() {
    this.style.animation = 'none';
    setTimeout(() => {
      this.style.animation = 'pulse 0.6s ease-in-out';
    }, 10);
  });
}

// Add animation to elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards and skills
document.querySelectorAll('.card, .skill-card, .section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Form validation and submission
function submitForm(event) {
  event.preventDefault();
  
  const form = document.getElementById('contactForm');
  const nameField = document.getElementById('name-field');
  const emailField = document.getElementById('email-field');
  const messageField = document.getElementById('message-field');
  const msgElement = document.getElementById('msg');
  
  // Simple validation
  if (!nameField.value.trim()) {
    showMessage('Please enter your name', 'error');
    return;
  }
  
  if (!emailField.value.trim() || !validateEmail(emailField.value)) {
    showMessage('Please enter a valid email', 'error');
    return;
  }
  
  if (!messageField.value.trim()) {
    showMessage('Please enter a message', 'error');
    return;
  }
  
  // Simulate sending (replace with actual backend call)
  msgElement.classList.add('success');
  showMessage('✓ Message sent successfully! Thank you for reaching out!', 'success');
  form.reset();
  
  // Remove message after 5 seconds
  setTimeout(() => {
    msgElement.classList.remove('success');
    msgElement.innerText = '';
  }, 5000);
}

// Helper function to validate email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Helper function to show messages
function showMessage(message, type) {
  const msgElement = document.getElementById('msg');
  msgElement.innerText = message;
  msgElement.classList.remove('success', 'error');
  msgElement.classList.add(type);
}

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});