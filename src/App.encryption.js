import openpgp, { message, util } from 'openpgp';

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

export class Encryptor {
  static setPassword(password) {
    localStorage.setItem('encryption-password', password);
  }

  static hasEncryptionPassword() {
    return this.getPassword() !== null;
  }

  static getPassword() {
    return localStorage.getItem('encryption-password');
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

  static async decrypt(ciphertext) {
    const password = this.getPassword();
    const sourceArray = util.b64_to_Uint8Array(ciphertext);
    const plaintext = await openpgp.decrypt({
      message: message.read(sourceArray),
      passwords: [password],
    });

    return plaintext.data;
  }
}
