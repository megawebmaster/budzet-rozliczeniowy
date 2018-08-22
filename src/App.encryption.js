import openpgp, { message, util } from 'openpgp';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeAll';

import { requirePassword, requirePasswordError } from './components/password-requirement';

export const initEncryption = () => {
  openpgp.initWorker({
    n: 1,
    path: '/encryptionWorker.js'
  });
  openpgp.config = { aead_protect: true };
};

function EncryptorError(message) {
  this.name = 'EncryptorError';
  this.message = message || '';
}

EncryptorError.prototype = Error.prototype;

export class Encryptor {
  static setPassword(budget, password) {
    const storedBudgetsPasswords = JSON.parse(localStorage.getItem('encryption-passwords-budgets') || '[]');
    storedBudgetsPasswords.push(budget);
    localStorage.setItem(`encryption-password-${budget}`, password);
    localStorage.setItem('encryption-passwords-budgets', JSON.stringify(storedBudgetsPasswords));
  }

  static movePassword(oldBudget, newBudget) {
    const storedBudgetsPasswords = JSON.parse(localStorage.getItem('encryption-passwords-budgets') || '[]');
    const password = localStorage.getItem(`encryption-password-${oldBudget}`);
    storedBudgetsPasswords.splice(storedBudgetsPasswords.findIndex(b => b === oldBudget), 1);
    storedBudgetsPasswords.push(newBudget);
    localStorage.removeItem(`encryption-password-${oldBudget}`);
    localStorage.setItem(`encryption-password-${newBudget}`, password);
    localStorage.setItem('encryption-passwords-budgets', JSON.stringify(storedBudgetsPasswords));
  }

  static removePasswords() {
    const storedBudgetsPasswords = JSON.parse(localStorage.getItem('encryption-passwords-budgets') || '[]');
    storedBudgetsPasswords.forEach(this.removePassword);
    localStorage.removeItem('encryption-passwords-budgets');
  }

  static removePassword(budget) {
    localStorage.removeItem(`encryption-password-${budget}`);
  }

  static hasEncryptionPassword(budget) {
    return this.getPassword(budget) !== null;
  }

  static getPassword(budget) {
    return localStorage.getItem(`encryption-password-${budget}`);
  }

  static async encrypt(budget, text) {
    const password = this.getPassword(budget);
    const encrypted = await openpgp.encrypt({
      data: text,
      passwords: [password],
      armor: false,
    });
    const message = encrypted.message.packets.write();

    return util.Uint8Array_to_b64(message);
  }

  static async decrypt(budget, encryptedText) {
    const password = this.getPassword(budget);

    return this.decryptWithPassword(password, encryptedText);
  }

  static async decryptWithPassword(password, encryptedText) {
    try {
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

export const handleEncryptionError = (budget, action) => (error) => {
  if (error instanceof EncryptorError) {
    Encryptor.removePassword(budget);

    return Observable.of([
      requirePasswordError('errors.invalid-encryption-password'),
      requirePassword(action),
    ]).mergeAll();
  }

  throw error;
};
