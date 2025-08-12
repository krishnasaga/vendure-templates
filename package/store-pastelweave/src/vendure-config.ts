import {
    dummyPaymentHandler,
    DefaultJobQueuePlugin,
    DefaultSchedulerPlugin,
    DefaultSearchPlugin,
    VendureConfig,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin, FileBasedTemplateLoader } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { GraphiqlPlugin } from '@vendure/graphiql-plugin';
import 'dotenv/config';
import path from 'path';

const IS_DEV = process.env.APP_ENV === 'dev';
const serverPort = 4002;

// Make sure the COOKIE_SECRET environment variable exists
if (!process.env.COOKIE_SECRET) {
    console.error('ERROR: No COOKIE_SECRET defined in environment!');
    process.exit(1);
}

// Allow your domain in CORS configuration
const allowedOrigins = [
    'https://indiastore2.duckdns.org', 
    'http://localhost:5173',
    'http://localhost:4002',
    'http://localhost:4004',
    'https://your-domain.com'
];

export const config: VendureConfig = {
    apiOptions: {
        port: serverPort,
        hostname: '0.0.0.0', // Allow connections from all IPs
        cors: {
            origin: allowedOrigins,
            credentials: true
        },
        // Add these settings for proper URL formation
        adminApiPath: 'admin-api',
        shopApiPath: 'shop-api',
        // Use absolute URLs
        adminApiPlayground: {
            settings: {
                'request.credentials': 'include',
            },
        },
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            },
        },
        // Configure to work with proxy
        middleware: [{
            handler: (req, res, next) => {
                if (req.headers['x-forwarded-proto'] === 'https') {
                    req.protocol = 'https';
                }
                next();
            },
            route: '*',
        }],
    },
    authOptions: {
        tokenMethod: ['bearer', 'cookie'],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME || 'superadmin',
            password: process.env.SUPERADMIN_PASSWORD || 'superadmin',
        },
        cookieOptions: {
          secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: {
        type: 'better-sqlite3',
        // See the README.md "Migrations" section for an explanation of
        // the `synchronize` and `migrations` options.
        synchronize: false,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: path.join(__dirname, '../vendure.sqlite'),
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    // When adding or altering custom field definitions, the database will
    // need to be updated. See the "Migrations" section in README.md.
    customFields: {},
    plugins: [
        GraphiqlPlugin.init(),
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, '../static/assets'),
            assetUrlPrefix: 'https://indiastore2.duckdns.org/assets/',
        }),
        DefaultSchedulerPlugin.init(),
        DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        EmailPlugin.init({
            devMode: true,
            outputPath: path.join(__dirname, '../static/email/test-emails'),
            route: 'mailbox',
            handlers: defaultEmailHandlers,
            templateLoader: new FileBasedTemplateLoader(path.join(__dirname, '../static/email/templates')),
            globalTemplateVars: {
                // Update these URLs to use your domain
                fromAddress: '"PastelWeave" <noreply@indiastore2.duckdns.org>',
                verifyEmailAddressUrl: 'https://indiastore2.duckdns.org/verify',
                passwordResetUrl: 'https://indiastore2.duckdns.org/password-reset',
                changeEmailAddressUrl: 'https://indiastore2.duckdns.org/verify-email-address-change'
            },
        }),
        AdminUiPlugin.init({
            route: 'admin',
            port: serverPort + 2, // Admin UI will run on 4004
            adminUiConfig: {
                apiHost: 'https://indiastore2.duckdns.org', // Use full URL with https
                apiPort: undefined, // Don't include port in URLs
                brand: 'PastelWeave Store',
                hideVendureBranding: true,
                hideVersion: false,
            },
        }),
    ],
};
