'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tasbContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allLazyImages = document.querySelectorAll('img[data-src]');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots');

header.scrollIntoView({ behavior: 'smooth' });

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling - section1
//////////////////////////////////////
btnScrollTo.addEventListener('click', function (e) {
  // Solution #1 - modern browser
  section1.scrollIntoView({ behavior: 'smooth' });

  /* Solution #2
    const section1Coors = section1.getBoundingClientRect();
    const [currXoffset, currYoffset] = [window.scrollX, window.scrollY];
    window.scrollTo({
      left: section1Coors.x + currXoffset,
      top: section1Coors.y + currYoffset,
      behavior: 'smooth',
    });*/
});
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
// Sticky navbar
/* Solution #1
const initCoors = section1.getBoundingClientRect(); // distance from top left of html to section1
console.log(initCoors.left, initCoors.top);
window.addEventListener('scroll', () =>
  window.scrollY > initCoors.top
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky')
); */

// Solution #2
const stickyCallback = entries => {
  const [entry] = entries;
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};
const stickyOptions = {
  root: null,
  threshold: 0, // when header is 0% visible => make navbar sticky
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const headerObserver = new IntersectionObserver(stickyCallback, stickyOptions);
headerObserver.observe(header);
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
// Revealing Elements on Scroll
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});
allSections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
});
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
// Lazy Image Loading'
const unblurImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', () =>
    entry.target.classList.remove('lazy-img')
  ); // everytime browser load an image, load event is triggered. only unblur at this time bc users might have slow network
  observer.unobserve(entry.target);
};
const imagesObserver = new IntersectionObserver(unblurImg, {
  root: null,
  threshold: 0.2,
});
allLazyImages.forEach(img => imagesObserver.observe(img));
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
// Slider
/* Using Dots */
const sliderFunc = function () {
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  dotsContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;
    const slide = Number(e.target.dataset.slide);
    currSlide = slide;
    goToSlide(slide);
  });

  /* Using Buttons */
  const prevSlide = function () {
    if (currSlide === 0) currSlide = slides.length - 1;
    else currSlide--;
    goToSlide(currSlide);
  };
  const nextSlide = function () {
    if (currSlide === slides.length - 1) currSlide = 0;
    else currSlide++;
    goToSlide(currSlide);
  };
  const goToSlide = function (slideNum) {
    activateDot(currSlide);
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - slideNum) * 100}%)`;
    });
  };
  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);

  /* Using keyboard */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  let currSlide = 0;
  const init = function () {
    createDots();
    goToSlide(currSlide);
    activateDot(currSlide);
  };
  init();
};
sliderFunc();
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
// Smooth scrolling - navigation links
// Solutoin #1
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const target = document.querySelector(e.target.getAttribute('href'));
//     target.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Solution #2
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const target = document.querySelector(e.target.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  }
});
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
// Tab Components
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  // Solution #1
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tasbContent.forEach(tC => tC.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document // remember that any attribute starts with data will be stored in dataset property
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // ex: data-tab-one => dataset.tabOne
    .classList.add('operations__content--active');

  /* Solution #2
  const tabIdx = clicked.dataset.tab - 1;
  tabs[tabIdx].classList.add('operations__tab--active');
  tasbContent[tabIdx].classList.add('operations__content--active');
  for (const [idx, _] of tabs.entries()) {
    if (idx !== tabIdx) {
      tabs[idx].classList.remove('operations__tab--active');
      tasbContent[idx].classList.remove('operations__content--active');
    }
  }*/
});
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

//////////////////////////////////////
// Fading NavLink(s) & Logo when hovering
const setNavLinksOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');
    siblings.forEach(el => el != e.target && (el.style.opacity = this.opacity));
    logo.style.opacity = this.opacity;
  }
};
// nav.addEventListener('mouseover', e => setNavLinksOpacity(e, 0.5));
// nav.addEventListener('mouseout', e => setNavLinksOpacity(e, 1));
nav.addEventListener('mouseover', setNavLinksOpacity.bind({ opacity: 0.5 })); // can't pass more than 1 argument
nav.addEventListener('mouseout', setNavLinksOpacity.bind({ opacity: 1 }));
// whenever the addEventListener is triggerd, it expects only 1 argument, it passes the EVENT object to the callback function
// the callback accepts a single parameter: an object based on Event describing the event that has occurred, and it returns nothing
// therefore, we use the bind method to pass arguments through the "this" keyword
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// Lectures
/*
console.log('=== Selecting Elements ===');
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
console.log(document.querySelector('.header'));
console.log(document.getElementById('section--1'));
const allSections = document.querySelectorAll('.section'); // NodeList
console.log(allSections);
const allButtons = document.getElementsByTagName('button'); // HTML collections
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));

console.log('=== Creating and inserting elements ===');
const msg = document.createElement('div');
msg.classList.add('cookie-message');
// msg.textContent = 'We use cookie to improve functionality and analytics'
msg.innerHTML =
  'We user cookie to improve functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';
console.log(msg);
const header = document.querySelector('.header');
header.prepend(msg);
header.append(msg);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    msg.remove();
  });

// Styles
msg.style.backgroundColor = '#37383d';
msg.style.width = '120%';
console.log(msg.style.color, msg.style.backgroundColor);
console.log(getComputedStyle(msg).color, getComputedStyle(msg).height);
msg.style.height = getComputedStyle =
  Number.parseFloat(getComputedStyle(msg).height, 10) + 40 + 'px';
document.documentElement.style.setProperty('--color-primary', 'red');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.designer);
logo.getAttribute('designer');
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.dataset.versionNumber);
const h1 = document.querySelector('h1');

// Handling Events and Event Types
const alertH1 = function (e) {
  alert('Reading H1');
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);
h1.addEventListener('click', function (e) {
  alert('CLICKED!');
});
// h1.onmouseenter = function (e) { // not recommended, can't remove event
//   alert('Reading H1');
// };
// h1.click = function (e) {
//   alert('CLICKED!');
// }; // overidden

// Event Propagation
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// DOM traversal
const h1 = document.querySelector('h1');
// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); // all children
console.log(h1.childNodes); // direct
console.log(h1.children); // children
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';
// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';
// Going sidways: siblings - can only access direct sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children); // trick to get all siblings
*/
