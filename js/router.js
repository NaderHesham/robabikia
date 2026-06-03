/* -------------------------------------------------------------
 * ROUTER.JS — Client-Side Hash Router (SPA Page Navigator)
 * ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const views = document.querySelectorAll(".spa-view");
  const navLinks = document.querySelectorAll(".nav-link");

  // Force website to always open on the home landing page upon fresh reload/restart
  if (window.location.hash) {
    const homeSections = ["#home", "#story", "#order", "#gallery", "#overview"];
    const isHomeSub = homeSections.some(sec => window.location.hash.startsWith(sec));
    // If the hash is an inner category subpage, reset the URL state to the homepage
    if (!isHomeSub) {
      window.history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
  }

  const navigateTo = () => {
    let hash = window.location.hash || "#home";
    
    // Check if the hash is a nested section of the home page
    const homeSections = ["#home", "#story", "#order", "#gallery", "#overview"];
    const isHomeSection = homeSections.some(sec => hash.startsWith(sec));

    let activeViewId = "view-home";
    if (!isHomeSection) {
      if (hash === "#perfumes") activeViewId = "view-perfumes";
      else if (hash === "#clothes") activeViewId = "view-clothes";
      else if (hash === "#shoes") activeViewId = "view-shoes";
    }

    // Toggle view containers visibility
    views.forEach(view => {
      if (view.id === activeViewId) {
        view.style.display = "block";
        view.classList.add("active-view");
      } else {
        view.style.display = "none";
        view.classList.remove("active-view");
      }
    });

    // Update Nav Menu Highlights
    navLinks.forEach(link => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      
      if (isHomeSection && href === "#home") {
        link.classList.add("active");
      } else if (!isHomeSection && href === hash) {
        link.classList.add("active");
      }
    });

    // Scroll Management
    if (isHomeSection) {
      // If navigating to a sub-anchor, wait a split-second for views toggles to finish, then scroll smoothly
      const targetId = hash.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }, 80);
      }
    } else {
      // Reset viewport scroll to top for new pages
      window.scrollTo(0, 0);
    }
  };

  // Bind to URL hash changes
  window.addEventListener("hashchange", navigateTo);
  
  // Initial Page Load Dispatch
  navigateTo();
});
