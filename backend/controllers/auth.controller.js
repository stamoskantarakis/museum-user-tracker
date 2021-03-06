const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const Room = db.room;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: 'User was registered successfully!' });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: 'User was registered successfully!' });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      let authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

exports.saveRoomData = (req, res) => {
  const room = new Room({
    userId: req.body.roomData.userId,
    entrance: req.body.roomData.entrance,
    exit: req.body.roomData.exit,
    accessPoint: req.body.roomData.accessPoint,
    exhibit: req.body.roomData.exhibit,
    wall: req.body.roomData.wall,
    positionThatWillUndo: req.body.roomData.positionThatWillUndo,
    counterAccessPoint: req.body.roomData.counterAccessPoint,
    counterExhibit: req.body.roomData.counterExhibit,
    counterWall: req.body.roomData.counterWall,
    counterAllPositions: req.body.roomData.counterAllPositions,
    allPositions: req.body.roomData.allPositions,
    entranceBadge: req.body.roomData.entranceBadge,
    exitBadge: req.body.roomData.exitBadge,
    accessPointBadge: req.body.roomData.accessPointBadge,
    exhibitBadge: req.body.roomData.exhibitBadge,
    height: req.body.roomData.height,
    width: req.body.roomData.width,
    isResized: req.body.roomData.isResized,
    dropdownSelectionsReducer: req.body.roomData.dropdownSelectionsReducer,
    counterAPFromSquareComponent:
      req.body.roomData.counterAPFromSquareComponent,
    counterExhibitFromSquareComponent:
      req.body.roomData.counterExhibitFromSquareComponent,
    counterWallFromSquareComponent:
      req.body.roomData.counterWallFromSquareComponent,
    accessPointPositionArrayFromSquareComponent:
      req.body.roomData.accessPointPositionArrayFromSquareComponent,
    exhibitPositionArrayFromSquareComponent:
      req.body.roomData.exhibitPositionArrayFromSquareComponent,
    wallPositionArrayFromSquareComponent:
      req.body.roomData.wallPositionArrayFromSquareComponent,
    nameOfTemplate: req.body.roomData.nameOfTemplate,
  });

  room.save((err, room) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
};
