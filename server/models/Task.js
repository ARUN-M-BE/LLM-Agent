
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    apiConfig: {
        provider: { type: String, required: true },
        model: { type: String, required: true },
    },
    inputType: { type: String, enum: ['text', 'voice'], required: true },
    originalText: { type: String, required: true },
    voiceFileUrl: { type: String },
    action: { type: String, enum: ['comment', 'record', 'skip'], required: true },
    llmComment: { type: String },
    status: { type: String, enum: ['pending', 'processed', 'failed'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
});

module.exports = mongoose.model('Task', taskSchema);
