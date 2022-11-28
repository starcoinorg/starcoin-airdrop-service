import express from 'express';
import {Airdrop_projects} from "../model/airdrop_projects.model.js";
import {Airdrop_records} from "../model/airdrop_records.js";

const router = express.Router();

router.get('/', async function (req, res, next) {

    if (!req.query.project) {
        req.query.project = "starcoin"
    }
    if (!req.query.chain) {
        req.query.chain = "starcoin"
    }
    try {
        if (!req.query || !req.query.addr || !req.query.networkVersion) {
            res.send("Too few parameters");
            return
        } else if (req.query.addr && req.query.airdrop_id) {

            let airdrop_record = await Airdrop_records.findOne(
                {
                    where: {
                        airdrop_id: req.query.airdrop_id,
                        address: req.query.addr,
                        '$AP.project': req.query.project,
                        '$AP.chain$': req.query.chain,
                        '$AP.network_version$': req.query.networkVersion
                    },
                    include: [{
                        as: 'AP',
                        model: Airdrop_projects
                    }]
                }
            );
            res.send({
                error: 200,
                data: [
                    airdrop_record
                ]
            })
        } else if (req.query.addr) {
            let airdrop_record = []
            airdrop_record = await Airdrop_records.findAll(
                {
                    where: {
                        address: req.query.addr,
                        '$AP.project$': req.query.project,
                        '$AP.chain$': req.query.chain,
                        '$AP.network_version$': req.query.networkVersion
                    },
                    include: [{
                        as: 'AP',
                        model: Airdrop_projects
                    }]
                }
            );

            res.send({
                error: 200,
                data:
                    airdrop_record.map((v, i) => {
                        return {
                            Id: v.id,
                            Address: v.address,
                            Amount: v.amount.toString(),
                            Idx: v.idx.toString(),
                            Proof: v.proof,
                            Status: v.status,
                            AirdropId: v.airdrop_id,
                            Name: v.AP.name,
                            NameEN: v.AP.name_en,
                            Token: v.AP.token,
                            Symbol: v.AP.token_symbol,
                            Precision: v.AP.token_precision.toString(),
                            Icon: v.AP.token_icon,
                            StartAt: v.AP.start_at,
                            EndAt: v.AP.end_at,
                            OwnerAddress: v.AP.owner_address,
                            Root: v.AP.root,
                            NetworkVersion: v.AP.network_version.toString()
                        }
                    })
            })
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
