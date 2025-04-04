const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    slidesPerView: 5,
    loop: true,
    spaceBetween: 17,
    pagination: {
      el: '.swiper-pagination',
      bulletClass: "swiper-pagination-bullet", 
      bulletActiveClass: "swiper-pagination-bullet-active", 
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    centeredSlides: true,
});

export { swiper }
