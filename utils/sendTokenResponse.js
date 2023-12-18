// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const isProduction = process.env.NODE_ENV === 'production';

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // Set secure to true in production; false in development
    secure: isProduction,
    // sameSite tells the browser when to send the cookie:
    // 'None': Send the cookie every time, even if the user visits a different website that talks to our server.
    // 'Lax': Mostly send the cookie, but not if the user comes from a different website (like a link they clicked).
    // 'Strict': Only send the cookie if the user is directly on our website.
    // In development, we use 'Lax' for easier testing.
    sameSite: isProduction ? 'None' : 'Lax' // or 'Strict' for more careful cookie sending
  };

  // It's up to the client-side to decide how to handle the token
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json(user);
};

export default sendTokenResponse;