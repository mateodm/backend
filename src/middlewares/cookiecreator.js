import cookieParser from "cookie-parser";

export default function createCookie(req, res, next) {
    res.cookie(req.name, req.token, { maxAge: req.expires, httpOnly: true });
    next();
  }
  