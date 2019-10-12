const toggleMenu = document.getElementById('toggle-menu');
const header = document.getElementById('top-head');


window.addEventListener('load', function () {
  toggleMenu.addEventListener('click', function () {
    header.classList.toggle("open");
    if (header.classList.contains("open")) {
      toggleMenu.textContent = "閉じる";
    }else{
      toggleMenu.textContent = "メニュー";
    }
  });
});
