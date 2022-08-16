const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['button', 'checkbox', 'date', 'email', 'file', 'number', 'password', 'radio', 'submit', 'tel', 'text'],
      required: true,
    },
    validation: {
      type: {
        type: String,
        required: false,
      },
      min: {
        type: Number,
        required: false,
      },
      max: {
        type: Number,
        required: false,
      },
      required: {
        type: Number,
        required: false,
      },
      required: false,
    },
    is_deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

module.exports = mongoose.model('Field', fieldSchema);
