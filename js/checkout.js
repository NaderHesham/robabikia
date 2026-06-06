/* checkout.js — Multi-step Checkout Flow */

document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;

  const showStep = (step) => {
    document.querySelectorAll('.checkout-step').forEach((el, i) => {
      el.classList.toggle('active', i + 1 === step);
    });
    document.querySelectorAll('.step-indicator-item').forEach((el, i) => {
      el.classList.toggle('active', i + 1 <= step);
    });
    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const populateReview = () => {
    const reviewList = document.getElementById('checkout-review-list');
    const reviewTotal = document.getElementById('checkout-review-total');
    if (!reviewList || !window.cart) return;

    const items = window.cart.getItems();
    const lang = window.utils?.getCurrentLang() || 'ar';

    if (items.length === 0) {
      reviewList.innerHTML = '';
      return;
    }

    reviewList.innerHTML = items.map(item => {
      const name = lang === 'en' ? (item.nameEn || item.nameAr) : item.nameAr;
      const price = lang === 'en' ? (item.priceEn || item.priceAr) : item.priceAr;
      return `
        <div class="review-item">
          <span class="review-item-name">${name}${item.size ? ` (${item.size})` : ''}</span>
          <span class="review-item-qty">× ${item.qty}</span>
          <span class="review-item-price">${price}</span>
        </div>
      `;
    }).join('');

    if (reviewTotal) {
      reviewTotal.textContent = window.utils?.formatPrice(window.cart.getTotal()) || '';
    }
  };

  // Step 1 → Step 2 (review)
  document.getElementById('checkout-to-review-btn')?.addEventListener('click', () => {
    const name = document.getElementById('co-name')?.value?.trim();
    const phone = document.getElementById('co-phone')?.value?.trim();
    const address = document.getElementById('co-address')?.value?.trim();
    const city = document.getElementById('co-city')?.value?.trim();
    const lang = window.utils?.getCurrentLang() || 'ar';

    if (!name || !phone || !address || !city) {
      const msg = lang === 'en' ? 'Please fill all required fields.' : 'يرجى ملء جميع الحقول المطلوبة.';
      window.utils?.showToast(msg, 'error');
      return;
    }

    if (window.cart?.getCount() === 0) {
      const msg = lang === 'en' ? 'Your cart is empty.' : 'السلة فارغة.';
      window.utils?.showToast(msg, 'error');
      window.location.hash = '#cart';
      return;
    }

    populateReview();
    showStep(2);
  });

  // Step 2 → Step 1 (back)
  document.getElementById('checkout-back-btn')?.addEventListener('click', () => showStep(1));

  // Step 2 → Submit order
  document.getElementById('checkout-submit-btn')?.addEventListener('click', async () => {
    const lang = window.utils?.getCurrentLang() || 'ar';
    const items = window.cart?.getItems() || [];

    if (items.length === 0) {
      window.utils?.showToast(lang === 'en' ? 'Cart is empty.' : 'السلة فارغة.', 'error');
      return;
    }

    const submitBtn = document.getElementById('checkout-submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = lang === 'en' ? 'Processing...' : 'جارٍ المعالجة...';

    try {
      const { data: { session } } = await window.supabaseClient.auth.getSession();

      const customerName = document.getElementById('co-name')?.value?.trim();
      const customerPhone = document.getElementById('co-phone')?.value?.trim();
      const city = document.getElementById('co-city')?.value?.trim();
      const address = document.getElementById('co-address')?.value?.trim();
      const fullAddress = `${city}، ${address}`;

      if (session) {
        // Place order for each item (existing API creates one order per product)
        for (const item of items) {
          await window.apiClient.createOrder({
            product_id: item.productId,
            size: item.size || 'Default',
            customer_name: customerName,
            customer_phone: customerPhone,
            customer_address: fullAddress
          });
        }
      }

      window.cart.clearCart();
      window.location.hash = '#order-confirm';

    } catch (err) {
      console.error('Checkout error:', err);
      const msg = lang === 'en'
        ? 'Order failed. Please try again.'
        : 'حدث خطأ أثناء تأكيد الطلب. يرجى المحاولة مرة أخرى.';
      window.utils?.showToast(msg, 'error');
    } finally {
      const btn = document.getElementById('checkout-submit-btn');
      if (btn) {
        btn.disabled = false;
        btn.textContent = window.utils?.getCurrentLang() === 'en' ? 'Place Order' : 'تأكيد الطلب';
      }
    }
  });

  // Reset to step 1 whenever navigating to checkout
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#checkout') {
      showStep(1);
    }
  });
});
