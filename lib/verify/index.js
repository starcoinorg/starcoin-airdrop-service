import * as ed from '@noble/ed25519';
import {Buffer} from "buffer/index.js"
import {starcoin_types, utils} from "@starcoin/starcoin";

export async function verify(publickey, message, nonce, address, chainId, signature, chain) {
    if (chain == 'starcoin') {
        let signed_message = utils.signedMessage.decodeSignedMessage(Buffer.from(signature.replace("0x", ""), 'hex'))
        if (signed_message.authenticator instanceof starcoin_types.TransactionAuthenticatorVariantEd25519) {
            const signatureBytes = signed_message.authenticator.signature.value;
            const msgBytes = utils.signedMessage.getEd25519SignMsgBytes(new starcoin_types.SigningMessage(Buffer.from(JSON.stringify(message), 'utf8')));
            const publicKeyBytes = signed_message.authenticator.public_key.value;
            return await ed.verify(signatureBytes, msgBytes, publicKeyBytes)
        }
        return false
    } else {
        let msg = Buffer.from(`APTOS\naddress: ${address}\nchainId: ${chainId}\nmessage: ${JSON.stringify(message)}\nnonce: ${nonce}`, 'utf8')
        return await ed.verify(signature, msg, publickey)
    }

}