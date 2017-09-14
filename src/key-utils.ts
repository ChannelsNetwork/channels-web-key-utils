const secp256k1 = require('secp256k1');
const ethereumUtils = require('ethereumjs-util');
const KeyEncoder = require('key-encoder');
const jwa = require('jwa');
const crypto = require("crypto");

export class KeyUtils {
  private generatePrivateKey() {
    let privateKeyBuffer;
    do {
      privateKeyBuffer = crypto.randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privateKeyBuffer));
    return new Uint8Array(privateKeyBuffer);
  }

  generateKey(): any {
    const privateKey = this.generatePrivateKey();
    const publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey)) as Uint8Array;
    const ethPublic = ethereumUtils.importPublic(new Buffer(publicKey)) as Uint8Array;
    const address = ethereumUtils.pubToAddress(ethPublic, false) as Uint8Array;
    const keyEncoder = new KeyEncoder('secp256k1');
    const privateKeyPem = keyEncoder.encodePrivate(new Buffer(privateKey).toString('hex'), 'raw', 'pem');
    const publicKeyPem = keyEncoder.encodePublic(new Buffer(publicKey).toString('hex'), 'raw', 'pem');
    return {
      privateKey: (new Buffer(privateKey).toString('base64')),
      privateKeyPem: privateKeyPem,
      publicKey: (new Buffer(publicKey).toString('base64')),
      publicKeyPem: publicKeyPem,
      ethPublic: (new Buffer(ethPublic).toString('base64')),
      address: (new Buffer(address).toString('base64')),
      ethAddress: '0x' + new Buffer(address).toString('hex')
    };
  }

  sign(value: string, privateKeyPem: string) {
    const rs256 = jwa('RS256');
    const signature = rs256.sign(value, privateKeyPem);
    return signature;
  }

  verify(value: string, publicKeyPem: string, signature: string) {
    const rs256 = jwa('RS256');
    return rs256.verify(value, signature, publicKeyPem);
  }
}
