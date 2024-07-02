const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  password: {
    type: BigInt,
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

module.exports = {
  UserSchema,
  PlayerSchema,
  TournamentSchema,
};
