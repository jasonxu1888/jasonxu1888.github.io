const navbar = document.getElementById("navbar");
const logo = document.getElementById("logo")
const navitems = document.getElementsByClassName("navitems");

document.addEventListener("scroll", 
() => {
    if (window.scrollY > 40) {
        navbar.style.padding = "0px 0px";
        logo.style.fontSize = "20px";
        for (var i = 0; i < navitems.length; i++) {
            navitems[i].style.fontSize = "20px";
        }
    } else {
        navbar.style.padding = "10px 0";
        logo.style.fontSize = "30px";
        for (var i = 0; i < navitems.length; i++) {
            navitems[i].style.fontSize = "25px";
        }
    }

    

    const navbarBottom = navbar.getBoundingClientRect().bottom;

    
    const sections = document.querySelectorAll("section");
    for (let i = sections.length - 1; i >= 0; i--) {
        const sectionTop = sections[i].getBoundingClientRect().top;
        if (navbarBottom >= sectionTop) {
            highlightNavItem(sections[i].id);
            break;
        }
    }
});

function highlightNavItem(sectionId) {
    
    const activeNavItem = document.querySelector(`a[href="#${sectionId}"]`);
    activeNavItem.classList.add("active");

    for (var i = 0; i < navitems.length; i++) {
        if (navitems[i].getAttribute("href").substring(1) === sectionId) {
            console.log(sectionId);
            continue;
        }
        navitems[i].classList.remove("active");
    }
}

highlightNavItem("home")

const carousel = document.querySelector('.carousel');
const prevButton = document.getElementsByClassName("fa-solid fa-arrow-left");
const nextButton = document.getElementsByClassName("fa-solid fa-arrow-right");
const slides = document.querySelectorAll('.carousel-slide');
let slideIndex = 0;
let prevWrapAround = false;
let nextWrapAround = false;

function updateCarousel() {
    var slideWidth = slides[0].offsetWidth
    var offset = null
    if (nextWrapAround) {
        slideIndex = 0;
        offset = 0
        nextWrapAround = false;
    } else if (prevWrapAround) {
        slideIndex = slides.length - 1;
        offset = slideIndex * -slideWidth;
        prevWrapAround = false;
    } else {
        offset = slideIndex * -slideWidth;
    }
    
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(${offset}px)`;
    }

}

prevButton[0].addEventListener('click', () => {
    if (slideIndex > 0) {
        slideIndex--;
        updateCarousel();
    } else {
        prevWrapAround = true;
        updateCarousel();
    }
});

nextButton[0].addEventListener('click', () => {
    if (slideIndex < slides.length - 1) {
        slideIndex++;
        updateCarousel();
    } else {
        nextWrapAround = true;
        updateCarousel();
    }
});

updateCarousel();

function openModal(targetId) {
    var modal = document.getElementById(targetId);
    modal.style.display = "flex";

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}


document.querySelectorAll("i[data-target]").forEach(function(icon) {
    icon.addEventListener("click", function() {
        var targetId = this.getAttribute("data-target");
        openModal(targetId);
    });
});

window.addEventListener('resize', () => {
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(0px)`;
    }
});

