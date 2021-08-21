const Sequelize = require('sequelize');
const config = require('../../config')

let database = config.database
// 将这里的参数修改为仓库名和sql的用户名和密码
const sequelize = new Sequelize(database.DATABASE, database.USERNAME, database.PASSWORD, {
    host: database.HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        //字符集
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true,
        dateStrings: true,
        typeCast: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00', //东八时区
    timestamps: true
});

module.exports = {
    sequelize
};