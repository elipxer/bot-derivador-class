const {Router} = require('express');
const { mensajesWelcomeOptions, traerCompanies, traerWelcomeOptions } = require('../controllers/db');

const router = Router();

router.get('/companies',traerCompanies)
router.get('/welcomeOptions',traerWelcomeOptions);

module.exports = router;