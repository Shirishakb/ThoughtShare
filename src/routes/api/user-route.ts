import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} from '../controllers/user-controller.js';

const router = Router();

// User routes
router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Friend routes
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

export default router;
