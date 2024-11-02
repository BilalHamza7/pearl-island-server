import { Counter } from '../models/idCounterModel.js';

// initialize all sequences to begin with one
// available sequences are admin, products, inquirys, requests

export const getNextSequenceValue = async (sequenceName) => {
    const sequence = await Counter.findOneAndUpdate(
        { sequenceId: sequenceName },
        {
            $inc: { sequenceValue: 1 },
            $setOnInsert: { sequenceValue: 1 }
        },
        { new: true, upsert: true }
    )

    const nextId = sequence.sequenceValue.toString().padStart(4, '0'); //  43 => 0043 / 2 => 0002

    return nextId;
}