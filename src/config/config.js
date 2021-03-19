require('dotenv').config();
const fs = require('fs');

let CONFIG = {};

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3000';
CONFIG.env = process.env.NODE_ENV || 'development';
CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'bankingapp';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || null;
CONFIG.db_sync = process.env.DB_SYNC || false;


// Sequelize configuration
CONFIG.development = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+00:00'
};
CONFIG.local = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+00:00'
};
CONFIG.test = {
    "use_env_variable": "DB_URL"
};
CONFIG.production = {
    "use_env_variable": "DB_URL"
};


module.exports = CONFIG;