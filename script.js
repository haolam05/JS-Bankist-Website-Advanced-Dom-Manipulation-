'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function (e) {
    const section1 = document.querySelector('#section--1');

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
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const target = document.querySelector(e.target.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  }
});
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
*/
