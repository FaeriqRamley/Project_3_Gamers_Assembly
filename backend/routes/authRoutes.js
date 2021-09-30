const { Router } = require('express');
const { 
    signup_post,
    login_post,
    logout_get,
    user_get,
    changePassword_put,
    updateProfile_put,
    userUpdate_get,
} = require('../controllers/authController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.post('/signup', signup_post);
router.post('/login', login_post);
router.get('/logout', logout_get);
router.get('/user', checkUser, user_get)
router.get('/userupdates', checkUser, userUpdate_get)
router.put('/changepassword', checkUser, changePassword_put)
router.put('/updateprofile', checkUser, updateProfile_put)

module.exports = router;