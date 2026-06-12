/* ---------------------------------------------------------------
 * LANDING.JS — Nav behaviour, GSAP entrance animations
 * --------------------------------------------------------------- */
(function () {

  /* ---------- Nav scroll state -------------------------------- */
  const nav = document.getElementById('lp-nav');
  if (nav) {
    const onScroll = () =>
      nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile burger ----------------------------------- */
  const burger  = document.getElementById('lp-burger');
  const drawer  = document.getElementById('lp-drawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    /* Close drawer when a link inside it is clicked */
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- GSAP scroll reveals ----------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    /* Scroll-triggered section reveals */
    if (typeof ScrollTrigger !== 'undefined') {
      document.querySelectorAll('.lp-reveal').forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          onEnter: () => el.classList.add('visible'),
          once: true,
        });
      });

      /* Steps stagger */
      ScrollTrigger.create({
        trigger: '.lp-steps__grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from('.lp-step', {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'expo.out',
          });
        },
      });
    }
  });

})();
