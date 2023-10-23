const Router = require("express");
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const router = new Router();

router.post("/registration", async (req, res) => {
  [
    check("email", "Неверный email").isEmail(),
    check("password", "Пароль должен быть не короче 5 символов").isLength({
      min: 5,
    }),
  ];
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Неправильный запрос", errors });
    }
    const { email, password } = req.body;

    // Проверяем на уникальность email
    const candidate = await User.findOne({ email });

    if (candidate) {
      return res
        .status(400)
        .json({ message: `Пользователь с ${email} уже существует` });
    }
    const passwordHash = await bcrypt.hash(password, 15);
    const user = new User({ email, password: passwordHash });
    await user.save();
    return res.json({ message: "Пользователь был успешно создан" });
  } catch (e) {
    console.log(e);
    res.send({
      message: "Server error",
    });
  }
});

module.exports = router;
