const jwt = require('jsonwebtoken');
const { User } = require('../utils/db');

// проверить не удалён ли пользователь
module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk

    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ nickname: decoded.nickname });

    if (!user) {
      return res.status(401).json({ message: 'Пользователь не найден' });
    }

    if (user.tokenHash !== token) {
      return res.status(401).json({ message: 'Устаревший токен' });
    }

    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};
