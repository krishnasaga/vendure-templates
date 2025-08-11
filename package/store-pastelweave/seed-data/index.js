const fs = require('fs');
const xlsx = require('xlsx');

const nodeFetch = require('node-fetch');
const fetchCookie = require('fetch-cookie/node-fetch')(nodeFetch);
const fetch = fetchCookie;

const endpoint = 'http://localhost:3000/admin-api';
const adminEmail = 'superadmin';
const adminPassword = 'superadmin';

const workbook = xlsx.readFile('./Okhai_Fashion_Catalog_10_Sarees.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json(sheet);

const products = {};

rows.forEach(row => {
  const pid = String(row['Product ID']).padStart(3, '0');

  if (!products[pid]) {
    products[pid] = {
      productTitle: row['Product Title'],
      category: row['Category'],
      material: row['Material'],
      variants: []
    };
  }

  products[pid].variants.push({
    variantId: row['Variant ID'],
    price: Number(row['Price (₹)']),
    colorName: row['Color Name'],
    colorCode: row['Color Code'],
    size: row['Size'],
    gender: row['Gender'],
    stock: Number(row['In Stock'])
  });
});

let authToken = '';

async function login() {
  const authQuery = `
    mutation {
      login(username: "${adminEmail}", password: "${adminPassword}") {
        ...on CurrentUser {
          id
          identifier
        }
        ...on ErrorResult {
          errorCode
          message
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: authQuery }),
  });

  const result = await res.json();

  if (result.errors || result.data.login?.errorCode) {
    console.error('❌ Login failed:', result.errors || result.data.login.message);
    process.exit(1);
  }

  console.log(`✅ Logged in as ${result.data.login.identifier}`);
}

async function createProduct(productId, title, category, material) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + productId;
  const description = `${category} made of ${material}`;

  const mutation = `
  mutation {
    createProduct(input: {
      enabled: true,
      translations: [{
        languageCode: en,
        name: "${title.replace(/"/g, '\\"')}",
        slug: "${slug}",
        description: "${description.replace(/"/g, '\\"')}"
      }]
    }) {
      id
      name
      slug
    }
  }
`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation }),
  });

  const result = await res.json();

  if (result.errors || result.data?.createProduct?.errorCode) {
    console.error(`❌ Failed to create product ${productId}:`, result.errors || result.data.createProduct.message);
    return null;
  }

  return result.data.createProduct.id;
}

// Improved option group creation with retry logic
async function createOptionGroup(code, name, options, retryCount = 3) {
  const mutation = `
    mutation {
      createProductOptionGroup(input: {
        code: "${code}",
        translations: [{ languageCode: en, name: "${name.replace(/"/g, '\\"')}" }],
        options: [
          ${options.map(opt => `{
            code: "${opt.code}",
            translations: [{ languageCode: en, name: "${opt.name.replace(/"/g, '\\"')}" }]
          }`).join(',')}
        ]
      }) {
        id
        options { id code }
      }
    }
  `;

  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await res.json();

      if (result.errors) {
        if (result.errors[0].message.includes('database is locked') && attempt < retryCount - 1) {
          console.log(`🔄 Database locked, retrying option group '${code}' (attempt ${attempt + 1})...`);
          await delay(1000 * (attempt + 1)); // Exponential backoff
          continue;
        }
        console.error(`❌ Failed to create option group '${code}':`, result.errors);
        return null;
      }

      return result.data.createProductOptionGroup;
    } catch (error) {
      if (attempt < retryCount - 1) {
        console.log(`🔄 Network error, retrying option group '${code}' (attempt ${attempt + 1})...`);
        await delay(1000 * (attempt + 1));
      } else {
        console.error(`❌ Failed to create option group '${code}' after ${retryCount} attempts:`, error.message);
        return null;
      }
    }
  }
  return null;
}

// Improved add option group with retry logic
async function addOptionGroupToProduct(productId, optionGroupId, retryCount = 3) {
  const mutation = `
    mutation AddOptionGroupToProduct($productId: ID!, $optionGroupId: ID!) {
      addOptionGroupToProduct(productId: $productId, optionGroupId: $optionGroupId) {
        id
      }
    }
  `;

  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation, variables: { productId, optionGroupId } }),
      });

      const result = await res.json();
      
      if (result.errors) {
        if (result.errors[0].message.includes('database is locked') && attempt < retryCount - 1) {
          console.log(`🔄 Database locked, retrying add option group ${optionGroupId} (attempt ${attempt + 1})...`);
          await delay(1000 * (attempt + 1));
          continue;
        }
        console.error(`❌ Failed to add option group ${optionGroupId}:`, result.errors);
        return false;
      }
      
      return true;
    } catch (error) {
      if (attempt < retryCount - 1) {
        console.log(`🔄 Network error, retrying add option group ${optionGroupId} (attempt ${attempt + 1})...`);
        await delay(1000 * (attempt + 1));
      } else {
        console.error(`❌ Failed to add option group ${optionGroupId} after ${retryCount} attempts:`, error.message);
        return false;
      }
    }
  }
  return false;
}

// Improved variant creation with retry logic
async function createVariant(productId, productTitle, size, color, basePrice, stock, retryCount = 3) {
  const sku = `${productTitle.replace(/\s+/g, '-').toUpperCase()}-${size.code}-${color.code}`;
  const name = `${productTitle} - ${size.code} / ${color.code}`;

  const mutation = `
    mutation {
      createProductVariants(input: [{
        productId: "${productId}",
        sku: "${sku}",
        price: ${basePrice * 100},
        stockOnHand: ${stock},
        trackInventory: TRUE,
        optionIds: ["${size.id}", "${color.id}"],
        translations: [{ languageCode: en, name: "${name.replace(/"/g, '\\"')}" }]
      }]) {
        id
        sku
      }
    }
  `;

  for (let attempt = 0; attempt < retryCount; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation }),
      });

      const result = await res.json();

      if (result.errors) {
        if (result.errors[0].message.includes('database is locked') && attempt < retryCount - 1) {
          console.log(`🔄 Database locked, retrying variant ${sku} (attempt ${attempt + 1})...`);
          await delay(1000 * (attempt + 1));
          continue;
        }
        
        // Check for missing option groups error
        if (result.errors[0].message.includes('must include one optionId from each')) {
          console.warn(`⚠️ Option group issue for ${sku}:`, result.errors[0].message);
          return false;
        }
        
        console.warn(`⚠️ Failed to create variant for ${sku}:`, result.errors);
        return false;
      }

      console.log(`✅ Created variant: ${sku}`);
      return true;
    } catch (error) {
      if (attempt < retryCount - 1) {
        console.log(`🔄 Network error, retrying variant ${sku} (attempt ${attempt + 1})...`);
        await delay(1000 * (attempt + 1));
      } else {
        console.warn(`⚠️ Failed to create variant for ${sku} after ${retryCount} attempts:`, error.message);
        return false;
      }
    }
  }
  return false;
}

// Modified to use individual variant creation with improved error handling
async function createVariantsFromCombinations(productId, productTitle, basePrice, stock, sizeOptions, colorOptions) {
  let successCount = 0; // Changed from const to let
  let failCount = 0;    // Changed from const to let
  let retries = 0;
  const maxRetries = 3;
  const failedVariants = [];

  // Create variants sequentially to avoid database locking
  for (const size of sizeOptions) {
    for (const color of colorOptions) {
      const success = await createVariant(productId, productTitle, size, color, basePrice, stock);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
        failedVariants.push({ size, color });
      }
      
      await delay(800); // Increased delay between variant creations
    }
  }
  
  // Retry failed variants
  if (failedVariants.length > 0 && retries < maxRetries) {
    console.log(`🔄 Retrying ${failedVariants.length} failed variants...`);
    await delay(2000); // Wait longer before retrying
    
    for (const variant of failedVariants) {
      const success = await createVariant(productId, productTitle, variant.size, variant.color, basePrice, stock, 5); // More retries
      if (success) {
        successCount++;
        failCount--;
      }
      await delay(1000); // Increased delay for retries
    }
    
    retries++;
  }
  
  console.log(`📊 Variants created: ${successCount} success, ${failCount} failed`);
  return successCount > 0;
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Improved product import function with better error handling and retry logic
async function importProducts() {
  try {
    console.log('🔐 Logging in...');
    await login();

    console.log('📦 Starting product import...');

    let successCount = 0;
    let errorCount = 0;

    // Process products sequentially instead of all at once
    for (const [productId, productData] of Object.entries(products)) {
      try {
        console.log(`\n📝 Processing product ${productId}: ${productData.productTitle}`);

        const createdProductId = await createProduct(
          productId,
          productData.productTitle,
          productData.category,
          productData.material
        );

        if (!createdProductId) {
          console.error(`❌ Failed to create product ${productId}`);
          errorCount++;
          continue;
        }

        const sizes = [...new Set(productData.variants.map(v => v.size))];
        const colors = [...new Set(productData.variants.map(v => v.colorName))];

        // Add more delay between operations
        await delay(1000);
        
        const sizeGroup = await createOptionGroup(
          `size-${productId}`,
          'Size',
          sizes.map(size => ({ code: size.toLowerCase(), name: size }))
        );
        
        // Add more delay between operations
        await delay(1000);

        const colorGroup = await createOptionGroup(
          `color-${productId}`,
          'Color',
          colors.map(color => ({ code: color.toLowerCase().replace(/\s+/g, '-'), name: color }))
        );

        if (!sizeGroup || !colorGroup) {
          console.warn(`⚠️ Skipping product ${productId} due to failed option group creation`);
          errorCount++;
          continue;
        }

        // Add more delay between operations
        await delay(1000);
        
        const sizeAdded = await addOptionGroupToProduct(createdProductId, sizeGroup.id);
        
        // Add more delay between operations
        await delay(1000);
        
        const colorAdded = await addOptionGroupToProduct(createdProductId, colorGroup.id);

        if (!sizeAdded || !colorAdded) {
          console.warn(`⚠️ Skipping product ${productId} due to failed option group assignment`);
          errorCount++;
          continue;
        }

        // Add more delay before creating variants
        await delay(1500);

        const basePrice = productData.variants[0].price || 1000;
        const defaultStock = productData.variants[0].stock || 10;

        const variantsCreated = await createVariantsFromCombinations(
          createdProductId,
          productData.productTitle,
          basePrice,
          defaultStock,
          sizeGroup.options,
          colorGroup.options
        );

        if (variantsCreated) {
          successCount++;
          console.log(`✅ Successfully imported product ${productId}`);
        } else {
          errorCount++;
          console.warn(`⚠️ Product ${productId} imported with issues`);
        }

        // Add significant delay between products
        await delay(2000);
      } catch (error) {
        console.error(`❌ Error processing product ${productId}:`, error.message);
        errorCount++;
        await delay(1000);
      }
    }

    console.log('\n🎉 Import completed!');
    console.log(`✅ Successfully imported: ${successCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);

  } catch (error) {
    console.error('💥 Fatal error during import:', error);
    process.exit(1);
  }
}

async function getImportedProducts() {
  try {
    console.log('🔐 Logging in...');
    await login();

    console.log('🔍 Fetching imported products...');
    
    const query = `
      query {
        products(options: { take: 100 }) {
          items {
            id
            name
            slug
            variants {
              id
              name
              sku
              price
              stockLevel
            }
          }
          totalItems
        }
      }
    `;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error('❌ Failed to fetch products:', result.errors);
      return;
    }

    console.log('\n📋 Imported Products:');
    console.log('====================');
    
    const products = result.data.products.items;
    console.log(`Found ${products.length} products (of ${result.data.products.totalItems} total)\n`);
    
    products.forEach(product => {
      console.log(`📦 Product: ${product.name}`);
      console.log(`   ID: ${product.id}`);
      console.log(`   Slug: ${product.slug}`);
      console.log(`   Variants: ${product.variants.length}`);
      
      product.variants.forEach(variant => {
        console.log(`      - ${variant.name} (${variant.sku})`);
        console.log(`        Price: ${(variant.price / 100).toFixed(2)} | Stock: ${variant.stockLevel}`);
      });
      
      console.log(''); // Empty line between products
    });
    
  } catch (error) {
    console.error('💥 Error fetching products:', error);
  }
}

// Add a function to import specific products (useful for retrying failed ones)
async function importSpecificProducts(productIds) {
  try {
    console.log('🔐 Logging in...');
    await login();

    console.log(`📦 Starting import of ${productIds.length} specific products...`);

    let successCount = 0;
    let errorCount = 0;

    for (const productId of productIds) {
      if (!products[productId]) {
        console.warn(`⚠️ Product ID ${productId} not found in data`);
        continue;
      }
      
      const productData = products[productId];
      
      try {
        console.log(`\n📝 Processing product ${productId}: ${productData.productTitle}`);

        // Reuse the existing product creation logic from importProducts()
        const createdProductId = await createProduct(
          productId,
          productData.productTitle,
          productData.category,
          productData.material
        );

        if (!createdProductId) {
          console.error(`❌ Failed to create product ${productId}`);
          errorCount++;
          continue;
        }

        const sizes = [...new Set(productData.variants.map(v => v.size))];
        const colors = [...new Set(productData.variants.map(v => v.colorName))];

        await delay(1000);
        
        const sizeGroup = await createOptionGroup(
          `size-${productId}`,
          'Size',
          sizes.map(size => ({ code: size.toLowerCase(), name: size }))
        );
        
        await delay(1000);

        const colorGroup = await createOptionGroup(
          `color-${productId}`,
          'Color',
          colors.map(color => ({ code: color.toLowerCase().replace(/\s+/g, '-'), name: color }))
        );

        if (!sizeGroup || !colorGroup) {
          console.warn(`⚠️ Skipping product ${productId} due to failed option group creation`);
          errorCount++;
          continue;
        }

        await delay(1500);
        
        const sizeAdded = await addOptionGroupToProduct(createdProductId, sizeGroup.id);
        
        await delay(1500);
        
        const colorAdded = await addOptionGroupToProduct(createdProductId, colorGroup.id);

        if (!sizeAdded || !colorAdded) {
          console.warn(`⚠️ Skipping product ${productId} due to failed option group assignment`);
          errorCount++;
          continue;
        }

        await delay(2000);

        const basePrice = productData.variants[0].price || 1000;
        const defaultStock = productData.variants[0].stock || 10;

        const variantsCreated = await createVariantsFromCombinations(
          createdProductId,
          productData.productTitle,
          basePrice,
          defaultStock,
          sizeGroup.options,
          colorGroup.options
        );

        if (variantsCreated) {
          successCount++;
          console.log(`✅ Successfully imported product ${productId}`);
        } else {
          errorCount++;
          console.warn(`⚠️ Product ${productId} imported with issues`);
        }

        await delay(3000);
      } catch (error) {
        console.error(`❌ Error processing product ${productId}:`, error.message);
        errorCount++;
        await delay(1500);
      }
    }

    console.log('\n🎉 Import completed!');
    console.log(`✅ Successfully imported: ${successCount} products`);
    console.log(`❌ Failed: ${errorCount} products`);

  } catch (error) {
    console.error('💥 Fatal error during import:', error);
    process.exit(1);
  }
}

// Add a function to get products with missing variants
async function getProductsWithMissingVariants() {
  try {
    console.log('🔐 Logging in...');
    await login();

    console.log('🔍 Analyzing products for missing variants...');
    
    const query = `
      query {
        products(options: { take: 100 }) {
          items {
            id
            name
            slug
            optionGroups {
              id
              code
              name
              options {
                id
                code
              }
            }
            variants {
              id
              name
              sku
            }
          }
          totalItems
        }
      }
    `;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error('❌ Failed to fetch products:', result.errors);
      return;
    }

    console.log('\n📋 Products with Missing Variants:');
    console.log('===============================');
    
    const productsWithIssues = [];
    
    result.data.products.items.forEach(product => {
      // Get size and color option groups
      const sizeGroup = product.optionGroups.find(g => g.name === 'Size');
      const colorGroup = product.optionGroups.find(g => g.name === 'Color');
      
      if (!sizeGroup || !colorGroup) {
        console.log(`🚫 Product '${product.name}' is missing option groups`);
        productsWithIssues.push(product.id);
        return;
      }
      
      // Calculate expected number of variants
      const expectedVariants = sizeGroup.options.length * colorGroup.options.length;
      const actualVariants = product.variants.length;
      
      if (actualVariants < expectedVariants) {
        console.log(`⚠️ Product '${product.name}' has missing variants`);
        console.log(`   Expected: ${expectedVariants}, Actual: ${actualVariants}`);
        console.log(`   Missing: ${expectedVariants - actualVariants} variants`);
        productsWithIssues.push(product.id);
      }
    });
    
    console.log(`\nFound ${productsWithIssues.length} products with missing variants`);
    console.log('To reimport these products, run:');
    console.log(`node index.js --reimport ${productsWithIssues.join(' ')}`);
    
    return productsWithIssues;
  } catch (error) {
    console.error('💥 Error analyzing products:', error);
    return [];
  }
}

// Enhance CLI options
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--view') || args.includes('-v')) {
    getImportedProducts().catch(console.error);
  } else if (args.includes('--check-variants')) {
    getProductsWithMissingVariants().catch(console.error);
  } else if (args.includes('--reimport')) {
    const productIds = args.slice(args.indexOf('--reimport') + 1)
                          .filter(arg => !arg.startsWith('--'));
    if (productIds.length > 0) {
      importSpecificProducts(productIds).catch(console.error);
    } else {
      console.error('❌ No product IDs specified for reimport');
    }
  } else {
    importProducts().catch(console.error);
  }
}

module.exports = { importProducts, login, createProduct, getImportedProducts, importSpecificProducts, getProductsWithMissingVariants };