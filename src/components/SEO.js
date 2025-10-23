import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Ghariyaal - Premium Watches Collection | Authentic Timepieces',
  description = 'Discover premium watches at Ghariyaal. Shop authentic men\'s and women\'s timepieces with free shipping across Pakistan. Best prices, 100% genuine products guaranteed.',
  keywords = 'watches, premium watches, men\'s watches, women\'s watches, authentic watches, luxury timepieces, watch store Pakistan, Ghariyaal',
  image = '/og-image.jpg',
  url = 'https://www.ghariyaal.studio',
  type = 'website',
  noindex = false
}) => {
  const fullTitle = title.includes('Ghariyaal') ? title : `${title} | Ghariyaal`;
  const fullUrl = url.startsWith('http') ? url : `https://www.ghariyaal.studio${url}`;
  const fullImage = image.startsWith('http') ? image : `https://www.ghariyaal.studio${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Ghariyaal" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
    </Helmet>
  );
};

export default SEO;
