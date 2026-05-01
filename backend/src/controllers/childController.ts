import { Response } from 'express';
import Child from '../models/Child';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { IChild } from '../types';

export const createChild = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, dateOfBirth, gender, bloodType, allergies } = req.body;

    const child = new Child({
      name,
      dateOfBirth,
      gender,
      bloodType,
      allergies,
      parentId: req.userId,
    });

    await child.save();

    await User.findByIdAndUpdate(
      req.userId,
      { $push: { children: child._id } },
      { new: true }
    );

    res.status(201).json(child);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create child profile' });
  }
};

export const getChildren = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const children = await Child.find({ parentId: req.userId });
    res.json(children);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch children' });
  }
};

export const getChildById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId } = req.params;
    const child = await Child.findOne({ _id: childId, parentId: req.userId });

    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    res.json(child);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch child' });
  }
};

export const updateChild = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId } = req.params;

    const child = await Child.findOneAndUpdate(
      { _id: childId, parentId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    res.json(child);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update child' });
  }
};

export const deleteChild = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId } = req.params;

    const child = await Child.findOneAndDelete({ _id: childId, parentId: req.userId });

    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    await User.findByIdAndUpdate(
      req.userId,
      { $pull: { children: childId } }
    );

    res.json({ message: 'Child profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete child' });
  }
};
