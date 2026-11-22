(() => {
  // 1. Dynamic Footer Year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // 2. 3-Bar Drawer Menu Toggle
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const drawer = document.querySelector("[data-quick-drawer]");
  if (menuBtn && drawer) {
    const closeDrawer = () => {
      drawer.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
    };
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
      drawer.hidden = isOpen;
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
    document.addEventListener("click", (e) => {
      if (!drawer.hidden && !drawer.contains(e.target) && !menuBtn.contains(e.target)) {
        closeDrawer();
      }
    });
  }

  // 3. Ripple / Touch React Effect on Tool Cards & Buttons
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion) {
    document.addEventListener("pointerdown", (e) => {
      const target = e.target.closest(".ripple-target");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const wave = document.createElement("span");
      wave.className = "ek-ripple-wave";
      wave.style.width = wave.style.height = `${size}px`;
      wave.style.left = `${e.clientX - rect.left - size / 2}px`;
      wave.style.top = `${e.clientY - rect.top - size / 2}px`;
      target.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove(), { once: true });
    });
  }

  // 4. Spatial Keyboard / D-Pad Navigation (Up, Down, Left, Right)
  function getNavigableItems() {
    const selectors = [
      ".nav-links a",
      "[data-theme-toggle]",
      "[data-menu-toggle]",
      ".search-panel input",
      ".category-tab",
      ".tool-card",
      ".footer-links a"
    ];
    return [...document.querySelectorAll(selectors.join(","))].filter((el) => {
      if (el.hidden || el.closest("[hidden]")) return false;
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
  }

  function findNextInDirection(current, dir, items) {
    const cRect = current.getBoundingClientRect();
    const cx = cRect.left + cRect.width / 2;
    const cy = cRect.top + cRect.height / 2;
    let best = null;
    let bestScore = Infinity;

    items.forEach((item) => {
      if (item === current) return;
      const r = item.getBoundingClientRect();
      const ix = r.left + r.width / 2;
      const iy = r.top + r.height / 2;
      const dx = ix - cx;
      const dy = iy - cy;

      const valid =
        (dir === "ArrowRight" && dx > 12) ||
        (dir === "ArrowLeft" && dx < -12) ||
        (dir === "ArrowDown" && dy > 12) ||
        (dir === "ArrowUp" && dy < -12);

      if (!valid) return;

      const primary = dir === "ArrowLeft" || dir === "ArrowRight" ? Math.abs(dx) : Math.abs(dy);
      const secondary = dir === "ArrowLeft" || dir === "ArrowRight" ? Math.abs(dy) : Math.abs(dx);
      const score = primary + secondary * 2.2;

      if (score < bestScore) {
        bestScore = score;
        best = item;
      }
    });
    return best;
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (drawer && !drawer.hidden) {
        drawer.hidden = true;
        menuBtn?.setAttribute("aria-expanded", "false");
        menuBtn?.focus();
      }
      return;
    }

    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;

    const active = document.activeElement;
    const isTyping = active && ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName);
    if (isTyping && (e.key === "ArrowLeft" || e.key === "ArrowRight")) return;

    const items = getNavigableItems();
    if (!items.length) return;

    e.preventDefault();
    if (!active || !items.includes(active)) {
      const firstTool = items.find((el) => el.classList.contains("tool-card")) || items[0];
      firstTool.focus();
      firstTool.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const next = findNextInDirection(active, e.key, items);
    if (next) {
      next.focus();
      next.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  // 5. Mouse-Interactive Network Mesh Canvas
  const canvas = document.getElementById("ek-network-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = 0, height = 0, particles = [];
  const mouse = { x: -9999, y: -9999, active: false };

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(75, Math.max(26, Math.floor((width * height) / 22000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 1.8 + 1.2
    }));
  }

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener("pointerleave", () => { mouse.active = false; });

  resizeCanvas();

  function drawNetwork() {
    const isDark = document.documentElement.dataset.theme === "dark";
    const nodeColor = isDark ? "rgba(120, 165, 255, 0.55)" : "rgba(49, 94, 235, 0.36)";
    const lineRGB = isDark ? "100, 175, 255" : "49, 94, 235";
    const mouseRGB = isDark ? "24, 200, 239" : "139, 92, 246";

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!reducedMotion) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * (isDark ? 0.22 : 0.14);
          ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mDist < 175) {
          const alpha = (1 - mDist / 175) * (isDark ? 0.55 : 0.35);
          ctx.strokeStyle = `rgba(${mouseRGB}, ${alpha})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    if (!reducedMotion) requestAnimationFrame(drawNetwork);
  }

  drawNetwork();
  if (reducedMotion) {
    window.addEventListener("ek-theme-change", drawNetwork);
  }


// 6. Global Content, Drag, Right-Click, Shortcut & DevTools Blocker (With Smart Whitelist)
  const isCopyAllowed = (target) => {
    if (!target || !(target instanceof Element)) return false;
    return Boolean(
      target.closest('input, textarea, select, code, pre, [contenteditable="true"], .allow-copy, [data-allow-copy]')
    );
  };

  document.addEventListener("contextmenu", (e) => {
    if (!isCopyAllowed(e.target)) e.preventDefault();
  });

  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  ["copy", "cut"].forEach((evt) => {
    document.addEventListener(evt, (e) => {
      if (!isCopyAllowed(e.target)) e.preventDefault();
    });
  });

  document.addEventListener("keydown", (e) => {
    const key = (e.key || "").toLowerCase();
    const ctrlOrMeta = e.ctrlKey || e.metaKey;

    // Block F12 & DevTools shortcuts
    if (
      e.key === "F12" ||
      (ctrlOrMeta && e.shiftKey && ["i", "j", "c", "k"].includes(key)) ||
      (ctrlOrMeta && ["u", "s"].includes(key))
    ) {
      e.preventDefault();
      return false;
    }

    // Block Ctrl+C / Ctrl+X / Ctrl+A outside whitelisted areas
    if (ctrlOrMeta && ["c", "x", "a"].includes(key) && !isCopyAllowed(e.target)) {
      e.preventDefault();
      return false;
    }
  });




})();
