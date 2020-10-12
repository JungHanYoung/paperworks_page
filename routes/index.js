const express = require('express');
const mailHelper = require('../helper/mailHelper');
const { checkReqBodyForPostQuestion } = require('../helper/reqBodyValidator');
const { body, validationResult } = require('express-validator');
const router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/contact', function(req, res) {
  res.render('contact');
});

router.post('/postQuestion', [
  body('productType').isIn(["PC", "노트북", "기타"]),
  body('questionType').isIn(["Q&A", "주문접수", "견적문의", "기타"]),
  body("productName").isLength({ min: 2 }),
  body("email").isEmail(),
  body("contents").isLength({ min: 2 }),
], function(req, res) {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    console.log(errors);
    return res.render("contact", {errors: errors.errors});
  }
  console.log(req.body)
  const {
    productType,
    questionType,
    productName,
    email,
    contents
  } = req.body;
  console.log(productType, questionType, productName, email, contents)
  mailHelper.postMessage(
    productType,
    questionType,
    productName,
    email,
    contents
  );
  // mailHelper.postMessage()
  res.render('contact')
})

router.get('/history', function(req, res) {
  // if(random.boolean()) {
  //   res.render('history');
  // } else {
    res.render('history_2');
  // }

});

module.exports = router;
