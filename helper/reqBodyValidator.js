const { checkSchema } = require('express-validator');

exports.checkReqBodyForPostQuestion = checkSchema({
    productType: {
        isIn: ["PC", "노트북", "기타"],
    },
    questionType: {
        isIn: ["Q&A", "주문접수", "견적문의", "기타"]
    },
    productName: {
        isEmpty: {
            errorMessage: "oqkpdqwokdpqwodkqwpok"
        },
    },
    email: {
        isEmail: true,
    },
    contents: {
        isEmpty: true,
    }
})