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
    date: "Upcoming Event",
    title: "Upcoming Event New Book on Academic Freedom and Activism on Campus Feb 23rd 7pm Online",
    summary: "Online event on Feb 23rd at 7pm.",
    link: "#",
    image: "images/Flyer.png",
    imageAlt: "Event flyer",
  },
];

const newsDate = document.querySelector("#news-date");
const newsTitle = document.querySelector("#news-title");
const newsSummary = document.querySelector("#news-summary");
const newsLink = document.querySelector("#news-link");
const newsImageWrap = document.querySelector(".news-image-wrap");
const newsImage = document.querySelector("#news-image");
const newsPrev = document.querySelector("#news-prev");
const newsNext = document.querySelector("#news-next");

let newsIndex = 0;
let newsTimer;

function setNewsImage(item) {
  if (!item.image) {
    newsImageWrap.style.display = "none";
    return;
  }

  const candidates = [item.image];
  if (item.image === "images/Flyer.png") {
    candidates.push("images/flyer.png", "Flyer.png", "flyer.png");
  }

  let i = 0;
  function tryNext() {
    if (i >= candidates.length) {
      newsImageWrap.style.display = "none";
      return;
    }
    newsImageWrap.style.display = "block";
    newsImage.src = candidates[i];
    newsImage.alt = item.imageAlt || item.title;
    i += 1;
  }

  newsImage.onerror = tryNext;
  newsImage.onload = () => {
    newsImage.onerror = null;
  };
  tryNext();
}

function renderNews(idx) {
  if (
    !newsDate ||
    !newsTitle ||
    !newsSummary ||
    !newsLink ||
    !newsImageWrap ||
    !newsImage ||
    !newsItems.length
  ) {
    return;
  }

  const item = newsItems[idx];
  newsDate.textContent = item.date;
  newsTitle.textContent = item.title;
  newsSummary.textContent = item.summary;
  newsLink.href = item.link;

  if (item.link && item.link !== "#") {
    newsLink.style.display = "inline";
    newsLink.textContent = "Read more";
  } else {
    newsLink.style.display = "none";
  }

  setNewsImage(item);
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
