import { WebAuth } from 'auth0-js';
import { Encryptor } from './App.encryption';

const auth = new WebAuth({
  clientID: 'PqsSsHBLYS3MDS2FXthxnouqES3Amiu9',
  domain: 'megawebmaster.eu.auth0.com',
  redirectUri: process.env.REACT_APP_URL+'/login',
  responseType: 'token id_token',
  scope: 'openid profile email'
});

export class Authenticator {
  static login(email, callback) {
    auth.passwordlessStart({
      connection: 'email',
      send: 'link',
      email
    }, callback);
  }

  static validateLogin(callback, errorCallback) {
    if (this.isLoggedIn()) {
      return callback();
    }

    auth.parseHash({ hash: window.location.hash }, (error, authentication) => {
      if (error) {
        errorCallback(`errors.login.${error.error}`);
      }
      if (!authentication) {
        return;
      }

      let expiresAt = JSON.stringify((authentication.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('token', authentication.accessToken);
      localStorage.setItem('jwt', authentication.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('expiration', authentication.expiresIn.toString());
      // TODO: Add nice data from the JWT token to store so we can show user's name/nickname and avatar :)
      callback();
    });
  }

  static getToken() {
    return localStorage.getItem('jwt');
  }

  static isLoggedIn() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

    return expiresAt !== null && new Date().getTime() < expiresAt;
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('jwt');
    localStorage.removeItem('expiration');
    localStorage.removeItem('expires_at');
    Encryptor.removePasswords();
    auth.logout({
      clientID: 'PqsSsHBLYS3MDS2FXthxnouqES3Amiu9',
      returnTo: process.env.REACT_APP_URL,
    });
  }

  static storeCurrentPath() {
    localStorage.setItem('referrer', window.location.href);
  }

  static restorePath() {
    const referrer = localStorage.getItem('referrer');
    localStorage.removeItem('referrer');

    if (referrer === null) {
      return false;
    }

    window.location.href = referrer;

    return true;
  }
}
