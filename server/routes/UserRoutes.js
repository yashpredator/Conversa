
const {register, login,setavatar,logout,getAllUsers}=require("../controllers/UserController");
const router=require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setavatar/:id",setavatar);
router.get("/logout/:id",logout);
router.get("/allusers/:id",getAllUsers);
module.exports=router;