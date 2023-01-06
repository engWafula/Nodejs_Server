const User = require("../models/user")
exports.getLogin = (req, res, next) => {
    console.log(req.session.isLogedIn)
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated:req.session.isLoggedIn
    });
  };
  

  exports.postLogin = (req, res, next) => {
    User.findById('63b58653965cc5742749e8e2')
      .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      })
      .catch(err => console.log(err));
  };

  exports.postLogout =(req,res,next)=>{
   req.session.destroy((err)=>{
    console.log(err)
    res.redirect("/")

   })
  }