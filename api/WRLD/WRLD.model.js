const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempSchema = new Schema(
  {
    business_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
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

module.exports = mongoose.model('Temp', tempSchema);
