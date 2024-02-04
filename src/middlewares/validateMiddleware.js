export const validateLogIn = (req, res, next) => {
    if (req.isAuthenticated() && req.session.user) next();
    else res.status(401).redirect('/error-login');
  };