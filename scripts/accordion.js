const headers = document.querySelectorAll('.accordion__header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const arrow = header.querySelector('.accordion__arrow');

    body.classList.toggle('show');
    arrow.classList.toggle('open');
  });
});