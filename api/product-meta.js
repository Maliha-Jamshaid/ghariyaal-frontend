// Vercel Edge Function to inject product meta tags
export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  const url = new URL(request.url);
  const productId = url.searchParams.get('id');
  
  if (!productId) {
    return new Response('Missing product ID', { status: 400 });
  }

  try {
    // Fetch product data from your backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://ghariyaal-backend.vercel.app/api';
    const productResponse = await fetch(`${apiUrl}/products/${productId}`);
    
    if (!productResponse.ok) {
      throw new Error('Product not found');
    }
    
    const product = await productResponse.json();
    
    // Generate SEO-optimized meta tags
    const title = `Buy ${product.name} ${product.brand ? `by ${product.brand}` : ''} in Pakistan | Ghariyaal – Authentic Luxury Watch`;
    const description = product.seoDescription || product.description || 
      `Shop ${product.name} ${product.brand ? `by ${product.brand}` : ''} at Ghariyaal. Premium quality watch with authentic guarantee, best price Rs. ${product.price.toLocaleString()}, and fast delivery across Pakistan.`;
    const productUrl = `https://www.ghariyaal.studio/products/${product.slug || product._id}`;
    const productImage = product.imageUrl || 'https://www.ghariyaal.studio/logo.png';
    
    // Generate Product Schema
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": productImage,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.brand || "Premium Watch"
      },
      "category": product.category || "Watches",
      "offers": {
        "@type": "Offer",
        "url": productUrl,
        "priceCurrency": "PKR",
        "price": product.price,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "itemCondition": "https://schema.org/NewCondition",
        "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Ghariyaal"
        }
      }
    };

    // Add ratings if available
    if (product.averageRating && product.totalRatings > 0) {
      productSchema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": product.averageRating.toFixed(1),
        "reviewCount": product.totalRatings,
        "bestRating": "5",
        "worstRating": "1"
      };
    }

    // Generate HTML with meta tags
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/logo.png" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#8B5CF6" />
  
  <!-- Product Meta Tags -->
  <title>${title}</title>
  <meta name="title" content="${title}" />
  <meta name="description" content="${description}" />
  <meta name="keywords" content="${product.name}, ${product.brand || 'watch'}, ${product.category || 'premium watch'}, buy watch online Pakistan, luxury watches Pakistan, authentic watches" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="${productUrl}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product" />
  <meta property="og:url" content="${productUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${productImage}" />
  <meta property="og:site_name" content="Ghariyaal" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="${productUrl}" />
  <meta property="twitter:title" content="${title}" />
  <meta property="twitter:description" content="${description}" />
  <meta property="twitter:image" content="${productImage}" />
  
  <!-- Product Schema (JSON-LD) -->
  <script type="application/ld+json">${JSON.stringify(productSchema)}</script>
  
  <!-- React App Scripts -->
  <script>
    // Preload product data for React
    window.__PRELOADED_PRODUCT__ = ${JSON.stringify(product)};
  </script>
  
  <link rel="manifest" href="/manifest.json" />
  <script defer="defer" src="/static/js/main.a51f7fcd.js"></script>
  <link href="/static/css/main.064a72d2.css" rel="stylesheet">
</head>
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>
</html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    
    // Return standard index.html as fallback
    return fetch(new URL('/index.html', request.url));
  }
}
