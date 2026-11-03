(() => {
  "use strict";
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navMenu");
  const mobile = window.matchMedia("(max-width: 760px)");

  if (menuButton && navigation) {
    document.body.classList.add("js-ready");
    menuButton.hidden = !mobile.matches;
    const setMenu = (open, restoreFocus = false) => {
      navigation.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.querySelector("span").textContent = open ? "−" : "+";
      if (restoreFocus) menuButton.focus();
    };
    menuButton.addEventListener("click", () =>
      setMenu(menuButton.getAttribute("aria-expanded") !== "true"),
    );
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
      )
        setMenu(false, true);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-header")) setMenu(false);
    });
    mobile.addEventListener("change", () => {
      const focusWasInMenu = navigation.contains(document.activeElement);
      const focusWasOnToggle = document.activeElement === menuButton;
      menuButton.hidden = !mobile.matches;
      setMenu(false, mobile.matches && focusWasInMenu);
      if (!mobile.matches && focusWasOnToggle)
        navigation.querySelector("a")?.focus();
    });
  }

  const filters = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-category]");
  const toolbar = document.querySelector(".project-toolbar");
  const count = document.querySelector(".project-count");
  if (toolbar && filters.length && projects.length) {
    toolbar.hidden = false;
    const matches = (project, filter) =>
      filter === "all" || project.dataset.category === filter;
    // Keep the filter badges in sync with the cards in the page.
    filters.forEach((button) => {
      const badge = button.querySelector(".filter-count");
      const total = [...projects].filter((project) =>
        matches(project, button.dataset.filter),
      ).length;
      if (badge) badge.textContent = String(total).padStart(2, "0");
    });
    filters.forEach((button) =>
      button.addEventListener("click", () => {
        filters.forEach((filter) => {
          const active = filter === button;
          filter.classList.toggle("active", active);
          filter.setAttribute("aria-pressed", String(active));
        });
        let visible = 0;
        projects.forEach((project) => {
          project.hidden = !matches(project, button.dataset.filter);
          if (!project.hidden) visible += 1;
        });
        count.textContent = `Showing ${visible} project${visible === 1 ? "" : "s"}`;
      }),
    );
    // Links to a specific project (such as Recognition → Jal Nidhi AI) clear
    // the filter first, so the target card is never hidden.
    const showAll = document.querySelector('[data-filter="all"]');
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      const target = link && document.getElementById(link.hash.slice(1));
      if (target?.hidden && target.dataset.category && showAll) showAll.click();
    });
  }

  const copyButton = document.querySelector(".copy-email");
  const copyStatus = document.querySelector(".copy-status");
  // Read the address from the page so it only needs updating in index.html.
  const email = document.querySelector(".email-address")?.textContent.trim();
  if (copyButton && copyStatus && email && navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent =
          "Email copied. Say hello whenever you’re ready.";
      } catch {
        copyStatus.textContent =
          "Could not copy automatically. Select the email address above or use Say hello.";
      }
    });
  }

  // Reveal sections as they scroll into view. Content stays visible without
  // JavaScript, without IntersectionObserver, and with reduced motion.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealItems = document.querySelectorAll(
      ".section-heading, .project-card, .about-grid > *, .skill-card, .learning-roadmap, .recognition-card, .contact-section > h2",
    );
    const revealer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.documentElement.classList.add("js-reveal");
    revealItems.forEach((item) => {
      item.classList.add("reveal");
      revealer.observe(item);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  if ("IntersectionObserver" in window) {
    const navLinks = document.querySelectorAll("#navMenu a");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            if (link.hash === `#${entry.target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
  }
})();
