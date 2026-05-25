import { type Configuration, LogLevel } from '@azure/msal-browser';

export const ALLOWED_DOMAINS = ['precision-cyber.com', 'ansamcal.com'];

export const msalConfig: Configuration = {
  auth: {
    clientId: 'f3726235-4a99-4449-87f6-0399094d99b7',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'https://nist-csf-ansa.netlify.app',
    postLogoutRedirectUri: 'https://nist-csf-ansa.netlify.app',
  },
  cache: {
    cacheLocation: 'sessionStorage',
  },
  system: {
    loggerOptions: {
      loggerCallback: (_level, _message, containsPii) => {
        if (containsPii) return;
      },
      logLevel: LogLevel.Error,
    },
  },
};

export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
};
