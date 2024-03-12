/* ========================= HEADER SCROLL ========================= */
const header = document.querySelector('.header');
let lastScroll = 0;

/* ========================= NAVBAR BY SCROLLY ========================= */
const slides = document.querySelectorAll('.whole .slidez');
const navLinks = document.querySelectorAll('.nav-link .nav-item');
const popUps = document.querySelectorAll('.popUp');
let currentSection = 'home';

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScroll) {
        header.classList.add('scrolled');
        navBar.classList.remove('navlinkactivated');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = window.scrollY;

    slides.forEach(slide => {
        if (window.scrollY >= slide.offsetTop - 150 && window.scrollY < slide.offsetTop + slide.offsetHeight) {
            currentSection = slide.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        if (link.href.includes(currentSection)) {
            let linkActiveOld = header.querySelector('.nav-link .linkactive');
            linkActiveOld.classList.remove('linkactive');
            link.classList.add('linkactive');
        }
        link.addEventListener('click', () => {
            navBar.classList.remove('navlinkactivated');
        })
    })

    reveal();
})

/* ========================= REVEAL POPUP WHEN SCROLLING ========================= */
function reveal() {
    let cutOff = 0;
    if (window.matchMedia('(max-width: 750px)').matches) {
        cutOff = 50;
    } else if (window.matchMedia('(max-width: 470px)').matches) {
        cutOff = 0;
    } else {
        cutOff = 120;
    }
    popUps.forEach(popUp => {
    if (popUp.getBoundingClientRect().top < window.innerHeight - cutOff) {
        popUp.classList.add('popupActive');
    } else {
        popUp.classList.remove('popupActive');
    }})
}

/* ========================= LOGO SLIDER ========================= */
const logos = document.querySelectorAll('.skill-item li');
const logoContainer = document.querySelector('.skill-item');

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    addDuplicate();
}

function addDuplicate() {
    logos.forEach(logo => {
        logoContainer.appendChild(logo.cloneNode(true));
    })
}

/* ========================= EMAIL ========================= */
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submitBtn');
const textMessage = document.getElementById('message');
const userName = document.getElementById('user');
const userEmail = document.getElementById('email');

const sendEmail = (e) => {
    e.preventDefault();

    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_vplecnl', 'template_peewuii', '#contact-form', '4qCBfvH8s_PUYPOye').then(() => {
        alert('Message sent successfully ✅');
        textMessage.value = '';
        userName.value = '';
        userEmail.value = '';
    }, () => {
        alert('Message not sent (service error) ❌');
    })
}

submitBtn.disabled = true;
contactForm.addEventListener('keyup', () => {
    const content1 = textMessage.value.length;
    const content2 = userName.value.length;
    const content3 = userEmail.value.length;
    submitBtn.disabled = content1 !== 0 && content2 !== 0 && content3 !== 0 ? false : true;
})
contactForm.addEventListener('submit', sendEmail);

/* ========================= MENU BUTTON ========================= */
const menuBtn = document.getElementById('menu-btn');
const navBar = document.querySelector('.nav-link');

menuBtn.addEventListener('click', () => {
    navBar.classList.toggle('navlinkactivated');
})
document.addEventListener('click', e => {
    if (!navBar.contains(e.target) && e.target !== menuBtn) {
        navBar.classList.remove('navlinkactivated');
    }
})
