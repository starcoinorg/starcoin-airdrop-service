import express from 'express';
import {parse} from 'csv-parse/sync';
import db from "../lib/db/index.js";
import {Airdrop_projects} from "../model/airdrop_projects.model.js";
import {verify} from "../lib/verify/index.js";
import {CoinAirdrop, CoinAirdropStrcoin} from "../lib/coin_airdrop.js";
import {MerkleTree} from 'merkletreejs';
import sha3_256 from 'js-sha3';
import {Airdrop_records} from "../model/airdrop_records.js";
import {admin} from "../lib/admin.js";

const router = express.Router();

router.post('/', async function (req, res, next) {
    let body = req.body;
    if (!body.data.project) {
        body.data.project = "starcoin"
    }

    try {
        let pk = admin[body.data.address]
        let owner_address = body.data.address
        if (body.data.chain == "starcoin") {
            let time = Date.parse(body.data.time)

            if ((Date.now() - time) > 30000) {
                throw "Timeout"
            }

            if (!pk || !await verify(pk.substring(2), body.data, body.data.time, body.data.address, body.data.chainid, req.body.signature, body.data.chain)) {
                throw "Not Admin"
            }
            owner_address = body.data.address
        } else {
            let time = Date.parse(body.signature.nonce)

            if ((Date.now() - time) > 30000) {
                throw "Timeout"
            }
            if (!pk || !await verify(pk.substring(2), body.data, body.signature.nonce, body.signature.address, body.signature.chainId, body.signature.signature, body.data.chain)) {
                throw "Not Admin"
            }
            owner_address = body.data.contract
        }

        let csv = body.data.csv;
        if (csv == "") {
            throw "csv is empty"
        }
        let records = parse(csv, {
            columns: false,
            skip_empty_lines: true
        });

        if (!(records[0].at(0) == 'address' &&
            records[0].at(1) == 'amount')) {
            throw "row not right: should be address amount"
        }

        let airdrops = []
        let total = BigInt(0)
        records.splice(0, 1)
        if (body.data.chain == "starcoin") {
            records.forEach((v, i) => {
                total = total + BigInt(Number(v.at(1)) * Math.pow(10, Number(body.data.token_precision)))
                airdrops.push(new CoinAirdropStrcoin(
                    v.at(0),
                    Number(v[1]) * Math.pow(10, Number(body.data.token_precision)),
                    i
                ))
            });
            let root = '';
            let airdrop_id = await db.sequelize.transaction(async (transaction) => {
                let project = await Airdrop_projects.create(
                    {
                        id: null,
                        project: body.data.project,
                        name: body.data.name,
                        name_en: body.data.name_en,
                        token: body.data.token,
                        token_icon: "",
                        token_symbol: body.data.token_symbol,
                        token_precision: body.data.token_precision,
                        total_amount: 0,
                        valid_amount: 0,
                        start_at: new Date(),
                        end_at: new Date().setDate(new Date().getDate() + 15),
                        owner_address: owner_address,
                        root: "",
                        network_version: body.data.chainid,
                        chain: body.data.chain,
                        create_at: new Date(),
                        update_at: new Date()
                    }
                    , {transaction: transaction});

                let leaves = airdrops.map(x => sha3_256.sha3_256(x.serialize(project.id)));
                let tree = new MerkleTree(leaves, sha3_256.sha3_256, {sortPairs: true});
                root = tree.getRoot().toString('hex');
                airdrops = airdrops.map(x => {
                    return {
                        address: x.address_string(),
                        amount: x.get_amount(),
                        coin_type: body.data.token,
                        proof: tree.getProof(sha3_256.sha3_256(x.serialize(project.id))).map(x => {
                            return Buffer.from(x.data).toString('hex')
                        })
                    }
                });
                let i = 0;
                for (let value of airdrops) {

                    await Airdrop_records.create(
                        {
                            id: null,
                            address: value.address,
                            amount: value.amount,
                            idx: i,
                            proof: JSON.stringify(value.proof),
                            airdrop_id: project.id,
                            status: '0',
                            created_at: new Date(),
                            updated_at: new Date()
                        }, {transaction: transaction}
                    )
                    i = i + 1
                }

                await db.sequelize.query(`UPDATE airdrop_projects
                                          set root = "0x${root}"
                                          where id = ${project.id}`, {transaction: transaction});
                return project.id
            })

            res.send({
                error: 200,
                data: {
                    airdrop_id: airdrop_id,
                    length: airdrops.length,
                    total: total.toString(),
                    root: `0x${root}`,
                }

            });
        } else {
            records.forEach((v, i) => {
                total = total + BigInt(Number(v.at(1)) * Math.pow(10, Number(body.data.token_precision)))
                airdrops.push(new CoinAirdrop(
                    v.at(0),
                    Number(v[1]) * Math.pow(10, Number(body.data.token_precision)),
                    body.data.token
                ))
            });
            let leaves = airdrops.map(x => sha3_256.sha3_256(x.serialize()));
            let tree = new MerkleTree(leaves, sha3_256.sha3_256, {sortPairs: true});
            let root = tree.getRoot().toString('hex');

            airdrops = airdrops.map(x => {
                return {
                    address: x.address_string(),
                    amount: x.get_amount(),
                    coin_type: x.get_coin_type(),
                    proof: tree.getProof(sha3_256.sha3_256(x.serialize())).map(x => {
                        return Buffer.from(x.data).toString('hex')
                    })
                }
            });

            let airdrop_id = await db.sequelize.transaction(async (transaction) => {
                let project = await Airdrop_projects.create(
                    {
                        id: null,
                        project: body.data.project,
                        name: body.data.name,
                        name_en: body.data.name_en,
                        token: body.data.token,
                        token_icon: "",
                        token_symbol: body.data.token_symbol,
                        token_precision: body.data.token_precision,
                        total_amount: 0,
                        valid_amount: 0,
                        start_at: new Date(),
                        end_at: new Date().setDate(new Date().getDate() + 15),
                        owner_address: owner_address,
                        root: root,
                        network_version: body.data.chainid,
                        chain: body.data.chain,
                        create_at: new Date(),
                        update_at: new Date()
                    }
                    , {transaction: transaction});

                let i = 0;
                for (let value of airdrops) {

                    await Airdrop_records.create(
                        {
                            id: null,
                            address: value.address,
                            amount: value.amount,
                            idx: i,
                            proof: JSON.stringify(value.proof),
                            airdrop_id: project.id,
                            status: '0',
                            created_at: new Date(),
                            updated_at: new Date()
                        }, {transaction: transaction}
                    )
                    i = i + 1
                }
                return project.id
            })

            res.send({
                error: 200,
                data: {
                    airdrop_id: airdrop_id,
                    length: airdrops.length,
                    total: total.toString(),
                    root: root,
                }

            });
        }


    } catch (e) {
        res.send({
            error: 400,
            data: [
                e.toString()
            ]
        });
    }
});

export default router;