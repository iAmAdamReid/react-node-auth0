import "dotenv/config";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH0_WELL_KNOWN_URL}`
  }),

  audience: `${process.env.AUTH0_JWT_AUDIENCE}`,
  issuer: `${process.env.AUTH0_JWT_ISSUER}/`,
  algorithms: ["RS256"]
});

module.exports.checkJwt = checkJwt;
