'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')
const nav = document.querySelector('.nav__links')
const navContainer = document.querySelector('.nav')
const allSections = document.querySelectorAll('.section') 

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScroll.addEventListener('click', () => {
  // window.scrollTo({
  //   left: section1.getBoundingClientRect().left + window.pageXOffset, 
  //   top: section1.getBoundingClientRect().top + window.pageYOffset,
  //   behavior: 'smooth'
  // })
  section1.scrollIntoView({
    behavior: 'smooth'
  })
})

document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  }
})

tabContainer.addEventListener('click', (e) => {
  e.preventDefault() 
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked)
  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')
  tabContent.forEach((el) => el.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

function hover(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('.nav__logo')

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this
      }
    })
    logo.style.opacity = this
  }
}
nav.addEventListener('mouseover', hover.bind(0.5))

nav.addEventListener('mouseout', hover.bind(1))

// const coord = section1.getBoundingClientRect()
// window.addEventListener('scroll', () => {
//   if (window.scrollY > coord.top) {
//     navContainer.classList.add('sticky')
//   }
//   else {
//     navContainer.classList.remove('sticky')
//   }
// })

function callback(entries) {
  if (!entries[0].isIntersecting){
    navContainer.classList.add('sticky')
  }
  else {
    navContainer.classList.remove('sticky')
  }
}
const observer = new IntersectionObserver(callback, {threshold: 0})
observer.observe(document.querySelector('.header'))

function revealSection(entries, observe) {
  if (entries[0].isIntersecting){
    entries[0].target.classList.remove('section--hidden')
    observe.unobserve(entries[0].target)
  }
}

const sectionsObserver = new IntersectionObserver(revealSection, {threshold: 0.15})
allSections.forEach((section) => {
  sectionsObserver.observe(section)
  section.classList.add('section--hidden')
})

function loadImg(entries, observer) {
  if (!entries[0].isIntersecting) return
  entries[0].target.src = entries[0].target.dataset.src
  entries[0].target.addEventListener('load', () => {
    entries[0].target.classList.remove('lazy-img')
  })
  observer.unobserve(entries[0].target)
}
const images = document.querySelectorAll('img[data-src]')
const imgObserver = new IntersectionObserver(loadImg, {threshold: 0.15})

images.forEach((img) => {
  imgObserver.observe(img)
})

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')
const dotsContainer = document.querySelector('.dots')

let currentSlide = 0;
const maxSlides = slides.length

function createDots () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML('beforeend', `
    <button class = "dots__dot" data-slide="${i}">
    `)
  })
}
createDots()

function goToSlide (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
  })
}
function nextSlide(){
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0
  }
  else {
    currentSlide++
  }
  goToSlide(currentSlide)
  activateDots(currentSlide)
}

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1
  }
  else {
    currentSlide--
  }
  goToSlide(currentSlide)
  activateDots(currentSlide)
}

function activateDots (slide) {
  document.querySelectorAll('.dots__dot').forEach((dot) => {
    dot.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}

goToSlide(0)
activateDots(0)

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide()
  }
  if (e.key === 'ArrowRight'){
    nextSlide()
  }
})

dotsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide
    goToSlide(slide)
    activateDots(slide)
  }
})