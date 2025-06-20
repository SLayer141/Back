import { Request, Response } from 'express';
import { AppDataSource } from '../db/data-source';
import { User } from '../model/User';
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }
  try {
    const userRepo = AppDataSource.getRepository(User);
    const existingUser = await userRepo.findOneBy({ username });
    if (existingUser) {
      res.status(409).json({ message: 'Username already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepo.create({ username, password: hashedPassword });
    await userRepo.save(user);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 