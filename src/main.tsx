import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication, EventType, type AuthenticationResult } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfigAnsamcal, msalConfigPcds, TENANT_KEY } from './auth/msalConfig';
import './index.css';
import App from './App.tsx';

// Pick the right config based on which tenant initiated the current redirect.
// Defaults to ansamcal if no hint is stored.
const tenant = localStorage.getItem(TENANT_KEY) ?? 'ansamcal';
const msalInstance = new PublicClientApplication(
  tenant === 'pcds' ? msalConfigPcds : msalConfigAnsamcal,
);

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const payload = event.payload as AuthenticationResult;
    if (payload?.account) {
      msalInstance.setActiveAccount(payload.account);
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>,
);
