import { Router } from 'express';
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend, } from '../../controllers/user-controller.js';
const router = Router();
// User routes
router.route('/')
    .get(getUsers)
    .post(createUser);
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
// Friend routes
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
export default router;
