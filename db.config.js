export const dbConfig = {
    HOST: process.env.MYSQL_HOST || "localhost",
    PORT: process.env.MYSQL_PORT || 3306,
    USER: process.env.MYSQL_USER || "root",
    PASSWORD: process.env.MYSQL_PASSWORD || "123456",
    DB: process.env.MYSQL_DB || "airdrop_test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};