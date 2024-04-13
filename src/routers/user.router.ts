import { Router as router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import createDebug from 'debug';

export const userRouter = router();
const userController = new UserController();

const debug = createDebug('W6*:app');
debug('user router');

userRouter.get('/', userController.getAll.bind(userController));

userRouter.get('/:id', userController.getById.bind(userController));

userRouter.post('/', userController.create.bind(userController));

userRouter.patch('/:id', userController.update.bind(userController));

userRouter.delete('/:id', userController.delete.bind(userController));
