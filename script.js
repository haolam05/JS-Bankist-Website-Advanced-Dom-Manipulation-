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
*/
