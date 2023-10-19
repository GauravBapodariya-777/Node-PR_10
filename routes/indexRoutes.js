const express = require('express');
const routes = express.Router();

const commonController = require('../controllers/commonController')
const multer = require('multer');

const passport = require('passport');
const { verifyToken } = require('../config/passport-selfmodule');
const { checkRole } = require('../config/passport-selfmodule');

const upload = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'./uploads');
    },
    filename : (req,file,cb) => {
        cb(null,file.originalname);
    }
})

const image = multer({storage : upload}).single('image');


routes.post('/register_A_P_I',commonController.register);
routes.get('/viewRegister_A_P_I',verifyToken,checkRole('admin'),commonController.viewRegister);
routes.delete('/deleteUser_A_P_I',commonController.deleteUser);
routes.put('/updateUser_A_P_I',commonController.updateUser);

routes.post('/login_A_P_I',commonController.login);

routes.post('/addCategory_A_P_I',commonController.addCategory);
routes.get('/viewCategory_A_P_I',commonController.viewCategory);
routes.delete('/deleteCategory_A_P_I',commonController.deleteCategory);
routes.put('/updateCategory_A_P_I',commonController.updateCategory);

routes.post('/addSubcategory_A_P_I',commonController.addSubcategory);
routes.get('/viewSubcategory_A_P_I',commonController.viewSubcategory);
routes.delete('/deleteSubcategory_A_P_I',commonController.deleteSubcategory);
routes.put('/updateSubcategory_A_P_I',commonController.updateSubcategory);

routes.post('/addProduct_A_P_I',image,commonController.addProduct);
routes.get('/viewProduct_A_P_I',commonController.viewProduct);
routes.delete('/deleteProduct_A_P_I',commonController.deleteProduct);
routes.put('/updateProduct_A_P_I',commonController.updateProduct);

module.exports = routes;