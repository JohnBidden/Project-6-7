// Nav-Btn
var navLinks = document.getElementById("navLinks");

function showMenu() {
  navLinks.style.right = "0";
}

function hideMenu() {
  navLinks.style.right = "-250px";
}
// Show Fixed Nav-Bar
function scrollRow(btn, direction) {
  const row = btn.parentElement;
  const container = row.querySelector(".scroll-container");
  const scrollAmount = 500;
  container.scrollLeft += scrollAmount * direction;
}
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header-fixed");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Slide Our Devopers
document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "../src/images/developer.jpg",
    "../src/images/developer2.jpg",
    "../src/images/developer3.jpg",
  ];

  let current = 0;
  const hero = document.querySelector(".about-us-container");

  function changeBackground() {
    hero.style.backgroundImage = `linear-gradient(rgba(4, 67, 104, 0.9), rgba(4, 67, 104, 0.9)), url(${images[current]})`;
    current = (current + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 5000);
});
