const db = require('../../dbPool.js');
const listQuestion = (args) => {
    const query = `SELECT qb.question_id,qb.question,qb.category,qb.option_1,qb.option_2,qb.option_3,qb.option_4,qb.correct_option FROM question_bank qb
                   where (qb.user_id != '${args.username}' or qb.user_id ISNULL) and qb.category in (select category_id from user_category_table where username = '${args.username}')
                   and qb.question_id not in (select question_id from user_question_table where username = '${args.username}')`
    console.log(" GGGGGGG   ", query);
    return db.conn.many(query)
        .then(data => {
            let responseObject = [];
            data.forEach((value) => {
                let object = {};
                object.options = [];
                object.question = value.question;
                object.category = value.category;
                object.question_id = value.question_id;
                object.correctoption = value.correct_option;
                object.options = { option1: value.option_1, option2: value.option_2, option3: value.option_3, option4: value.option_4 };
                responseObject.push(object);
            });
            return responseObject;
        })
        .catch(err => {
            return 'The error is' + err;
        });
}
exports.listQuestion = listQuestion;