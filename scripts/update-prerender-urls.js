const fs = require('fs');
const path = require('path');

/**
 * This script updates package.json to include specific product URLs for pre-rendering.
 * 
 * Usage:
 * 1. If your backend is running:
 *    node scripts/update-prerender-urls.js
 * 
 * 2. Manual mode (add product IDs):
 *    node scripts/update-prerender-urls.js manual
 */

// ===== CONFIGURATION =====
const BACKEND_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const STATIC_URLS = [
  '/',
  '/products',
  '/about',
  '/contact',
  '/faq',
  '/login',
  '/signup'
];

// ===== MANUAL PRODUCT IDS (if backend is not available during build) =====
const MANUAL_PRODUCT_IDS = [
  // Add your product IDs here:
  // '675c15e0b72ddf52bcbb4b8e',
  // '675c15e0b72ddf52bcbb4b8f',
  // 'product-slug-3'
];

// ===== FUNCTIONS =====

/**
 * Fetch products from backend API
 */
async function fetchProductsFromAPI() {
  try {
    const fetch = require('node-fetch');
    const response = await fetch(`${BACKEND_API_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    
    const data = await response.json();
    return data.products || data || [];
  } catch (error) {
    console.warn('⚠️  Could not fetch products from API:', error.message);
    return null;
  }
}

/**
 * Generate product URLs
 */
function generateProductURLs(products) {
  return products.map(product => {
    // Use slug if available, otherwise use _id
    const identifier = product.slug || product._id;
    return `/products/${identifier}`;
  });
}

/**
 * Update package.json with new URLs
 */
function updatePackageJson(urls) {
  const packagePath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  // Ensure reactSnap configuration exists
  if (!packageJson.reactSnap) {
    packageJson.reactSnap = {};
  }
  
  // Update include array
  packageJson.reactSnap.include = urls;
  
  // Write back to file
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  
  console.log('✅ Updated package.json with', urls.length, 'URLs for pre-rendering');
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 Updating pre-render URLs for react-snap...\n');
  
  const mode = process.argv[2];
  let allUrls = [...STATIC_URLS];
  
  if (mode === 'manual') {
    console.log('📋 Using manual product IDs...');
    const productUrls = MANUAL_PRODUCT_IDS.map(id => `/products/${id}`);
    allUrls = [...allUrls, ...productUrls];
    
    console.log('   Added', productUrls.length, 'product URLs');
  } else {
    console.log('🌐 Fetching products from API...');
    const products = await fetchProductsFromAPI();
    
    if (products && products.length > 0) {
      const productUrls = generateProductURLs(products);
      allUrls = [...allUrls, ...productUrls];
      
      console.log('   Found', products.length, 'products');
      console.log('   ✅ Successfully fetched from API');
    } else {
      console.log('   ⚠️  No products fetched, using manual IDs...');
      const productUrls = MANUAL_PRODUCT_IDS.map(id => `/products/${id}`);
      allUrls = [...allUrls, ...productUrls];
      
      if (MANUAL_PRODUCT_IDS.length === 0) {
        console.log('   ⚠️  No manual product IDs configured!');
        console.log('   💡 Edit this file and add product IDs to MANUAL_PRODUCT_IDS array');
      }
    }
  }
  
  console.log('\n📝 URLs to be pre-rendered:');
  allUrls.forEach(url => console.log('   -', url));
  
  console.log('\n💾 Updating package.json...');
  updatePackageJson(allUrls);
  
  console.log('\n✅ Done! Run "npm run build" to pre-render these pages.\n');
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { main, fetchProductsFromAPI, generateProductURLs };
