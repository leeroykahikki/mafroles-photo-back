const ApiError = require('../error/ApiError');
const { Player } = require('../utils/db');

class PlayerController {
  async createPlayer(req, res, next) {
    const { nickname, photo } = req.body;

    if (!nickname) {
      return next(ApiError.badRequest('Некорректный nickname'));
    }

    const candidate = await Player.findOne({ nickname });

    if (candidate) {
      return next(ApiError.badRequest('Игрок с таким nickname уже существует'));
    }

    const player = await Player.create({ nickname, photo });

    return res.json({
      id: player._id,
      nickname: player.nickname,
      photo: player.photo,
      tournaments: player.tournaments,
    });
  }

  // Проверить при удалении удаляется ли связь в коллекии tournaments
  async deletePlayer(req, res, next) {
    const { id } = req.body;
    const { deletedCount } = await Player.deleteOne({ _id: id });

    if (!deletedCount) {
      return next(ApiError.badRequest('Произошла ошибка при удалении игрока'));
    }

    return res.json({ message: 'Игрок успешно удалён' });
  }

  async getAllPlayers(req, res, next) {
    const players = await Player.find({}, 'nickname photo tournaments');

    return res.json(players);
  }
}

module.exports = new PlayerController();
