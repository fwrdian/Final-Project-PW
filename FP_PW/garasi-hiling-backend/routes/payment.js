import express from 'express';
import { orders, payments } from '../store/session.js';

const router = express.Router();

// Simulasi QRIS "auto-lunas" supaya demo tidak perlu scan QR sungguhan.
// Interval polling di frontend = 4 detik, jadi 9 detik = status berubah
// "success" pada percobaan polling ke-2/ke-3 — cukup meyakinkan buat demo,
// tapi tetap kelihatan seperti proses pembayaran asli, bukan instan.
const AUTO_SUCCESS_AFTER_MS = 9000;
const EXPIRES_IN_SECONDS = 300;

// 🟢 ENDPOINT 8: POST /api/payment/generate-qris  body: { orderId, amount }
router.post('/generate-qris', (req, res) => {
  const { orderId, amount } = req.body || {};
  const paymentRef = `QRIS-${orderId || Date.now()}`;

  payments.set(paymentRef, {
    paymentRef, orderId, amount, status: 'pending', createdAt: Date.now(),
  });

  res.status(201).json({
    paymentRef,
    qrString: paymentRef,
    expiresInSeconds: EXPIRES_IN_SECONDS,
  });
});

// 🟢 ENDPOINT 9: GET /api/payment/check-status?paymentRef=...
router.get('/check-status', (req, res) => {
  const { paymentRef } = req.query;
  const payment = payments.get(paymentRef);

  if (!payment) {
    return res.status(404).json({ status: 'not_found' });
  }

  if (payment.status === 'pending' && Date.now() - payment.createdAt > AUTO_SUCCESS_AFTER_MS) {
    payment.status = 'success';
    const order = orders.get(payment.orderId);
    if (order) order.status = 'dibayar';
  }

  res.json({ status: payment.status });
});

// 🟢 ENDPOINT 10: POST /api/payment/cancel  body: { paymentRef }
router.post('/cancel', (req, res) => {
  const { paymentRef } = req.body || {};
  const payment = payments.get(paymentRef);
  if (payment) payment.status = 'cancelled';
  res.json({ success: true });
});

export default router;
