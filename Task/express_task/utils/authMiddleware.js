const jwt = require("jsonwebtoken");

const logger = require("./logger");

let invalidatedToken = [];

const authMiddleWare = (req, res, next) => {
  if (["/login", "/signup"].includes(req.path)) return next();

  const token = req.header("auth-token");

  if (invalidatedToken.includes(token) || !token) {
    logger.error("Invalid Tokem");
    return res.status(401).send("Access denied1");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const tokenExpirationTime = decoded.exp * 1000;
    const currentTime = new Date().getTime();

    if (currentTime > tokenExpirationTime) {
      logger.error("Expired Token");
      return res.status(401).send("Access denied");
    }

    req.user = decoded;
    logger.success("Authenticated successfully");
    next();
  } catch (error) {
    logger.error(`Error Auth Moiddleware ${error}`);
    return res.status(401).send("Access denied");
  }
};

const addInvalidToken = (token) => {
  logger.info("Invalidated Token pushed");
  invalidatedToken.push(token);
};

module.exports = { authMiddleWare, addInvalidToken };
