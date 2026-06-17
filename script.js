/* =====================================
   UNKNOWN GAMINGYT V3.0
   script.js
===================================== */

/* ========= LOADER ========= */

window.addEventListener("load", () => {

  const loader = document.getElementById("loader");

  setTimeout(() => {

    loader.style.opacity = "0";

    setTimeout(() => {

      loader.style.display = "none";

    }, 500);

  }, 2000);

});

/* ========= CUSTOM CURSOR ========= */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

  if (!cursor) return;

  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

});

/* ========= TYPING EFFECT ========= */

const typingElement = document.getElementById("typing");

const words = [
  "YouTuber",
  "Twitch Streamer",
  "Content Creator",
  "Minecraft Gamer",
  "Community Builder"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

  const currentWord = words[wordIndex];

  if (!deleting) {

    typingElement.textContent =
      currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {

      deleting = true;

      setTimeout(typeEffect, 1500);

      return;
    }

  } else {

    typingElement.textContent =
      currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      deleting = false;

      wordIndex++;

      if (wordIndex >= words.length) {
        wordIndex = 0;
      }

    }

  }

  setTimeout(typeEffect, deleting ? 50 : 100);

}

if (typingElement) {
  typeEffect();
}

/* ========= LOCKED AUTOPLAY VIDEO ========= */

const lockedVideo = document.querySelector(".stream-container video");

if (lockedVideo) {
  lockedVideo.controls = false;
  lockedVideo.disablePictureInPicture = true;
  lockedVideo.setAttribute("controlsList", "nodownload nofullscreen noremoteplayback");

  const keepVideoPlaying = () => {
    if (lockedVideo.paused) {
      lockedVideo.play().catch(() => {});
    }
  };

  lockedVideo.addEventListener("pause", keepVideoPlaying);
  lockedVideo.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  keepVideoPlaying();
}

/* ========= LIVE YOUTUBE SUBSCRIBER COUNT ========= */

const YT_API_KEY = "AIzaSyBuFSPAUKL2XC_SOZLQmgk-AQD1aTOC2vM";
const YT_CHANNEL_ID = "UCHfQt0mb3UkLSgodQfGv3IQ";

async function fetchYouTubeSubs() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${YT_CHANNEL_ID}&key=${YT_API_KEY}`
    );
    const data = await res.json();
    const subs = data.items[0].statistics.subscriberCount;

    const subElements = document.querySelectorAll("[data-target]");
    subElements.forEach(el => {
      if (el.closest(".stat-card") && el.nextElementSibling &&
          el.nextElementSibling.textContent.trim() === "Subscribers") {
        el.textContent = Number(subs).toLocaleString();
        el.removeAttribute("data-target");
      }
    });

  } catch (err) {
    console.log("Could not fetch YouTube subs:", err);
  }
}

fetchYouTubeSubs();

// Refresh every 5 minutes
setInterval(fetchYouTubeSubs, 5 * 60 * 1000);

/* ========= COUNTER ANIMATION ========= */

const counters = document.querySelectorAll("[data-target]");

const counterObserver = new IntersectionObserver(

(entries) => {

entries.forEach(entry => {

if (!entry.isIntersecting) return;

const counter = entry.target;

const target =
parseInt(counter.getAttribute("data-target"));

let current = 0;

const increment = target / 100;

const updateCounter = () => {

current += increment;

if (current < target) {

counter.textContent =
Math.floor(current);

requestAnimationFrame(updateCounter);

} else {

counter.textContent = target;

}

};

updateCounter();

counterObserver.unobserve(counter);

});

},
{
threshold:0.5
}

);

counters.forEach(counter => {

counterObserver.observe(counter);

});

/* ========= MOBILE MENU ========= */

const menuBtn =
document.querySelector(".menu-btn");

const navLinks =
document.querySelector(".nav-links");

if(menuBtn && navLinks){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}

document
.querySelectorAll(".nav-links a")
.forEach(link=>{

link.addEventListener("click",()=>{

if(navLinks){

navLinks.classList.remove("active");

}

});

});

/* ========= SCROLL REVEAL ========= */

const revealElements = document.querySelectorAll(
".about-card, .skill-card, .stat-card, .game-card, .schedule-card, .community-btn"
);

const revealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},
{
threshold:0.15
}

);

revealElements.forEach(el=>{

el.classList.add("hidden");

revealObserver.observe(el);

});

/* ========= THREE.JS GALAXY ========= */

const canvas =
document.getElementById("bg");

if(canvas){

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
3000
);

const renderer =
new THREE.WebGLRenderer({
canvas,
alpha:true,
antialias:true
});

renderer.setPixelRatio(
window.devicePixelRatio
);

renderer.setSize(
window.innerWidth,
window.innerHeight
);

camera.position.z = 30;

/* ===== Stars ===== */

const starGeometry =
new THREE.BufferGeometry();

const starCount = 6000;

const positions = [];

for(let i=0;i<starCount;i++){

positions.push(
(Math.random()-0.5)*2500,
(Math.random()-0.5)*2500,
(Math.random()-0.5)*2500
);

}

starGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
positions,
3
)
);

const starMaterial =
new THREE.PointsMaterial({
color:0xbb86fc,
size:1.4,
transparent:true,
opacity:0.85
});

const stars =
new THREE.Points(
starGeometry,
starMaterial
);

scene.add(stars);

/* ===== Purple Nebula Particles ===== */

const particleGeometry =
new THREE.BufferGeometry();

const particlePositions = [];

for(let i=0;i<2000;i++){

particlePositions.push(
(Math.random()-0.5)*1200,
(Math.random()-0.5)*1200,
(Math.random()-0.5)*1200
);

}

particleGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(
particlePositions,
3
)
);

const particleMaterial =
new THREE.PointsMaterial({
color:0xa855f7,
size:3,
transparent:true,
opacity:0.35
});

const particles =
new THREE.Points(
particleGeometry,
particleMaterial
);

scene.add(particles);

/* ===== Mouse Parallax ===== */

let mouseX = 0;
let mouseY = 0;

document.addEventListener(
"mousemove",
(event)=>{

mouseX =
(event.clientX /
window.innerWidth - 0.5);

mouseY =
(event.clientY /
window.innerHeight - 0.5);

}
);

/* ===== Animation Loop ===== */

function animate(){

requestAnimationFrame(
animate
);

stars.rotation.y += 0.00025;
stars.rotation.x += 0.00005;

particles.rotation.y += 0.0005;

camera.position.x +=
(mouseX*8 - camera.position.x)
*0.02;

camera.position.y +=
(-mouseY*8 - camera.position.y)
*0.02;

renderer.render(
scene,
camera
);

}

animate();

/* ===== Resize ===== */

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth/
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

}

/* ========= SMOOTH NAV HIGHLIGHT ========= */

const sections =
document.querySelectorAll("section");

const navItems =
document.querySelectorAll(
".nav-links a"
);

window.addEventListener(
"scroll",
()=>{

let current = "";

sections.forEach(section=>{

const sectionTop =
section.offsetTop;

if(
pageYOffset >=
sectionTop - 150
){

current =
section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active-link");

if(
link.getAttribute("href")
=== "#" + current
){

link.classList.add(
"active-link"
);

}

});

}
);

/* ========= CONSOLE MESSAGE ========= */

console.log(
"🔥 Unknown GamingYT V3 Loaded Successfully!"
);

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
document.addEventListener("keydown", function(e) {

    if (e.key === "F12") {
        e.preventDefault();
    }

    if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
    }

    if (e.ctrlKey && e.shiftKey && e.key === "J") {
        e.preventDefault();
    }

    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
    }

});

// Disable Right Click
document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});
