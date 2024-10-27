import mongoose from 'mongoose';

const counterSchema = mongoose.Schema({
    sequenceId: { type: String, required: true },
    sequenceValue: { type: Number, required: true }
}); 

export const Counter = mongoose.model('Counter', counterSchema);