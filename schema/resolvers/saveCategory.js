const db = require('../../dbPool.js');

const saveCategory = (args) => {
    let inputData = '';
    let idList = args.category.split(',');
    for (let i = 0; i < idList.length; i++) {
        if (i === idList.length - 1)
            inputData = inputData + `('${args.user}', '${idList[i]}')`;
        else
            inputData = inputData + `('${args.user}', '${idList[i]}'),`;
    }
    console.log("insert query : " + inputData);
    const insertQuery = 'INSERT INTO user_category_table(username, category_id) VALUES ' + inputData;
    return db.conn.query(insertQuery)
        .then(data => {
            return data;
        }).catch(ex => {
            return ex;
        });
};
exports.saveCategory= saveCategory;