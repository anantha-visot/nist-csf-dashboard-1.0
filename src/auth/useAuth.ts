import { useState, useEffect } from 'react';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { InteractionStatus, EventType, PublicClientApplication } from '@azure/msal-browser';
import { loginRequest, ALLOWED_DOMAINS, msalConfigPcds, TENANT_KEY } from './msalConfig';

export function useAuth() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const id = instance.addEventCallback((event) => {
      if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
        const msg = (event.error as Error)?.message ?? 'Sign-in failed. Please try again.';
        console.error('[MSAL] ACQUIRE_TOKEN_FAILURE', event.error);
        setAuthError(msg);
      }
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        setAuthError(null);
      }
    });
    return () => { if (id) instance.removeEventCallback(id); };
  }, [instance]);

  const account = accounts[0] ?? null;
  const email = account?.username ?? '';
  const name = account?.name ?? '';
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  const isDomainAllowed = ALLOWED_DOMAINS.includes(domain);

  const signInAnsamcal = () => {
    setAuthError(null);
    localStorage.setItem(TENANT_KEY, 'ansamcal');
    instance.loginRedirect(loginRequest);
  };

  const signInPcds = () => {
    setAuthError(null);
    localStorage.setItem(TENANT_KEY, 'pcds');
    // Spin up a temporary PCDS instance just to initiate the redirect.
    // On return, main.tsx reads the TENANT_KEY and creates the matching instance.
    const pcdsInstance = new PublicClientApplication(msalConfigPcds);
    pcdsInstance.initialize().then(() => pcdsInstance.loginRedirect(loginRequest));
  };

  const signOut = () => {
    localStorage.removeItem(TENANT_KEY);
    instance.logoutRedirect({
      account,
      postLogoutRedirectUri: 'https://nist-csf-ansa.netlify.app',
    });
  };

  return {
    isAuthenticated,
    isAuthorized: isAuthenticated && isDomainAllowed,
    isLoading: inProgress !== InteractionStatus.None,
    account,
    email,
    name,
    domain,
    isDomainAllowed,
    authError,
    signInAnsamcal,
    signInPcds,
    signOut,
  };
}
