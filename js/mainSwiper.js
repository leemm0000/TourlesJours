var swiper09 = new Swiper(".mySwiper09", {
  pagination: {
    el: ".swiper-pagination2",
    dynamicBullets: true,   },
    autoplay: {
    delay:10000, 
    },
    loop:true,
});
var swiper10 = new Swiper(".mySwiper10", {
  spaceBetween: 20,
  slidesPerView: 'auto',
  centeredSlides: false,
  loop: true,
  loopedSlides: 5, 
  watchOverflow: true,

  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});