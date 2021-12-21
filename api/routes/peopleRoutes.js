const express = require('express');
const peopleController = require('../controllers/peopleController');

const peopleRouter = express.Router();
peopleRouter.get('/', peopleController.list);
peopleRouter.get('/:id', peopleController.get);

module.exports = peopleRouter;