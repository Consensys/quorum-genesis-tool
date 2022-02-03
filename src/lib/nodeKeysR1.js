
const secp256r1 = require("secp256r1");
const {randomBytes} = require("crypto");


function generatePrivateKey() {
  let privKey;
  do {
    privKey = randomBytes(32);
  } while (!secp256r1.privateKeyVerify(privKey));
  return privKey;
}

function derivePublicKey(privKey) {
  // slice on the end to remove the compression prefix ie. uncompressed use 04 prefix & compressed use 02 or 03
  // we generate the address, which wont work with the compression prefix
  const pubKey = secp256r1.publicKeyCreate(privKey, false).slice(1);
  return Buffer.from(pubKey);
}

module.exports = {
  generatePrivateKey: generatePrivateKey,
  derivePublicKey: derivePublicKey
}
