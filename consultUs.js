// Navigation Menu Toggle Functionality
const navBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');

// Toggle mobile navigation menu
navBtn.addEventListener('click', function () {
  navList.classList.toggle('active');
  navBtn.classList.toggle('open');
});

// Close navigation menu when clicking outside
document.addEventListener('click', function (event) {
  if (!navList.contains(event.target) && !navBtn.contains(event.target)) {
    navList.classList.remove('active');
    navBtn.classList.remove('open');
  }
});

// Form Close Button Functionality
const closeFormBtn = document.getElementById('closeFormBtn');
const formSection = document.getElementById('form');
closeFormBtn.addEventListener('click', () => {
  formSection.style.display = 'none'; // Hide the form
});

// Consult Boxes Scroll Reveal Animation
const consultBoxes = document.querySelectorAll('.consult-box');

function revealConsultBoxes() {
  const triggerBottom = window.innerHeight - 100;
  consultBoxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('visible');
    } else {
      box.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', revealConsultBoxes);
revealConsultBoxes(); // Trigger animation on page load

// Consultation Plan Prices Mapping
const CONSULTATION_PRICES = {
  'FULL CONSULTATION': 5100,
  'SPECIAL-CONSULTATION': 21000,
  'BIRTH-TIME CONSULTATION': 7100,
  'EDUCATIONAL CONSULTATION': 3300,
  'MARRIAGE CONSULTATION': 3300,
  'DATE OF THE EVENT': 25000,
  'URGENT CONSULTATION': 10000,
  'GEMSTONE CONSULTATION': 2100,
  'CAREER CONSULTATION': 3300,
  'PENDING-KARMA-CONSULTATION': 4100,
  'CHILD BIRTH CONSULTATION': 3300,
  'CHILD NAMAKARAN CONSULTATION': 3300,
  'CHILD BIRTH MUHURAT CONSULTATION': 10000,
  'MUHURAT CONSULTATION': 3300,
  'KUNDALI MATCHING CONSULTATION':4200,
  'HEALTH CONSULTATION':3300,
  'VASTU CONSULTATION':21000,
  'ANNUAL COMPLETE PREDICTIONS':7100
};

// Select consultation-related DOM elements
const consultButtons = document.querySelectorAll('.btn-primary');
const priceSelect = document.querySelector('.price');
const consultationForm = document.getElementById('consultation-form');

// Add event listeners to consultation buttons
consultButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Ensure form section exists
    if (formSection) {
      // Show the form section
      formSection.style.display = 'block';

      // Get the plan name from the parent consult-box
      const planName = button
        .closest('.consult-box')
        .querySelector('h3')
        .textContent.trim();
      console.log('Selected Plan:', planName); // Debugging log

      // Update the plan heading in the form
      const planHeading = document.getElementById('plan-heading');
      if (planHeading) {
        planHeading.textContent = planName;
      }

      // Update the price dropdown based on the selected plan
      if (priceSelect) {
        const price = CONSULTATION_PRICES[planName] || 0;
        console.log('Plan Price:', price); // Debugging log
        priceSelect.innerHTML = `<option value="${price}">${planName} - ₹${price}</option>`;
      } else {
        console.error('Price select element not found!');
      }
    } else {
      console.error('Form section not found!');
    }
  });
});

// Redirect to WhatsApp with Consultation Details
if (consultationForm) {
  consultationForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      Date_Of_Birth: document.getElementById('Date_Of_Birth').value,
      Time_Of_Birth: document.getElementById('Time_Of_Birth').value,
      birth_place: document.getElementById('birth_place').value,
      birth_pincode: document.getElementById('birth_pincode').value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      plan: document.getElementById('plan-heading').textContent,
      price: priceSelect.value,
    };

    // Construct WhatsApp message
    const whatsappMessage = `
Hello,
I am interested in the "${formData.plan}" consultation. Here are my details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Date of Birth: ${formData.Date_Of_Birth}
- Time of Birth: ${formData.Time_Of_Birth}
- Birth Place: ${formData.birth_place}
- Birth Pincode: ${formData.birth_pincode}
- Gender: ${formData.gender}
- Selected Plan: ${formData.plan}
- Price: ₹${formData.price}

Please guide me with the next steps.
`.trim();

    // Encode the message for the WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // WhatsApp API URL
    const whatsappNumber = '+919459412030'; // Replace with your WhatsApp number in international format (e.g., 919876543210)
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // Open WhatsApp chat in a new tab
    window.open(whatsappURL, '_blank');

    // Redirect the current page to success.html
    window.location.href = 'sucess.html';
  });
} else {
  console.error('Consultation form not found');
}
document.addEventListener("DOMContentLoaded", () => {
  const scrollDown = document.getElementById('scrollDown');

  // Hide the scroll down prompt when the user scrolls down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      scrollDown.style.display = 'none';
    }
  });

  // Scroll the page a little when the scroll down prompt is clicked
  scrollDown.addEventListener('click', () => {
    window.scrollBy({
      top: 100, // Adjust this value as needed
      behavior: 'smooth'
    });
    scrollDown.style.display = 'none';
  });
});

