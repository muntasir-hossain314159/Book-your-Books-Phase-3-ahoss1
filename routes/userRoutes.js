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

router.get("/:id", userController.showUserProfile, userController.showPurchases, userController.showSellings);
//router.get("/:id#v-pills-purchases", userController.showPurchases);
//router.get("/:id#v-pills-sellings", userController.showSellings);
router.get("/approve-buyer/:userID/:courseBookID", userController.approveBuyer);
router.get("/reject-buyer/:userID/:courseBookID", userController.rejectBuyer);
//router.get("/:id", userController.rejectBuyer);
router.post("/:id/sellbook", upload.single('image'), userController.sellBook);

module.exports = router;