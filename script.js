let menu = document.getElementById('menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'Web Designer','Frontend Developer', 'Backend Developer', 'MERN Stack Developer'],
    typeSpeed: 80,
    backSpeed:80,
    backDelay:1200,
    loop:true,
  });