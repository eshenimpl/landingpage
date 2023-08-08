/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
const navBarList = document.getElementById("navbar__list");
let timer = null;
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// function to create the navigation bar content dynamically
function createNavBar() {
  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionName = section.getAttribute("data-nav");

    const liElement = document.createElement("li");
    liElement.innerHTML = `<a href="#${sectionId}">${sectionName}</a>`;
    liElement.classList.add("menu__link");
    navBarList.appendChild(liElement);
  });
}

// function to scroll window to corresponding section when specific navigation link being clicked
function handleNavClick(event) {
  event.preventDefault();

  if (
    event.target.classList.contains("menu__link") ||
    event.target.parentElement.classList.contains("menu__link")
  ) {
    const anchorElement =
      event.target.tagName === "A"
        ? event.target
        : event.target.parentElement.querySelector("a");

    const targetId = anchorElement.getAttribute("href");

    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: "smooth",
    });
  }
}

// function to set an active state to the navigation items when a section is in the viewport
function setActiveSection() {
  sections.forEach((section) => {
    const sectionPosition = section.getBoundingClientRect();

    if (
      sectionPosition.top <= window.innerHeight / 2 &&
      sectionPosition.bottom >= window.innerHeight / 2
    ) {
      sections.forEach((sec) => sec.classList.remove("your-active-class"));
      section.classList.add("your-active-class");
    }
  });
}

// function to show navigation bar if user is scrolling
function showNavBar() {
  document.querySelector(".page__header").classList.remove("hidden");
  if (timer !== null) {
    clearTimeout(timer);
  }
  timer = setTimeout(hideNavBar, 2000);
}

// function to hide navigation bar if user is not scrolling; called after 2 seconds if no scrolling behavior detected
function hideNavBar() {
  document.querySelector(".page__header").classList.add("hidden");
}

// function to show/hide scroll to top button based on the position of current view
function toggleScrollToTopButton() {
  if (window.scrollY > window.innerHeight / 2) {
    scrollToTopBtn.classList.remove("hidden");
  } else {
    scrollToTopBtn.classList.add("hidden");
  }
}

// function to smoothly scroll up to top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * End Helper Functions
 * Begin Main Functions and events
 *
 */

// build the nav
createNavBar();

// Add class 'active' to section when near top of viewport
window.addEventListener("load", setActiveSection);
window.addEventListener("scroll", setActiveSection);

// Scroll to anchor ID using scrollTO event
navBarList.addEventListener("click", handleNavClick);

// Show fixed navigation bar while scrolling, hide while not
window.addEventListener("scroll", showNavBar);

// Add a scroll to the top button on the page that’s only visible when the user scrolls below the fold of the page.
window.addEventListener("scroll", toggleScrollToTopButton);
scrollToTopBtn.addEventListener("click", scrollToTop);

/**
 * End Main Functions */
