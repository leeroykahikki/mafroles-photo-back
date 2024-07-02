const mongoose = require('mongoose');

async function dbconnect() {
  await mongoose.connect(process.env.DB_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const PlayerSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  tournaments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tournament',
    },
  ],
});

PlayerSchema.post('deleteOne', async function (next) {
  const playerId = this.getQuery()['_id'];
  const Tournament = mongoose.model('tournament');
  const tournaments = await Tournament.find({ tournamentPlayers: { $in: [playerId] } });

  tournaments.forEach(async (tournament) => {
    tournament.tournamentPlayers = tournament.tournamentPlayers.filter((item) => {
      return item.toString() !== playerId.toString();
    });

    await tournament.save();
  });
});

const TournamentSchema = new Schema({
  tournamentName: {
    type: String,
    required: true,
  },
  tournamentPlayers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player',
    },
  ],
});

TournamentSchema.post('deleteOne', async function (next) {
  const tournamentId = this.getQuery()['_id'];
  const Player = mongoose.model('player');
  const players = await Player.find({ tournaments: { $in: [tournamentId] } });

  players.forEach(async (player) => {
    player.tournaments = player.tournaments.filter((item) => {
      return item.toString() !== tournamentId.toString();
    });

    await player.save();
  });
});

const User = mongoose.model('user', UserSchema);
const Player = mongoose.model('player', PlayerSchema);
const Tournament = mongoose.model('tournament', TournamentSchema);

module.exports = {
  dbconnect,
  User,
  Player,
  Tournament,
};
