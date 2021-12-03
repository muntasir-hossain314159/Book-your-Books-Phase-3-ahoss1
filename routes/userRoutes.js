const router = require("express").Router(),
    multer = require('multer'),
    userController = require("../controllers/userController");

    let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/images/courses/uploads')
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now())
            }
    }),    
    upload = multer({ storage: storage });

//router.get("/:id", userController.showUserProfile,  userController.showSellings);
router.get("/:id", userController.showSellings);
router.get("/:id/purchases", userController.showPurchases);
router.get("/:id/sellings", userController.showSellings);
router.post("/:id/sellbook", upload.single('image'), userController.sellBook);

module.exports = router;