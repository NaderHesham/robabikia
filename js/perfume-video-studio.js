document.addEventListener("DOMContentLoaded", async () => {
  const DURATION = 6;
  const FPS = 30;

  const scenes = {
    oud: {
      image: "assets/images/product_oud.png",
      title: "AMBRE\nNOBLE",
      subtitle: "Luxury Scent Film",
      footer: "Warm amber, drifting smoke, and a noble oud presence.",
      accent: "rgba(255, 171, 76, 0.55)",
      glow: "#f2a34f",
      textY: 0.82,
      clipPath: "M0.431,0.183 C0.452,0.145 0.482,0.122 0.500,0.122 C0.518,0.122 0.548,0.145 0.569,0.183 C0.588,0.214 0.589,0.237 0.573,0.252 C0.558,0.265 0.543,0.270 0.540,0.283 C0.538,0.304 0.558,0.323 0.591,0.349 C0.632,0.382 0.657,0.420 0.660,0.474 L0.660,0.703 C0.660,0.731 0.648,0.747 0.625,0.749 L0.375,0.749 C0.352,0.747 0.340,0.731 0.340,0.703 L0.340,0.474 C0.343,0.420 0.368,0.382 0.409,0.349 C0.442,0.323 0.462,0.304 0.460,0.283 C0.457,0.270 0.442,0.265 0.427,0.252 C0.411,0.237 0.412,0.214 0.431,0.183 Z",
      smokeOrigin: { x: 0.73, y: 0.36 }
    },
    jasmine: {
      image: "assets/images/product_jasmine.png",
      title: "JASMINE\nÉTOILÉE",
      subtitle: "Floral Scent Film",
      footer: "Bright jasmine bloom, soft light, and airy couture elegance.",
      accent: "rgba(245, 227, 181, 0.5)",
      glow: "#f0d48a",
      textY: 0.82,
      clipPath: "M0.444,0.145 C0.469,0.116 0.487,0.100 0.500,0.100 C0.513,0.100 0.531,0.116 0.556,0.145 C0.586,0.178 0.602,0.212 0.596,0.240 C0.590,0.258 0.575,0.267 0.563,0.273 C0.558,0.280 0.558,0.296 0.560,0.318 C0.586,0.346 0.600,0.368 0.602,0.397 L0.602,0.701 C0.602,0.721 0.590,0.733 0.570,0.734 L0.430,0.734 C0.410,0.733 0.398,0.721 0.398,0.701 L0.398,0.397 C0.400,0.368 0.414,0.346 0.440,0.318 C0.442,0.296 0.442,0.280 0.437,0.273 C0.425,0.267 0.410,0.258 0.404,0.240 C0.398,0.212 0.414,0.178 0.444,0.145 Z",
      smokeOrigin: { x: 0.62, y: 0.34 }
    },
    nostalgia: {
      image: "assets/images/product_nostalgia.png",
      title: "L’AMBRE\nROUGE",
      subtitle: "Vintage Scent Film",
      footer: "Crystal cut reflections, velvet mood, and timeless perfume drama.",
      accent: "rgba(255, 191, 105, 0.52)",
      glow: "#eab562",
      textY: 0.82,
      clipPath: "M0.469,0.094 C0.478,0.083 0.489,0.078 0.500,0.078 C0.511,0.078 0.522,0.083 0.531,0.094 C0.540,0.107 0.542,0.123 0.537,0.138 C0.561,0.151 0.579,0.170 0.588,0.197 C0.590,0.216 0.582,0.230 0.566,0.239 C0.553,0.246 0.545,0.253 0.545,0.266 C0.545,0.289 0.559,0.309 0.594,0.334 C0.654,0.376 0.688,0.414 0.690,0.469 L0.690,0.691 C0.690,0.714 0.676,0.726 0.652,0.728 L0.348,0.728 C0.324,0.726 0.310,0.714 0.310,0.691 L0.310,0.469 C0.312,0.414 0.346,0.376 0.406,0.334 C0.441,0.309 0.455,0.289 0.455,0.266 C0.455,0.253 0.447,0.246 0.434,0.239 C0.418,0.230 0.410,0.216 0.412,0.197 C0.421,0.170 0.439,0.151 0.463,0.138 C0.458,0.123 0.460,0.107 0.469,0.094 Z",
      smokeOrigin: { x: 0.64, y: 0.35 }
    }
  };

  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const normalizedPath = (pathData, width, height) => {
    const path = new Path2D();
    const tokens = pathData.match(/[a-zA-Z]|-?\d*\.?\d+/g) || [];
    let i = 0;
    let cmd = "";
    let currentX = 0;
    let currentY = 0;
    let startX = 0;
    let startY = 0;

    const num = () => parseFloat(tokens[i++]);
    const sx = (v) => v * width;
    const sy = (v) => v * height;

    while (i < tokens.length) {
      if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
      switch (cmd) {
        case "M":
          currentX = sx(num()); currentY = sy(num());
          path.moveTo(currentX, currentY);
          startX = currentX; startY = currentY;
          cmd = "L";
          break;
        case "L":
          currentX = sx(num()); currentY = sy(num());
          path.lineTo(currentX, currentY);
          break;
        case "C": {
          const x1 = sx(num()), y1 = sy(num());
          const x2 = sx(num()), y2 = sy(num());
          currentX = sx(num()); currentY = sy(num());
          path.bezierCurveTo(x1, y1, x2, y2, currentX, currentY);
          break;
        }
        case "Z":
        case "z":
          path.closePath();
          currentX = startX; currentY = startY;
          break;
        default:
          i++;
          break;
      }
    }

    return path;
  };

  const sceneEntries = await Promise.all(Object.entries(scenes).map(async ([key, scene]) => {
    const image = await loadImage(scene.image);
    return [key, {
      ...scene,
      image,
      pathCache: new Map(),
      particles: Array.from({ length: 14 }).map((_, idx) => ({
        seed: idx * 0.37 + Math.random() * 2,
        size: 22 + Math.random() * 34,
        alpha: 0.09 + Math.random() * 0.1,
        drift: 18 + Math.random() * 40
      }))
    }];
  }));
  const state = Object.fromEntries(sceneEntries);

  const coverImage = (ctx, image, dx, dy, dWidth, dHeight) => {
    const imageRatio = image.width / image.height;
    const targetRatio = dWidth / dHeight;
    let sx = 0, sy = 0, sWidth = image.width, sHeight = image.height;

    if (imageRatio > targetRatio) {
      sWidth = image.height * targetRatio;
      sx = (image.width - sWidth) / 2;
    } else {
      sHeight = image.width / targetRatio;
      sy = (image.height - sHeight) / 2;
    }

    ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  };

  const drawSmoke = (ctx, scene, t, width, height) => {
    const ox = scene.smokeOrigin.x * width;
    const oy = scene.smokeOrigin.y * height;

    scene.particles.forEach((particle, idx) => {
      const cycle = (t * 0.2 + particle.seed + idx * 0.06) % 1;
      const rise = cycle * 620;
      const sway = Math.sin((t * 1.8) + particle.seed * 3) * particle.drift;
      const x = ox + sway + Math.sin(t + idx) * 16;
      const y = oy - rise;
      const radius = particle.size * (0.8 + cycle * 1.25);

      const grad = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
      grad.addColorStop(0, `rgba(255, 236, 214, ${particle.alpha * (1 - cycle)})`);
      grad.addColorStop(0.45, `rgba(255, 201, 160, ${particle.alpha * 0.42 * (1 - cycle)})`);
      grad.addColorStop(1, "rgba(255, 201, 160, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const drawText = (ctx, scene, width, height, t) => {
    const baseY = height * scene.textY;
    const shimmer = 0.65 + (Math.sin(t * 2.4) + 1) * 0.12;

    ctx.save();
    ctx.textAlign = "center";

    ctx.fillStyle = "rgba(242, 207, 139, 0.92)";
    ctx.font = `${Math.round(width * 0.027)}px "Cormorant Garamond", serif`;
    ctx.letterSpacing = "4px";
    ctx.fillText(scene.subtitle.toUpperCase(), width / 2, baseY - height * 0.08);

    ctx.fillStyle = `rgba(250, 240, 223, ${shimmer})`;
    ctx.shadowColor = "rgba(255, 213, 145, 0.28)";
    ctx.shadowBlur = 18;
    ctx.font = `700 ${Math.round(width * 0.074)}px "Cinzel Decorative", serif`;
    const titleLines = scene.title.split("\n");
    titleLines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, baseY + idx * height * 0.05);
    });

    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(237, 224, 200, 0.82)";
    ctx.font = `${Math.round(width * 0.024)}px "Cormorant Garamond", serif`;
    ctx.fillText(scene.footer, width / 2, baseY + height * 0.12);
    ctx.restore();
  };

  const drawScene = (ctx, scene, elapsed) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const t = elapsed % DURATION;
    const p = t / DURATION;

    ctx.clearRect(0, 0, width, height);

    const bgScale = 1.06 + Math.sin(t * 0.7) * 0.018;
    const bgOffsetX = Math.sin(t * 0.55) * width * 0.018;
    const bgOffsetY = -Math.cos(t * 0.43) * height * 0.014;

    ctx.save();
    ctx.translate(width / 2 + bgOffsetX, height / 2 + bgOffsetY);
    ctx.scale(bgScale, bgScale);
    coverImage(ctx, scene.image, -width / 2, -height / 2, width, height);
    ctx.restore();

    const glow = ctx.createRadialGradient(width / 2, height * 0.52, width * 0.04, width / 2, height * 0.57, width * 0.34);
    glow.addColorStop(0, scene.accent);
    glow.addColorStop(0.4, scene.accent.replace(/0\.\d+\)/, "0.18)"));
    glow.addColorStop(1, "rgba(255, 171, 76, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    drawSmoke(ctx, scene, t, width, height);

    const clipKey = `${width}x${height}`;
    if (!scene.pathCache.has(clipKey)) {
      scene.pathCache.set(clipKey, normalizedPath(scene.clipPath, width, height));
    }
    const bottlePath = scene.pathCache.get(clipKey);

    const bottleLift = -height * 0.02 - Math.sin(t * 1.15) * height * 0.014;
    const bottleRotation = Math.sin(t * 0.95) * 0.055;
    const bottleSwing = Math.sin(t * 0.75) * width * 0.012;
    const bottleScale = 1.018 + Math.sin(t * 0.9) * 0.012;

    ctx.save();
    ctx.translate(width / 2 + bottleSwing, height / 2 + bottleLift);
    ctx.rotate(bottleRotation);
    ctx.scale(bottleScale, bottleScale);
    ctx.translate(-width / 2, -height / 2);
    ctx.save();
    ctx.clip(bottlePath);
    coverImage(ctx, scene.image, 0, 0, width, height);
    ctx.restore();

    const shadow = ctx.createRadialGradient(width / 2, height * 0.71, width * 0.02, width / 2, height * 0.71, width * 0.14);
    shadow.addColorStop(0, "rgba(0,0,0,0.30)");
    shadow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = shadow;
    ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = "screen";
    const sweepX = ((p * 1.4) % 1.2) * width - width * 0.2;
    const sweep = ctx.createLinearGradient(sweepX - width * 0.06, 0, sweepX + width * 0.12, 0);
    sweep.addColorStop(0, "rgba(255,255,255,0)");
    sweep.addColorStop(0.5, "rgba(255,250,235,0.48)");
    sweep.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = sweep;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    const vignette = ctx.createRadialGradient(width / 2, height * 0.46, width * 0.25, width / 2, height * 0.46, width * 0.85);
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(0.7, "rgba(0,0,0,0.24)");
    vignette.addColorStop(1, "rgba(0,0,0,0.82)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(201, 168, 76, 0.16)";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    drawText(ctx, scene, width, height, t);
  };

  const activeRenders = new Map();

  Object.entries(state).forEach(([key, scene]) => {
    const canvas = document.querySelector(`[data-video-canvas="${key}"]`);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const render = (now) => {
      drawScene(ctx, scene, now / 1000);
      const raf = requestAnimationFrame(render);
      activeRenders.set(key, raf);
    };

    const raf = requestAnimationFrame(render);
    activeRenders.set(key, raf);
  });

  const recordScene = async (key) => {
    const canvas = document.querySelector(`[data-video-canvas="${key}"]`);
    const status = document.querySelector(`[data-record-status="${key}"]`);
    const button = document.querySelector(`[data-record-video="${key}"]`);
    if (!canvas || !status || !button) return;

    if (!canvas.captureStream || typeof MediaRecorder === "undefined") {
      status.textContent = "Recording is not supported in this browser.";
      return;
    }

    button.disabled = true;
    status.textContent = "Recording… please wait 6 seconds.";

    const stream = canvas.captureStream(FPS);
    const chunks = [];
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";

    const recorder = new MediaRecorder(stream, { mimeType });
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `robabikia-${key}-perfume-video.webm`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      status.textContent = "Done — WebM downloaded.";
      button.disabled = false;
    };

    recorder.start();
    setTimeout(() => recorder.stop(), DURATION * 1000);
  };

  document.querySelectorAll("[data-record-video]").forEach((button) => {
    button.addEventListener("click", () => recordScene(button.dataset.recordVideo));
  });
});
