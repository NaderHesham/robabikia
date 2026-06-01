/* -------------------------------------------------------------
 * PRODUCTS.JS — Dynamic Perfumes Catalog & Modals Controller
 * ------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Core Scents Data (Luxury Egyptian Heritage Collection)
  const perfumes = [
    {
      id: "jasmine",
      name: "ذاكرة الفل",
      collection: "مجموعة الماضي الجميل",
      shortDesc: "رقة الفل والياسمين البلدي في بيوت القاهرة القديمة بمشربياتها العتيقة.",
      desc: "نفحات عطرية تصحبك لبيوت القاهرة القديمة بمشربياتها الخشبية العتيقة وحدائقها المليئة بالفل والياسمين البري مع نسيم الليل الهادئ. عطر يحاكي براءة ونقاء أيام الطفولة.",
      topNotes: "فل بلدي، ياسمين جبلي، زنبق الوادي",
      baseNotes: "خشب الصندل الدافئ، مسك أبيض ناعم",
      price: "٤٥٠ جنيه",
      priceNum: "450",
      image: "assets/images/product_jasmine.png",
      accentGlow: "rgba(237, 224, 200, 0.15)", // Beige glow
      accentColor: "#EDE0C8",
      mood: "دافئ، رومانسي، ناعم"
    },
    {
      id: "oud",
      name: "سر العود",
      collection: "مجموعة التراث المعتق",
      shortDesc: "بخور العود الفخم مع توابل وبزارات الحسين التاريخية المعتقة.",
      desc: "عطر مهيب مستوحى من أبخرة النحاس المشتعل بالعود الفاخر في بازارات الحسين التاريخية. مزيج ساحر يمنحك حضوراً واثقاً وغامضاً يعود بك لقرون مضت.",
      topNotes: "زعفران ناري، دارسين (قرفة)، هيل بري",
      baseNotes: "عود ملكي معتق، خشب الأرز، لبان مسك",
      price: "٥٥٠ جنيه",
      priceNum: "550",
      image: "assets/images/product_oud.png",
      accentGlow: "rgba(201, 168, 76, 0.2)", // Gold glow
      accentColor: "#C9A84C",
      mood: "غامض، فخم، مهيب"
    },
    {
      id: "nostalgia",
      name: "عبير النوستالجيا",
      collection: "مجموعة الحنين الفاخرة",
      shortDesc: "ورد مجفف وعنبر دافئ يجسدان صندوق ذكريات الحب الرائعة.",
      desc: "توليفة مخملية تجسد ذكريات الحب الرائعة المكتوبة برائحة الورد المجفف وأحجار العنبر الدافئة المنسكبة في صندوق خشبي قديم. يمنحك طاقة دفء تدوم طويلاً.",
      topNotes: "ورد جوري أحمر، زهر البرتقال، توت بري",
      baseNotes: "عنبر خام، باتشولي دافئ، فانيليا معتقة",
      price: "٤٩٠ جنيه",
      priceNum: "490",
      image: "assets/images/product_nostalgia.png",
      accentGlow: "rgba(123, 45, 62, 0.25)", // Burgundy glow
      accentColor: "#7B2D3E",
      mood: "مخملي، جذاب، عميق"
    }
  ];

  const grid = document.getElementById("products-grid");
  const modal = document.getElementById("product-modal");
  const modalClose = document.getElementById("modal-close");

  const mImg = document.getElementById("modal-perfume-img");
  const mGlow = document.getElementById("modal-glow-bg");
  const mCollection = document.getElementById("modal-perfume-collection");
  const mName = document.getElementById("modal-perfume-name");
  const mPrice = document.getElementById("modal-perfume-price");
  const mDesc = document.getElementById("modal-perfume-desc");
  const mTop = document.getElementById("modal-perfume-top");
  const mBase = document.getElementById("modal-perfume-base");
  const mMood = document.getElementById("modal-perfume-mood");
  const mWaLink = document.getElementById("modal-whatsapp-link");

  // 2. Render Cards dynamically
  if (grid) {
    grid.innerHTML = perfumes.map(perfume => `
      <div class="product-card" id="card-${perfume.id}" style="--accent-glow: ${perfume.accentGlow};">
        <div class="product-img-wrapper">
          <img src="${perfume.image}" alt="${perfume.name}" class="product-img">
        </div>
        <div class="product-info">
          <span class="product-collection">${perfume.collection}</span>
          <h3 class="product-title">${perfume.name}</h3>
          <p class="product-short-desc">${perfume.shortDesc}</p>
          <div class="product-price">${perfume.price}</div>
          <button class="product-card-btn" data-id="${perfume.id}">اكتشف العطر</button>
        </div>
      </div>
    `).join("");
  }

  // 3. Open Modal Event
  const openProductModal = (id) => {
    const perfume = perfumes.find(p => p.id === id);
    if (!perfume) return;

    // Populate Modal Content
    mImg.src = perfume.image;
    mImg.alt = perfume.name;
    mCollection.textContent = perfume.collection;
    mName.textContent = perfume.name;
    mPrice.textContent = perfume.price;
    mDesc.textContent = perfume.desc;
    mTop.textContent = perfume.topNotes;
    mBase.textContent = perfume.baseNotes;
    mMood.textContent = perfume.mood;

    // Set custom visual glows
    mGlow.style.setProperty("--accent-glow", perfume.accentGlow);
    modal.querySelector(".product-modal").style.borderColor = perfume.accentColor;

    // WhatsApp Direct Link Formatting
    const phone = "201000000000"; // Dummy business number
    const message = encodeURIComponent(
      `أهلاً روبابيكيا 🌸\n\nأود طلب عطر "${perfume.name}" الفاخر (${perfume.collection}).\nالسعر: ${perfume.price}\n\nيرجى تأكيد الطلب وتحديد تفاصيل الشحن.`
    );
    mWaLink.href = `https://wa.me/${phone}?text=${message}`;

    // Activate modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // lock scroll
  };

  // 4. Close Modal Event
  const closeProductModal = () => {
    modal.classList.remove("active");
    // Unlock scroll only if intro curtain is not active
    if (!document.body.classList.contains("intro-active")) {
      document.body.style.overflow = "";
    }
  };

  // Event delegation for grid buttons
  if (grid) {
    grid.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("product-card-btn")) {
        const id = e.target.getAttribute("data-id");
        openProductModal(id);
      }
    });
  }

  // Close bindings
  if (modalClose) {
    modalClose.addEventListener("click", closeProductModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      // If clicked overlay backdrop directly
      if (e.target === modal) {
        closeProductModal();
      }
    });
  }

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeProductModal();
    }
  });
});
