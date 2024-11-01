const express = require("express");
const {
  createUser,
  allusers,
  deleteUser,
  updateUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware(), logoutUser);
router.get("/users", authMiddleware("admin"), allusers);
router.put("/users/:id", authMiddleware(), updateUser);
router.delete("/users/:id", authMiddleware("admin"), deleteUser);

module.exports = router;
