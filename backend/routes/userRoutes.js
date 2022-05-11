import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.get(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result) {
        res.send(result);
        return;
      }
    res.status(401).send({ message: 'No user with this id' });
  })
);
userRouter.get(
  '/all',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({ "isAdmin" : false});
    if (users) {
        res.send(users);
        return;
    }
    res.status(401).send({ message: 'No users' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);


export default userRouter;