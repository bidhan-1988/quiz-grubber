const db = require('../../dbPool.js');

const registerAnswer = (args) => {
    const insertQuery = `INSERT INTO user_question_table(username, question_id, correct_answer)
                                  VALUES ('${args.user_id}','${args.question_id}', '${args.correct_answer}');`
    console.log(" Insert query : ", insertQuery);
    return db.conn.query(insertQuery).then(data => {
        return data;
    }).catch(ex => {
        return ex;
    });
}
exports.registerAnswer = registerAnswer;
