# PastelWeave Store Data Import Tool

This tool imports product data from Excel or CSV files into your Vendure store. It's designed to be flexible with different file formats and can handle various column naming conventions.

## Prerequisites

- Node.js (v14 or higher)
- A running Vendure server
- Access to the Vendure Admin API

## Installation

1. Make sure all dependencies are installed:

```bash
npm install
```

## Usage

### Basic Import

To import products from a data file:

```bash
node index.js
```

By default, the script will look for any Excel (.xlsx, .xls) or CSV file in the current directory.

### Specify a File

To import from a specific file:

```bash
node index.js --file path/to/your/data.xlsx
```

or using the short form:

```bash
node index.js -f path/to/your/data.xlsx
```

### Other Commands

- View imported products:
  ```bash
  node index.js --view
  ```

- Check for products with missing variants:
  ```bash
  node index.js --check-variants
  ```

- List all categories:
  ```bash
  node index.js --list-categories
  ```

- List all facets and their values:
  ```bash
  node index.js --list-facets
  ```

- Reimport specific products by their IDs:
  ```bash
  node index.js --reimport 021 022 023
  ```

- Show help message:
  ```bash
  node index.js --help
  ```

## Data File Format

The importer supports various column naming conventions, but your file should include at least:

- Product ID
- Product Title (or Name)

Optional fields include:
- Category
- Material
- Variant ID
- Price
- Color Name
- Color Code
- Size
- Gender
- Stock levels

## Configuration

By default, the script connects to `http://localhost:3000/admin-api` with the following credentials:
- Username: `superadmin`
- Password: `superadmin`

To change these settings, edit the variables at the top of `index.js`.

## Troubleshooting

### Database Locked Error
If you encounter "database is locked" errors, the script automatically retries operations with increasing delays. If problems persist, try running with fewer products at a time using the `--reimport` option.

### Missing Variants
Use `--check-variants` to identify products with missing variants, then use `--reimport` to fix them.

### CSV Formatting Issues
Ensure your CSV is properly formatted, especially if it contains quotes or special characters. The script handles single quotes in product titles automatically.

## Examples

Import products from a specific file:
```bash
node index.js --file Dress_Catalog___10_Products___4_Colors___4_Sizes.csv
```

View all imported products:
```bash
node index.js --view
```

Reimport specific products:
```bash
node index.js --reimport 021 022
```
