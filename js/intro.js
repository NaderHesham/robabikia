/* -------------------------------------------------------------
 * INTRO.JS — Cinematic Smoke & Curtain Entrance Controller
 * ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const curtain = document.getElementById("intro-curtain");
  const curtainLeft = curtain.querySelector(".curtain-left");
  const curtainRight = curtain.querySelector(".curtain-right");
  const skipBtn = document.getElementById("skip-btn");
  
  const logoOrnament = curtain.querySelectorAll(".intro-logo-ornament");
  const logoAr = curtain.querySelector(".intro-logo-ar");
  const logoEn = curtain.querySelector(".intro-logo-en");
  const tagline = curtain.querySelector(".intro-tagline");

  // Lock scrolling initially
  body.classList.add("intro-active");

  // Premium Smoke Particle Generator (Faux incense smoke)
  let smokeInterval;
  const startSmoke = () => {
    smokeInterval = setInterval(() => {
      createSmokeParticle();
    }, 120);
  };

  const stopSmoke = () => {
    clearInterval(smokeInterval);
  };

  const createSmokeParticle = () => {
    if (!curtain) return;
    const particle = document.createElement("div");
    particle.className = "smoke-particle";
    
    // Randomize dimensions
    const size = Math.random() * 120 + 80; // 80px to 200px
    const startX = Math.random() * window.innerWidth;
    
    // Style particle
    particle.style.cssText = `
      position: absolute;
      bottom: -150px;
      left: ${startX}px;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(201, 168, 76, 0.18) 0%, rgba(237, 224, 200, 0.05) 40%, rgba(13, 10, 7, 0) 70%);
      border-radius: 50%;
      filter: blur(40px);
      pointer-events: none;
      z-index: 2;
      opacity: 0;
    `;
    
    curtain.appendChild(particle);

    // Animate particle upwards with swaying
    gsap.to(particle, {
      y: -window.innerHeight - 200,
      x: `+=${Math.sin(Math.random()) * 150 - 75}`,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 4 + 3,
      ease: "power1.out",
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

    // Fade out text overlay inside curtain
    transitionTl.to([logoAr, logoEn, tagline, logoOrnament, skipBtn], {
      opacity: 0,
      y: -30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.in"
    });

    // Split curtain halves
    transitionTl.to(curtainLeft, {
      xPercent: -100,
      duration: 1.8,
      ease: "power3.inOut"
    }, 0.5);

    transitionTl.to(curtainRight, {
      xPercent: 100,
      duration: 1.8,
      ease: "power3.inOut"
    }, 0.5);
    
    // Blur out background wrapper of intro
    transitionTl.to(curtain, {
      backdropFilter: "blur(0px)",
      backgroundColor: "rgba(13,10,7,0)",
      duration: 1.8
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
