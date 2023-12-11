export const validateLogIn = (req, res, next) => {
    if (req.session.firstName) next();
    else res.status(401).json({ msg: "no estas autorizado" });
  };