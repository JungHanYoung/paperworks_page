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
    `
      <h2 style="font-size: 2rem;">제품유형: ${productType}</h2>
      <h2 style="font-size: 2rem;">질문유형 : ${questionType}</h2>
      <h2>제품명 : ${productName}</h2>
      <p>${contents}</p>
    `,
    email
  ).then((messageInfo) => {
    res.render('success')
  }).catch((e) => {
    console.error(e);
    res.status(400).json({
      success: false,
    })
  });
  // mailHelper.postMessage()
})

router.get('/history', function(req, res) {
  // Hello World
  // if(random.boolean()) {
  //   res.render('history');
  // } else {
    res.render('history_2');
  // }

});

module.exports = router;
