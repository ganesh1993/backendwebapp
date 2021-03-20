const { to, TE, ReE, readHTMLFile, formatDate } = require('../services/util.sevice');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require('lodash');
const Models = require('./../models/model');
const CommonService = require('../services/common.service');
const bcrypt = require('bcryptjs');


const userLogin = async (userInfo) => {
  let findUser = await Models.users.findOne({
    where: { email: userInfo.email },
    raw: true
  });

  if (_.isEmpty(findUser)) TE("User Not Found");

  await new Promise((resolve, reject) => {
    bcrypt.compare(userInfo.password, findUser.password, function (err, result, callback) {
      userInfo.result = result;
      resolve("");
    });
  })

  if (userInfo.result == true) {
    let msg = "User Authenticated Successfully";
    let final = { message: msg, userDetails: findUser }
    return final;
  } else {
    let msg = "Invalid Credentials"
    let final = { message: msg };
    return final;
  }
}

const create = async (userInfo) => {
  let findUser = await Models.users.findOne({
    where: { email: userInfo.email },
    raw: true
  });
  if (findUser) TE("User Already Exists");

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(userInfo.password, salt);
  userInfo.password = password;
  let [error, newUser] = await to(Models.users.create(userInfo));
  if (error) TE(error.message);

  return newUser;

};

const update = async (userInfo) => {
  return await Models.users.update(userInfo, { where: { email: userInfo.email } });
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



module.exports = { create, update, deleteUser, getUsers, profile, userLogin };