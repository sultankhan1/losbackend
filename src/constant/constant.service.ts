import { Injectable } from "@nestjs/common";
import crypto from 'crypto-js';

@Injectable()
export class ConstantService {
  constructor() {}

  async generateCouponCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let couponCode = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters.charAt(randomIndex);
    }

    return couponCode;
  }

  async generateRandomPassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  }

  async isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[0-9]{10}$/;
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
    return phoneRegex.test(cleanedPhoneNumber);
  }

   signature = {
    signature_method: 'HMAC-SHA256',
  }

  method = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
    patch: 'PATCH',
  }

  hash_function(base_string: string | crypto.lib.WordArray, key: string | crypto.lib.WordArray) {  
    return crypto.HmacSHA256(base_string, key).toString(crypto.enc.Base64);
  }
}
