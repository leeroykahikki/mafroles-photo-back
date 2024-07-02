const ApiError = require('../error/ApiError');
const { Player, Tournament } = require('../utils/db');

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

  // Запретить добавлять одного и того же игрока несколько раз в один турнир
  async addPlayerTournament(req, res, next) {
    const { nickname, tournamentName } = req.body;

    const player = await Player.findOne({ nickname });

    if (!player) {
      return next(ApiError.badRequest('Игрок с таким ником не найден'));
    }

    const tournament = await Tournament.findOne({ tournamentName });

    if (!tournament) {
      return next(ApiError.badRequest('Турнир с таким названием не найден'));
    }

    player.tournaments.push(tournament);
    tournament.tournamentPlayers.push(player);

    const playerNew = await player.save();

    if (playerNew !== player) {
      return next(ApiError.badRequest('Произошла ошибка при сохранении информации об игроке'));
    }

    const tournamentNew = await tournament.save();

    if (tournamentNew !== tournament) {
      return next(ApiError.badRequest('Произошла ошибка при сохранении информации о турнире'));
    }

    return res.json({ message: 'Игрок успешно добавлен в турнир', player, tournament });
  }

  async deletePlayerTournament(req, res, next) {
    const { nickname, tournamentName } = req.body;

    const player = await Player.findOne({ nickname });

    if (!player) {
      return next(ApiError.badRequest('Игрок с таким ником не найден'));
    }

    const tournament = await Tournament.findOne({ tournamentName });

    if (!tournament) {
      return next(ApiError.badRequest('Турнир с таким названием не найден'));
    }

    player.tournaments = player.tournaments.filter((item) => {
      return item.toString() != tournament._id.toString();
    });

    tournament.tournamentPlayers = tournament.tournamentPlayers.filter((item) => {
      return item.toString() != player._id.toString();
    });

    const playerNew = await player.save();

    if (playerNew !== player) {
      return next(ApiError.badRequest('Произошла ошибка при сохранении информации об игроке'));
    }

    const tournamentNew = await tournament.save();

    if (tournamentNew !== tournament) {
      return next(ApiError.badRequest('Произошла ошибка при сохранении информации о турнире'));
    }

    return res.json({ message: 'Информация успешно изменена' });
  }
}

module.exports = new PlayerController();
