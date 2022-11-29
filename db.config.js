export const dbConfig = {
    HOST: process.env.STARCOIN_AIRDROP_SERVICE_MYSQL_HOST || "localhost",
    PORT: process.env.STARCOIN_AIRDROP_SERVICE_MYSQL_PORT || 3306,
    USER: process.env.STARCOIN_AIRDROP_SERVICE_MYSQL_USER || "root",
    PASSWORD: process.env.STARCOIN_AIRDROP_SERVICE_MYSQL_PWD || "123456",
    DB: process.env.STARCOIN_AIRDROP_SERVICE_MYSQL_DB || "airdrop_test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};