document.addEventListener("DOMContentLoaded", () => {
  // Get references to DOM elements
  const menuBtn = document.querySelector(".menu-btn");
  const overlay = document.querySelector(".overlay");
  const heading = document.querySelector(".gradient-heading");
  const paymentButton = document.getElementById('payment-button');

  // --- Heading Animation ---
  const headingText = heading.textContent;
  heading.innerHTML = "";

  headingText.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    heading.appendChild(span);
  });

  const spans = heading.querySelectorAll("span");
  let currentIndex = 0;

  function animateHeading() {
    spans.forEach((span, index) => {
      if (index === currentIndex) {
        span.classList.add("active");
      } else {
        span.classList.remove("active");
      }
    });
    currentIndex = (currentIndex + 1) % spans.length;
  }
  setInterval(animateHeading, 500);

  // --- Menu Functionality ---
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("cross");
    overlay.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !overlay.contains(e.target)) {
      menuBtn.classList.remove("cross");
      overlay.classList.remove("active");
    }
  });

  // --- Payment Button Functionality ---
  paymentButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Get values from the form fields
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('full-name').value;

    // --- Form Validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // --- Construct WhatsApp Message ---
    const whatsappMessage = `
Hello,
I have submitted the form for the course. Here are my details:
- Full Name: ${fullName}
- Email: ${email}

Please confirm the next steps. Thank you!
`.trim();

    // Encode the message for the WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp API URL
    const whatsappNumber = '9459412030'; // Replace with your WhatsApp number in international format (e.g., 919876543210)
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Open WhatsApp chat in a new tab
    window.open(whatsappURL, '_blank');

    // Redirect the current page to success.html
    window.location.href = 'sucess.html';
  });
});
