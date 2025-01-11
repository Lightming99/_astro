document.addEventListener("DOMContentLoaded", () => {
    // Background Image Cycling
    const backgroundImages = ["mata.webp", "maa.jpg", "matas.jpg"];
    let currentImageIndex = 0;
    const backgroundElement = document.querySelector(".section-background");
  
    if (backgroundElement) {
      setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        backgroundElement.style.backgroundImage = `url(${backgroundImages[currentImageIndex]})`;
      }, 5000);
    }
  
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal-section, .reveal-item");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    });
  
    revealElements.forEach((element) => observer.observe(element));
  
    // Smooth Scroll Navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
      });
    });
  
    // Nav Toggle for Mobile
    const menuBtn = document.querySelector(".menu-btn");
    const navList = document.querySelector(".nav-list");
    const menuBtnBurger = document.querySelector(".menu-btn__burger");
  
    menuBtn.addEventListener("click", () => {
      navList.classList.toggle("active");
      menuBtn.classList.toggle("active");
  
      menuBtnBurger.classList.toggle("menu-btn__burger");
      menuBtnBurger.classList.toggle("menu-btn__cross");
    });
  
    document.addEventListener("click", (event) => {
      if (!navList.contains(event.target) && !menuBtn.contains(event.target)) {
        navList.classList.remove("active");
        menuBtn.classList.remove("active");
        menuBtnBurger.classList.add("menu-btn__burger");
        menuBtnBurger.classList.remove("menu-btn__cross");
      }
    });
  
    // Review Slider
