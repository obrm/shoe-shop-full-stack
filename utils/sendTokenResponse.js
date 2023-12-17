// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  };

  // Send secure cookie in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // It's up to the client-side to decide how to handle the token
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json(token);
};

export default sendTokenResponse;