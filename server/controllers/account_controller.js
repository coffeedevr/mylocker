const asyncHandler = require('express-async-handler')
const Account = require('../models/account')
const mongoose = require('mongoose')
const { encryptAndStoreData, decryptData } = require('../utils/encrypt.js')
const { query, body, validationResult } = require("express-validator");
require('dotenv').config()


exports.account_get_data = [
  
  query("q")
    .escape(),
  
  asyncHandler(async (req, res, next) => {  

    const user = new mongoose.Types.ObjectId('64b14f869eccd388b2d1cb64');
    const query = { user_id: user, status: req.query.status };

    const options = {
      page: req.query.page || 1,
      lean: {virtuals: true},
      limit: 10
    }

    if (req.query.q) { 
      query.label =  {
        $regex: req.query.q
      }
    }

    Account.paginate(query, options).then(result => {
      const data = result.docs.map(item => {
        return {
          ...item,
          username: decryptData(item.username, process.env.PASSPHRASE),
          password: decryptData(item.password, process.env.PASSPHRASE),
        }
    })

    res.send({
      data: data,
      pages: result
    })
  })})
]


exports.account_post_data = [
  
  body("label")
    .notEmpty().withMessage("Your label field is empty.")
    .isLength({min: 3, max: 64}).withMessage("Your label must be between 3 to 64 characters.")
    .escape(),
  body("username")
    .notEmpty().withMessage("Your username field is empty.")
    .escape(),
  body("password")
    .notEmpty().withMessage("Your password field is empty.")
    .escape(),
  
  asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    const { label, created_at, last_modified } = req.body
    const user_id =  new mongoose.Types.ObjectId('64b14f869eccd388b2d1cb64');

    const username = encryptAndStoreData(req.body.username, process.env.PASSPHRASE);
    const password = encryptAndStoreData(req.body.password, process.env.PASSPHRASE);

    const account = new Account({
      user_id,
      label,
      username,
      password,
      created_at,
      last_modified,
      status: true
    });

    if (!errors.isEmpty()) {
      res.status(400).json({
        error: {
          message: errors.array()[0].msg
        }
      })
    } else {
    try { 
        await account.save();
        res.status(200).json(account)
      } catch (err) {
        console.log(err);
      }
    }

  // res.send({status: "ok", data: data});
})]

exports.account_update_data = [
  
  //sanitize
  body("label")
    .notEmpty()
    .escape(),
  body("username")
    .notEmpty()
    .escape(),
  body("password")
    .notEmpty()
    .escape(),
  // function statrs
  asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);

    const id = req.params.accountid;

    // if editing whole data
    if (!req.query.status) {
      const { label, username, password, last_modified } = req.body

      const encryptUser = encryptAndStoreData(username, process.env.PASSPHRASE);
      const encryptPass = encryptAndStoreData(password, process.env.PASSPHRASE);
      
      if (!errors.isEmpty()) {
        res.status(400).json({
          error: {
            message: errors.array()[0].msg
          }
        })
      } else {
        try {
          const result = await Account.findByIdAndUpdate(id, {
            label: label,
            username: encryptUser,
            password: encryptPass,
            last_modified: last_modified
          })
          res.status(200).json(result)
        } catch (err) {
          next(err)
        }
      }

      // if only updating status
    } else {

      const status = req.query.status

      try { 
        const result = await Account.findByIdAndUpdate(id, {
          status: status,
          last_modified: req.body.last_modified
        })
        res.status(200).json(result)
      } catch (err) {
          next(err);
        }
      }
})]

exports.account_delete_data = asyncHandler(async (req, res, next) => {

  const id = req.body.id;
  
  try {
    const result = await Account.findByIdAndDelete({ _id: id})
    res.status(200).json(result)
  } catch(error) {
    next(error)
  }
})