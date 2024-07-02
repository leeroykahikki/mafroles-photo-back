const mongoose = require('mongoose');
const { UserSchema, PlayerSchema, TournamentSchema } = require('./Schemas');

const User = mongoose.model('users', UserSchema);
const Player = mongoose.model('players', PlayerSchema);
const Tournament = mongoose.model('tournaments', TournamentSchema);

module.export = {
  User,
  Player,
  Tournament,
};
