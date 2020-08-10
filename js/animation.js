const cars = document.querySelector('.cars');
const slider = document.querySelector('.slider');
const logo = document.querySelector('#logo');
const hamburger = document.querySelector('.fas');
const headline = document.querySelector('.headline');

const tl = new TimelineMax();

tl.fromTo(cars, 1, { height: '0%' }, { height: '80%', ease: Power2.easeInOut })
  .fromTo(cars, 1, { width: '100%' }, { width: '80%', ease: Power2.easeInOut })
  .fromTo(slider, 1.2, { x: "-100%" }, { x: "0%", ease: Power2.easeInOut }, "-=1.2")
  .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
  .fromTo(hamburger, 0.5, { opacity: 0, x: 30, rotation: "0deg" }, { opacity: 1, x: 0, rotation: "720deg" }, "-=0.5");


gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll('.section');

sections.forEach(section => {
  gsap.fromTo(section.children, { y: '+=200', opacity: 0 }, {
    y: 0, opacity: 1, stagger: 0.2, duration: 2, ease: 'easeInOut', scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      // markers: true,
      // siatkowka w praku jordana
    }
  });
})