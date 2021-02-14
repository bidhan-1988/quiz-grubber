const db = require('../../dbPool.js');
exports.postQuestion = (args) => {
    const insertQuery = `INSERT INTO question_bank(question, category, option_1, option_2, option_3, 
                    option_4, correct_option, user_id) VALUES ('${args.question}', '${args.category}','${args.option_1}', '${args.option_2}',
                    '${args.option_3}', '${args.option_4}','${args.correct_option}','${args.username}');`
    return db.conn.query(insertQuery).then(data => {
        return data;
    }).catch(ex => {
        return ex;
    });
}