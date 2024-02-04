export const validateAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.session.user.role === 'admin') next();
    else res.status(401).json({ msg: "No eres admin" });
  };