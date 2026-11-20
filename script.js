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

  const copyButton = document.querySelector(".copy-email");
  const copyStatus = document.querySelector(".copy-status");
  // Read the address from the page so it only needs updating in index.html.
  const email = document.querySelector(".email-address")?.textContent.trim();
  if (copyButton && copyStatus && email && navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Email copied to your clipboard.";
      } catch {
        copyStatus.textContent =
          "Could not copy automatically. Select the email address above or use Email Me.";
      }
    });
  }

  // Reveal sections as they scroll into view. Content stays visible without
  // JavaScript, without IntersectionObserver, and with reduced motion.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealItems = document.querySelectorAll(
      ".section-head, .subheading, .about-grid > *, .skill-card, .timeline-item, .project-card, .contact-grid > *",
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
