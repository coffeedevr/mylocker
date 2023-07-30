const mongoose = require('mongoose')
const { intervalToDuration } = require('date-fns')
const { Schema } = mongoose
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongoosePaginate = require('mongoose-paginate-v2');

const AccountSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, required: true },
  label: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date },
  last_modified: { type: Date },
  status: { type: Boolean, default: true }
}, { collection: 'accounts', toJSON: { virtuals: true } })

AccountSchema.virtual("last_duration").get(function() {
  const duration = intervalToDuration({
    start: this.last_modified,
    end: new Date()
  })
  return duration;
})

AccountSchema.plugin(mongooseLeanVirtuals)
AccountSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("Account", AccountSchema);