const toggleMenu = document.getElementById('toggle-menu');
const header = document.getElementById('top-head');


window.addEventListener('load', function () {
  toggleMenu.addEventListener('click', function () {
    header.classList.toggle("open");
  });
});
