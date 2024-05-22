const fs = require("fs");
const path = require("path");
require('dotenv').config();
const { Sequelize, DataTypes, Op, QueryTypes } = require("sequelize");
const basename = path.basename(__filename);
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_pass, {
    host: process.env.db_host,
    port: process.env.db_port,
    dialect: "mysql",
    logging: (...msg) => console.log(msg[0]),
    operatorsAliases: 0,
    timezone: "+09:00",
    dialectOptions: {
        charset: "utf8mb4",
        dateStrings: true,
        typeCast: true,
    },
    pool: {
        max: 30,
        min: 5,
        idle: 1000,
    },
    ssl: false,
});

let db = [];

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });
db.sequelize = sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;


module.exports = db;