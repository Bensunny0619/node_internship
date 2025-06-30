const express = require('express');
const router = express.Router();
const Web3Service = require('../services/Web3Service');
const { User } = require('../models');

// CREATE WALLET
router.post('/wallet', async (req, res) => {
  try {
    const account = Web3Service.createWallet();
    const user = await User.create({ name: req.body.name, wallet_id: account.address });
    res.json({ user, private_key: account.privateKey });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SIGN MESSAGE
router.get('/sign', (req, res) => {
  try {
    const { private_key } = req.query;
    const payload = { msg: 'Hello from Web3 API!' };
    const signature = Web3Service.signMessage(private_key, JSON.stringify(payload));
    res.json({ payload, signature });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET ACCOUNT BALANCE
router.get('/account', async (req, res) => {
  try {
    const { private_key } = req.query;
    if (!private_key) return res.status(400).json({ error: 'Missing private_key' });

    const account = Web3Service.getAccount(private_key);
    const balance = await Web3Service.getBalance(account.address);

    res.json({ address: account.address, balance_in_ether: balance });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// TRANSFER ETHER
router.get('/transfer', async (req, res) => {
  try {
    const { private_key, to_address, amount } = req.query;
    if (!private_key || !to_address || !amount) {
      return res.status(400).json({ error: 'Missing one or more query parameters' });
    }

    const receipt = await Web3Service.transferEther(private_key, to_address, amount);
    res.json({ success: true, tx_receipt: receipt });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
