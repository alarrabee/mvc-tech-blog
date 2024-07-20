const withAuth = (req, res, next) => {
    // If the user isn't logged in, redirect them to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute the route function that will allow them to view the page
      // We call next() if the user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;