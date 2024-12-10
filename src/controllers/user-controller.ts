import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

// get all users

export const getUsers = async(_req: Request, res: Response) => {
  try {
    const dbUserData = await User.find()
      .select('-__v')

    return res.json(dbUserData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

// get one user by id

export const getUserById = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOne({ _id: req.params.id })
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' })
        .select('-__v');
        
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        return res.json(dbUserData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// create user

export const createUser = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        return res.json(dbUserData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// update user by id

export const updateUser = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.id, }, req.body)
        return res.json(dbUserData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// delete user

export const deleteUser = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.id });
        return res.json(dbUserData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// add friend

export const addFriend = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        return res.json(dbUserData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

// delete friend

export const deleteFriend = async(req: Request, res: Response) => {
    try {
        const dbUserData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        return res.json(dbUserData);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} 
