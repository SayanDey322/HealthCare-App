import { Response } from 'express';
import HealthRecord from '../models/HealthRecord';
import Child from '../models/Child';
import { AuthRequest } from '../middleware/auth';

export const addHealthRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId, recordType, value, unit, notes } = req.body;
    
    const child = await Child.findOne({ _id: childId, parentId: req.userId });
    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    const record = new HealthRecord({
      childId,
      recordType,
      value,
      unit,
      notes,
      recordedAt: new Date(),
    });

    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add health record' });
  }
};

export const getHealthRecords = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId } = req.params;
    const { recordType } = req.query;

    const child = await Child.findOne({ _id: childId, parentId: req.userId });
    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    const query: any = { childId };
    if (recordType) {
      query.recordType = recordType;
    }

    const records = await HealthRecord.find(query).sort({ recordedAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
};

export const getHealthRecordStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId, days = 30 } = req.query;
    const child = await Child.findOne({ _id: childId, parentId: req.userId });
    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - parseInt(days as string));

    const records = await HealthRecord.find({
      childId,
      recordedAt: { $gte: dateFrom },
    });

    const stats = {
      total: records.length,
      byType: {} as Record<string, number>,
      averageByType: {} as Record<string, number>,
    };

    records.forEach((record) => {
      stats.byType[record.recordType] = (stats.byType[record.recordType] || 0) + 1;
    });

    Object.keys(stats.byType).forEach((type) => {
      const typeRecords = records.filter((r) => r.recordType === type);
      const sum = typeRecords.reduce((acc, r) => acc + r.value, 0);
      stats.averageByType[type] = Math.round((sum / typeRecords.length) * 100) / 100;
    });

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch health stats' });
  }
};

export const deleteHealthRecord = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { recordId } = req.params;

    const record = await HealthRecord.findById(recordId);
    if (!record) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }
    const child = await Child.findOne({ _id: record.childId, parentId: req.userId });
    if (!child) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    await HealthRecord.findByIdAndDelete(recordId);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
};
