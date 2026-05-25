import { type Configuration, LogLevel } from '@azure/msal-browser';

export const ALLOWED_DOMAINS = ['precision-cyber.com', 'ansamcal.com', 'ansamcal.onmicrosoft.com'];

export const msalConfig: Configuration = {
  auth: {
    clientId: 'f3726235-4a99-4449-87f6-0399094d99b7',
    // Tenant-specific authority — more reliable than 'common' for a single-tenant registration.
    // precision-cyber.com users must be invited as guests in the ansamcal.com tenant.
    authority: 'https://login.microsoftonline.com/4499cfa1-1a1d-47c8-a72f-f6ae39651951',
    redirectUri: 'https://nist-csf-ansa.netlify.app',
    postLogoutRedirectUri: 'https://nist-csf-ansa.netlify.app',
  },
  cache: {
    cacheLocation: 'localStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (_level, message, containsPii) => {
        if (containsPii) return;
        console.debug('[MSAL]', message);
      },
      logLevel: LogLevel.Verbose,
    },
  },
};

// Only request OIDC scopes — avoids admin-consent requirements for Graph API
export const loginRequest = {
  scopes: ['openid', 'profile', 'email'],
};
