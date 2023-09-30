// 'use strict';

/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function (){
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

// add event Listener on multiple elements
const addEventOnElements = function(elements, eventType, callback){
    for (let i = 0, len = elements.length; i < len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER
 */

const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

const hideHeader = function(){
    if (lastScrollPos < window.scrollY)
        header.classList.add("hide");
    else
        header.classList.remove("hide");
    
    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function(){
    if(window.scrollY >= 50){
        header.classList.add("active");
        hideHeader();
    }
    else
        header.classList.remove("active");
});

/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

const menu = document.querySelectorAll("[data-menu]");


let currentSlidePos = 0;
let lastActiveSlderItem = heroSliderItems[0];

let menuItem = menu[currentSlidePos];


const updateSliderPos = function(){
    lastActiveSlderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSlderItem = heroSliderItems[currentSlidePos];
    menuItem = menu[currentSlidePos];
}

const slideNext = function() {
    currentSlidePos = (currentSlidePos + 1)%heroSliderItems.length;
    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function(){
    currentSlidePos = (currentSlidePos + heroSliderItems.length - 1)%heroSliderItems.length;
    updateSliderPos();
}
heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */
let autoSlideInterval;
const autoSlide = function() {
    autoSlideInterval = setInterval(function(){
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn, menu[0], menu[1], menu[2]], "mouseover", function(){
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn, menu[0], menu[1], menu[2]], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);


/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function(event){
    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    x = x - (2*x);
    y = y - (2*y);

    for (let i = 0; i < parallaxItems.length; i++){
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});

/**
 * BACK TO TOP BUTTON
 */

const topButton = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function(){
    if(window.scrollY > 50){
        topButton.classList.add("active");
    }
    else
        topButton.classList.remove("active");
});
