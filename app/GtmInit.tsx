"use client";
import Script from "next/script";

export const GtmInit = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
    return null;
  }
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-R50CL84MYF"
      />
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.GTM_ID}');
  `,
        }}
      />
    </>
  );
};
