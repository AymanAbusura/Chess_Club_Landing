// ******************* SCROLL TO NEEDED BUTTONS ******************* //

$(document).ready(function() {
    function scrollToSection(sectionId) {
        var destination = $(sectionId).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
    }

    $("#chess-thought-btn").click(function(e) {
        e.preventDefault();
        scrollToSection('#chess-thought');
    });

    $("#tournament-details-btn").click(function(e) {
        e.preventDefault();
        scrollToSection('#tournament-details');
    });
});

// ******************* SLIDER FOR STAGES ******************* //

const slider = document.querySelector(".swiper-slider");
const testimonials = document.querySelectorAll(".swiper");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots-container");
const plane = document.querySelector(".plane");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function initApp() {
	slider.addEventListener("touchstart", handleTouchStart);
  	slider.addEventListener("touchend", handleTouchEnd);
  	nextBtn.addEventListener("click", nextTestimonial);
  	prevBtn.addEventListener("click", prevTestimonial);
}

function handleTouchStart(event) {
  	touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
	touchEndX = event.changedTouches[0].clientX;

  	handleTouchSwipe();
}

function handleTouchSwipe() {
  	const swipeThreshold = 50;

  	if (touchStartX - touchEndX > swipeThreshold) {
    	nextTestimonial();
  	} else if (touchEndX - touchStartX > swipeThreshold) {
    	prevTestimonial();
  	}
}

function renderDotButtons() {
	for (let i = 0; i < testimonials.length; i++) {
    	const button = document.createElement("button");
    	button.classList.add("dot");
    	button.classList.toggle("active", i === currentIndex);
    	button.ariaLabel = `Jump to Testimonial ${i + 1}`;
    	button.addEventListener("click", () => showTestimonial(i));
    	dotsContainer.appendChild(button);
  	}
}

function showTestimonial(index) {
	currentIndex = index;

  	testimonials.forEach((testimonial) => {
    	testimonial.style.transform = `translateX(${-index * 100}%)`;
  	});

  	if (currentIndex === 0) {
    	plane.style.display = "block";
  	} else {
    	plane.style.display = "none";
  	}

  	prevBtn.disabled = currentIndex === 0;
  	nextBtn.disabled = currentIndex === testimonials.length - 1;

  	const dots = document.querySelectorAll(".dot");
  	dots.forEach((dot, i) => {
    	dot.classList.toggle("active", i === currentIndex);
  	});
}

function nextTestimonial() {
  	const nextIndex = (currentIndex + 1) % testimonials.length;
  	showTestimonial(nextIndex);
}

function prevTestimonial() {
  	const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  	showTestimonial(prevIndex);
}

document.addEventListener("DOMContentLoaded", function () {
	renderDotButtons();
  	initApp();
  	showTestimonial(0);
});

// ******************* CAROUSEL FOR PARTICIPANTS *******************

const currentPageElementDesktop = document.getElementById('current-page-desktop');
const leftArrowDesktop = document.getElementById('left-arrow-desktop');
const rightArrowDesktop = document.getElementById('right-arrow-desktop');
const pageOne = document.getElementById('page-one');
const pageTwo = document.getElementById('page-two');
const minPage = 3;
const maxPage = 6;

function updatePaginationDesktop() {
    let currentPage = parseInt(currentPageElementDesktop.textContent);

    leftArrowDesktop.disabled = (currentPage === minPage);
    rightArrowDesktop.disabled = (currentPage === maxPage);

    pageOne.style.display = (currentPage === 3) ? 'flex' : 'none';
    pageTwo.style.display = (currentPage === 6) ? 'flex' : 'none';
}

leftArrowDesktop.addEventListener('click', function () {
    let currentPage = parseInt(currentPageElementDesktop.textContent);
    if (currentPage > minPage) {
        currentPage -= 3;
        currentPageElementDesktop.textContent = currentPage;
        updatePaginationDesktop();
    }
});

rightArrowDesktop.addEventListener('click', function () {
    let currentPage = parseInt(currentPageElementDesktop.textContent);
    if (currentPage < maxPage) {
        currentPage += 3;
        currentPageElementDesktop.textContent = currentPage;
        updatePaginationDesktop();
    }
});

// ******************* SLIDER FOR PARTICIPANTS *******************

document.addEventListener("DOMContentLoaded", function() {
    const currentPageMobile = document.getElementById("current-page-mobile");
    const totalPages = document.querySelectorAll('.swiper-mobile').length;

    let currentIndexMobile = 0;

    function updatePagination() {
        currentPageMobile.textContent = currentIndexMobile + 1;
        updateArrows();
    }

    function updateArrows() {
        document.getElementById("left-arrow-mobile").disabled = currentIndexMobile === 0;
        document.getElementById("right-arrow-mobile").disabled = currentIndexMobile >= totalPages - 1;
    }

    document.getElementById("right-arrow-mobile").addEventListener("click", () => {
        if (currentIndexMobile < totalPages - 1) {
            currentIndexMobile++;
            switchCarouselMobile(currentIndexMobile);
        }
    });

    document.getElementById("left-arrow-mobile").addEventListener("click", () => {
        if (currentIndexMobile > 0) {
            currentIndexMobile--;
            switchCarouselMobile(currentIndexMobile);
        }
    });

    function switchCarouselMobile(index) {
        const swiperSlides = document.querySelectorAll('.swiper-mobile');
        swiperSlides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'flex' : 'none';
        });
        updatePagination();
    }

    updatePagination();
});