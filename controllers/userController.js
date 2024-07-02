const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../utils/db');

const generateJwt = (id, nickname) => {
  return jwt.sign({ id, nickname }, process.env.SECRET_KEY, { expiresIn: '7d' });
};

class UserController {
  async registration(req, res, next) {
    const { nickname, password } = req.body;
    if (!nickname || !password) {
      return next(ApiError.badRequest('Некорректный nickname или password'));
    }

    const candidate = await User.findOne({ nickname });

    if (candidate) {
      return next(ApiError.badRequest('Пользователь с таким nickname уже существует'));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ nickname, password: hashPassword });
    const token = generateJwt(user._id, user.nickname);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { nickname, password } = req.body;
    const user = await User.findOne({ nickname });

    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.badRequest('Указан неверный пароль'));
    }

    const token = generateJwt(user._id, user.nickname);

    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.nickname);
    return res.json({ token });
  }
}

module.exports = new UserController();
