// src/PageTemplate.tsx
// @ts-expect-error: React must be in scope for vite-plugin-react-meta-map's build step
import React from "react";

interface PageTemplateProps {
  title: string;
  description: string;
  image?: string;
  bundleEntryPoint: string;
}

export default function PageTemplate({
  title,
  description,
  image = "preview image here", // Fallback image for Discord/Twitter embeds
  bundleEntryPoint,
}: PageTemplateProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/website icon here.pngjpgwebp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook / Discord */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </head>
      <body>
        <div id="root"></div>
        {/* This injects your React app bundle into the static HTML */}
        <script type="module" src={bundleEntryPoint}></script>
      </body>
    </html>
  );
}
