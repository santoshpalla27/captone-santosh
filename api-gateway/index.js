require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 8080;

// Proxy config
app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/users': '/users' }
}));

app.use('/api/orders', createProxyMiddleware({
  target: process.env.ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/orders': '/orders' }
}));

app.use('/api/payments', createProxyMiddleware({
  target: process.env.PAYMENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/payments': '/payments' }
}));

app.use('/api/notify', createProxyMiddleware({
  target: process.env.NOTIFICATION_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/notify': '/notify' }
}));

app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});