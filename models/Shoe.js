import mongoose from 'mongoose';

const ShoeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please add a shoe name'],
    minlength: [3, 'Name must be at least 3 characters long']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand'],
    minlength: [2, 'Brand must be at least 2 characters long']
  }, 
  price: {
    type: Number,
    required: [true, 'Please add price'],
    min: [1, 'Price must be greater than 1$']
  },
  image: {
    type: String,
    required: [true, 'Please add an image string'],
    match: [
      /(https?:\/\/.*\.(?:png|jpg|jpeg))/,
      'Image url is not valid'
    ]
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