const express = require('express');
const router = express.Router();
const {user_controller} = require('../controller')

router.post('/chk/nickname', user_controller.CheckDuplicateNickname);
router.post('/chk/email', user_controller.CheckDuplicateEmail);
router.post('/signup', user_controller.SignUp);
router.post('/login', user_controller.LogIn);
router.get('/issued/token', user_controller.IssuedToken);
router.get('/auto/login', user_controller.AutoIssuedToken);
router.get('/mypage', user_controller.MyPage);
router.post('/update/mypage', user_controller.UpdateMyPage);



module.exports = router;