const db = require('../../dbPool.js');
const getUserScoreCard = (args) => {
    const query = `select count(*),correct_answer,'First Clause' AS Division from user_question_table where username = '${args.username}' group by correct_answer
    UNION 
    select count(*),true,'Second Clause' AS Division from question_bank where user_id = '${args.username}' 
    UNION 
    select count(*),uqt.correct_answer,'Third Clause' AS Division 
    from user_question_table uqt, question_bank qb where uqt.question_id = qb.question_id and qb.user_id = '${args.username}' 
    and uqt.correct_answer = 'false' group by uqt.correct_answer;`
    console.log(" QUERy :  ", query);
    return db.conn.many(query)
        .then(data => {
            let responseObject = {};
            let score = 0;
            data.forEach(datum => {
                if (datum.division === 'First Clause') {
                    if (datum.correct_answer) {
                        responseObject.correct = datum.count;
                        score = score + parseInt(datum.count);
                    } else {
                        responseObject.incorrect = datum.count;
                    }
                } else if (datum.division === 'Second Clause') {
                    responseObject.posted = datum.count;
                } else if (datum.division === 'Third Clause') {
                    responseObject.incorrectAnswers = datum.count;
                    score = score + parseInt(datum.count);
                }
            });
            responseObject.score = score;
            return responseObject;
        })
        .catch(err => {
            return 'The error is' + err;
        });
}

exports.getUserScoreCard = getUserScoreCard;