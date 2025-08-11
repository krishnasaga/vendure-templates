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

## Deployment Guide for DigitalOcean Bangalore Instance

To deploy your Vendure store on the Bangalore DigitalOcean instance and make it accessible through a DNS-mapped domain, follow these steps:

### 1. Update Vendure Configuration

Update the Vendure server configuration to use port 4000:

```typescript
// In vendure-config.ts or similar file
export const config: VendureConfig = {
  apiOptions: {
    port: 4000,
    // Add hostname and CORS settings
    hostname: '0.0.0.0',
    cors: {
      origin: ['https://your-domain.com', 'http://localhost:5173'],
      credentials: true
    }
  },
  // ...other config settings
};
```

### 2. Connect to DigitalOcean Droplet

```bash
ssh root@[your-droplet-ip]
# Or using your SSH key
ssh -i ~/.ssh/your_key_file root@[your-droplet-ip]
```

### 3. Install Required Software on the Droplet

```bash
# Update system
apt-get update && apt-get upgrade -y

# Install Node.js (if not already installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 for process management
npm install -g pm2

# Install Nginx (if not already installed)
apt-get install -y nginx
```

### 4. Deploy Your Vendure Application

```bash
# Create directory for the application
mkdir -p /var/www/pastelweave

# Copy your application files to the server (from your local machine)
scp -r /path/to/local/store-pastelweave/* root@[your-droplet-ip]:/var/www/pastelweave/

# Or clone from your Git repository
git clone https://github.com/yourusername/store-pastelweave.git /var/www/pastelweave

# Install dependencies
cd /var/www/pastelweave
npm install

# Build the application (if needed)
npm run build
```

### 5. Configure Nginx as a Reverse Proxy

Create a new Nginx site configuration:

```bash
nano /etc/nginx/sites-available/pastelweave
```

Add this configuration:

```
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # For Shop API
    location /shop-api {
        proxy_pass http://localhost:4000/shop-api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    # For Admin API
    location /admin-api {
        proxy_pass http://localhost:4000/admin-api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/pastelweave /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 6. Set Up SSL with Let's Encrypt (Recommended)

```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 7. Start Your Vendure Application with PM2

```bash
cd /var/www/pastelweave
pm2 start dist/index.js --name "vendure-server"
pm2 start dist/index-worker.js --name "vendure-worker"

# Save PM2 configuration for automatic restart
pm2 save
pm2 startup
```

### 8. Update DNS Settings

Make sure your domain's DNS settings point to your DigitalOcean droplet's IP address:

1. Log in to your domain registrar's website
2. Navigate to DNS settings
3. Add or update an A record:
   - Name: @ (or subdomain)
   - Value: Your DigitalOcean droplet IP address
   - TTL: 3600 (or as desired)

### 9. Update Frontend Configuration

Update your frontend Apollo Client configuration to use your domain:

```typescript
// In your frontend Apollo client configuration
const client = new ApolloClient({
  uri: 'https://your-domain.com/shop-api',
  cache: new InMemoryCache(),
});
```

### 10. Monitoring and Maintenance

```bash
# Check logs
pm2 logs

# Monitor application
pm2 monit

# Restart application after updates
pm2 restart all
```

## Security Considerations

1. Set up a firewall (if not already configured by DigitalOcean):
   ```bash
   ufw allow ssh
   ufw allow http
   ufw allow https
   ufw enable
   ```

2. Create a non-root user for running the application (recommended)
3. Configure regular database backups
4. Set up log rotation for application logs

## Troubleshooting

### Database Locked Error
If you encounter "database is locked" errors, the script automatically retries operations with increasing delays. If problems persist, try running with fewer products at a time using the `--reimport` option.

### Missing Variants
Use `--check-variants` to identify products with missing variants, then use `--reimport` to fix them.

### CSV Formatting Issues
Ensure your CSV is properly formatted, especially if it contains quotes or special characters. The script handles single quotes in product titles automatically.

- If the site isn't accessible, check that port 4000 isn't blocked by the firewall
- Verify Nginx configuration with `nginx -t`
- Check logs with `pm2 logs` or `/var/log/nginx/error.log`
