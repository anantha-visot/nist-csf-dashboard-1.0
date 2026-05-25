import { type Configuration, LogLevel } from '@azure/msal-browser';

export const ALLOWED_DOMAINS = ['precision-cyber.com', 'ansamcal.com', 'ansamcal.onmicrosoft.com'];

export const loginRequest = {
  scopes: ['openid', 'profile', 'email'],
};

// Key used to remember which tenant initiated the redirect so the correct
// MSAL instance is used when the app reloads after Microsoft's callback.
export const TENANT_KEY = 'nist_msal_tenant';

const loggerOptions = {
  loggerCallback: (_level: number, message: string, containsPii: boolean) => {
    if (containsPii) return;
    console.debug('[MSAL]', message);
  },
  logLevel: LogLevel.Error,
};

export const msalConfigAnsamcal: Configuration = {
  auth: {
    clientId: 'f3726235-4a99-4449-87f6-0399094d99b7',
    authority: 'https://login.microsoftonline.com/4499cfa1-1a1d-47c8-a72f-f6ae39651951',
    redirectUri: 'https://nist-csf-ansa.netlify.app',
    postLogoutRedirectUri: 'https://nist-csf-ansa.netlify.app',
  },
  cache: { cacheLocation: 'localStorage' },
  system: { loggerOptions },
};

export const msalConfigPcds: Configuration = {
  auth: {
    clientId: '14d22694-9f40-4be1-a2d4-dedae915f4d5',
    authority: 'https://login.microsoftonline.com/5c13d307-0720-423a-9e91-54a8e4aff38d',
    redirectUri: 'https://nist-csf-ansa.netlify.app',
    postLogoutRedirectUri: 'https://nist-csf-ansa.netlify.app',
  },
  cache: { cacheLocation: 'localStorage' },
  system: { loggerOptions },
};
