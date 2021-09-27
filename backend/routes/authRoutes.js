const { Router } = require('express');
const { 
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get,
    user_get,
    changePassword_put,
    updateProfile_put,
} = require('../controllers/authController');
const { checkUser } = require('../middleware/authMiddleware');

const router = Router();

router.get('/signup', signup_get);
router.post('/signup', signup_post);
router.get('/login', login_get);
router.post('/login', login_post);
router.get('/logout', logout_get);
router.get('/auth/user', checkUser, user_get)
router.put('/auth/changepassword', checkUser, changePassword_put)
router.put('/auth/updateprofile', checkUser, updateProfile_put)

module.exports = router;