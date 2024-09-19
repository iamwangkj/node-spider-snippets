const AES = require("crypto-js/aes")
const SHA256 = require("crypto-js/sha256")
const Base64 = require("crypto-js/enc-base64")
var CryptoJS = require("crypto-js")
const crypto = require('crypto')

const resData = require('./加密的装备数据.json')

const { encryptedData, iv } = resData.data


// AES 解密函数
function aesDecrypt(encryptedBase64, key, iv) {
  // 将 key 和 iv 从普通字符串转换为 CryptoJS 支持的格式
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);

  // 解密
  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, keyUtf8, {
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,  // CBC 模式
    padding: CryptoJS.pad.Pkcs7 // 填充方式
  });

  // 转换为可读的 UTF-8 明文
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// 示例数据
// const encryptedBase64 = '密文的 Base64 字符串';  // 通过 AES 加密后的密文
const key = '密钥（16 或 32 字符）'; // 128位（16字符）或 256位（32字符）
// const iv = 'IV（16 字符）'; // IV 初始化向量

// 解密
const decryptedText = aesDecrypt(encryptedData, key, iv);
console.log("解密后的明文: ", decryptedText);