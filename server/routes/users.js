import express from 'express';
import User from '../models/user.model.js';

var router = express.Router();


/* GET users listing. */
router.get('/', async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({users});
});
router.post('/', async (req, res, next) => {
  const { username, password, phone } = req.body;
  
  try {
    const user = await User.create({ username, password, phone });
  
    res.status(201).json({user});
    
  } catch (error) {
    
    res.status(400).json({error});
  }
});

export default router;
