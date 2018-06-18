import openpgp, { message, util } from 'openpgp';
import { Observable } from 'rxjs/Rx';
import { redirect } from 'redux-first-router';
import 'rxjs/add/operator/mergeAll';

import { setEncryptionPasswordError } from './components/login';
import { ROUTE_LOGIN } from './routes';

export const initEncryption = () => {
  openpgp.initWorker({
    workers: [
      new Worker('/encryptionWorker.js'),
    ],
    n: 1,
    path: '/encryptionWorker.js'
  });
  openpgp.config = { aead_protect: true };
};

function EncryptorError() {}
EncryptorError.prototype = new Error();

export class Encryptor {
  static setPassword(password) {
    localStorage.setItem('encryption-password', password);
  }

  static removePassword() {
    localStorage.removeItem('encryption-password');
  }

  static removePassword2(budget) {
    localStorage.removeItem(`encryption-password-${budget}`);
  }

  static hasEncryptionPassword() {
    return this.getPassword() !== null;
  }

  static hasEncryptionPassword2(budget) {
    return this.getPassword2(budget) !== null;
  }

  static getPassword() {
    return localStorage.getItem('encryption-password');
  }

  static getPassword2(budget) {
    return localStorage.getItem(`encryption-password-${budget}`);
  }

  static async encrypt(text) {
    const password = this.getPassword();
    const encrypted = await openpgp.encrypt({
      data: text,
      passwords: [password],
      armor: false,
    });
    const message = encrypted.message.packets.write();

    return util.Uint8Array_to_b64(message);
  }

  static async encrypt2(budget, text) {
    const password = this.getPassword2(budget);
    const encrypted = await openpgp.encrypt({
      data: text,
      passwords: [password],
      armor: false,
    });
    const message = encrypted.message.packets.write();

    return util.Uint8Array_to_b64(message);
  }

  static async decrypt(ciphertext) {
    try {
      const password = this.getPassword();
      const sourceArray = util.b64_to_Uint8Array(ciphertext);
      const plaintext = await openpgp.decrypt({
        message: message.read(sourceArray),
        passwords: [password],
      });

      return plaintext.data;
    } catch(e) {
      throw new EncryptorError();
    }
  }

  static async decrypt2(budget, encryptedText) {
    try {
      const password = this.getPassword2(budget);
      const sourceArray = util.b64_to_Uint8Array(encryptedText);
      const plaintext = await openpgp.decrypt({
        message: message.read(sourceArray),
        passwords: [password],
      });

      return plaintext.data;
    } catch(e) {
      throw new EncryptorError();
    }
  }
}

export const handleEncryptionError = (handler) => (error) => {
  if (error instanceof EncryptorError) {
    Encryptor.removePassword();

    return Observable.of([
      redirect({ type: ROUTE_LOGIN }),
      setEncryptionPasswordError('errors.invalid-encryption-password'),
    ]).mergeAll();
  }

  return handler(error);
};

export const handleEncryptionError2 = (budget) => (error) => {
  if (error instanceof EncryptorError) {
    // Encryptor.removePassword2(budget);

    return Observable.of([
      // redirect({ type: ROUTE_LOGIN }),
      // TODO: Proper action creator and type
      { type: 'ASK_ENCRYPTION_PASSWORD', error: '' },
      // setEncryptionPasswordError('errors.invalid-encryption-password'),
    ]).mergeAll();
  }

  throw error;
};
