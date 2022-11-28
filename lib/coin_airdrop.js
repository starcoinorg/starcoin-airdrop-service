import {BCS, TxnBuilderTypes} from 'aptos';
import {bcs, starcoin_types} from "@starcoin/starcoin";
import {Buffer} from "buffer/index.js";

const {
    AccountAddress,
    StructTag,
} = TxnBuilderTypes;

export class CoinAirdrop {


    constructor(address, amount, coin_type) {
        this.address = AccountAddress.fromHex(address);
        StructTag.fromString(coin_type)
        this.coin_type = coin_type;
        this.amount = Number(amount);

    }

    address_string() {
        return "0x" + Buffer.from(this.address.address).toString('hex')
    }

    get_amount() {
        return this.amount
    }

    get_coin_type() {
        return this.coin_type.toString()
    }

    serialize() {
        let bcs = new BCS.Serializer()
        this.address.serialize(bcs)
        bcs.serializeStr(this.coin_type)
        bcs.serializeU64(this.amount)
        return bcs.getBytes()
    }
}

export class CoinAirdropStrcoin {
    constructor(address, amount, coin_type) {
        this.address = starcoin_types.AccountAddress.deserialize(new bcs.BcsDeserializer(Buffer.from(address.replace('0x', ''), 'hex')));
        StructTag.fromString(coin_type)
        this.coin_type = coin_type;
        this.amount = Number(amount);

    }

    address_string() {
        return "0x" + Buffer.from(this.address.value).toString('hex')
    }

    get_amount() {
        return this.amount
    }

    get_coin_type() {
        return this.coin_type.toString()
    }

    serialize() {
        let bcs = new BCS.Serializer()
        this.address.serialize(bcs)
        bcs.serializeStr(this.coin_type)
        bcs.serializeU64(this.amount)
        return bcs.getBytes()
    }
}
