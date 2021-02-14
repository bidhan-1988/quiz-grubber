const db = require('../../dbPool.js');
const Queue = require('queue-fifo');
const logger = require('../../logger.js').logger;
var queue = new Queue();

const registerAnswer = (args) => {
    queue.enqueue(args);
    insertData();
    return null;
}

const insertData = () => {
    setTimeout(() => {
        const params = queue.dequeue();
        const insertQuery = `INSERT INTO user_question_table(username, question_id, correct_answer)
                                  VALUES ('${params.user_id}','${params.question_id}', '${params.correct_answer}');`
        logger.info("LOG Insert query : " + insertQuery);
        db.conn.query(insertQuery).then(data => {
            logger.info("LOG Answer question success : " + params.user_id);
        }).catch(ex => {
            logger.info("ERROR Answer question : " + params.user_id);
        });
    }, 400);
}
exports.registerAnswer = registerAnswer;
