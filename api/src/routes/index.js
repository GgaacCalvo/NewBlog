const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userMiddleware = require('./users');
const chatMiddleware = require('./chat.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', userMiddleware);
router.use('/chat', chatMiddleware);
module.exports = router;
