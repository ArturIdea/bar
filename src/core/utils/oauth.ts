import Cookies from 'universal-cookie';
import { REDIRECT_URI } from '@/core/config';

export const generateCodeVerifier = () => {
  const randomArray = new Uint8Array(32);
  window.crypto.getRandomValues(randomArray);
  return btoa(String.fromCharCode(...Array.from(randomArray)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const generateCodeChallenge = async (verifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...Array.from(new Uint8Array(hash))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export function getRedirectURI(): string {
  const cookies = new Cookies();
  const locale = cookies.get('NEXT_LOCALE') || 'en';
  return `${REDIRECT_URI}/${locale}/callback`;
}
