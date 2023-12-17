// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    // 'expires' sets the expiration date for the cookie. 
    // Here, it's calculated as the current time plus the number of days specified in JWT_COOKIE_EXPIRE, 
    // converted to milliseconds. This determines how long the cookie will be valid before it expires.
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),

    // 'httpOnly' is a flag that indicates whether the cookie should be accessible only by the web server.
    // Setting it to true helps mitigate the risk of client-side script accessing the protected cookie.
    httpOnly: true,

    // 'secure' is a flag that indicates whether the cookie should be sent only over HTTPS.
    // This is set to true in production for security reasons, ensuring that the cookie is only sent 
    // over secure, encrypted connections.
    secure: process.env.NODE_ENV === 'production',

    // 'sameSite' controls whether the cookie should be sent in cross-site requests.
    // It helps prevent CSRF (Cross-Site Request Forgery) attacks.
    // 'None' means the cookie will be sent in all contexts, i.e., in responses to both first-party 
    // and cross-origin requests. If 'None' is set, the 'secure' attribute must also be set.
    // 'Lax' allows the cookie to be sent in top-level navigations and will be sent along with GET requests initiated by third-party websites.
    // It's set to 'None' in production to allow cookies in cross-domain/origin requests, assuming a secure (HTTPS) environment.
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
  };

  // It's up to the client-side to decide how to handle the token
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json(token);
};

export default sendTokenResponse;