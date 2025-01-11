const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navList.classList.toggle('show');
});

// Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (!menuBtn.contains(event.target) && !navList.contains(event.target)) {
    menuBtn.classList.remove('open');
    navList.classList.remove('show');
  }
});

const helpSection = document.querySelector('.help-section');
const helpBoxes = document.querySelectorAll('.help-box'); 

window.addEventListener('scroll', () => {
  const sectionPosition = helpSection.getBoundingClientRect().top;
  if (sectionPosition < window.innerHeight) {
    helpSection.classList.add('show');

    // Add a slight delay for each box to appear
    helpBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.querySelector('.content').classList.add('show');
      }, 200 * index); 
    });

    // Hide scroll down button once the boxes appear
    const scrollDownButton = document.getElementById('scroll-down-button');
    const scrollText = document.querySelector('.scroll-text');
    scrollDownButton.style.display = 'none';
    scrollText.style.display = 'none';
  }
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.question');
  question.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

const scrollDownButton = document.getElementById('scroll-down-button');
scrollDownButton.addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth'
  });
});