const {Router} = require('express');
const { recibeMensaje } = require('../controllers/messages');

const router = Router();

router.post('/',recibeMensaje);
router.get('/',recibeMensaje);

module.exports = router;