const express = require('express')
const router = express.Router();
const account = require('../controllers/account_controller');

// get accounts
router.get('/v1/accounts', account.account_get_data);

// post accounts
router.post('/v1/accounts', account.account_post_data);

// edit accounts
router.put('/v1/accounts/:accountid', account.account_update_data);

// delete accounts
router.delete('/v1/accounts/:accountid', account.account_delete_data);

module.exports = router;