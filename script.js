const revealItems = [...document.querySelectorAll(".hero, .panel, .site-footer")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, idx) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${idx * 90}ms`;
  observer.observe(item);
});
