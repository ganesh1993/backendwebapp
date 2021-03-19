const { to, TE, ReE, readHTMLFile, formatDate } = require('../services/util.sevice');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require('lodash');
const Models = require('./../models/model');
const CommonService = require('../services/common.service');



const create = async (userInfo) => {
  let findUser = await Models.users.findOne({
    where: { email: userInfo.email },
    raw: true
  });
  if (findUser) TE("User Already Exists");

  let [error, newUser] = await to(Models.users.create(userInfo));
  if (error) TE(error.message);

  return newUser;

};

const update = async (userInfo) => {
  return await Models.users.update(userInfo, { where: { user_name: userInfo.user_name } });
};

const deleteUser = async (userInfo) => {
  return await Models.users.destroy({ where: { email: userInfo.email } });
};

const getUsers = async () => {


  userQuery = {
    where: {},
    order: [['userid', 'DESC']],
    raw: true,
  };


  // if (_.isEmpty(userList)) TE("Params are not set");

  let [err, user] = await to(Models.users.findAndCountAll(userQuery));

  return user;
}


const profile = async (userList) => {

  let [err, user] = await to(Models.users.findByPk(userList.userid));
  if (err) TE(err.message);
  return user;
}



module.exports = { create, update, deleteUser, getUsers, profile};