const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const db = require('../../models');
const Transaction = db.Transaction;

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ raw: true });

    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found to export.' });
    }

    const fields = [
      'id',
      'order_id',
      'user_id',
      'shipping_dock_id',
      'amount',
      'discount',
      'tax',
      'total',
      'notes',
      'status'
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactions);

    res.header('Content-Type', 'text/csv');
    res.attachment('transactions_export.csv');
    return res.send(csv);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to export transactions.', error: error.message });
  }
});

module.exports = router;
