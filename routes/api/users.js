const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

const config = require("../../config/service-config.js");

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(user.email && !user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

router.get('/status', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      
      var t = Date.now();
      var min = config.simple.timeout.min, max = config.simple.timeout.max;
      var randomTime = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
      
      // Slow down response based on the random time
      setTimeout(function() {
        return res.json({ status: "success", time: t });
      }, randomTime);

    });
});

//GET current route (required, only authenticated users have access)
router.get('/pageone', (req, res, next) => {
  // const { payload: { id } } = req;

  /*return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
    */  
      var min = config.simple.timeout.min, max = config.simple.timeout.max;
      var randomTime = Math.floor(Math.random() * (max - min + 1) + min);
      
      // Slow down response based on the random time
      setTimeout(function() {
        return res.json({ status: "success", description: "No Auth required", time: Date.now() });
      }, randomTime);

    // });
});

//GET current route (required, only authenticated users have access)
router.get('/pagetwo', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      var min = config.complex.timeout.min, max = config.simple.timeout.max;
      var randomTime = Math.floor(Math.random() * (max - min + 1) + min);
      
      // Slow down response based on the random time
      setTimeout(function() {
        return res.json({ status: "success", description: "Auth required", time: Date.now() });
      }, randomTime);
      
    });
});

//POST new user route (optional, everyone has access)
router.post('/addtask', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  console.log("Adding Task : " + req.body.task);

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      // Create a task using the task and duedate from the request and add it to the tasks[]
      var task = user.addTask(req.body.task, new Date(req.body.duedate));

      // Save the user
      return user.save()
        .then(() => res.json({ task: JSON.stringify(task) }));
      
    });
});


module.exports = router;