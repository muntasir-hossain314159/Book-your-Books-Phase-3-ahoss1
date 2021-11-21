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

router.get("/:id", userController.showUserProfile);
router.post("/:id/purchases", upload.single('image'), userController.sellBook);
router.get("/:id/sellings", userController.purchaseBook);

module.exports = router;