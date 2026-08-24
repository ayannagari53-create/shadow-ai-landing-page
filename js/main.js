/* ============================================================
   SHADOW AI — Landing Page Interactions
   Lenis smooth scroll · GSAP ScrollTrigger · tilt · magnetic
   typed demo · carousel · counters · FAQ · custom cursor
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Preloader ---------- */
  window.addEventListener("load", function () {
    setTimeout(function () {
      var pre = document.getElementById("preloader");
      if (pre) {
        pre.classList.add("hidden");
        document.body.classList.remove("no-scroll");
      }
    }, 600);
  });

  /* ---------- Lenis smooth scroll ---------- */
  var lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // GSAP ScrollTrigger integration with Lenis
  if (window.gsap && window.ScrollTrigger && lenis) {
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.getElementById("navbar");
  function onScrollNav() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Custom cursor ---------- */
  var dot = document.querySelector(".cursor-dot");
  var ring = document.querySelector(".cursor-ring");
  if (dot && ring && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    });
    (function animateRing() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll("a, button, .tilt, .faq-q").forEach(function (el) {
      el.addEventListener("mouseenter", function () { ring.classList.add("active"); });
      el.addEventListener("mouseleave", function () { ring.classList.remove("active"); });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.35, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
      });
    });
  }

  /* ---------- 3D Tilt cards ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--mx", (px * 100 + 50) + "%");
        card.style.setProperty("--my", (py * 100 + 50) + "%");
        gsap.to(card, {
          rotateY: px * 10,
          rotateX: -py * 10,
          transformPerspective: 900,
          duration: 0.4,
          ease: "power2.out"
        });
      });
      card.addEventListener("mouseleave", function () {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      });
    });
  }

  /* ---------- GSAP ScrollTrigger reveals + parallax + timeline ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up reveals
    gsap.utils.toArray("[data-reveal]").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true }
        }
      );
    });

    // Parallax hero mockup
    gsap.to("[data-parallax]", {
      y: -60, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    // Hero title glow pulse
    gsap.to("#heroGlow", {
      textShadow: "0 0 40px rgba(79,124,255,.8), 0 0 80px rgba(139,92,246,.5)",
      duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut"
    });

    // Timeline line grow
    gsap.fromTo(".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1, transformOrigin: "top top", ease: "none",
        scrollTrigger: { trigger: ".timeline-track", start: "top 80%", end: "bottom 60%", scrub: true }
      }
    );

    // Section transitions (subtle scale on section heads)
    gsap.utils.toArray(".section-head").forEach(function (head) {
      gsap.fromTo(head,
        { opacity: 0, y: 50, scale: .96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: head, start: "top 85%", once: true }
        }
      );
    });
  }

  /* ---------- Typed interactive demo ---------- */
  var demoBody = document.getElementById("demoBody");
  var typedCmd = document.getElementById("typedCmd");
  var demoResult = document.getElementById("demoResult");

  var demos = {
    1: {
      cmd: "shadow summarize ./project",
      result: "📄 Analyzed 24 files in ./project\n" +
        "✅ 3 modules detected · 1,240 LOC\n" +
        "✅ <span class='ok'>Summary generated</span> — saved to <b>summary.md</b>\n" +
        "⏱ Completed in 1.2s"
    },
    2: {
      cmd: "shadow remind me 'standup at 9am'",
      result: "🔔 <span class='ok'>Reminder set</span>\n" +
        "📅 Every weekday at 9:00 AM\n" +
        "✅ Stored in local memory — will ping you!"
    },
    3: {
      cmd: "shadow open my IDE",
      result: "🚀 <span class='ok'>Launching VS Code</span>\n" +
        "📂 Opened workspace: <b>/projects/shadow</b>\n" +
        "🖥 Window restored to preferred layout"
    }
  };

  function typeText(el, text, speed, done) {
    var i = 0;
    (function type() {
      if (i < text.length) {
        el.textContent = text.substring(0, i + 1);
        i++;
        setTimeout(type, speed);
      } else if (done) { done(); }
    })();
  }

  function runDemo(key) {
    var d = demos[key];
    if (!d || !typedCmd || !demoResult) return;
    typedCmd.textContent = "";
    demoResult.style.display = "none";
    typeText(typedCmd, d.cmd, 45, function () {
      setTimeout(function () {
        demoResult.innerHTML = d.result;
        demoResult.style.display = "block";
      }, 350);
    });
  }

  // Auto-run first demo on load, then cycle
  if (typedCmd && demoResult) {
    runDemo(1);
    var demoIdx = 1;
    setInterval(function () {
      demoIdx = demoIdx % 3 + 1;
      runDemo(demoIdx);
    }, 6000);
  }

  document.querySelectorAll(".demo-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      runDemo(btn.getAttribute("data-cmd"));
    });
  });

  /* ---------- Screenshot carousel ---------- */
  var track = document.getElementById("carouselTrack");
  var dotsWrap = document.getElementById("caroDots");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  if (track && dotsWrap) {
    var slides = track.children.length;
    var idx = 0;

    // Build dots
    for (var i = 0; i < slides; i++) {
      var d = document.createElement("span");
      d.className = "caro-dot" + (i === 0 ? " active" : "");
      d.dataset.idx = i;
      d.addEventListener("click", function () { goTo(+this.dataset.idx); });
      dotsWrap.appendChild(d);
    }

    function goTo(n) {
      idx = (n + slides) % slides;
      track.style.transform = "translateX(-" + idx * 100 + "%)";
      document.querySelectorAll(".caro-dot").forEach(function (dotEl, di) {
        dotEl.classList.toggle("active", di === idx);
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { goTo(idx - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { goTo(idx + 1); });

    // Auto-advance
    setInterval(function () { goTo(idx + 1); }, 5000);
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll(".counter");
  if (counters.length && window.gsap && window.ScrollTrigger) {
    counters.forEach(function (counter) {
      var target = +counter.getAttribute("data-target");
      var obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 2, ease: "power1.out",
        onUpdate: function () {
          counter.textContent = Math.round(obj.val);
        },
        scrollTrigger: { trigger: counter, start: "top 88%", once: true }
      });
    });
  } else if (counters.length) {
    // Fallback: set final values
    counters.forEach(function (c) {
      c.textContent = c.getAttribute("data-target");
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      // Close all
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
})();
