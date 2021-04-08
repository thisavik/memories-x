const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;

    let decodeddata;

    if(token && isCustomAuth) {
      decodeddata = jwt.verify(token, 'test');

      req.userId = decodeddata?.id;
    } else {
      decodeddata = jwt.decode(token);

      req.userId = decodeddata?.sub;
    }
  } catch (err) {
    console.log(err)
  }

  next();
}

module.exports = auth;