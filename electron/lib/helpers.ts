/**
 * 生成随机字符串 (Base64 实现)
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 */
function generateRandomStringBase64(length = 8) {
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  return btoa(String.fromCharCode(...randomBytes))
      .replace(/[+/=]/g, '') // 移除 Base64 不需要的字符
      .slice(0, length);
}

export {
  generateRandomStringBase64
};
