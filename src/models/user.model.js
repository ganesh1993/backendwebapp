const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const {TE, to} = require('../services/util.sevice');
const CONFIG = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        userid: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },

        name: DataTypes.STRING,
        address: DataTypes.STRING,
        email: {
            allowNull: true,
            unique: true,
            type: DataTypes.STRING(255),
        },
        mobile: {
            allowNull: true,
            type: DataTypes.BIGINT,
        },
        password: DataTypes.STRING,
        account_no: DataTypes.STRING,
        ifsc_code: DataTypes.STRING,
        balance: DataTypes.STRING,
        branch_name: DataTypes.STRING,
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    },
    );

    users.beforeSave(async (user, options) => {

    });

    users.associate = function (models) {

    };


    return users;
};
