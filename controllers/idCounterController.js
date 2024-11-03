import { Counter } from '../models/idCounterModel.js';

export const getNextSequenceValue = async (sequenceName) => {
    let sequence = await Counter.findOne({ sequenceId: sequenceName }); // find sequence

    if (!sequence) { // if unavailable
        sequence = await Counter.create({ sequenceId: sequenceName, sequenceValue: 1 }); // create sequence initialized with 1
    } else { // if available
        sequence = await Counter.findOneAndUpdate( // increment the sequence value
            { sequenceId: sequenceName },
            { $inc: { sequenceValue: 1 } },
            { new: true }
        );
    }

    const nextId = sequence.sequenceValue.toString().padStart(4, '0'); //  43 => 0043 / 2 => 0002

    return nextId;
}