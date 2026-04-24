"use client";

import Script from "next/script";

export function AffiliateTracking() {
  return (
    <Script id="affiliate-tracking" strategy="afterInteractive">
      {`
        document.addEventListener('click', function(e) {
          var link = e.target.closest('a[data-affiliate]');
          if (!link || typeof gtag !== 'function') return;

          gtag('event', 'affiliate_click', {
            affiliate_store: link.dataset.affiliate,
            product_id: link.dataset.productId || '',
            cta_type: link.dataset.cta || '',
            page_path: window.location.pathname
          });
        });
      `}
    </Script>
  );
}
