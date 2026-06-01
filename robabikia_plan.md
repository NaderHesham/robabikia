# 🌸 Robabikia — Perfume Landing Page · Full Project Plan

---

## 1. Vision & Concept

**الاسم:** روبابيكيا (Robabikia)  
**النوع:** Landing Page لبراند عطور مصري معاصر  
**الفكرة المحورية:** الاسم "روبابيكيا" بيحمل طاقة نوستالجيا مصرية أصيلة — عتيق، غامض، ورائحة التاريخ. الـ Landing Page هتبني على هذا التناقض: **تراث مصري قديم × luxury عصري**.

**الجملة الجوهرية للتصميم:**  
> *"روائح نايمة في الذاكرة، صحيت في قارورة."*

---

## 2. Aesthetic Direction

| العنصر | القرار |
|--------|--------|
| **Vibe** | Dark Luxury × Egyptian Vintage |
| **Palette** | خلفية `#0D0A07` (أسود بني عميق) + ذهبي `#C9A84C` + بيج `#EDE0C8` + لمسات عنابي `#7B2D3E` |
| **Typography** | Display: `Cinzel Decorative` (Latin headers) + خط عربي `Rakkas` — Body: `Cormorant Garamond` |
| **تأثير الخلفية** | Grain texture overlay + دخان SVG animated |
| **الشعور العام** | مثل فتح صندوق عتيق مليان عطور |

---

## 3. Sections Map

```
┌─────────────────────────────┐
│  🎬 INTRO ANIMATION         │  ← أول ما الصفحة تفتح
│   (Curtain / Smoke reveal)  │
├─────────────────────────────┤
│  🏠 HERO SECTION            │
│   Logo + Tagline + CTA      │
├─────────────────────────────┤
│  🧴 FEATURED SCENTS         │
│   Interactive Product Cards │
├─────────────────────────────┤
│  📖 BRAND STORY             │
│   Parallax scroll + text    │
├─────────────────────────────┤
│  🎁 HOW TO ORDER            │
│   3 steps animated          │
├─────────────────────────────┤
│  📸 GALLERY / MOOD REEL     │
│   Horizontal scroll         │
├─────────────────────────────┤
│  📞 CONTACT / FOOTER        │
│   WhatsApp CTA + Social     │
└─────────────────────────────┘
```

---

## 4. Intro Animation — التفاصيل الكاملة

### Phase 1 — Black Screen (0.0s → 0.8s)
- الشاشة سوداء تماماً
- صوت اختياري: نفس هواء خفيف أو صوت قارورة بتفتح

### Phase 2 — Smoke Rise (0.8s → 2.5s)
- دخان SVG/Canvas ابيض/ذهبي بيطلع من أسفل الشاشة
- `opacity: 0 → 0.4` مع `blur` خفيف

### Phase 3 — Logo Reveal (2.0s → 3.5s)
- اسم "روبابيكيا" بيظهر حرف حرف أو كـ mask wipe من الوسط
- لون ذهبي، font كبيرة
- تحته tagline بيظهر بـ `fade-in` متأخر

### Phase 4 — Curtain Drop (3.5s → 4.5s)
- ستارة (أو split من المنتصف) بتنكشف وتظهر الـ Hero Section
- transition سلسة بـ `clip-path: inset()`

### Phase 5 — Skip Button
- زرار `تخطي ←` ظاهر من الثانية 1.5 لمن عندهم استعجال
- `position: fixed; bottom-right`

---

## 5. Hero Section

```
┌──────────────────────────────────────────┐
│                                          │
│        [ خلفية: صورة/فيديو معطمة ]      │
│         grain overlay + dark tint        │
│                                          │
│              🌿 ROBABIKIA 🌿             │
│           روبابيكيا للعطور              │
│                                          │
│    "من قلب الحواري القديمة، روائحنا"    │
│                                          │
│         [ اكتشف العطور ]  ← CTA         │
│                                          │
│   ↓ scroll indicator (animated arrow)   │
└──────────────────────────────────────────┘
```

**التفاصيل:**
- خلفية: صورة dark moody لحواري مصرية أو قوارير عطور قديمة
- Logo + Arabic tagline بـ `animation: fadeInUp`
- CTA button: border ذهبي، hover effect بيملا بالذهبي

---

## 6. Featured Scents — Interactive Cards

### Layout
- 3–4 بطاقات عطور في row واحد (horizontal scroll على موبايل)
- كل بطاقة: صورة القارورة + اسم العطر + وصف مختصر + سعر

### Interaction
```
Hover → بطاقة تتكبر scale(1.05)
        خلفية بتتغير للون العطر (كل عطر بـ accent color مختلف)
        "رائحة هذا العطر" → tooltip وصفي
        
Click  → Modal بيفتح
         صورة كبيرة + وصف كامل + المكونات الرئيسية
         زرار "اطلب الآن" يفتح WhatsApp
```

### بيانات نموذج لكل بطاقة
```json
{
  "name": "ذاكرة الفل",
  "collection": "كلاسيك",
  "notes_top": "فل، ياسمين",
  "notes_base": "عود، مسك",
  "price": "٣٥٠ جنيه",
  "color_accent": "#D4A853",
  "mood": "دافي، رومانسي"
}
```

---

## 7. Brand Story Section

### Layout: Parallax Scroll
```
[نص على اليسار]          [صورة على اليمين تتحرك أبطأ]

"روبابيكيا... الكلمة اللي        [ صورة حواري / بازار /
 بتصحّي ذكريات الطفولة.           قوارير عطور قديمة ]
 
 أخدنا التراث ده وحطيناه
 في كل قارورة..."
```

- كل paragraph بيظهر بـ `IntersectionObserver` مع `fadeInLeft`
- الصورة تتحرك بـ `parallax` أبطأ من الـ scroll

---

## 8. How to Order — 3 Steps

```
     1              2              3
  ┌──────┐       ┌──────┐       ┌──────┐
  │  🛒  │  →→→  │  📱  │  →→→  │  🚚  │
  └──────┘       └──────┘       └──────┘
 اختار العطر   ابعت على      استلم في
               واتساب        باب بيتك
```

- الأسهم بيتحركوا بـ animation متسلسلة على scroll
- كل step بـ counter animation (1, 2, 3 بيظهروا بـ stagger)

---

## 9. Gallery / Mood Section

- **Horizontal scroll** (mouse drag أو touch swipe)
- 6–8 صور mood: قوارير، بخور، أجواء مصرية قديمة
- على كل صورة: overlay بـ اسم العطر المرتبط بيها
- cursor مخصص: قارورة عطر 🧴 (SVG cursor)

---

## 10. Contact & Footer

```
┌─────────────────────────────────────┐
│                                     │
│   [ اتواصل معانا على واتساب ] 💬   │
│   زر أخضر كبير، hover يهز خفيف    │
│                                     │
│   📍 القاهرة، مصر                  │
│   📦 توصيل لكل المحافظات          │
│                                     │
│   [Instagram] [Facebook] [TikTok]  │
│                                     │
│   روبابيكيا © 2025                 │
└─────────────────────────────────────┘
```

---

## 11. Tech Stack

| الطبقة | التقنية |
|--------|---------|
| **Framework** | HTML5 + CSS3 + Vanilla JS (بدون dependencies) أو React |
| **Animations** | GSAP (GreenSock) — الأقوى للـ intro sequence |
| **Scroll Effects** | GSAP ScrollTrigger |
| **Fonts** | Google Fonts: Cinzel Decorative + Rakkas + Cormorant Garamond |
| **Icons** | Lucide Icons أو SVG يدوي |
| **Hosting** | Netlify / Vercel (مجاناً) |

---

## 12. File Structure

```
robabikia/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css       ← كل الألوان والمتغيرات
│   ├── animations.css      ← الـ keyframes والـ intro
│   ├── hero.css
│   ├── products.css
│   ├── story.css
│   └── footer.css
├── js/
│   ├── intro.js            ← منطق الـ intro animation
│   ├── products.js         ← الـ modals والـ hover effects
│   ├── scroll.js           ← parallax + scroll triggers
│   └── gallery.js          ← horizontal drag scroll
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
└── README.md
```

---

## 13. خطة التنفيذ (Phases)

### Phase 1 — الهيكل والـ Intro
- [ ] HTML skeleton لكل sections
- [ ] CSS variables (palette, fonts)
- [ ] Intro animation كاملة (smoke + logo + curtain)
- [ ] Skip button

### Phase 2 — Hero + Navigation
- [ ] Hero section مع الصورة والـ CTA
- [ ] Navbar شفاف بيتغير لما تـ scroll (glassmorphism)
- [ ] Smooth scroll للـ sections

### Phase 3 — المنتجات
- [ ] Product cards مع بياناتها
- [ ] Hover effects
- [ ] Modal للتفاصيل
- [ ] WhatsApp integration

### Phase 4 — Story + Steps + Gallery
- [ ] Parallax brand story
- [ ] Animated 3-step order guide
- [ ] Horizontal drag gallery

### Phase 5 — Polish
- [ ] Custom cursor
- [ ] Grain texture overlay
- [ ] Responsive (موبايل أولاً)
- [ ] Performance optimization
- [ ] SEO meta tags

---

## 14. Responsive Notes

- **موبايل:** الـ intro animation أخف (بدون smoke ثقيل)، الـ cards في stack عمودي، horizontal gallery بـ touch swipe
- **Tablet:** 2 columns للـ cards
- **Desktop:** كل الـ effects كاملة

---

## 15. الخطوة الجاية

> ✅ البلان جاهز — قول "ابدأ Phase 1" أو "ابدأ بالـ intro animation" وأبدأ ببناء الكود فعلاً.
