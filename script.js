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

// Edit this list to add/update announcements.
const newsItems = [
  {
    date: "March 2026",
    title: "New publication in Journal of Genocide Research",
    summary: "Latest article now available online with DOI and journal access.",
    link: "https://doi.org/10.1080/14623528.2024.2310866",
  },
  {
    date: "February 2026",
    title: "Book chapter published: Hungry for Change",
    summary:
      "New chapter co-authored with Mustafa Aksakal on civilian demands and food politics.",
    link: "https://www.cambridge.org/core/books/abs/hunger-redraws-the-map/hungry-for-change/8BCAC92892EB977BBDC1F8A10467660A",
  },
  {
    date: "January 2026",
    title: "Event: Public lecture on wartime humanitarianism",
    summary:
      "Upcoming lecture and discussion on famine, aid, and urban governance in wartime Beirut.",
    link: "publications.html",
  },
];

const newsDate = document.querySelector("#news-date");
const newsTitle = document.querySelector("#news-title");
const newsSummary = document.querySelector("#news-summary");
const newsLink = document.querySelector("#news-link");
const newsPrev = document.querySelector("#news-prev");
const newsNext = document.querySelector("#news-next");

let newsIndex = 0;
let newsTimer;

function renderNews(idx) {
  if (!newsDate || !newsTitle || !newsSummary || !newsLink || !newsItems.length) {
    return;
  }

  const item = newsItems[idx];
  newsDate.textContent = item.date;
  newsTitle.textContent = item.title;
  newsSummary.textContent = item.summary;
  newsLink.href = item.link;
}

function nextNews() {
  newsIndex = (newsIndex + 1) % newsItems.length;
  renderNews(newsIndex);
}

function prevNews() {
  newsIndex = (newsIndex - 1 + newsItems.length) % newsItems.length;
  renderNews(newsIndex);
}

function restartNewsTimer() {
  if (newsTimer) {
    clearInterval(newsTimer);
  }
  newsTimer = setInterval(nextNews, 6500);
}

if (newsItems.length) {
  renderNews(newsIndex);
  restartNewsTimer();

  if (newsNext) {
    newsNext.addEventListener("click", () => {
      nextNews();
      restartNewsTimer();
    });
  }

  if (newsPrev) {
    newsPrev.addEventListener("click", () => {
      prevNews();
      restartNewsTimer();
    });
  }
}
