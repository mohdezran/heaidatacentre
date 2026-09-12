/* HE AI Data Centre — interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll(".count");
  if ("IntersectionObserver" in window && counters.length) {
    var seen = new WeakSet();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !seen.has(entry.target)) {
          seen.add(entry.target);
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  } else {
    counters.forEach(function (c) { animateCount(c); });
  }

  /* ---------- scroll reveals (content stays visible without JS) ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var revealables = document.querySelectorAll(
      ".card, .spec, .green, .fact, .timeline li"
    );
    var vh = window.innerHeight;
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal--pending");
          ro.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealables.forEach(function (el, i) {
      el.classList.add("reveal");
      // Only defer elements below the first viewport, so the page at rest is complete.
      if (el.getBoundingClientRect().top > vh) {
        el.style.transitionDelay = (i % 4) * 60 + "ms";
        el.classList.add("reveal--pending");
        ro.observe(el);
      }
    });
    // Safety net: never leave content dimmed if the observer misses.
    setTimeout(function () {
      document.querySelectorAll(".reveal--pending").forEach(function (el) {
        el.classList.remove("reveal--pending");
      });
    }, 4000);
  }
})();
