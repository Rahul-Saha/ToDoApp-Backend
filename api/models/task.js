const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        // default: new mongoose.Types.ObjectId()
    },
    task_name: {
        type: String,
        required: true
    },
    is_selected: {
        type: Boolean,
        default: false,
    },
    display_order: {
        type: Number,
        required: false,
        default: 0
    },
});

module.exports = mongoose.model('Task', taskSchema);