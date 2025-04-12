// @ts-nocheck
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
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
      380: {
        slidesPerView: 2,
        spaceBetween: 10,
        
      },
      660: {
        slidesPerView: 3,
        spaceBetween: 17,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 17,
      },
      1280: {
        slidesPerView: 5,
        spaceBetween: 17,
      }

    }
});

export { swiper }
