// @ts-nocheck
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 5,
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      bulletClass: "swiper-pagination-bullet", 
      bulletActiveClass: "swiper-pagination-bullet-active", 
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 17,
      }
    }
});

export { swiper }
