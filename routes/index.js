var express = require('express');
var router = express.Router();

const validator = require('express-validator');

const messages = [
  {
    text: "Hi there!",
    user: "Colin",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Mini Messageboard", messages: messages })
});

/* GET form. */
router.get('/new', function(req, res, next) {
  res.render('form', {title: "Create Message"});
});

/* POST form. */
router.post('/new', [
  validator.body('user', 'User must not be empty.').trim().isLength({ min: 1 }),
  validator.body('message', 'Message must not be empty.').trim().isLength({ min: 1 }),
  validator.sanitizeBody('*').escape()
], function(req, res, next) {
  // Validate fields.
  validator.body('user', 'User must not be empty.').trim().isLength({ min: 1 });
  validator.body('message', 'Message must not be empty.').trim().isLength({ min: 1 });

  // Sanitize fields (using wildcard)
  validator.sanitizeBody('*').escape();

  // Extract the validation errors from a request.
  const errors = validator.validationResult(req);

  if (!errors.isEmpty()) {
    // There are errors. Render the form again with sanitized values/error messages.
    res.render('form', { title: 'Create Message', errors: errors.array()});
    return;
  }  

  // Create a message object with escaped and trimmed data
  var message = {
    text: req.body.message,
    user: req.body.user,
    added: new Date()
  }

  messages.push(message);

  res.redirect('/');

});

module.exports = router;
