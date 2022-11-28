import express from 'express';
import db from "../lib/db/index.js";

const router = express.Router();

router.get('/', async function (req, res, next) {
    let body = req.query;
    await db.sequelize.query(`UPDATE airdrop_records
                              set status = ${body.status}
                              where address = '${body.address}'
                                and id = ${body.id}`);

    res.send({
        error: 200,
        data: []
    });
});

export default router;