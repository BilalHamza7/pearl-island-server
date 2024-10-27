import { Counter } from '../models/idCounterModel';



export const getNextSequenceValue = async (sequenceName) => {
    const sequence = await Counter.findOneAndUpdate(
        { sequenceId: sequenceName },
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
    )
    return sequence.sequenceValue;
}