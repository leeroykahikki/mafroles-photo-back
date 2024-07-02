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

const User = mongoose.model('users', UserSchema);
const Player = mongoose.model('players', PlayerSchema);
const Tournament = mongoose.model('tournaments', TournamentSchema);

module.exports = {
  dbconnect,
  User,
  Player,
  Tournament,
};
