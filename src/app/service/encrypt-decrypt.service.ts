import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor(private conf: ConfigService) { }

  aesEncrypt(value: string): string {
    var key = CryptoJS.enc.Utf8.parse(this.conf.uniqueKey.trim());
    var iv = CryptoJS.enc.Utf8.parse(this.conf.uniqueKey.trim());

    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(JSON.stringify(value)), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  }

  aesDecrypt(textToDecrypt: string) {
    var key = CryptoJS.enc.Utf8.parse(this.conf.uniqueKey.trim());
    var iv = CryptoJS.enc.Utf8.parse(this.conf.uniqueKey.trim());

    return JSON.parse(CryptoJS.AES.decrypt(textToDecrypt, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8));
  }

  // aesEncryptForBackend(value: string): string {
  //   var keySize = 256;
  //   var salt = CryptoJS.lib.WordArray.random(16);
  //   var key = CryptoJS.PBKDF2(this.conf.uniqueKey.trim(), salt, {
  //     keySize: keySize / 32,
  //     iterations: 100
  //   });

  //   var iv = CryptoJS.lib.WordArray.random(128 / 8);

  //   var encrypted = CryptoJS.AES.encrypt(value, key, {
  //     iv: iv,
  //     padding: CryptoJS.pad.Pkcs7,
  //     mode: CryptoJS.mode.CBC
  //   });

  //   var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));

  //   return result;
  // }

  // aesDecryptForBackend(ciphertextB64: string): string {

  //   var key = CryptoJS.enc.Utf8.parse(this.conf.uniqueKey.trim());
  //   var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);

  //   var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, { iv: iv });
  //   return decrypted.toString(CryptoJS.enc.Utf8);
  // }




}