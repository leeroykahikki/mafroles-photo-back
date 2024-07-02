const ApiError = require('../error/ApiError');
const { Tournament } = require('../utils/db');

class PlayerController {
  async createTournament(req, res, next) {
    const { tournamentName } = req.body;

    if (!tournamentName) {
      return next(ApiError.badRequest('Некорректное название турнира'));
    }

    const candidate = await Tournament.findOne({ tournamentName });

    if (candidate) {
      return next(ApiError.badRequest('Турнир с таким названием уже существует'));
    }

    const tournament = await Tournament.create({ tournamentName });

    return res.json({
      id: tournament._id,
      tournamentName: tournament.tournamentName,
      tournamentPlayers: tournament.tournamentPlayers,
    });
  }

  // Проверить при удалении удаляется ли связь в коллекии players
  async deleteTournament(req, res, next) {
    const { id } = req.body;
    const { deletedCount } = await Tournament.deleteOne({ _id: id });

    if (!deletedCount) {
      return next(ApiError.badRequest('Произошла ошибка при удалении турнира'));
    }

    return res.json({ message: 'Турнир успешно удалён' });
  }

  async getTournament(req, res, next) {
    const { tournamentName } = req.body;
    const tournament = await Tournament.findOne(
      { tournamentName },
      'tournamentName tournamentPlayers',
    );

    if (!tournament) {
      return next(ApiError.badRequest('Турнир с таким названием не найден'));
    }

    return res.json(tournament);
  }

  async getAllTournaments(req, res, next) {
    const tournaments = await Tournament.find({}, 'tournamentName tournamentPlayers');

    return res.json(tournaments);
  }
}

module.exports = new PlayerController();
