const router = require('express').Router();
const { celebrateTests } = require("../middlewares/validation")
const { getCurrentUser, updateProfile } = require('../controllers/users');


router.get('/me', getCurrentUser);
router.patch('/me', celebrateTests.profileUpdateTest, updateProfile);


module.exports = router