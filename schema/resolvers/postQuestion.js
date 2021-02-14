const db = require('../../dbPool.js');
const logger = require('../../logger.js').logger;

exports.postQuestion = (args) => {
    const questionText = args.question.replace(/[']/g, "''");
    const insertQuery = `INSERT INTO question_bank(question, category,correct_option, user_id, checked) VALUES ('${questionText}', 
    '${args.category}','${args.correct_option}','${args.username}',false);`
    logger.info("LOG question post :  " + insertQuery);
    return db.conn.query(insertQuery).then(data => {
        return data;
    }).catch(ex => {
        logger.info("ERROR question post :  " + ex);
        return ex;
    });
}

exports.getCountUserQuestions = (args) => {
    var now = new Date();
    const today = now.toString().substr(0, now.toString().indexOf(' GMT'));
    const query = `select count(*) from question_bank where user_id = '${args.username}' and post_date = '${today}'`;
    return db.conn.query(query).then(data => {
        let count = 0;
        if (data.length > 0) {
            count = data[0].count;
        }
        return { count: count };
    }).catch(ex => {
        logger.info("ERROR get count user questions :  " + ex);
    });
}