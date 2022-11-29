import { dbConfig } from "../../db.config.js";
import { airdrop_projects_init } from "../../model/airdrop_projects.model.js";
import { Sequelize } from 'sequelize';
import { airdrop_records_init } from "../../model/airdrop_records.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    timezone: '+08:00',
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});


const db = {};
db.airdrop_projects = airdrop_projects_init(sequelize);
db.airdrop_records = airdrop_records_init(sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;


export default db;
