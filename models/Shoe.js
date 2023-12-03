import mongoose from 'mongoose';

const ShoeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a shoe name']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand']
  }, 
  price: {
    type: Number,
    required: [true, 'Please add price']
  },
  image: {
    type: String,
    required: [true, 'Please add an image string'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},
  {
    toJSON: {
      virtuals: true,
      // Hide the _id field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    },
    toObject: {
      virtuals: true,
      // Hide the _id field from the frontend
      transform: function (_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  });

export default mongoose.model('Shoe', ShoeSchema);