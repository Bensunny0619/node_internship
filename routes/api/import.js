const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const db = require('../../models');
const Transaction = db.Transaction;

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.resolve(req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate and map data
    const results = [];
    const errors = [];

    for (let [i, row] of data.entries()) {
      try {
        if (!row.order_id || !row.user_id || !row.amount) {
          throw new Error(`Row ${i + 2} missing required fields`);
        }

        const transaction = await Transaction.create({
          order_id: row.order_id,
          user_id: row.user_id,
          shipping_dock_id: row.shipping_dock_id || null,
          amount: row.amount,
          discount: row.discount || 0,
          tax: row.tax || 0,
          total: row.total || row.amount,
          notes: row.notes || '',
          status: row.status === "paid" ? 1 : 0,
        });

        results.push(transaction);
      } catch (err) {
        errors.push(`Row ${i + 2}: ${err.message}`);
      }
    }

    // Remove file
    fs.unlinkSync(filePath);

    if (errors.length > 0) {
      return res.status(400).json({ message: "Some rows failed", errors });
    }

    return res.json({ message: 'Import successful', results });

  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
