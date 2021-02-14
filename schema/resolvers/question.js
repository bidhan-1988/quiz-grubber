const db = require('../../dbPool.js');
const logger = require('../../logger.js').logger;

const listQuestion = (args) => {
   /* const query = `SELECT qb.question_id,qb.question,qb.category,qb.option_1,qb.option_2,qb.option_3,qb.option_4,qb.correct_option FROM question_bank qb
    where (qb.user_id != '${args.username}' or qb.user_id ISNULL) and (qb.category in (select category_id from user_category_table where username = '${args.username}')
    OR qb.category = 1) and qb.question_id not in (select question_id from user_question_table where username = '${args.username}') and
    qb.question_id > '${args.lastId}' and qb.checked = true order by qb.question_id LIMIT 20`; */
	
	const query = `select question_id,question,category,option_1,option_2,option_3,option_4,correct_option from (
	SELECT qb.question_id,qb.question,qb.category,qb.option_1,qb.option_2,qb.option_3,qb.option_4,qb.correct_option,qb.user_id,qb.checked FROM question_bank qb LEFT JOIN 
	user_question_table uqt ON (qb.question_id = uqt.question_id and uqt.username= '${args.username}') where uqt.question_id IS NULL
	) as t where (user_id != '${args.username}' or user_id ISNULL)
	and (category in (select category_id from user_category_table where username = '${args.username}'))
	and question_id > '${args.lastId}' and checked = true order by question_id LIMIT 50`;
    
    console.log("\n Success get question ",query);

    // logger.info('LOG : ' + query);
    return db.conn.manyOrNone(query)
        .then(data => {
            let responseObject = [];
            if (data.length === 0) {
                let object = {};
                object.options = [];
                object.question = null;
                object.category = null;
                object.question_id = null;
                object.correctoption = null;
                object.options = { option1: null, option2: null, option3: null, option4: null };
                responseObject.push(object);
            } else {
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
            }
            return responseObject;
        })
        .catch(err => {
          //  logger.info('ERROR get questions : ' + '[' + args.username + '] ' + err);
            console.log("Error get question  \n");
            return 'The error is' + err;
        });
}
exports.listQuestion = listQuestion;