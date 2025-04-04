let menu = document.getElementById("menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

const typed = new Typed(".multiple-text", {
  strings: [
    "Web Developer",
    "Web Designer",
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
  ],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 1200,
  loop: true,
});

// contact

const form = document.getElementById("contactForm");
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notification-text");
const progressbar = document.getElementById("progress-bar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch("https://portfolio-contact-cgr9.onrender.com/sent-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      ShowNotification(result.message, "success");
      form.reset();
    } else {
      ShowNotification(result.message || "Something went wrong,", "error");
    }
  } catch (err) {
    ShowNotification("Failed to send message. Please try again.", "error");
  }
});



function ShowNotification(message, type) {
  notificationText.innerText = message;
  notification.style.display = "block";
  notificationText.style.color = type === "success" ? "#28a745" : "#dc3545";
  notification.style.opacity = 1;

  // Reset Progress bar
  progressbar.style.transition = "none";
  progressbar.style.width = "0%";

  setTimeout(() => {
    progressbar.style.transition = "width 5s linear";
    progressbar.style.width = "100%";
  }, 50);

  setTimeout(() => {
    notification.style.opacity = 0;
    setTimeout(() => {
      notification.style.display = "none";
      progressbar.style.transition = "none";
      progressbar.style.width = "0%";
    }, 300); // Fade out 
  }, 5000);
}
