const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const userMiddleware = require('./users.js');
const chatMiddleware = require('./chat.js');
const authRoute = require("./auth.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/users', userMiddleware);
router.use("/auth", authRoute);
router.use('/chat', chatMiddleware);
module.exports = router;
