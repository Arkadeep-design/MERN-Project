const express = require('express');
const adminController = require('../controllers/admin-controller');
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleWare = require('../middlewares/admin-middleware');
const router = express.Router();

router.route('/users').get(authMiddleware,adminMiddleWare, adminController.getAllUsers);

router.route('/users/:id').get(authMiddleware,adminMiddleWare, adminController.getUserByID);

router.route("/users/update/:id").patch(authMiddleware, adminMiddleWare, adminController.updateUserById)


router.route("/users/delete/:id").delete(authMiddleware, adminMiddleWare, adminController.deleteUserById)


router.route('/contacts').get(authMiddleware, adminController.getAllContacts);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleWare, adminController.deleteContactById)

module.exports = router;