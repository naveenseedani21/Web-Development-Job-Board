import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  postedAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
