import CryptoJS from "crypto-js";


const KEY = 'jingubang0801'

/**
 * 加密数据
 * @param {string} plaintext - 需要加密的明文
 * @param {string} secretKey - 加密密钥
 * @returns {string} 加密后的密文
 */
export function encryptData(plaintext:string, secretKey=KEY) {
    const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
    return ciphertext;
}

/**
 * 解密数据
 * @param {string} ciphertext - 加密后的密文
 * @param {string} secretKey - 加密密钥
 * @returns {string} 解密后的明文
 */
export function decryptData(ciphertext:string, secretKey=KEY) {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if (!plaintext) throw new Error("Decryption failed");
        return plaintext;
    } catch (error) {
        console.error("Error during decryption:", error);
        throw new Error("Invalid ciphertext or secret key");
    }
}

