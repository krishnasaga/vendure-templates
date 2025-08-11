const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const nodeFetch = require('node-fetch');
const fetchCookie = require('fetch-cookie/node-fetch')(nodeFetch);
const fetch = fetchCookie;

const endpoint = 'https://indiastore2.duckdns.org/admin-api';
const adminEmail = 'superadmin';
const adminPassword = 'superadmin';

// Function to get the data file path from command line arguments or find one
function getDataFilePath() {
  // Check if a file path was provided as a command-line argument
  const args = process.argv.slice(2);
  const filePathIndex = args.findIndex(arg => arg === '--file' || arg === '-f');
  
  if (filePathIndex !== -1 && args.length > filePathIndex + 1) {
    const filePath = args[filePathIndex + 1];
    if (fs.existsSync(filePath)) {
      return filePath;
    } else {
      console.error(`❌ Specified file not found: ${filePath}`);
      process.exit(1);
    }
  }
  
  // If no valid file path was provided, search for files in the current directory
  console.log('No specific file provided, searching for Excel/CSV files in the current directory...');
  
  const dir = './';
  const files = fs.readdirSync(dir);
  // Look for Excel files first, then CSV
  const excelFile = files.find(file => file.endsWith('.xlsx') || file.endsWith('.xls'));
  if (excelFile) return path.join(dir, excelFile);
  
  const csvFile = files.find(file => file.endsWith('.csv'));
  if (csvFile) return path.join(dir, csvFile);
  
  console.error('❌ No Excel or CSV file found in the current directory');
  console.error('Please specify a file using: node index.js --file <path/to/file.xlsx>');
  process.exit(1);
}

// Function to parse data file
function parseDataFile(filePath) {
  console.log(`📂 Loading data from: ${filePath}`);
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }
  
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = xlsx.utils.sheet_to_json(sheet);
    
    if (rows.length === 0) {
      console.error('❌ No data found in the file');
      process.exit(1);
    }
    
    console.log(`📊 Found ${rows.length} rows of data`);
    return rows;
  } catch (error) {
    console.error(`❌ Error parsing file: ${error.message}`);
    process.exit(1);
  }
}

// Map common column names to standardized names
function mapColumnNames(rows) {
  if (rows.length === 0) return [];
  
  const firstRow = rows[0];
  const keys = Object.keys(firstRow);
  
  const columnMap = {
    // Product ID variations
    'product id': 'Product ID',
    'product_id': 'Product ID',
    'productid': 'Product ID',
    'prod_id': 'Product ID',
    'id': 'Product ID',
    
    // Title variations
    'title': 'Product Title',
    'product title': 'Product Title',
    'product_title': 'Product Title',
    'name': 'Product Title',
    'product name': 'Product Title',
    'product_name': 'Product Title',
    
    // Category variations
    'category': 'Category',
    'categories': 'Category',
    'category_name': 'Category',
    'product category': 'Category',
    'product_category': 'Category',
    'type': 'Category',
    'product type': 'Category',
    'product_type': 'Category',
    
    // Material variations
    'material': 'Material',
    'material_type': 'Material',
    'fabric': 'Material',
    'composition': 'Material',
    
    // Variant ID variations
    'variant id': 'Variant ID',
    'variant_id': 'Variant ID',
    'variantid': 'Variant ID',
    'sku': 'Variant ID',
    
    // Price variations
    'price': 'Price (₹)',
    'price (rs)': 'Price (₹)',
    'price(rs)': 'Price (₹)',
    'price_inr': 'Price (₹)',
    'cost': 'Price (₹)',
    
    // Color variations
    'color': 'Color Name',
    'colour': 'Color Name',
    'color name': 'Color Name',
    'color_name': 'Color Name',
    
    // Color code variations
    'color code': 'Color Code',
    'color_code': 'Color Code',
    'colour code': 'Color Code',
    'color hex': 'Color Code',
    'hex': 'Color Code',
    
    // Size variations
    'size': 'Size',
    'size_name': 'Size',
    'size code': 'Size',
    
    // Gender variations
    'gender': 'Gender',
    'sex': 'Gender',
    'for': 'Gender',
    
    // Stock variations
    'stock': 'In Stock',
    'in stock': 'In Stock',
    'inventory': 'In Stock',
    'quantity': 'In Stock',
    'qty': 'In Stock'
  };
  
  // Create a map for the actual columns in this file
  const actualColumnMap = {};
  keys.forEach(key => {
    const lowerKey = key.toLowerCase();
    if (columnMap[lowerKey]) {
      actualColumnMap[key] = columnMap[lowerKey];
    } else {
      // Keep original if no mapping found
      actualColumnMap[key] = key;
    }
  });
  
  // Create new rows with mapped column names
  return rows.map(row => {
    const newRow = {};
    Object.keys(row).forEach(key => {
      const newKey = actualColumnMap[key] || key;
      newRow[newKey] = row[key];
    });
    return newRow;
  });
}

// Function to extract products from mapped rows
function extractProducts(mappedRows) {
  const products = {};
  const requiredFields = ['Product ID', 'Product Title'];
  const optionalFields = {
    'Category': 'Uncategorized',
    'Material': 'Various',
    'Size': 'One Size',
    'Color Name': 'Default',
    'Color Code': '#000000',
    'Gender': 'Unisex',
    'Price (₹)': 1000,
    'In Stock': 10
  };
  
  mappedRows.forEach((row, index) => {
    // Check if required fields exist
    const missingFields = requiredFields.filter(field => !row[field] && row[field] !== 0);
    if (missingFields.length > 0) {
      console.warn(`⚠️ Row ${index + 1}: Missing required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    const pid = String(row['Product ID']).padStart(3, '0');
    
    if (!products[pid]) {
      products[pid] = {
        productTitle: row['Product Title'],
        category: row['Category'] || optionalFields['Category'],
        material: row['Material'] || optionalFields['Material'],
        variants: []
      };
    }
    
    // Create variant with fallbacks for optional fields
    products[pid].variants.push({
      variantId: row['Variant ID'] || `${pid}-V${products[pid].variants.length + 1}`,
      price: Number(row['Price (₹)'] || optionalFields['Price (₹)']),
      colorName: row['Color Name'] || optionalFields['Color Name'],
      colorCode: row['Color Code'] || optionalFields['Color Code'],
      size: row['Size'] || optionalFields['Size'],
      gender: row['Gender'] || optionalFields['Gender'],
      stock: Number(row['In Stock'] !== undefined ? row['In Stock'] : optionalFields['In Stock'])
    });
  });
  
  console.log(`🏭 Extracted ${Object.keys(products).length} unique products`);
  return products;
}

// Find and load data
const dataFilePath = getDataFilePath();
const rawRows = parseDataFile(dataFilePath);
const mappedRows = mapColumnNames(rawRows);
const products = extractProducts(mappedRows);

let authToken = '';

async function login(maxRetries = 5) {
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

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: authQuery }),
      });

      const result = await res.json();

      if (result.errors) {
        if (result.errors[0].message.includes('database is locked') && attempt < maxRetries - 1) {
          console.log(`🔄 Database locked during login, retrying in ${(attempt + 1) * 2} seconds... (Attempt ${attempt + 1}/${maxRetries})`);
          await delay((attempt + 1) * 2000); // Exponential backoff with longer delays
          continue;
        }
        console.error('❌ Login failed:', result.errors);
        process.exit(1);
      }

      if (result.data.login?.errorCode) {
        console.error('❌ Login failed:', result.data.login.message);
        process.exit(1);
      }

      console.log(`✅ Logged in as ${result.data.login.identifier}`);
      return;
    } catch (error) {
      if (attempt < maxRetries - 1) {
        console.log(`🔄 Network error during login, retrying in ${(attempt + 1) * 2} seconds... (Attempt ${attempt + 1}/${maxRetries})`);
        await delay((attempt + 1) * 2000);
      } else {
        console.error('❌ Login failed after multiple attempts:', error);
        process.exit(1);
      }
    }
  }
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

// Category management functions
async function findCategory(name) {
  // Try first with exact collection API
  const collectionsQuery = `
    query {
      collections(options: { filter: { name: { contains: "${name.replace(/"/g, '\\"')}" } } }) {
        items {
          id
          name
          slug
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: collectionsQuery }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error('❌ Failed to search for category:', result.errors);
      return null;
    }

    const matchingCategory = result.data.collections.items.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    
    if (matchingCategory) {
      return matchingCategory;
    }
    
    // Fall back to search API if no exact match found
    return await searchForCategory(name);
  } catch (error) {
    console.error(`❌ Error searching for category ${name}:`, error.message);
    return await searchForCategory(name);
  }
}

// Helper function to search for categories
async function searchForCategory(name) {
  const query = `
    query {
      search(input: {
        term: "${name.replace(/"/g, '\\"')}",

        facetValueFilters: [],
        groupByProduct: true
      }) {
        collections {
          collection { id name slug }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error('❌ Failed to search for category:', result.errors);
      return null;
    }

    const matchingCategory = result.data.search.collections.find(
      c => c.collection.name.toLowerCase() === name.toLowerCase()
    );
    
    return matchingCategory ? matchingCategory.collection : null;
  } catch (error) {
    console.error(`❌ Error searching for category ${name}:`, error.message);
    return null;
  }
}

async function createCategory(name, parentId = null, retryCount = 3) {
  // Create a slug from the category name
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const mutation = `
    mutation {
      createCollection(input: {
        isPrivate: false,
        filters: [], 
        translations: [
          { 
            languageCode: en, 
            name: "${name.replace(/"/g, '\\"')}", 
            slug: "${slug}", 
            description: "${name.replace(/"/g, '\\"')} collection" 
          }
        ],
        parentId: ${parentId ? `"${parentId}"` : "null"}
      }) {
        id
        name
        slug
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
          console.log(`🔄 Database locked, retrying category creation '${name}' (attempt ${attempt + 1})...`);
          await delay(1000 * (attempt + 1));
          continue;
        }
        console.error(`❌ Failed to create category '${name}':`, result.errors);
        return null;
      }

      console.log(`✅ Created category: ${name}`);
      return result.data.createCollection;
    } catch (error) {
      if (attempt < retryCount - 1) {
        console.log(`🔄 Network error, retrying category creation '${name}' (attempt ${attempt + 1})...`);
        await delay(1000 * (attempt + 1));
      } else {
        console.error(`❌ Failed to create category '${name}' after ${retryCount} attempts:`, error.message);
        return null;
      }
    }
  }
  return null;
}

async function addProductToCategory(productId, categoryId, retryCount = 3) {
  const mutation = `
    mutation {
      addCollectionToProduct(
        productId: "${productId}",
        collectionId: "${categoryId}"
      ) {
        id
        collections {
          id
          name
        }
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
          console.log(`🔄 Database locked, retrying adding product to category (attempt ${attempt + 1})...`);
          await delay(1000 * (attempt + 1));
          continue;
        }
        
        // Try alternative mutation if the first one fails
        if (attempt === 0 && result.errors[0].message.includes('Cannot query field')) {
          console.log(`ℹ️ Trying alternative method to add product to collection...`);
          return await addProductToCategoryAlternative(productId, categoryId, retryCount - 1);
        }
        
        console.error(`❌ Failed to add product ${productId} to category ${categoryId}:`, result.errors);
        return false;
      }

      return true;
    } catch (error) {
      if (attempt < retryCount - 1) {
        console.log(`🔄 Network error, retrying adding product to category (attempt ${attempt + 1})...`);
        await delay(1000 * (attempt + 1));
      } else {
        console.error(`❌ Failed to add product ${productId} to category ${categoryId} after ${retryCount} attempts:`, error.message);
        return false;
      }
    }
  }
  return false;
}

// Alternative method to add product to category using collection update
async function addProductToCategoryAlternative(productId, categoryId, retryCount = 3) {
  // Try with addProductsToCollection
  const mutation1 = `
    mutation {
      addProductsToCollection(
        collectionId: "${categoryId}",
        productIds: ["${productId}"]
      ) {
        id
        name
      }
    }
  `;
  
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation1 }),
    });
    
    const result = await res.json();
    
    if (!result.errors) {
      return true;
    }
    
    // If that fails, try using the moveProduct mutation
    console.log(`ℹ️ Trying third method for collection assignment...`);
    
    const mutation2 = `
      mutation {
        moveProduct(
          productId: "${productId}",
          from: "default-channel",
          to: "${categoryId}"
        ) {
          id
          name
        }
      }
    `;
    
    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        const moveRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: mutation2 }),
        });
        
        const moveResult = await moveRes.json();
        
        if (!moveResult.errors) {
          return true;
        }
        
        // If both approaches fail, try using a different approach with filters
        if (attempt === retryCount - 1) {
          console.log(`ℹ️ Trying final method with collection filters...`);
          return await addProductToCategoryWithFilters(productId, categoryId);
        }
        
        await delay(1000);
      } catch (error) {
        if (attempt < retryCount - 1) {
          console.log(`🔄 Network error, retrying (attempt ${attempt + 1})...`);
          await delay(1000);
        } else {
          console.error(`❌ All methods failed to add product ${productId} to category ${categoryId}`);
          return false;
        }
      }
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error in alternative category assignment:`, error.message);
    return false;
  }
}

// New function to add product to category using filters
async function addProductToCategoryWithFilters(productId, categoryId) {
  // First get product details to use in filter
  const productQuery = `
    query {
      product(id: "${productId}") {
        id
        name
        slug
      }
    }
  `;
  
  try {
    const productRes = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: productQuery }),
    });
    
    const productResult = await productRes.json();
    
    if (productResult.errors) {
      console.error(`❌ Failed to get product data:`, productResult.errors);
      return false;
    }
    
    const productName = productResult.data.product.name;
    const productSlug = productResult.data.product.slug;
    
    // Create a filter for the collection that targets this product
    const mutation = `
      mutation {
        updateCollection(input: {
          id: "${categoryId}",
          filters: [
            {
              code: "facet-value-filter",
              arguments: [
                {
                  name: "facetValueIds",
                  value: "[\\"${productSlug}\\"]"
                },
                {
                  name: "containsAny",
                  value: "false"
                }
              ]
            }
          ]
        }) {
          id
          name
        }
      }
    `;
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    });
    
    const result = await res.json();
    
    if (result.errors) {
      console.error(`❌ Failed to update collection with filter:`, result.errors);
      return false;
    }
    
    console.log(`✅ Added product to category using filters`);
    return true;
  } catch (error) {
    console.error(`❌ Error adding product to category with filters:`, error.message);
    return false;
  }
}

async function ensureCategoryExists(categoryName) {
  // First check if the category already exists
  let category = await findCategory(categoryName);
  
  // If not found, create it
  if (!category) {
    console.log(`🔍 Category "${categoryName}" not found, creating now...`);
    category = await createCategory(categoryName);
    await delay(1000); // Add delay after creation
  } else {
    console.log(`✓ Found existing category: ${categoryName}`);
  }
  
  return category;
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Add functions to handle facets for categories
async function findFacet(name) {
  const query = `
    query {
      facets {
        items {
          id
          name
          code
          values {
            id
            name
            code
          }
        }
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error('❌ Failed to fetch facets:', result.errors);
      return null;
    }

    const categoryFacet = result.data.facets.items.find(f => f.code === 'category');
    return categoryFacet;
  } catch (error) {
    console.error('❌ Error fetching facets:', error.message);
    return null;
  }
}

async function createCategoryFacet() {
  const mutation = `
    mutation {
      createFacet(input: {
        code: "category",
        isPrivate: false,
        translations: [
          { languageCode: en, name: "Category" }
        ]
      }) {
        id
        name
        code
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error('❌ Failed to create category facet:', result.errors);
      return null;
    }
    
    console.log('✅ Created category facet');
    return result.data.createFacet;
  } catch (error) {
    console.error('❌ Error creating category facet:', error.message);
    return null;
  }
}

async function createFacetValue(facetId, categoryName) {
  // Use just the category name for the code, with simple formatting
  const code = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  const mutation = `
    mutation {
      createFacetValues(input: [{
        facetId: "${facetId}",
        code: "${code}",
        translations: [
          { languageCode: en, name: "${categoryName.replace(/"/g, '\\"')}" }
        ]
      }]) {
        id
        code
        name
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error(`❌ Failed to create facet value for ${categoryName}:`, result.errors);
      return null;
    }
    
    console.log(`✅ Created facet value for category: ${categoryName}`);
    return result.data.createFacetValues[0];
  } catch (error) {
    console.error(`❌ Error creating facet value for ${categoryName}:`, error.message);
    return null;
  }
}

async function assignFacetValueToProduct(productId, facetValueId) {
  const mutation = `
    mutation {
      updateProduct(input: {
        id: "${productId}",
        facetValueIds: ["${facetValueId}"]
      }) {
        id
        name
      }
    }
  `;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    });

    const result = await res.json();
    
    if (result.errors) {
      console.error(`❌ Failed to assign facet value to product:`, result.errors);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error assigning facet value to product:`, error.message);
    return false;
  }
}

async function ensureCategoryFacetExists(categoryName) {
  // First check if the Category facet exists
  let categoryFacet = await findFacet('category');
  
  // If not found, create it
  if (!categoryFacet) {
    console.log(`🔍 Category facet not found, creating now...`);
    categoryFacet = await createCategoryFacet();
    await delay(1000);
  }
  
  if (!categoryFacet) {
    return null;
  }
  
  // Check if this specific category value exists
  const existingValue = categoryFacet.values?.find(v => v.name.toLowerCase() === categoryName.toLowerCase());
  
  if (existingValue) {
    return existingValue;
  }
  
  // Create the facet value for this category
  return await createFacetValue(categoryFacet.id, categoryName);
}

// Modify importProducts to include facet assignment
async function importProducts() {
  try {
    console.log('🔐 Logging in...');
    await login();

    console.log('📦 Starting product import...');

    let successCount = 0;
    let errorCount = 0;
    
    // Track categories for products
    const categoryMap = {};
    const facetValueMap = {};

    // Process products sequentially instead of all at once
    for (const [productId, productData] of Object.entries(products)) {
      try {
        console.log(`\n📝 Processing product ${productId}: ${productData.productTitle}`);

        // Ensure the product's category exists
        const categoryName = productData.category;
        if (!categoryMap[categoryName]) {
          const category = await ensureCategoryExists(categoryName);
          if (category) {
            categoryMap[categoryName] = category.id;
          }
        }
        
        // Ensure the category facet value exists
        if (!facetValueMap[categoryName]) {
          const facetValue = await ensureCategoryFacetExists(categoryName);
          if (facetValue) {
            facetValueMap[categoryName] = facetValue.id;
          }
        }

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
        
        // Add product to its category if we have a valid category ID
        if (categoryMap[categoryName]) {
          console.log(`🏷️ Assigning product to category: ${categoryName}`);
          await addProductToCategory(createdProductId, categoryMap[categoryName]);
          await delay(1000); // Add delay after category assignment
        }
        
        // Assign the category facet value to the product
        if (facetValueMap[categoryName]) {
          console.log(`🔖 Assigning category facet value: ${categoryName}`);
          await assignFacetValueToProduct(createdProductId, facetValueMap[categoryName]);
          await delay(1000);
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

        // Add significant delay before creating variants
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

// Also update importSpecificProducts function to match the changes in importProducts
async function importSpecificProducts(productIds) {
  try {
    console.log('🔐 Logging in...');
    await login();

    console.log(`📦 Starting import of ${productIds.length} specific products...`);

    let successCount = 0;
    let errorCount = 0;
    
    // Track categories for products
    const categoryMap = {};

    for (const productId of productIds) {
      if (!products[productId]) {
        console.warn(`⚠️ Product ID ${productId} not found in data`);
        continue;
      }
      
      const productData = products[productId];
      
      try {
        console.log(`\n📝 Processing product ${productId}: ${productData.productTitle}`);

        // Ensure the product's category exists
        const categoryName = productData.category;
        if (!categoryMap[categoryName]) {
          const category = await ensureCategoryExists(categoryName);
          if (category) {
            categoryMap[categoryName] = category.id;
          }
        }

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
        
        // Add product to its category if we have a valid category ID
        if (categoryMap[categoryName]) {
          console.log(`🏷️ Assigning product to category: ${categoryName}`);
          await addProductToCategory(createdProductId, categoryMap[categoryName]);
          await delay(1000); // Add delay after category assignment
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

        await delay(1000);
        
        const sizeAdded = await addOptionGroupToProduct(createdProductId, sizeGroup.id);
        
        await delay(1000);
        
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

// Add a function to import specific products (useful for retrying failed ones)
async function importSpecificProducts(productIds) {
  try {
    console.log('🔐 Logging in...');
    await login();

    console.log(`📦 Starting import of ${productIds.length} specific products...`);

    let successCount = 0;
    let errorCount = 0;
    
    // Track categories for products
    const categoryMap = {};

    for (const productId of productIds) {
      if (!products[productId]) {
        console.warn(`⚠️ Product ID ${productId} not found in data`);
        continue;
      }
      
      const productData = products[productId];
      
      try {
        console.log(`\n📝 Processing product ${productId}: ${productData.productTitle}`);

        // Ensure the product's category exists
        const categoryName = productData.category;
        if (!categoryMap[categoryName]) {
          const category = await ensureCategoryExists(categoryName);
          if (category) {
            categoryMap[categoryName] = category.id;
          }
        }

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
        
        // Add product to its category if we have a valid category ID
        if (categoryMap[categoryName]) {
          console.log(`🏷️ Assigning product to category: ${categoryName}`);
          await addProductToCategory(createdProductId, categoryMap[categoryName]);
          await delay(1000); // Add delay after category assignment
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

        await delay(1000);
        
        const sizeAdded = await addOptionGroupToProduct(createdProductId, sizeGroup.id);
        
        await delay(1000);
        
        const colorAdded = await addOptionGroupToProduct(createdProductId, colorGroup.id);

        if (!sizeAdded || !colorAdded) {
          console.warn(`⚠️ Skipping product ${productId} due to failed option group assignment`);
          errorCount++;
          continue;
        }

        await delay(3000);

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

// Implement the missing getImportedProducts function
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
            collections {
              id
              name
            }
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
      
      // Display categories
      if (product.collections && product.collections.length > 0) {
        console.log(`   Categories: ${product.collections.map(c => c.name).join(', ')}`);
      }
      
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

// Enhance CLI options
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Add help option
  if (args.includes('--help') || args.includes('-h')) {
    console.log('\nUsage: node index.js [options]');
    console.log('\nOptions:');
    console.log('  --file, -f <path>    Specify Excel or CSV file to import');
    console.log('  --view, -v           View imported products');
    console.log('  --check-variants     Check for products with missing variants');
    console.log('  --list-categories    List all categories');
    console.log('  --list-facets        List all facets and their values');
    console.log('  --reimport <ids>     Reimport specific products by ID');
    console.log('  --help, -h           Show this help message\n');
    process.exit(0);
  }
  
  if (args.includes('--view') || args.includes('-v')) {
    getImportedProducts().catch(console.error);
  } else if (args.includes('--check-variants')) {
    getProductsWithMissingVariants().catch(console.error);
  } else if (args.includes('--list-categories')) {
    // Add a function to list all categories
    (async () => {
      try {
        await login();
        
        const query = `
          query {
            collections {
              items {
                id
                name
                slug
                parent { id name }
                children { id name }
                productVariants { totalItems }
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
          console.error('❌ Failed to fetch categories:', result.errors);
          return;
        }
        
        console.log('\n📂 Categories:');
        console.log('=============');
        
        result.data.collections.items.forEach(cat => {
          console.log(`📁 ${cat.name}`);
          console.log(`   ID: ${cat.id}`);
          console.log(`   Products: ${cat.productVariants.totalItems}`);
          if (cat.parent) {
            console.log(`   Parent: ${cat.parent.name}`);
          }
          if (cat.children.length > 0) {
            console.log(`   Children: ${cat.children.map(c => c.name).join(', ')}`);
          }
          console.log('');
        });
      } catch (error) {
        console.error('💥 Error fetching categories:', error);
      }
    })();
  } else if (args.includes('--reimport')) {
    const productIds = args.slice(args.indexOf('--reimport') + 1)
                          .filter(arg => !arg.startsWith('--'));
    if (productIds.length > 0) {
      importSpecificProducts(productIds).catch(console.error);
    } else {
      console.error('❌ No product IDs specified for reimport');
    }
  } else if (args.includes('--list-facets')) {
    (async () => {
      try {
        await login();
        
        const query = `
          query {
            facets {
              items {
                id
                name
                code
                values {
                  id
                  name
                  code
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
          console.error('❌ Failed to fetch facets:', result.errors);
          return;
        }
        
        console.log('\n📊 Facets:');
        console.log('=========');
        
        result.data.facets.items.forEach(facet => {
          console.log(`📍 ${facet.name} (${facet.code})`);
          console.log(`   ID: ${facet.id}`);
          console.log(`   Values: ${facet.values.length}`);
          
          facet.values.forEach(value => {
            console.log(`      - ${value.name} (${value.code})`);
          });
          
          console.log('');
        });
      } catch (error) {
        console.error('💥 Error fetching facets:', error);
      }
    })();
  } else {
    importProducts().catch(console.error);
  }
}

module.exports = { 
  importProducts, 
  login, 
  createProduct, 
  getImportedProducts, 
  importSpecificProducts, 
  getProductsWithMissingVariants,
  createCategory,
  addProductToCategory,
  findCategory,
  ensureCategoryExists,
  findFacet,
  createCategoryFacet,
  createFacetValue,
  assignFacetValueToProduct,
  ensureCategoryFacetExists
};