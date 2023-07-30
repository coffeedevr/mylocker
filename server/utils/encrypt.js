// Example function for encryption and decryption using AES-CBC with PBKDF2
const crypto = require('crypto');

function encryptAndStoreData(data, passphrase) {
  const salt = crypto.randomBytes(16); // Generate a random salt (16 bytes)
  const key = crypto.pbkdf2Sync(passphrase, salt, 10000, 16, 'sha256'); // Derive a 128-bit (16 bytes) key

  const iv = crypto.randomBytes(16); // 16 bytes (128 bits) IV for AES-128
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Combine the salt, IV, and ciphertext and store it (e.g., in a database)
  const saltIVAndCiphertext = salt.toString('hex') + iv.toString('hex') + encrypted;
  return saltIVAndCiphertext;
}

function decryptData(saltIVAndCiphertext, passphrase) {
  // Extract the salt, IV, and ciphertext from the stored data
  const salt = Buffer.from(saltIVAndCiphertext.slice(0, 32), 'hex');
  const iv = Buffer.from(saltIVAndCiphertext.slice(32, 64), 'hex');
  const ciphertext = saltIVAndCiphertext.slice(64);

  // Derive the key using PBKDF2
  const key = crypto.pbkdf2Sync(passphrase, salt, 10000, 16, 'sha256');

  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encryptAndStoreData, decryptData}