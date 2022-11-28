import * as ed from '@noble/ed25519';

export async function sign(message, privateKeyHex) {
    let sign = await ed.sign(Buffer.from(JSON.stringify(message)).toString('hex'), privateKeyHex)
    return sign
}