/* -------------------------------------------------------------
 * INTRO.JS — Cinematic Smoke & Curtain Entrance Controller
 * ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // Always start at the very top of the page on reload
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const body = document.body;
  const curtain = document.getElementById("intro-curtain");
  const skipBtn = document.getElementById("skip-btn");
  
  const logoOrnament = curtain.querySelectorAll(".intro-logo-ornament");
  const logoAr = curtain.querySelector(".intro-logo-ar");
  const logoEn = curtain.querySelector(".intro-logo-en");
  const tagline = curtain.querySelector(".intro-tagline");

  // Lock scrolling initially
  body.classList.add("intro-active");

  // Premium Sand Particle Generator
  let sandInterval;
  const startSmoke = () => {
    sandInterval = setInterval(() => {
      // Generate multiple sand particles per tick for density
      for(let i=0; i<8; i++) {
        createSandParticle();
      }
    }, 50); // Faster interval for continuous flow
  };

  const stopSmoke = () => {
    clearInterval(sandInterval);
  };

  const createSandParticle = () => {
    if (!curtain) return;
    const particle = document.createElement("div");
    particle.className = "sand-particle";
    
    // Randomize dimensions for fine sand
    const size = Math.random() * 2 + 1; // 1px to 3px
    const startX = Math.random() * window.innerWidth;
    
    // Sand colors (mix of gold, beige, and dark brown)
    const colors = ['#C9A84C', '#EDE0C8', '#8B7355', '#D4AF37'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style particle
    particle.style.cssText = `
      position: absolute;
      bottom: -10px;
      left: ${startX}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
      opacity: ${Math.random() * 0.5 + 0.5};
    `;
    
    curtain.appendChild(particle);

    // Animate sand rising like a wind flurry
    gsap.to(particle, {
      y: -window.innerHeight - 50,
      x: `+=${Math.sin(Math.random() * Math.PI * 2) * 150 - 75}`,
      duration: Math.random() * 2 + 1.5,
      ease: "power1.out",
      onComplete: () => {
        particle.remove();
      }
    });
  };

  // Interactive mouse sway & sand displacement
  if (curtain) {
    curtain.addEventListener("mousemove", (e) => {
      // Create a burst of sand on mouse move
      for(let i=0; i<3; i++) {
        createInteractiveSand(e.clientX, e.clientY);
      }
    });
  }

  const createInteractiveSand = (x, y) => {
    if (!curtain) return;
    const particle = document.createElement("div");
    particle.className = "sand-particle interactive";
    const size = Math.random() * 2.5 + 1; // 1px to 3.5px
    const colors = ['#C9A84C', '#EDE0C8', '#D4AF37'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Offset slightly from cursor for spray effect
    const offsetX = x + (Math.random() * 40 - 20);
    const offsetY = y + (Math.random() * 40 - 20);

    particle.style.cssText = `
      position: absolute;
      top: ${offsetY}px;
      left: ${offsetX}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
      opacity: ${Math.random() * 0.8 + 0.2};
    `;
    curtain.appendChild(particle);

    // Sand scatters away from cursor and falls down or drifts
    const scatterX = (offsetX - x) * 3 + (Math.random() * 50 - 25);
    const scatterY = (Math.random() * 150 + 50); // falls downwards like gravity

    gsap.to(particle, {
      y: `+=${scatterY}`,
      x: `+=${scatterX}`,
      opacity: 0,
      duration: Math.random() * 1 + 0.5,
      ease: "power2.out",
      onComplete: () => {
        particle.remove();
      }
    });
  };

  // Master GSAP Intro Timeline
  const introTl = gsap.timeline({
    defaults: { ease: "power2.out" }
  });

  // 1. Start smoke rise slightly after black screen
  introTl.to({}, { duration: 0.5, onComplete: startSmoke });

  // 2. Fade in skip button and logo ornaments
  introTl.to(skipBtn, { opacity: 1, duration: 1 }, 1.2);
  introTl.to(logoOrnament, { opacity: 0.8, stagger: 0.2, duration: 1 }, 1.5);

  // 3. Staggered logo texts reveal
  introTl.to(logoAr, { 
    opacity: 1, 
    y: 0, 
    duration: 1.5, 
    ease: "back.out(1.7)"
  }, 1.8);
  
  introTl.to(logoEn, { 
    opacity: 1, 
    y: 0, 
    duration: 1.2 
  }, 2.2);

  introTl.to(tagline, { 
    opacity: 1, 
    y: 0, 
    duration: 1.5 
  }, 2.6);

  // 4. Reveal page (Curtain drop splitting from center)
  const revealPage = () => {
    stopSmoke();
    
    // Timeline to transition curtains and clean up
    const transitionTl = gsap.timeline({
      onComplete: () => {
        body.classList.remove("intro-active");
        curtain.style.display = "none";
        
        // Dispatch custom event to trigger animations in other sections
        document.dispatchEvent(new CustomEvent("introFinished"));
      }
    });

    // Fade out text overlay and background
    transitionTl.to([logoAr, logoEn, tagline, logoOrnament, skipBtn], {
      opacity: 0,
      y: -30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.in"
    });

    // Fade out background wrapper of intro
    transitionTl.to(curtain, {
      opacity: 0,
      backdropFilter: "blur(0px)",
      duration: 1.5,
      ease: "power2.out"
    }, 0.5);
  };

  // Add key to trigger reveal automatically
  introTl.add(revealPage, 6.0); // Intro plays for 6 seconds max

  // Skip Button Action
  skipBtn.addEventListener("click", () => {
    introTl.kill(); // Kill the active running timeline
    revealPage();   // Trigger reveal immediately
  });
});
