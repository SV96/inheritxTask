const express = require("express");
const router = express.Router();
const { userGet, userPost, userLogin,userLogout } = require("../Controllers/User");
const { validateUser,validateLoginUser, } = require("../Validators/Users");

router.get("/user", userGet);
router.post("/signup", validateUser, userPost);
router.post("/login", validateLoginUser, userLogin);
router.post("/logout",  userLogout);

module.exports = router;
