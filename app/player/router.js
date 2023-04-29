const express = require('express');

const router = express.Router();

const { landingPage, detailPage, category, checkout, history, historyDetail, dashboard, profile, updateProfile } = require('./controller');
const { isPlayerAuth } = require('../middleware/auth');
const multer = require('multer');
const os = require('os');

router.get('/landing-page', landingPage);
router.get('/:id/detail', detailPage);
router.get('/category', category);
router.post('/checkout', isPlayerAuth, checkout);
router.get('/history', isPlayerAuth, history);
router.get('/history/:id/detail', isPlayerAuth, historyDetail);
router.get('/dashboard', isPlayerAuth, dashboard);
router.get('/profile', isPlayerAuth, profile);
router.put('/profile', isPlayerAuth, multer({ dest: os.tmpdir() }).single('image'), updateProfile);

module.exports = router;
