const express = require('express');
const router = express.Router();
const { handleUrlShortner, handleRedirectToUrl, handleClick } = require('../controllers/url');

router.post('/', handleUrlShortner);
router.get('/:shortId', handleRedirectToUrl);
router.get('/analytics/:shortId', handleClick);

module.exports = router;


