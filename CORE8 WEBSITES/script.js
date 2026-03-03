// Nav shrink on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("shrink", window.scrollY > 10);
});

// Mobile menu
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
burger?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));
});
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// Reveal animations
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// Counter animation
const counters = document.querySelectorAll("[data-count]");
let counted = false;
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!counted && e.isIntersecting) {
      counted = true;
      counters.forEach(el => animateCount(el, Number(el.dataset.count || "0")));
    }
  });
}, { threshold: 0.3 });

const trust = document.querySelector(".trust");
if (trust) counterIO.observe(trust);

function animateCount(el, target){
  const duration = 1100;
  const start = performance.now();
  const from = 0;

  function tick(t){
    const p = Math.min((t - start) / duration, 1);
    const val = Math.floor(from + (target - from) * easeOutCubic(p));
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.getElementById("gallery")?.addEventListener("click", (e) => {
  const btn = e.target.closest(".shot");
  if (!btn) return;
  const src = btn.getAttribute("data-src");
  if (!src) return;

  lightboxImg.src = src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
});
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

// “Fake” form submit (replace with real endpoint later)
const quoteForm = document.getElementById("quoteForm");
const formStatus = document.getElementById("formStatus");
quoteForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "Thanks! Your request is ready — connect a form endpoint to receive submissions.";
});

// Footer year
document.getElementById("year").textContent = String(new Date().getFullYear());