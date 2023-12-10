import Shoe from '../models/Shoe.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc      Get all shoes
// @route     GET /api/v1/shoes
// @access    Public
export const getShoes = asyncHandler(async (req, res, next) => {
  const shoes = await Shoe.find();

  return res.status(200).json(shoes);
});

// @desc      Get single shoe
// @route     GET /api/v1/shoes/:id
// @access    Public
export const getShoe = asyncHandler(async (req, res, next) => {
  const shoe = await Shoe.findById(req.params.id);

  if (!shoe) {
    return next(
      new ErrorResponse(`Shoe that ends with '${req.params.id.slice(-6)}' was not found`, 404)
    );
  }

  res.status(200).json(shoe);
});

// @desc      Add a shoe
// @route     POST /api/v1/shoes
// @access    Private
export const addShoe = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new ErrorResponse(`User with ID that ends with '${req.user.id.slice(-6)}' is not authorized to add a shoe`, 401));
  }

  const shoe = await Shoe.create(req.body);

  res.status(200).json(shoe);
});

// @desc      Update a shoe
// @route     PUT /api/v1/shoes/:id
// @access    Private
export const updateShoe = asyncHandler(async (req, res, next) => {
  let shoe = await Shoe.findById(req.params.id);

  if (!shoe) {
    return next(
      new ErrorResponse(`Shoe that ends with '${req.params.id.slice(-6)}' was not found`, 404)
    );
  }

  if (req.user.role !== 'admin') {
    return next(new ErrorResponse(`User with ID that ends with '${req.user.id.slice(-6)}' is not authorized to update this shoe`, 401));
  }

  shoe = await Shoe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json(shoe);
});

// @desc      Delete a shoe
// @route     Delete /api/v1/shoes/:id
// @access    Private
export const deleteShoe = asyncHandler(async (req, res, next) => {
  const shoe = await Shoe.findById(req.params.id);

  if (!shoe) {
    return next(
      new ErrorResponse(`Shoe that ends with '${req.params.id.slice(-6)}' was not found`, 404)
    );
  }

  if (req.user.role !== 'admin') {
    return next(new ErrorResponse(`User with ID that ends with '${req.user.id.slice(-6)}' is not authorized to delete this shoe`, 401));
  }

  await shoe.deleteOne();

  res.status(200).json({});
});