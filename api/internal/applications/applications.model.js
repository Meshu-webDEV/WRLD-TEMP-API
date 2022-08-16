const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    vendor: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: 'Vendor',
    },
    form: {
      type: Map,
      of: [Object],
    },
    form: {
      type: {},
      required: true,
    },
    application: {
      form: {
        fields: [Object],
      },
      limits: { type: String },
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

module.exports = mongoose.model('Application', applicationSchema);
