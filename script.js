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
      menuButton.hidden = !mobile.matches;
      setMenu(false, mobile.matches && focusWasInMenu);
    });
  }

  const filters = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-category]");
  const toolbar = document.querySelector(".project-toolbar");
  const count = document.querySelector(".project-count");
  if (toolbar && filters.length && projects.length) {
    toolbar.hidden = false;
    filters.forEach((button) =>
      button.addEventListener("click", () => {
        filters.forEach((filter) => {
          const active = filter === button;
          filter.classList.toggle("active", active);
          filter.setAttribute("aria-pressed", String(active));
        });
        let visible = 0;
        projects.forEach((project) => {
          project.hidden =
            button.dataset.filter !== "all" &&
            project.dataset.category !== button.dataset.filter;
          if (!project.hidden) visible += 1;
        });
        count.textContent = `Showing ${visible} project${visible === 1 ? "" : "s"}`;
      }),
    );
  }

  const copyButton = document.querySelector(".copy-email");
  const copyStatus = document.querySelector(".copy-status");
  if (copyButton && copyStatus && navigator.clipboard?.writeText) {
    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("salonipandey0716@gmail.com");
        copyStatus.textContent =
          "Email copied. Say hello whenever you’re ready.";
      } catch {
        copyStatus.textContent =
          "Could not copy automatically. Select the email address above or use Say hello.";
      }
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
